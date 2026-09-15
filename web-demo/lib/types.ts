// ─── Beats ────────────────────────────────────────────
// 0 = framing / close, 1..7 = the seven beats of the keynote arc
export type Beat = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

// The three ONUG working-group lanes the control plane spans
export type LaneKey = 'control_plane' | 'autonomous_infra' | 'ai_soc';

export interface LaneInfo {
  key: LaneKey;
  wg: string;        // "WG1"
  name: string;      // "Agentic Control Plane"
  short: string;     // "Control Plane"
  color: string;
}

// ─── Control plane capabilities ───────────────────────
export type ControlKey =
  // WG1 — Agentic Control Plane (supervision)
  | 'identity_attestation'
  | 'artifact_provenance'
  | 'runtime_monitoring'
  | 'audit_journal'
  | 'kill_switch'
  // WG2 — Autonomous Infrastructure
  | 'verify_gate'
  | 'autonomy_levels'
  // WG3 — AI-Enabled SOC
  | 'detect_decide'
  | 'containment';

export interface ControlInfo {
  key: ControlKey;
  number: number;
  lane: LaneKey;
  name: string;
  detail: string;
}

// ─── Events ───────────────────────────────────────────
export type EventType = 'action' | 'log' | 'violation' | 'blocked' | 'damage' | 'enable' | 'info' | 'gate';

export interface EventEntry {
  id: string;
  type: EventType;
  timestamp: string;
  agent?: string;
  trusted?: boolean;
  message: string;
}

// ─── Topology ─────────────────────────────────────────
export type TopologyNodeType = 'agent' | 'rogue' | 'datastore' | 'device' | 'tool' | 'gate';

export interface TopologyNode {
  id: string;
  type: TopologyNodeType;
  label: string;
  domain: string;
  x: number;
  y: number;
  visible: boolean;
}

export type EdgeType = 'a2a' | 'data' | 'malicious' | 'blocked' | 'gated';

export interface TopologyEdge {
  id: string;
  from: string;
  to: string;
  type: EdgeType;
  label?: string;
  visible: boolean;
  animated?: boolean;
}

export interface TopologyChange {
  action: 'addNode' | 'removeNode' | 'addEdge' | 'removeEdge' | 'updateEdge' | 'updateNode';
  nodeId?: string;
  edgeId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
}

export interface TopologyState {
  nodes: TopologyNode[];
  edges: TopologyEdge[];
}

// ─── Verify gate + autonomy ───────────────────────────
export type GateCheckStatus = 'pending' | 'pass' | 'fail';

export interface GateCheck {
  key: 'change_stop' | 'dry_run' | 'blast_radius' | 'rollback' | 'evidence_hold';
  label: string;
  detail: string;
  status: GateCheckStatus;
}

export interface GateProposal {
  title: string;         // "Apply prefix filter on edge-routers"
  requestedBy: string;   // agent id
  checks: GateCheck[];
  verdict?: 'APPROVED' | 'REJECTED' | 'ESCALATED';
}

// 0 observe · 1 recommend · 2 gated act · 3 bounded auto-act
export type AutonomyLevel = 0 | 1 | 2 | 3;

// ─── Metrics ──────────────────────────────────────────
export interface Metrics {
  // Fear
  devicesReconfigured: number;
  routesPoisoned: number;
  telemetryBlind: string;      // '0m' | 'BLIND'
  topologyExfiltrated: string; // '—' | 'FULL'
  dwellTime: string;           // '—' | '11 days'
  estDamage: string;           // '$0'
  // Greed / defense
  detectToDecide: string;      // '—' | '4.2s'
  writesGated: number;
  writesRejected: number;
  evidenceItems: number;
  buAgentsOnboarded: number;
  approvalCycle: string;       // '—' | '6 wks → 4 days'
}

// ─── Audit ────────────────────────────────────────────
export interface AuditEntry {
  ts: string;
  actor: string;
  action: string;
  result: 'ALLOWED' | 'GATED' | 'BLOCKED' | 'REJECTED' | 'QUARANTINED' | 'ESCALATED' | 'PRESERVED';
  hash: string;
}

// ─── Steps ────────────────────────────────────────────
export type StepPhase =
  | 'title'       // full-screen card
  | 'action'      // dashboard, things happen
  | 'violation'   // red flash + banner
  | 'enable'      // control plane capability comes online
  | 'gate'        // verify-gate panel is the focus
  | 'blocked'     // green shield + banner
  | 'summary'     // blast radius / outcome list
  | 'accelerator' // beat 6: business units build on the plane
  | 'proof'       // beat 6: public proof points
  | 'ra'          // a working group's reference architecture, one card
  | 'gap'         // beat 1: gap analysis — what happened, the control that stops it
  | 'threats'     // beat 7: the other threat scenarios the same controls address
  | 'lanes';      // beat 7: vendor challenge lanes

// The four reference-architecture drawings under public/ra/
export type RaKey = 'map' | 'wg1' | 'wg2' | 'wg3';

export interface Step {
  id: string;
  beat: Beat;
  phase: StepPhase;
  title: string;
  subtitle?: string;
  narration?: string;
  pausePoint?: string;            // presenter pause marker (shown as a badge)
  events: EventEntry[];
  topologyChanges: TopologyChange[];
  controlChanges?: { control: ControlKey; enabled: boolean }[];
  metricsUpdate?: Partial<Metrics>;
  outcomeList?: string[];         // summary bullets (red for fear, green for defense)
  outcomeTone?: 'fear' | 'defense';
  auditEntries?: AuditEntry[];
  showAudit?: boolean;
  gateProposal?: GateProposal;
  autonomyLevel?: AutonomyLevel;
  compromiseNodes?: { nodeId: string; label: string }[];
  quarantineNodes?: string[];
  activeLanes?: LaneKey[];        // which lanes are lit in the topology
  contributors?: boolean;         // title cards: the three working groups line
  logos?: 'strip' | 'wall';       // title cards: member marks, small strip or the full wall
  credits?: boolean;              // title cards: the practitioners who reviewed the demo
  ra?: RaKey;                     // phase 'ra': which drawing
  resetState?: boolean;           // wipe accumulated state at this step (rewind)
}

// ─── Demo state ───────────────────────────────────────
export interface DemoState {
  currentStep: number;
  beat: Beat;
  events: EventEntry[];
  controls: Record<ControlKey, boolean>;
  metrics: Metrics;
  topology: TopologyState;
  audit: AuditEntry[];
  quarantined: Set<string>;
  compromised: Map<string, string>;
  enforcingControls: ControlKey[];
  gateProposal: GateProposal | null;
  autonomyLevel: AutonomyLevel;
  activeLanes: Set<LaneKey>;
  activeViolation: { name: string; detail: string } | null;
  activeBlocked: { name: string; detail: string } | null;
}
