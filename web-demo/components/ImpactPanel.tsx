'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Metrics } from '@/lib/types';

interface ImpactPanelProps {
  metrics: Metrics;
  outcomeList?: string[];
  outcomeTone?: 'fear' | 'defense';
  isSummary?: boolean;
}

const ZEROS = new Set<string | number>([0, '$0', '0m', '—']);

function Stat({ value, label, tone }: { value: number | string; label: string; tone: 'fear' | 'defense' }) {
  const [displayed, setDisplayed] = useState<number | string>(typeof value === 'number' ? 0 : value);
  const [pulsing, setPulsing] = useState(false);
  const prev = useRef<number | string>(typeof value === 'number' ? 0 : '—');

  useEffect(() => {
    const wasZero = ZEROS.has(prev.current);
    const nowZero = ZEROS.has(value);
    if (wasZero && !nowZero) {
      setPulsing(true);
      const t = setTimeout(() => setPulsing(false), 600);
      prev.current = value;
      if (typeof value === 'string') { setDisplayed(value); return () => clearTimeout(t); }
    }
    prev.current = value;
    if (typeof value === 'string') { setDisplayed(value); return; }
    if (value === 0) { setDisplayed(0); return; }
    const steps = 20, duration = 800;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setDisplayed(Math.min(Math.round((value / steps) * step), value));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  const zero = ZEROS.has(displayed);
  const color = tone === 'fear' ? 'text-red-400' : 'text-green-400';
  return (
    <div className={`text-center ${zero ? 'opacity-40' : ''}`}>
      <div className={`text-base font-bold font-mono leading-tight ${zero ? 'text-gray-600' : color} ${pulsing ? 'animate-count-pulse' : ''}`}>
        {typeof displayed === 'number' ? displayed.toLocaleString() : displayed}
      </div>
      <div className="text-[9px] text-gray-500 uppercase leading-tight">{label}</div>
    </div>
  );
}

export default function ImpactPanel({ metrics, outcomeList, outcomeTone, isSummary }: ImpactPanelProps) {
  const fearActive = metrics.devicesReconfigured > 0 || metrics.routesPoisoned > 0 || !ZEROS.has(metrics.estDamage) || metrics.telemetryBlind !== '0m';
  const defenseActive = !ZEROS.has(metrics.detectToDecide) || metrics.writesGated > 0 || metrics.writesRejected > 0 || metrics.evidenceItems > 0 || metrics.buAgentsOnboarded > 0;
  const tone = outcomeTone ?? (defenseActive ? 'defense' : 'fear');
  const border = isSummary ? (tone === 'fear' ? 'border-red-500/40 glow-red' : 'border-green-500/40 glow-green') : 'border-gray-800';

  return (
    <div className={`rounded-lg border bg-gray-900/50 ${border}`}>
      <div className="px-3 py-2 border-b border-gray-800">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">
          {isSummary ? (tone === 'fear' ? 'Blast Radius' : 'Outcome') : 'Impact'}
        </h2>
      </div>

      <div className="p-3 space-y-3">
        {(fearActive || !defenseActive) && (
          <div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-red-500/70 mb-1.5">Without the plane</div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <Stat value={metrics.devicesReconfigured} label="Devices Hit" tone="fear" />
              <Stat value={metrics.routesPoisoned} label="Routes Poisoned" tone="fear" />
              <Stat value={metrics.telemetryBlind} label="Telemetry" tone="fear" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Stat value={metrics.topologyExfiltrated} label="Topology" tone="fear" />
              <Stat value={metrics.dwellTime} label="Dwell" tone="fear" />
              <Stat value={metrics.estDamage} label="Est. Exposure" tone="fear" />
            </div>
          </div>
        )}

        {defenseActive && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-[9px] font-bold uppercase tracking-wider text-green-500/70 mb-1.5">With the plane</div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <Stat value={metrics.detectToDecide} label="Detect→Decide" tone="defense" />
              <Stat value={metrics.writesGated} label="Writes Gated" tone="defense" />
              <Stat value={metrics.writesRejected} label="Writes Rejected" tone="defense" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Stat value={metrics.evidenceItems} label="Evidence Held" tone="defense" />
              <Stat value={metrics.buAgentsOnboarded} label="BU Agents" tone="defense" />
              <Stat value={metrics.approvalCycle} label="Approval" tone="defense" />
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {outcomeList && outcomeList.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="px-3 pb-3 space-y-1 border-t border-gray-800 pt-2"
          >
            {outcomeList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                className={`text-[11px] font-mono flex items-start gap-1.5 ${tone === 'fear' ? 'text-red-400' : 'text-green-400'}`}
              >
                <span className="flex-shrink-0 mt-0.5">{tone === 'fear' ? '•' : '✓'}</span>
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
