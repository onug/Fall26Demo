#!/usr/bin/env node
// Data-integrity QA for the demo script. Replays every step the way DemoStage does
// and checks that ids, references, audio files, and metrics are consistent.
//
//   node scripts/qa.mjs        (exit code 1 on any failure)

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const require = createRequire(import.meta.url);
const ts = require('typescript');

function loadTsModule(file, registry) {
  const src = readFileSync(file, 'utf8');
  const { outputText } = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: file,
  });
  const module = { exports: {} };
  const localRequire = (spec) => {
    if (spec.startsWith('.')) {
      const target = resolve(dirname(file), spec) + '.ts';
      if (!registry.has(target)) registry.set(target, loadTsModule(target, registry));
      return registry.get(target);
    }
    return require(spec);
  };
  vm.runInNewContext(outputText, { module, exports: module.exports, require: localRequire, console }, { filename: file });
  return module.exports;
}

const reg = new Map();
const { STEPS, BEAT_LABELS } = loadTsModule(resolve(root, 'lib/steps.ts'), reg);
const { BASE_NODES, BASE_EDGES, CONTROLS, INITIAL_METRICS, CONTROL_BADGE_POSITIONS } = loadTsModule(resolve(root, 'lib/data.ts'), reg);

const failures = [];
const warnings = [];
const fail = (m) => failures.push(m);
const warn = (m) => warnings.push(m);

// ─── Static structure ──────────────────────────────────
const ids = new Set();
for (const s of STEPS) {
  if (ids.has(s.id)) fail(`duplicate step id ${s.id}`);
  ids.add(s.id);
  if (!/^[a-z0-9-]+$/.test(s.id)) fail(`step id ${s.id} is not a safe filename`);
  if (!s.narration) fail(`step ${s.id} has no narration`);
  if (!s.title) fail(`step ${s.id} has no title`);
  if (s.beat < 0 || s.beat > 7) fail(`step ${s.id} beat ${s.beat} out of range`);
  if (s.phase === 'gate' && !s.gateProposal) fail(`step ${s.id} is phase gate but has no gateProposal`);
  if (s.gateProposal && s.phase !== 'gate') warn(`step ${s.id} has a gateProposal but phase ${s.phase} (panel will not show)`);
  if ((s.phase === 'violation' || s.phase === 'blocked') && !s.subtitle) warn(`step ${s.id} ${s.phase} overlay has no subtitle`);
  if (s.outcomeList && s.phase !== 'summary') warn(`step ${s.id} has outcomeList but phase ${s.phase}`);
  if (s.outcomeList && !s.outcomeTone) fail(`step ${s.id} has outcomeList but no outcomeTone`);
}

// Beats must be monotonic non-decreasing and every beat 1–7 present
let lastBeat = 0;
for (const s of STEPS) {
  if (s.beat < lastBeat && s.beat !== 0) fail(`step ${s.id} beat ${s.beat} goes backwards from ${lastBeat}`);
  if (s.beat !== 0) lastBeat = s.beat;
}
for (let b = 1; b <= 7; b++) {
  if (!STEPS.some(s => s.beat === b)) fail(`beat ${b} has no steps`);
  if (!BEAT_LABELS[b]) fail(`beat ${b} has no label`);
}

// Controls and metrics keys
const controlKeys = new Set(CONTROLS.map(c => c.key));
const metricKeys = new Set(Object.keys(INITIAL_METRICS));
for (const s of STEPS) {
  for (const c of s.controlChanges ?? []) if (!controlKeys.has(c.control)) fail(`step ${s.id} toggles unknown control ${c.control}`);
  for (const k of Object.keys(s.metricsUpdate ?? {})) if (!metricKeys.has(k)) fail(`step ${s.id} updates unknown metric ${k}`);
}
for (const b of CONTROL_BADGE_POSITIONS) if (!controlKeys.has(b.key)) fail(`badge for unknown control ${b.key}`);
for (const c of CONTROLS) if (!CONTROL_BADGE_POSITIONS.some(b => b.key === c.key)) warn(`control ${c.key} has no topology badge`);

// ─── Replay ────────────────────────────────────────────
let nodes = BASE_NODES.map(n => ({ ...n }));
let edges = BASE_EDGES.map(e => ({ ...e }));
const nodeIds = () => new Set(nodes.map(n => n.id));
const edgeIds = () => new Set(edges.map(e => e.id));
const compromised = new Map();
const quarantined = new Set();
let autonomy = 0;

for (const s of STEPS) {
  if (s.resetState) {
    nodes = BASE_NODES.map(n => ({ ...n }));
    edges = BASE_EDGES.map(e => ({ ...e }));
    compromised.clear(); quarantined.clear(); autonomy = 0;
  }
  for (const tc of s.topologyChanges) {
    switch (tc.action) {
      case 'updateNode':
      case 'addNode': {
        if (!nodeIds().has(tc.nodeId)) fail(`step ${s.id}: ${tc.action} on unknown node ${tc.nodeId}`);
        else Object.assign(nodes.find(n => n.id === tc.nodeId), tc.props ?? {});
        break;
      }
      case 'removeNode': {
        if (!nodeIds().has(tc.nodeId)) fail(`step ${s.id}: removeNode on unknown node ${tc.nodeId}`);
        nodes = nodes.filter(n => n.id !== tc.nodeId);
        break;
      }
      case 'addEdge': {
        const p = tc.props;
        if (!p || !tc.edgeId) { fail(`step ${s.id}: addEdge without props/edgeId`); break; }
        if (p.id !== tc.edgeId) fail(`step ${s.id}: addEdge edgeId ${tc.edgeId} != props.id ${p.id}`);
        if (!nodeIds().has(p.from)) fail(`step ${s.id}: edge ${p.id} from unknown node ${p.from}`);
        if (!nodeIds().has(p.to)) fail(`step ${s.id}: edge ${p.id} to unknown node ${p.to}`);
        const fromN = nodes.find(n => n.id === p.from), toN = nodes.find(n => n.id === p.to);
        if (p.visible && fromN && !fromN.visible) warn(`step ${s.id}: edge ${p.id} visible but source ${p.from} hidden (edge will not render)`);
        if (p.visible && toN && !toN.visible) warn(`step ${s.id}: edge ${p.id} visible but target ${p.to} hidden (edge will not render)`);
        const ex = edges.find(e => e.id === tc.edgeId);
        if (ex) Object.assign(ex, p); else edges.push({ ...p });
        break;
      }
      case 'updateEdge': {
        if (!edgeIds().has(tc.edgeId)) fail(`step ${s.id}: updateEdge on unknown edge ${tc.edgeId}`);
        else Object.assign(edges.find(e => e.id === tc.edgeId), tc.props ?? {});
        break;
      }
      case 'removeEdge': {
        if (!edgeIds().has(tc.edgeId)) fail(`step ${s.id}: removeEdge on unknown edge ${tc.edgeId}`);
        edges = edges.filter(e => e.id !== tc.edgeId);
        break;
      }
      default:
        fail(`step ${s.id}: unknown topology action ${tc.action}`);
    }
  }
  for (const q of s.quarantineNodes ?? []) {
    if (!nodeIds().has(q)) fail(`step ${s.id}: quarantine unknown node ${q}`);
    quarantined.add(q);
  }
  for (const c of s.compromiseNodes ?? []) {
    if (!nodeIds().has(c.nodeId)) fail(`step ${s.id}: compromise unknown node ${c.nodeId}`);
    const n = nodes.find(x => x.id === c.nodeId);
    if (n && !n.visible) warn(`step ${s.id}: compromise label on hidden node ${c.nodeId}`);
    compromised.set(c.nodeId, c.label);
  }
  if (s.autonomyLevel !== undefined) {
    if (s.autonomyLevel < autonomy - 1 && !s.resetState) warn(`step ${s.id}: autonomy drops ${autonomy} → ${s.autonomyLevel}`);
    autonomy = s.autonomyLevel;
  }
  // Every visible edge must connect two visible nodes at this point
  for (const e of edges.filter(e => e.visible)) {
    const a = nodes.find(n => n.id === e.from), b = nodes.find(n => n.id === e.to);
    if (!a || !b) fail(`step ${s.id}: visible edge ${e.id} references missing node`);
    else if (!a.visible || !b.visible) warn(`step ${s.id}: visible edge ${e.id} has hidden endpoint (${!a.visible ? e.from : e.to})`);
  }
}

// ─── Audio ─────────────────────────────────────────────
const audioDir = resolve(root, 'public/narration');
for (const s of STEPS) {
  const f = resolve(audioDir, `${s.id}.mp3`);
  if (!existsSync(f)) fail(`missing audio ${s.id}.mp3`);
  else if (statSync(f).size < 20_000) fail(`audio ${s.id}.mp3 is suspiciously small (${statSync(f).size} bytes)`);
}
for (const f of readdirSync(audioDir).filter(f => f.endsWith('.mp3'))) {
  if (!ids.has(f.replace(/\.mp3$/, ''))) warn(`orphan audio file ${f} (no step with that id)`);
}

// ─── Script export in sync ─────────────────────────────
const scriptJson = resolve(root, 'narration/script.json');
if (existsSync(scriptJson)) {
  const sj = JSON.parse(readFileSync(scriptJson, 'utf8'));
  const byId = new Map(sj.segments.map(x => [x.id, x.text]));
  for (const s of STEPS) {
    if (!byId.has(s.id)) fail(`script.json missing ${s.id} (run npm run narration:export)`);
    else if (byId.get(s.id) !== s.narration) fail(`script.json text for ${s.id} is stale (run npm run narration:export, then regenerate audio)`);
  }
} else {
  warn('narration/script.json not found');
}

// ─── Report ────────────────────────────────────────────
console.log(`QA: ${STEPS.length} steps · ${BASE_NODES.length} nodes · ${BASE_EDGES.length} base edges · ${CONTROLS.length} controls`);
for (const w of warnings) console.log(`  warn  ${w}`);
for (const f of failures) console.log(`  FAIL  ${f}`);
console.log(`${failures.length} failure(s), ${warnings.length} warning(s)`);
process.exit(failures.length ? 1 : 0);
