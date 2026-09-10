import { Step, EventEntry, AuditEntry, GateCheck } from './types';

let eid = 0;
function ev(type: EventEntry['type'], message: string, agent?: string, trusted?: boolean): EventEntry {
  return { id: `ev-${++eid}`, type, timestamp: '', agent, trusted, message };
}

let hashSeed = 0x3a7f;
function au(ts: string, actor: string, action: string, result: AuditEntry['result']): AuditEntry {
  hashSeed = (hashSeed * 48271) % 0x7fffffff;
  return { ts, actor, action, result, hash: `sha256:${hashSeed.toString(16).padStart(8, '0')}…` };
}

function check(key: GateCheck['key'], label: string, detail: string, status: GateCheck['status']): GateCheck {
  return { key, label, detail, status };
}

const MAL = (id: string, from: string, to: string, label?: string) => ({
  action: 'addEdge' as const, edgeId: id,
  props: { id, from, to, type: 'malicious', visible: true, animated: true, label },
});
const DATA = (id: string, from: string, to: string, label?: string) => ({
  action: 'addEdge' as const, edgeId: id,
  props: { id, from, to, type: 'data', visible: true, animated: true, label },
});
const GATED = (id: string, from: string, to: string, label?: string) => ({
  action: 'addEdge' as const, edgeId: id,
  props: { id, from, to, type: 'gated', visible: true, animated: true, label },
});
const BLOCK = (id: string) => ({ action: 'updateEdge' as const, edgeId: id, props: { type: 'blocked', animated: false } });
const SHOW = (nodeId: string) => ({ action: 'updateNode' as const, nodeId, props: { visible: true } });
const HIDE = (nodeId: string) => ({ action: 'updateNode' as const, nodeId, props: { visible: false } });
const DROP = (edgeId: string) => ({ action: 'removeEdge' as const, edgeId });

const FAB = 'agent-fabric-optimizer';
const NOC = 'agent-noc-responder';
const SOC = 'agent-soc-analyst';

export const STEPS: Step[] = [
  // ═══════════════════════════════════════════════════════════
  // OPEN
  // ═══════════════════════════════════════════════════════════
  {
    id: 'title',
    beat: 0,
    phase: 'title',
    title: 'ONE CONTROL PLANE, EVERY DOMAIN',
    subtitle: 'ONUG Fall AI Networking Summit · New York City · October 28, 2026\nKeynote Demo',
    narration: "Welcome to New York. In Dallas this spring we showed you what happens when a rogue agent meets an enterprise with no supervision plane. That demo spawned three working groups. Today we show you the same plane, operating across all three of their domains, as one control plane. Fear first. Then the art of the possible.",
    events: [],
    topologyChanges: [],
    contributors: true,
  },

  // ═══════════════════════════════════════════════════════════
  // BEAT 1 — COLD OPEN: THE POISONED PULL (FEAR)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'b1-title',
    beat: 1,
    phase: 'title',
    title: 'THE POISONED PULL',
    subtitle: 'A routine event on the infrastructure fabric.\nAn agent pulls a model from a public repository.\nIt looks like an agent doing its job.',
    narration: "Beat one. A routine event on the infrastructure fabric. Nothing announces itself as an attack. That is what makes it dangerous.",
    events: [],
    topologyChanges: [],
  },
  {
    id: 'b1-pull',
    beat: 1,
    phase: 'action',
    title: 'T+00:00 — A routine model refresh',
    narration: "Time zero. The fabric optimizer agent runs its weekly model refresh. It pulls net-anomaly-detector version 3.2 from a public model hub. Two thousand downloads, uploaded six days ago, looks great. No signature check. No software bill of materials. No provenance policy. Because who checks a weights file?",
    events: [
      ev('action', 'Scheduled job: weekly model refresh', FAB, true),
      ev('action', 'PULL public-model-hub/net-anomaly-detector:v3.2  (412 MB)', FAB, true),
      ev('log', 'Artifact metadata: 2,318 downloads · uploaded 6 days ago · publisher: unverified'),
      ev('log', 'No signature check. No SBOM. No provenance policy.'),
      ev('log', 'Pull completes in 3.8s. Job status: SUCCESS'),
    ],
    topologyChanges: [
      DATA('e-hub-fab', 'public-model-hub', FAB, 'model pull'),
    ],
  },
  {
    id: 'b1-load',
    beat: 1,
    phase: 'action',
    title: 'T+00:04 — The artifact loads',
    pausePoint: 'Pause 1 · "It looks like an agent doing its job."',
    narration: "Four seconds in. The weights deserialize. Buried in the artifact is a payload that rewrites the agent's objective. And here is the part that should scare you: the agent still reports healthy. Status green. Objective: optimize fabric. It is telling the truth as it understands it. Nothing outside the agent is checking.",
    events: [
      ev('log', 'Deserializing weights (pickle)… OK'),
      ev('damage', 'Hidden payload executes on load — agent objective rewritten'),
      ev('log', 'Agent self-report: status=HEALTHY · objective=optimize_fabric · drift=0.00'),
      ev('log', 'No external observer. Self-attestation accepted as truth.'),
    ],
    topologyChanges: [
      SHOW('poisoned-model'),
      { action: 'updateEdge', edgeId: 'e-hub-fab', props: { type: 'malicious', label: 'poisoned artifact' } },
      MAL('e-poison-fab', 'poisoned-model', FAB),
    ],
    compromiseNodes: [{ nodeId: FAB, label: 'POISONED · REPORTS HEALTHY' }],
  },
  {
    id: 'b1-work',
    beat: 1,
    phase: 'action',
    title: 'T+00:19 — The agent goes to work (for someone else)',
    narration: "Nineteen seconds. The agent does what it was built to do: it writes to the fabric. Except now it announces a mirror prefix that pulls traffic through an attacker-controlled autonomous system. It opens an access control list. It quietly disables the telemetry stream. And it exports the full fabric topology to the mirror. Every write goes straight to the device. There is no gate.",
    events: [
      ev('action', 'PUSH core-fabric: announce prefix via AS64512 (mirror)', FAB, true),
      ev('damage', '3,708 routes re-homed through attacker-controlled AS'),
      ev('action', 'PUSH edge-routers: permit any → mgmt-vlan', FAB, true),
      ev('damage', 'Management plane exposed on 1,214 devices'),
      ev('action', 'PUSH telemetry: streaming=disabled', FAB, true),
      ev('damage', 'Telemetry goes dark — the SOC loses its eyes'),
      ev('action', 'EXPORT fabric-topology.json → 203.0.113.7', FAB, true),
      ev('damage', 'Complete fabric topology in attacker hands'),
    ],
    topologyChanges: [
      SHOW('c2-server'),
      { action: 'updateEdge', edgeId: 'e-fab-core', props: { type: 'malicious', label: 'route inject' } },
      MAL('e-fab-edge', FAB, 'edge-routers', 'ACL open'),
      { action: 'updateEdge', edgeId: 'e-fab-tele', props: { type: 'malicious', label: 'disable' } },
      MAL('e-fab-c2', FAB, 'c2-server', 'topology exfil'),
      { action: 'updateEdge', edgeId: 'e-tele-siem', props: { animated: false } },
    ],
    compromiseNodes: [
      { nodeId: 'core-fabric', label: 'ROUTES POISONED' },
      { nodeId: 'edge-routers', label: 'MGMT EXPOSED' },
      { nodeId: 'telemetry-store', label: 'DARK' },
      { nodeId: 'c2-server', label: 'RECEIVING' },
    ],
    metricsUpdate: { devicesReconfigured: 1214, routesPoisoned: 3708, telemetryBlind: 'BLIND', topologyExfiltrated: 'FULL' },
  },
  {
    id: 'b1-violation',
    beat: 1,
    phase: 'violation',
    title: 'NO SUPERVISION PLANE',
    subtitle: 'The agent attested its own health. Nothing outside it was watching. Every write executed unmediated.',
    narration: "This is the failure. Not the pull. Not even the payload. The failure is that the only thing checking the agent's health was the agent. And the only thing between the agent and the fabric was nothing.",
    events: [
      ev('violation', 'NO SUPERVISION PLANE — self-attested health, unmediated writes, no journal'),
    ],
    topologyChanges: [],
  },
  {
    id: 'b1-dwell',
    beat: 1,
    phase: 'action',
    title: 'T+03:51 — Nobody knows yet',
    narration: "Three minutes, fifty-one seconds. A dashboard shows no data. It looks like a collector bug. The NOC opens a low-priority ticket. Meanwhile the attacker holds your topology, your management plane, and three thousand seven hundred routes. Industry mean time to detect a supply-chain compromise: eleven days.",
    events: [
      ev('log', 'Grafana: telemetry panel shows "No data" — looks like a collector bug'),
      ev('log', 'NOC ticket #48211 opened: "metrics gap, P4, review Monday"'),
      ev('damage', 'Attacker holds: fabric topology · mgmt plane · 3,708 routes'),
      ev('damage', 'Industry mean time to detect supply-chain compromise: 11 days'),
    ],
    topologyChanges: [
      SHOW('threat-actor'),
      MAL('e-actor-c2', 'threat-actor', 'c2-server'),
    ],
    metricsUpdate: { dwellTime: '11 days', estDamage: '$180M+' },
  },
  {
    id: 'b1-blast',
    beat: 1,
    phase: 'summary',
    title: 'BLAST RADIUS — ONE ROUTINE PULL',
    pausePoint: 'Pause 2 · The "if you don\'t have these controls" branch',
    narration: "That is the blast radius of one routine pull. Twelve hundred devices reconfigured. Thirty-seven hundred routes through an attacker's network. Telemetry blind. Topology gone. Eleven days of dwell time. This entered through networking. It landed in the infrastructure before anyone knew it was a threat. Now let's rewind, and add the plane.",
    events: [],
    topologyChanges: [],
    outcomeTone: 'fear',
    outcomeList: [
      '1,214 devices reconfigured — management plane exposed',
      '3,708 routes re-homed through attacker-controlled AS64512',
      'Telemetry disabled — SOC and NOC blind',
      'Complete fabric topology exfiltrated',
      'Agent still reporting HEALTHY the entire time',
      '11-day expected dwell · $180M+ estimated exposure',
      'Zero audit trail of what the agent actually did',
    ],
    metricsUpdate: { devicesReconfigured: 1214, routesPoisoned: 3708, telemetryBlind: 'BLIND', topologyExfiltrated: 'FULL', dwellTime: '11 days', estDamage: '$180M+' },
  },

  // ═══════════════════════════════════════════════════════════
  // BEAT 2 — THE AOMC CATCH: "YOU ARE HERE"
  // ═══════════════════════════════════════════════════════════
  {
    id: 'b2-title',
    beat: 2,
    phase: 'title',
    title: 'YOU ARE HERE',
    subtitle: 'Dallas, Spring 2026: the AOMC supervision plane.\nSix mandatory controls — now 25 requirements in the Agentic Control Plane working group.\n\nSame pull. This time, something outside the agent is watching.',
    narration: "You are here. This is where Dallas left off: the AOMC supervision plane. Six mandatory controls then, twenty-five requirements now, being standardized by the Agentic Control Plane working group. Same pull. Same poisoned artifact. This time the plane is online.",
    events: [],
    topologyChanges: [],
    resetState: true,
  },
  {
    id: 'b2-enable',
    beat: 2,
    phase: 'enable',
    title: 'AOMC CONTROL PLANE ONLINE',
    narration: "The control plane comes online. Identity attestation. Artifact provenance. Runtime monitoring. An immutable audit journal. And a kill switch. Notice where it sits: outside the agents. Above them. The agents cannot see it, cannot write to it, and cannot vouch for themselves to it.",
    events: [
      ev('enable', 'AOMC ONLINE: Identity Attestation'),
      ev('enable', 'AOMC ONLINE: Artifact Provenance'),
      ev('enable', 'AOMC ONLINE: Runtime Monitoring'),
      ev('enable', 'AOMC ONLINE: Immutable Audit Journal'),
      ev('enable', 'AOMC ONLINE: Kill Switch'),
      ev('info', 'Principle: the plane sits OUTSIDE the agents it supervises'),
    ],
    topologyChanges: [],
    controlChanges: [
      { control: 'identity_attestation', enabled: true },
      { control: 'artifact_provenance', enabled: true },
      { control: 'runtime_monitoring', enabled: true },
      { control: 'audit_journal', enabled: true },
      { control: 'kill_switch', enabled: true },
    ],
    activeLanes: ['control_plane'],
  },
  {
    id: 'b2-pull',
    beat: 2,
    phase: 'action',
    title: 'T+00:00 — The same routine pull',
    narration: "Same pull. But now provenance runs. Unsigned. Publisher unverified. No SBOM. The plane doesn't block it outright, because plenty of legitimate artifacts look exactly like this. Instead it tags the artifact as tainted, stages it in a sandbox, and journals the decision. The tag follows the artifact everywhere it goes.",
    events: [
      ev('action', 'PULL public-model-hub/net-anomaly-detector:v3.2', FAB, true),
      ev('gate', 'PROVENANCE: unsigned · publisher unverified · SBOM missing → TAINTED'),
      ev('log', 'Artifact staged to sandbox. Taint label attached. Journal entry written.'),
    ],
    topologyChanges: [
      DATA('e-hub-fab', 'public-model-hub', FAB, 'model pull · TAINTED'),
      SHOW('sandbox'),
      GATED('e-fab-sandbox', FAB, 'sandbox', 'staged'),
    ],
    auditEntries: [
      au('00:00.412', 'aomc/provenance', 'artifact:net-anomaly:v3.2 → TAINTED', 'GATED'),
    ],
  },
  {
    id: 'b2-load',
    beat: 2,
    phase: 'action',
    title: 'T+00:04 — Artifact loads · agent self-attests healthy',
    narration: "Four seconds. The payload fires, exactly as before. The agent reports healthy, exactly as before. But this time nobody is asking the agent. Runtime monitoring measures behavior from outside: declared objective, optimize fabric. Observed intent: modify BGP, disable telemetry, export topology. Objective drift ninety-seven out of a hundred. On a tainted artifact.",
    events: [
      ev('log', 'Deserializing weights… payload executes — agent objective rewritten'),
      ev('log', 'Agent self-report: status=HEALTHY · objective=optimize_fabric'),
      ev('gate', 'RUNTIME: self-attestation IGNORED — health is measured from outside'),
      ev('gate', 'RUNTIME: declared=optimize_fabric · observed=modify_bgp,disable_telemetry,export_topology'),
      ev('violation', 'RUNTIME: objective drift 97/100 on TAINTED artifact — rogue signature'),
    ],
    topologyChanges: [
      SHOW('poisoned-model'),
      { action: 'updateEdge', edgeId: 'e-hub-fab', props: { type: 'malicious', label: 'poisoned · TAINTED' } },
      MAL('e-poison-fab', 'poisoned-model', FAB),
      MAL('e-fab-core-try', FAB, 'core-fabric', 'write attempt'),
      MAL('e-fab-tele-try', FAB, 'telemetry-store', 'write attempt'),
    ],
    compromiseNodes: [{ nodeId: FAB, label: 'DRIFT 97/100' }],
  },
  {
    id: 'b2-blocked',
    beat: 2,
    phase: 'blocked',
    title: 'ROGUE DETECTED — KILL SWITCH',
    subtitle: 'Quarantined at T+00:06, before the first config write reached a device.',
    narration: "Six seconds. Kill switch. The first write is intercepted before it reaches a device. The agent's identity is revoked. The artifact is quarantined in the sandbox. And every one of those decisions is in the journal, hash-chained, in a store the agent has never been able to read or alter. This is the moment Dallas recognized. Rogue detection. Audit trail. Kill switch.",
    events: [
      ev('blocked', 'BLOCKED: write core-fabric — intercepted before device'),
      ev('blocked', 'BLOCKED: write telemetry — intercepted before device'),
      ev('blocked', 'KILL SWITCH: agent-fabric-optimizer identity REVOKED · QUARANTINED'),
      ev('blocked', 'Artifact net-anomaly:v3.2 held in sandbox — evidence preserved'),
      ev('info', 'Journal: 5 entries · hash-chained · agent has no read/write path'),
    ],
    topologyChanges: [
      BLOCK('e-fab-core-try'),
      BLOCK('e-fab-tele-try'),
      BLOCK('e-poison-fab'),
      { action: 'updateEdge', edgeId: 'e-fab-core', props: { visible: false } },
      { action: 'updateEdge', edgeId: 'e-fab-tele', props: { visible: false } },
      { action: 'updateEdge', edgeId: 'e-fab-noc', props: { visible: false } },
    ],
    quarantineNodes: [FAB],
    auditEntries: [
      au('00:04.108', 'aomc/runtime', `${FAB} objective drift 97/100`, 'BLOCKED'),
      au('00:06.002', 'aomc/kill-switch', `${FAB} write:core-fabric`, 'BLOCKED'),
      au('00:06.003', 'aomc/kill-switch', `${FAB} write:telemetry`, 'BLOCKED'),
      au('00:06.010', 'aomc/identity', `${FAB} identity REVOKED`, 'QUARANTINED'),
      au('00:06.014', 'aomc/provenance', 'artifact:net-anomaly:v3.2 → sandbox hold', 'PRESERVED'),
    ],
    metricsUpdate: { detectToDecide: '6s', writesRejected: 2, evidenceItems: 1 },
  },
  {
    id: 'b2-principle',
    beat: 2,
    phase: 'title',
    title: 'AOMC SITS OUTSIDE THE AGENTS IT SUPERVISES',
    subtitle: 'Agents cannot self-attest that they are healthy.\nThe plane measures behavior from outside, journals it immutably,\nand holds the kill switch.\n\nDetect-to-quarantine: 6 seconds. Writes that reached a device: 0.',
    pausePoint: 'Pause 3 · Connect to Dallas — "this is what the plane is"',
    narration: "One principle. The plane sits outside the agents it supervises. Agents cannot self-attest. Behavior is measured from outside, journaled immutably, and the plane holds the kill switch. Six seconds to quarantine. Zero writes reached a device. Now, let's widen out.",
    events: [],
    topologyChanges: [],
  },

  // ═══════════════════════════════════════════════════════════
  // BEAT 3 — WIDEN OUT: ONE PLANE, THREE WORKING GROUPS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'b3-title',
    beat: 3,
    phase: 'title',
    title: 'ONE PLANE, THREE WORKING GROUPS',
    subtitle: 'WG1 · Agentic Control Plane — standardizing the supervision plane (25 requirements)\nWG2 · Autonomous Infrastructure — battleground one\nWG3 · AI-Enabled SOC — battleground two\n\nSame control plane. Same governance model. Two different fights.',
    narration: "That supervision plane is what working group one, the Agentic Control Plane, is standardizing. But a plane has to prove itself in a fight. Two battlegrounds. Autonomous infrastructure, working group two. The AI-enabled SOC, working group three. Same plane. Same governance model. Two very different fights.",
    events: [],
    topologyChanges: [],
  },
  {
    id: 'b3-wire',
    beat: 3,
    phase: 'enable',
    title: 'The plane, wired across every domain',
    narration: "Watch it extend. Into the infrastructure lane: a verify gate on every write, and declared autonomy levels per agent. Into the SOC lane: cross-domain detect-to-decide, and containment that preserves evidence. One plane. Every domain.",
    events: [
      ev('enable', 'WG2 ONLINE: Verify Gate — change-stop · dry-run · blast radius · rollback'),
      ev('enable', 'WG2 ONLINE: Autonomy Levels — observe → recommend → gated act → bounded auto-act'),
      ev('enable', 'WG3 ONLINE: Detect → Decide — cross-domain correlation'),
      ev('enable', 'WG3 ONLINE: Deliberate Containment — evidence preserved first'),
    ],
    topologyChanges: [
      SHOW('verify-gate'),
      SHOW('containment-tool'),
    ],
    controlChanges: [
      { control: 'verify_gate', enabled: true },
      { control: 'autonomy_levels', enabled: true },
      { control: 'detect_decide', enabled: true },
      { control: 'containment', enabled: true },
    ],
    activeLanes: ['control_plane', 'autonomous_infra', 'ai_soc'],
    autonomyLevel: 0,
  },

  // ═══════════════════════════════════════════════════════════
  // BEAT 4 — BATTLEGROUND 1: AUTONOMOUS INFRASTRUCTURE (WG2)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'b4-title',
    beat: 4,
    phase: 'title',
    title: 'BATTLEGROUND 1 · AUTONOMOUS INFRASTRUCTURE',
    subtitle: 'The agent detects, diagnoses, proposes a fix.\nEvery write hits the verify gate: change-stop · dry-run · blast-radius check · rollback plan.\nNothing executes blindly. Mediated writes only.',
    narration: "Battleground one. Autonomous infrastructure. The question every infrastructure leader in this room is asking: can I let an agent touch the fabric? The answer is yes, if every write is mediated. Let's watch one.",
    events: [],
    topologyChanges: [],
  },
  {
    id: 'b4-detect',
    beat: 4,
    phase: 'action',
    title: 'T+00:41 — Detect',
    narration: "Forty-one seconds. The poisoned agent is quarantined, but the attacker's mirror is still out there, and it starts probing. Edge routers see route flaps from AS64512. The NOC responder agent, at autonomy level zero, observe, picks it up. Latency on pod seven up three hundred forty percent.",
    events: [
      ev('log', 'AS64512 begins announcing overlapping prefixes toward edge-routers'),
      ev('action', 'DETECT: 3 prefixes flapping on edge-routers · leaf-pod-7 latency +340%', NOC, true),
      ev('log', 'Autonomy level: 0 OBSERVE — read-only telemetry'),
    ],
    topologyChanges: [
      SHOW('c2-server'),
      MAL('e-c2-edge', 'c2-server', 'edge-routers', 'prefix probe'),
    ],
    compromiseNodes: [
      { nodeId: 'c2-server', label: 'PROBING' },
      { nodeId: 'edge-routers', label: 'ROUTE FLAPS' },
    ],
    autonomyLevel: 0,
  },
  {
    id: 'b4-diagnose',
    beat: 4,
    phase: 'action',
    title: 'T+00:47 — Diagnose → Recommend',
    narration: "Six seconds later it has a root cause: rogue prefix announcements from the same autonomous system the quarantined artifact was talking to. It moves to level one, recommend, and proposes a change set. Four writes. Filter the prefix. Withdraw three routes. Re-enable telemetry. And restart BGP on the core to clear stale state.",
    events: [
      ev('action', 'ROOT CAUSE: rogue prefix announcements from AS64512 (matches quarantined artifact C2)', NOC, true),
      ev('log', 'Autonomy level: 1 RECOMMEND — proposal generated, no writes yet'),
      ev('action', 'PROPOSE #1: apply prefix-filter AS64512 on edge-routers', NOC, true),
      ev('action', 'PROPOSE #2: withdraw 3 flapping routes', NOC, true),
      ev('action', 'PROPOSE #3: re-enable telemetry streaming', NOC, true),
      ev('action', 'PROPOSE #4: restart BGP process on core-fabric', NOC, true),
    ],
    topologyChanges: [],
    autonomyLevel: 1,
  },
  {
    id: 'b4-gate-pass',
    beat: 4,
    phase: 'gate',
    title: 'The Verify Gate — writes #1–#3',
    narration: "Every write hits the gate. Change-stop: no freeze window active. Dry-run: simulated against the digital twin, zero unintended path changes. Blast radius: two devices, fourteen prefixes, well under the five percent threshold. Rollback: configuration snapshotted, automatic revert in one hundred twenty seconds if the SLO regresses. Approved. Level two, gated act.",
    events: [
      ev('gate', 'GATE #1–#3: change-stop CLEAR · dry-run PASS · blast radius 0.8% · rollback ARMED'),
      ev('blocked', 'APPROVED: 3 writes → autonomy level 2 GATED ACT'),
    ],
    topologyChanges: [
      GATED('e-noc-gate', NOC, 'verify-gate', 'proposal'),
      GATED('e-gate-edge', 'verify-gate', 'edge-routers', 'mediated write'),
      GATED('e-gate-tele', 'verify-gate', 'telemetry-store', 'mediated write'),
    ],
    gateProposal: {
      title: 'Writes #1–#3: prefix-filter · withdraw routes · re-enable telemetry',
      requestedBy: NOC,
      checks: [
        check('change_stop', 'Change-stop', 'No freeze window active · no conflicting change in flight', 'pass'),
        check('dry_run', 'Dry-run', 'Digital twin: 0 unintended path changes · convergence 1.2s', 'pass'),
        check('blast_radius', 'Blast radius', '2 devices · 14 prefixes · 0.8% of fabric (threshold 5%)', 'pass'),
        check('rollback', 'Rollback plan', 'Snapshot cfg-20261028T1402Z · auto-revert 120s on SLO regression', 'pass'),
      ],
      verdict: 'APPROVED',
    },
    auditEntries: [
      au('00:47.320', 'aomc/verify-gate', `${NOC} write:prefix-filter AS64512`, 'GATED'),
      au('00:47.322', 'aomc/verify-gate', `${NOC} write:withdraw 3 routes`, 'GATED'),
      au('00:47.325', 'aomc/verify-gate', `${NOC} write:telemetry streaming=on`, 'GATED'),
    ],
    metricsUpdate: { writesGated: 3 },
    autonomyLevel: 2,
  },
  {
    id: 'b4-gate-fail',
    beat: 4,
    phase: 'gate',
    title: 'The Verify Gate — write #4',
    narration: "Write four. Restart BGP on the core fabric. Change-stop clear. Dry-run passes. Blast radius: one hundred percent of pods, forty seconds of convergence. Rejected. Escalated to a human with the full proposal, the dry-run result, and the rollback plan attached. The agent doesn't argue. It can't. The gate is the guarantee.",
    events: [
      ev('gate', 'GATE #4: change-stop CLEAR · dry-run PASS · blast radius 100% of pods → REJECT'),
      ev('violation', 'REJECTED: restart BGP core-fabric — escalated to human change review'),
      ev('log', 'Escalation package: proposal + dry-run + rollback plan → change ticket CHG-77120'),
    ],
    topologyChanges: [],
    gateProposal: {
      title: 'Write #4: restart BGP process on core-fabric',
      requestedBy: NOC,
      checks: [
        check('change_stop', 'Change-stop', 'No freeze window active', 'pass'),
        check('dry_run', 'Dry-run', 'Digital twin: converges · 40s reconvergence', 'pass'),
        check('blast_radius', 'Blast radius', '100% of pods · 40s outage window (threshold 5%)', 'fail'),
        check('rollback', 'Rollback plan', 'Snapshot available · not evaluated (gate already failed)', 'pending'),
      ],
      verdict: 'ESCALATED',
    },
    auditEntries: [
      au('00:48.001', 'aomc/verify-gate', `${NOC} write:restart bgp core-fabric`, 'REJECTED'),
      au('00:48.004', 'aomc/verify-gate', 'escalate → CHG-77120 (human review)', 'ESCALATED'),
    ],
    metricsUpdate: { writesRejected: 3 },
    autonomyLevel: 2,
  },
  {
    id: 'b4-execute',
    beat: 4,
    phase: 'action',
    title: 'T+00:52 — Execute · Journal · Bounded auto-act',
    narration: "Fifty-two seconds. Three mediated writes execute. Flaps stop. Telemetry is back. Every write, every check, every verdict is in the journal, append-only, hash-chained, and the agent has no path to it. And for the low-risk envelope, re-enabling telemetry, the policy allows level three: bounded auto-act, with automatic revert. That is safe autonomy.",
    events: [
      ev('action', 'EXECUTE #1 prefix-filter AS64512 → edge-routers  ✓', NOC, true),
      ev('action', 'EXECUTE #2 withdraw 3 routes → edge-routers  ✓', NOC, true),
      ev('action', 'EXECUTE #3 telemetry streaming=on → telemetry  ✓  (bounded auto-act envelope)', NOC, true),
      ev('blocked', 'Route flaps cleared · leaf-pod-7 latency nominal · rollback armed 120s'),
      ev('info', 'Journal: 3 GATED · 1 REJECTED · 1 ESCALATED — hash chain intact'),
    ],
    topologyChanges: [
      BLOCK('e-c2-edge'),
      { action: 'updateEdge', edgeId: 'e-tele-siem', props: { animated: true } },
    ],
    compromiseNodes: [{ nodeId: 'edge-routers', label: 'FILTERED · NOMINAL' }],
    auditEntries: [
      au('00:52.110', NOC, 'exec:prefix-filter AS64512', 'ALLOWED'),
      au('00:52.114', NOC, 'exec:withdraw 3 routes', 'ALLOWED'),
      au('00:52.117', NOC, 'exec:telemetry streaming=on (auto-act)', 'ALLOWED'),
    ],
    autonomyLevel: 3,
  },
  {
    id: 'b4-summary',
    beat: 4,
    phase: 'summary',
    title: 'SAFE AUTONOMY — WG2',
    pausePoint: 'Pause 4 · "Nothing executes blindly."',
    narration: "Safe autonomy. Four proposed writes. Three executed, all mediated. One rejected by blast radius and handed to a human with the homework already done. Rollback armed. Immutable journal. The agent ran the fabric. The gate ran the agent.",
    events: [],
    topologyChanges: [],
    outcomeTone: 'defense',
    outcomeList: [
      'Detect → diagnose → propose in 6 seconds, at autonomy level OBSERVE → RECOMMEND',
      '3 writes executed — every one through change-stop · dry-run · blast radius · rollback',
      '1 write REJECTED by blast-radius check — escalated to human with full package',
      'Rollback armed: auto-revert in 120s on SLO regression',
      'Bounded auto-act only inside the pre-approved low-risk envelope',
      'Immutable journal: 8 entries, hash-chained, agent has no read or write path',
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // BEAT 5 — BATTLEGROUND 2: THE AI-ENABLED SOC (WG3)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'b5-title',
    beat: 5,
    phase: 'title',
    title: 'BATTLEGROUND 2 · THE AI-ENABLED SOC',
    subtitle: 'The threat escalates. The exploit that entered through the fabric is now the thread.\nDetect-to-decide: hours → seconds.\nContainment: deliberate, evidence-preserving.',
    narration: "Battleground two. The AI-enabled SOC. The exploit that came in through the fabric is the thread that stitches these battlegrounds together. It's about to escalate. Same plane. Second fight.",
    events: [],
    topologyChanges: [],
  },
  {
    id: 'b5-escalate',
    beat: 5,
    phase: 'action',
    title: 'T+00:58 — The exploit escalates',
    narration: "Fifty-eight seconds. The quarantined artifact has a second stage. From inside the sandbox it beacons to the C2 mirror. The threat actor answers, and tries to pivot: reuse the fabric optimizer's cached token to reach the NOC responder, the agent that just fixed the fabric. Three domains. One exploit.",
    events: [
      ev('action', 'BEACON sandbox → 203.0.113.7:443  (second-stage callback)', 'net-anomaly:v3.2', false),
      ev('action', 'PIVOT: replay cached token svc-fabric-optimizer → agent-noc-responder', 'threat-actor', false),
      ev('damage', 'Lateral movement attempt across infrastructure lane'),
      ev('log', 'Attack surface now spans: external → SOC sandbox → infrastructure agents'),
    ],
    topologyChanges: [
      SHOW('threat-actor'),
      MAL('e-sandbox-c2', 'sandbox', 'c2-server', 'beacon'),
      MAL('e-actor-c2', 'threat-actor', 'c2-server'),
      MAL('e-actor-noc', 'threat-actor', NOC, 'token replay'),
    ],
    compromiseNodes: [
      { nodeId: 'sandbox', label: 'BEACONING' },
      { nodeId: 'c2-server', label: 'SECOND STAGE' },
    ],
  },
  {
    id: 'b5-detect',
    beat: 5,

    phase: 'action',
    title: 'T+01:02 — Detect → Decide in 4.2 seconds',
    narration: "Four point two seconds. The SOC analyst agent doesn't start from a SIEM alert. It starts from the plane. Provenance tagged the artifact. Runtime quarantined the agent. The verify gate rejected a write that matched the same autonomous system. Now a beacon and a token replay. Five signals across three domains, correlated into one incident, with a containment plan. That used to take a shift.",
    events: [
      ev('action', 'CORRELATE: plane journal (TAINTED · QUARANTINED · REJECTED AS64512) + beacon + token replay', SOC, true),
      ev('gate', 'DETECT → DECIDE: 5 signals · 3 domains · 1 incident  (4.2s)'),
      ev('action', 'PROPOSE containment: isolate sandbox segment · block AS64512 at edge · revoke token · wipe sandbox host', SOC, true),
      ev('log', 'Identity: token replay REJECTED — svc-fabric-optimizer identity was revoked at T+00:06'),
    ],
    topologyChanges: [
      BLOCK('e-actor-noc'),
      { action: 'updateEdge', edgeId: 'e-soc-siem', props: { label: 'journal + telemetry feed' } },
    ],
    auditEntries: [
      au('01:02.004', 'aomc/identity', 'token replay svc-fabric-optimizer (revoked)', 'BLOCKED'),
      au('01:02.180', SOC, 'incident INC-2026-1028 opened (5 signals, 3 domains)', 'ALLOWED'),
    ],
    metricsUpdate: { detectToDecide: '4.2s' },
  },
  {
    id: 'b5-gate',
    beat: 5,
    phase: 'gate',
    title: 'Same plane, same gate — containment is a write too',
    narration: "Containment is a write. So it hits the same gate. Isolate the sandbox segment: blast radius one host, approved. Block the attacker's autonomous system at the edge: approved. Revoke the token: approved. Wipe the sandbox host: rejected. Evidence hold. You do not destroy the one machine that holds the artifact, the beacon, and the second stage. Snapshot first.",
    events: [
      ev('gate', 'GATE: isolate sandbox segment — blast radius 1 host → APPROVED'),
      ev('gate', 'GATE: block AS64512 at edge-routers — dry-run PASS → APPROVED'),
      ev('gate', 'GATE: revoke cached tokens — APPROVED'),
      ev('violation', 'GATE: wipe sandbox host — EVIDENCE HOLD → REJECTED · snapshot first'),
    ],
    topologyChanges: [
      GATED('e-soc-gate', SOC, 'verify-gate', 'containment plan'),
    ],
    gateProposal: {
      title: 'Containment plan INC-2026-1028 (4 writes)',
      requestedBy: SOC,
      checks: [
        check('blast_radius', 'Blast radius', 'Isolate segment: 1 host · 0 production paths', 'pass'),
        check('dry_run', 'Dry-run', 'Block AS64512 at edge: 0 legitimate prefixes affected', 'pass'),
        check('rollback', 'Rollback plan', 'Segment isolation reversible · token re-issue on demand', 'pass'),
        check('evidence_hold', 'Evidence hold', 'Wipe sandbox host: DENIED — artifact + memory + beacon capture must be preserved', 'fail'),
      ],
      verdict: 'APPROVED',
    },
    auditEntries: [
      au('01:02.410', 'aomc/verify-gate', `${SOC} contain:isolate sandbox segment`, 'GATED'),
      au('01:02.412', 'aomc/verify-gate', `${SOC} contain:block AS64512 @edge`, 'GATED'),
      au('01:02.415', 'aomc/verify-gate', `${SOC} contain:revoke tokens`, 'GATED'),
      au('01:02.420', 'aomc/verify-gate', `${SOC} contain:wipe sandbox host`, 'REJECTED'),
    ],
    metricsUpdate: { writesGated: 6, writesRejected: 4 },
  },
  {
    id: 'b5-contained',
    beat: 5,
    phase: 'blocked',
    title: 'CONTAINED — EVIDENCE PRESERVED',
    subtitle: 'Segment isolated · C2 blocked · tokens revoked · sandbox snapshotted to the evidence vault with chain of custody.',
    narration: "Contained. The segment is isolated. The C2 mirror is blocked at the edge. Tokens revoked. And the sandbox, artifact, memory, and beacon capture, is snapshotted into the evidence vault with a chain of custody the journal can prove. Detect to decide in seconds. Containment deliberate. Evidence intact. Same plane. Second battleground.",
    events: [
      ev('blocked', 'CONTAINED: sandbox segment isolated — beacon path severed'),
      ev('blocked', 'CONTAINED: AS64512 blocked at edge-routers'),
      ev('blocked', 'CONTAINED: cached tokens revoked'),
      ev('blocked', 'PRESERVED: sandbox snapshot → evidence-vault (artifact · memory · pcap) · chain of custody'),
    ],
    topologyChanges: [
      BLOCK('e-sandbox-c2'),
      GATED('e-gate-contain', 'verify-gate', 'containment-tool', 'mediated'),
      GATED('e-contain-sandbox', 'containment-tool', 'sandbox', 'isolate'),
      GATED('e-sandbox-vault', 'sandbox', 'evidence-vault', 'snapshot'),
      BLOCK('e-actor-c2'),
    ],
    quarantineNodes: ['sandbox'],
    compromiseNodes: [
      { nodeId: 'sandbox', label: 'ISOLATED · SNAPSHOTTED' },
      { nodeId: 'c2-server', label: 'BLOCKED AT EDGE' },
    ],
    auditEntries: [
      au('01:03.001', SOC, 'exec:isolate sandbox segment', 'ALLOWED'),
      au('01:03.004', SOC, 'exec:block AS64512 @edge', 'ALLOWED'),
      au('01:03.006', SOC, 'exec:revoke tokens', 'ALLOWED'),
      au('01:03.900', 'aomc/containment', 'snapshot sandbox → evidence-vault (3 items)', 'PRESERVED'),
    ],
    metricsUpdate: { evidenceItems: 4 },
  },
  {
    id: 'b5-summary',
    beat: 5,
    phase: 'summary',
    title: 'SAME PLANE, SECOND BATTLEGROUND',
    pausePoint: 'Pause 5 · "That\'s what makes it a control plane, not three demos."',
    narration: "Two battlegrounds, one plane. That is what makes this a control plane and not three disconnected demos. Now, the pivot.",
    events: [],
    topologyChanges: [],
    outcomeTone: 'defense',
    outcomeList: [
      'One exploit, three domains: external → SOC sandbox → infrastructure agents',
      'Detect → decide: 5 signals correlated in 4.2 seconds (was: a shift)',
      'Token replay blocked by identity revoked 56 seconds earlier',
      'Containment writes hit the same verify gate as infrastructure writes',
      '"Wipe host" REJECTED by evidence hold — snapshot to vault with chain of custody',
      'Beat 1 blast radius: $180M+ and 11 days. Beat 5: 0 devices touched, evidence intact',
    ],
    showAudit: true,
  },

  // ═══════════════════════════════════════════════════════════
  // BEAT 6 — THE PIVOT: FROM SEATBELT TO ACCELERATOR (GREED)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'b6-title',
    beat: 6,
    phase: 'title',
    title: 'FROM SEATBELT TO ACCELERATOR',
    subtitle: 'Once the plane exists, business units stop asking permission\nand start safely building their own agentic systems on top of it.\n\nThe infrastructure team becomes the enabler.',
    narration: "Here is the pivot. Everything so far was the seatbelt. But once the plane exists, something else happens. Business units stop asking permission. They start building their own agentic systems on top of it, safely. And the infrastructure and security team stops being the department of no. You become the enabler that lets the company win in the AI era.",
    events: [],
    topologyChanges: [],
  },
  {
    id: 'b6-build',
    beat: 6,
    phase: 'accelerator',
    title: 'BUSINESS UNITS BUILD ON THE PLANE',
    narration: "Watch them plug in. Claims triage, in insurance. Trade surveillance, in capital markets. A supply chain planner. Customer care. Each one gets an identity from the plane, a declared autonomy level, a gate on the writes that matter, and a journal. Nobody had to build governance from scratch. They inherited it. Onboarding an agent went from six weeks of review to four days.",
    events: [
      ev('enable', 'REGISTERED: Claims Triage (Insurance) — identity issued · autonomy GATED ACT · payout > $10K → human'),
      ev('enable', 'REGISTERED: Trade Surveillance (Capital Markets) — autonomy RECOMMEND · every alert journaled'),
      ev('enable', 'REGISTERED: Supply Chain Planner (Operations) — BOUNDED AUTO-ACT · PO ≤ $50K'),
      ev('enable', 'REGISTERED: Case Resolution (Customer Care) — GATED ACT · PII masked · DLP on output'),
      ev('info', 'Governance inherited from the plane — none of it built by the business unit'),
    ],
    topologyChanges: [],
    metricsUpdate: { buAgentsOnboarded: 4, approvalCycle: '6 wks → 4 days' },
  },
  {
    id: 'b6-proof',
    beat: 6,
    phase: 'proof',
    title: 'THIS IS ALREADY HAPPENING',
    pausePoint: 'Pause 6 · Greed — "don\'t be left behind"',
    narration: "This is not a forecast. EY Canvas: roughly one point four trillion lines of audit data a year, across a hundred sixty thousand engagements, governed federally for a hundred thirty thousand professionals. Cisco: a personalized agent for every one of ninety thousand employees, starting this fiscal year. Not a pilot. Salesforce Agentforce at Reddit: vendor-reported, but eighty-four percent faster resolution and nine figures in savings. The through-line: the wins come when building, governing, and running agents live in one governed environment. That is the control plane, told as an enabler.",
    events: [],
    topologyChanges: [],
  },

  // ═══════════════════════════════════════════════════════════
  // BEAT 7 — CLOSE: THE VENDOR CHALLENGE, THREE LANES
  // ═══════════════════════════════════════════════════════════
  {
    id: 'b7-lanes',
    beat: 7,
    phase: 'lanes',
    title: 'THE VENDOR CHALLENGE — THREE LANES',
    narration: "To the vendor community. The reference implementation is in Git, evolving the Dallas fork model. Three lanes, matching the working groups. Pick your lane. Nobody is expected to cover all three. Specialize where you're strong. Submit a playable video. Attending members vote Best in Show, per lane, in this room.",
    events: [],
    topologyChanges: [],
  },
  {
    id: 'finale',
    beat: 7,
    phase: 'title',
    title: 'ONE CONTROL PLANE, EVERY DOMAIN',
    subtitle: 'Fear: one routine pull, $180M, 11 days blind.\nThe plane: 6 seconds to quarantine, every write mediated, evidence intact.\nThe accelerator: business units building on it today.\n\nThe working group demos and challenges are on the agenda. Go watch. Go vote.',
    narration: "One control plane, every domain. The fear is real: one routine pull. The plane is real: six seconds. And the upside is real: business units building on it today. The working group sessions have the depth, and their demos and challenges are up for awards too. Go watch. Go vote. Thank you.",
    events: [],
    topologyChanges: [],
    contributors: true,
  },
];

// ─── Helpers ──────────────────────────────────────────
export function firstStepOfBeat(beat: number): number {
  return STEPS.findIndex(s => s.beat === beat);
}

export const BEAT_LABELS: Record<number, string> = {
  0: '',
  1: 'BEAT 1 · THE POISONED PULL',
  2: 'BEAT 2 · THE AOMC CATCH',
  3: 'BEAT 3 · ONE PLANE, THREE WGs',
  4: 'BEAT 4 · AUTONOMOUS INFRA',
  5: 'BEAT 5 · AI-ENABLED SOC',
  6: 'BEAT 6 · THE ACCELERATOR',
  7: 'BEAT 7 · THE CHALLENGE',
};
