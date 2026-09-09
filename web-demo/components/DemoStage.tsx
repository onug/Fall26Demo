'use client';

import { useReducer, useEffect, useCallback, useRef, useState } from 'react';
import {
  DemoState, ControlKey, TopologyState, Metrics, AuditEntry, EventEntry, Step, LaneKey, AutonomyLevel,
} from '@/lib/types';
import { INITIAL_CONTROLS, INITIAL_METRICS, BASE_NODES, BASE_EDGES } from '@/lib/data';
import { STEPS, firstStepOfBeat, BEAT_LABELS } from '@/lib/steps';
import { playNarration, stopNarration } from '@/lib/audio';

import TitleSlide from './TitleSlide';
import Topology from './Topology';
import ControlPlanePanel from './ControlPlanePanel';
import EventFeed from './EventFeed';
import ImpactPanel from './ImpactPanel';
import VerifyGatePanel from './VerifyGatePanel';
import AuditJournal from './AuditJournal';
import ViolationOverlay from './ViolationOverlay';
import BlockedOverlay from './BlockedOverlay';
import StepIndicator from './StepIndicator';
import NarrationPanel from './NarrationPanel';
import AcceleratorView from './AcceleratorView';
import ProofPoints from './ProofPoints';
import VendorLanes from './VendorLanes';

// ─── State replay ──────────────────────────────────────
type Action =
  | { type: 'GOTO_STEP'; step: number }
  | { type: 'RESET' }
  | { type: 'CLEAR_OVERLAYS' };

function freshTopology(): TopologyState {
  return {
    nodes: BASE_NODES.map(n => ({ ...n })),
    edges: BASE_EDGES.map(e => ({ ...e })),
  };
}

function buildStateForStep(targetStep: number): DemoState {
  const controls = { ...INITIAL_CONTROLS } as Record<ControlKey, boolean>;
  const metrics = { ...INITIAL_METRICS } as Metrics;
  const events: EventEntry[] = [];
  const audit: AuditEntry[] = [];
  const quarantined = new Set<string>();
  const compromised = new Map<string, string>();
  const activeLanes = new Set<LaneKey>();
  let topology = freshTopology();
  let autonomyLevel: AutonomyLevel = 0;

  for (let i = 0; i <= targetStep && i < STEPS.length; i++) {
    const step = STEPS[i];

    if (step.resetState) {
      Object.assign(controls, INITIAL_CONTROLS);
      Object.assign(metrics, INITIAL_METRICS);
      events.length = 0;
      audit.length = 0;
      quarantined.clear();
      compromised.clear();
      activeLanes.clear();
      topology = freshTopology();
      autonomyLevel = 0;
    }

    autonomyLevel = applyStep(step, controls, metrics, events, audit, quarantined, compromised, activeLanes, topology, autonomyLevel);
  }

  const current = STEPS[targetStep];
  const enforcingControls = (current?.controlChanges ?? []).filter(c => c.enabled).map(c => c.control);

  return {
    currentStep: targetStep,
    beat: current?.beat ?? 0,
    events,
    controls,
    metrics,
    topology,
    audit,
    quarantined,
    compromised,
    enforcingControls,
    gateProposal: current?.gateProposal ?? null,
    autonomyLevel,
    activeLanes,
    activeViolation: current?.phase === 'violation'
      ? { name: current.title, detail: current.subtitle || '' }
      : null,
    activeBlocked: current?.phase === 'blocked'
      ? { name: current.title, detail: current.subtitle || '' }
      : null,
  };
}

function applyStep(
  step: Step,
  controls: Record<ControlKey, boolean>,
  metrics: Metrics,
  events: EventEntry[],
  audit: AuditEntry[],
  quarantined: Set<string>,
  compromised: Map<string, string>,
  activeLanes: Set<LaneKey>,
  topology: TopologyState,
  autonomyLevel: AutonomyLevel,
): AutonomyLevel {
  const ts = new Date();
  step.events.forEach((e, idx) => {
    events.push({ ...e, timestamp: e.timestamp || formatTs(ts, idx) });
  });

  for (const c of step.controlChanges ?? []) controls[c.control] = c.enabled;
  if (step.metricsUpdate) Object.assign(metrics, step.metricsUpdate);
  if (step.auditEntries) audit.push(...step.auditEntries);

  for (const tc of step.topologyChanges) {
    switch (tc.action) {
      case 'addNode':
      case 'updateNode': {
        const n = topology.nodes.find(x => x.id === tc.nodeId);
        if (n && tc.props) Object.assign(n, tc.props);
        break;
      }
      case 'removeNode': {
        const idx = topology.nodes.findIndex(x => x.id === tc.nodeId);
        if (idx !== -1) topology.nodes.splice(idx, 1);
        break;
      }
      case 'addEdge': {
        if (tc.props && tc.edgeId) {
          const e = topology.edges.find(x => x.id === tc.edgeId);
          if (e) Object.assign(e, tc.props);
          else topology.edges.push(tc.props as TopologyState['edges'][0]);
        }
        break;
      }
      case 'updateEdge': {
        const e = topology.edges.find(x => x.id === tc.edgeId);
        if (e && tc.props) Object.assign(e, tc.props);
        break;
      }
      case 'removeEdge': {
        const idx = topology.edges.findIndex(x => x.id === tc.edgeId);
        if (idx !== -1) topology.edges.splice(idx, 1);
        break;
      }
    }
  }

  for (const id of step.quarantineNodes ?? []) {
    quarantined.add(id);
    compromised.delete(id);
  }
  for (const cn of step.compromiseNodes ?? []) compromised.set(cn.nodeId, cn.label);

  if (step.activeLanes) {
    activeLanes.clear();
    step.activeLanes.forEach(l => activeLanes.add(l));
  }

  return step.autonomyLevel ?? autonomyLevel;
}

function formatTs(base: Date, idx: number): string {
  const d = new Date(base.getTime() + idx * 100);
  return d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function reducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case 'GOTO_STEP':
      return buildStateForStep(Math.max(0, Math.min(action.step, STEPS.length - 1)));
    case 'RESET':
      return buildStateForStep(0);
    case 'CLEAR_OVERLAYS':
      return { ...state, activeViolation: null, activeBlocked: null };
    default:
      return state;
  }
}

// ─── Component ─────────────────────────────────────────
export default function DemoStage() {
  const [state, dispatch] = useReducer(reducer, 0, buildStateForStep);
  const [muted, setMuted] = useState(false);
  const [showText, setShowText] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const overlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = STEPS[state.currentStep];
  const phase = step?.phase;
  const isFullScreenCard = phase === 'title' || phase === 'accelerator' || phase === 'proof' || phase === 'lanes';

  const goToStep = useCallback((n: number) => {
    if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    dispatch({ type: 'GOTO_STEP', step: n });
  }, []);

  // Narration: UI renders first, then voice (a beat after overlays appear)
  useEffect(() => {
    if (muted || !step?.narration) { stopNarration(); setSpeaking(false); return; }
    const t = setTimeout(() => {
      playNarration(step.id, step.narration!, () => setSpeaking(true), () => setSpeaking(false));
    }, 350);
    return () => { clearTimeout(t); stopNarration(); setSpeaking(false); };
  }, [state.currentStep, muted, step?.id, step?.narration]);

  useEffect(() => () => stopNarration(), []);

  // Auto-clear overlays
  useEffect(() => {
    if (state.activeViolation || state.activeBlocked) {
      overlayTimerRef.current = setTimeout(() => dispatch({ type: 'CLEAR_OVERLAYS' }), 3200);
      return () => { if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current); };
    }
  }, [state.currentStep, state.activeViolation, state.activeBlocked]);

  // Keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case ' ':
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault(); goToStep(state.currentStep + 1); break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault(); goToStep(state.currentStep - 1); break;
        case 'Home':
          e.preventDefault(); goToStep(0); break;
        case 'End':
          e.preventDefault(); goToStep(STEPS.length - 1); break;
        case 'f': case 'F':
          e.preventDefault();
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen();
          break;
        case 'r': case 'R':
          e.preventDefault(); dispatch({ type: 'RESET' }); break;
        case 'n': case 'N':
          e.preventDefault(); setMuted(v => !v); break;
        case 't': case 'T':
          e.preventDefault(); setShowText(v => !v); break;
        case '1': case '2': case '3': case '4': case '5': case '6': case '7': {
          e.preventDefault();
          const idx = firstStepOfBeat(Number(e.key));
          if (idx >= 0) goToStep(idx);
          break;
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.currentStep, goToStep]);

  const planeOnline = Object.values(state.controls).some(Boolean);
  const beatLabel = BEAT_LABELS[state.beat] ?? '';
  const beatTone = state.beat === 1 ? 'fear' : state.beat === 6 ? 'greed' : state.beat === 0 ? 'neutral' : 'plane';

  return (
    <div className={`h-screen w-screen flex flex-col bg-gray-950 relative ${state.activeViolation ? 'animate-shake' : ''}`}>
      {/* Header */}
      <header className="h-12 flex-shrink-0 flex items-center justify-between px-6 border-b border-gray-800/50 bg-gray-950">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-bold text-cyan-400 tracking-wide">ONUG Fall 2026 · One Control Plane, Every Domain</h1>
          {beatLabel && (
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded tracking-wider ${
              beatTone === 'fear' ? 'bg-red-500/20 text-red-400'
                : beatTone === 'greed' ? 'bg-purple-500/20 text-purple-300'
                : 'bg-orange-500/20 text-orange-300'
            }`}>
              {beatLabel}
            </span>
          )}
          {step?.pausePoint && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-yellow-500/15 text-yellow-300 border border-yellow-500/40 tracking-wide">
              ⏸ PRESENTER PAUSE — {step.pausePoint}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowText(v => !v)}
            className={`text-xs px-2.5 py-1 rounded border transition-colors cursor-pointer font-mono tracking-wide ${
              showText ? 'border-gray-700 text-gray-400 hover:text-gray-200' : 'border-gray-800 text-gray-600 hover:text-gray-400'
            }`}
            title="Toggle narration text (T)"
          >
            {showText ? 'TEXT ON' : 'TEXT OFF'}
          </button>
          <button
            onClick={() => setMuted(v => !v)}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded border transition-colors cursor-pointer ${
              muted
                ? 'border-gray-700 text-gray-600 hover:text-gray-400 hover:border-gray-600'
                : 'border-cyan-800 text-cyan-500 hover:text-cyan-300 hover:border-cyan-600'
            }`}
            title="Toggle narration voice (N)"
          >
            {muted ? '🔇' : '🔊'}
            <span className="font-mono tracking-wide">{muted ? 'MUTED' : speaking ? 'NARRATING' : 'VOICE'}</span>
          </button>
          <div className="text-xs font-mono text-gray-600">
            Step {state.currentStep + 1} / {STEPS.length}
          </div>
        </div>
      </header>

      {isFullScreenCard ? (
        <div className="flex-1 flex items-stretch justify-center relative min-h-0">
          {phase === 'title' && (
            <TitleSlide
              title={step.title}
              subtitle={step.subtitle}
              beat={step.beat}
              contributors={step.contributors}
              visible={true}
            />
          )}
          {phase === 'accelerator' && <AcceleratorView title={step.title} metrics={state.metrics} />}
          {phase === 'proof' && <ProofPoints title={step.title} />}
          {phase === 'lanes' && <VendorLanes title={step.title} />}
        </div>
      ) : (
        <main className="flex-1 flex gap-2 p-2 min-h-0">
          {/* Left: event feed */}
          <div className="w-80 flex-shrink-0">
            <EventFeed events={state.events} />
          </div>

          {/* Center: topology + gate / journal */}
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <div className="flex-1 min-h-0">
              <Topology
                topology={state.topology}
                planeOnline={planeOnline}
                quarantined={state.quarantined}
                compromised={state.compromised}
                controls={state.controls}
                enforcingControls={state.enforcingControls}
                activeLanes={state.activeLanes}
                beat={state.beat}
              />
            </div>
            {phase === 'gate' && state.gateProposal && (
              <div className="flex-shrink-0">
                <VerifyGatePanel proposal={state.gateProposal} />
              </div>
            )}
            {step?.showAudit && (
              <div className="flex-shrink-0">
                <AuditJournal entries={state.audit} visible={true} />
              </div>
            )}
          </div>

          {/* Right: control plane + impact */}
          <div className="w-72 flex-shrink-0 flex flex-col gap-2 min-h-0">
            <ControlPlanePanel
              controls={state.controls}
              enforcing={state.enforcingControls}
              autonomyLevel={state.autonomyLevel}
              activeLanes={state.activeLanes}
            />
            <div className="flex-1 min-h-0 overflow-y-auto">
              <ImpactPanel
                metrics={state.metrics}
                outcomeList={step?.outcomeList}
                outcomeTone={step?.outcomeTone}
                isSummary={phase === 'summary'}
              />
            </div>
          </div>
        </main>
      )}

      {/* Narration text */}
      {showText && step?.narration && (
        <div className="flex-shrink-0 px-2">
          <NarrationPanel text={step.narration} speaking={speaking && !muted} />
        </div>
      )}

      {/* Footer */}
      <footer className="h-10 flex-shrink-0 px-2 pb-2 pt-1">
        <StepIndicator
          currentStep={state.currentStep}
          totalSteps={STEPS.length}
          beat={state.beat}
          stepTitle={step?.title || ''}
        />
      </footer>

      {/* Overlays */}
      <ViolationOverlay
        visible={state.activeViolation !== null}
        title={state.activeViolation?.name || ''}
        subtitle={state.activeViolation?.detail}
      />
      <BlockedOverlay
        visible={state.activeBlocked !== null}
        title={state.activeBlocked?.name || ''}
        subtitle={state.activeBlocked?.detail}
      />
    </div>
  );
}
