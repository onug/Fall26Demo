import {
  ControlInfo, ControlKey, LaneInfo, LaneKey, Metrics, TopologyEdge, TopologyNode,
} from './types';

// ─── Working-group lanes ──────────────────────────────
export const LANES: LaneInfo[] = [
  { key: 'control_plane', wg: 'WG1', name: 'Agentic Control Plane', short: 'Control Plane', color: '#f97316' },
  { key: 'autonomous_infra', wg: 'WG2', name: 'Autonomous Infrastructure', short: 'Autonomous Infra', color: '#3b82f6' },
  { key: 'ai_soc', wg: 'WG3', name: 'AI-Enabled SOC', short: 'AI SOC', color: '#06b6d4' },
];

export const LANE_BY_KEY: Record<LaneKey, LaneInfo> = Object.fromEntries(
  LANES.map(l => [l.key, l]),
) as Record<LaneKey, LaneInfo>;

// ─── Control plane capabilities ───────────────────────
export const CONTROLS: ControlInfo[] = [
  { key: 'identity_attestation', number: 1, lane: 'control_plane', name: 'Identity Attestation', detail: 'Cryptographic non-human identity · mutual auth' },
  { key: 'artifact_provenance', number: 2, lane: 'control_plane', name: 'Artifact Provenance', detail: 'Signed models · SBOM · publisher policy' },
  { key: 'runtime_monitoring', number: 3, lane: 'control_plane', name: 'Runtime Monitoring', detail: 'Behavior measured from outside the agent' },
  { key: 'audit_journal', number: 4, lane: 'control_plane', name: 'Immutable Audit Journal', detail: 'Append-only · hash-chained · agent has no access' },
  { key: 'kill_switch', number: 5, lane: 'control_plane', name: 'Kill Switch', detail: 'Quarantine at machine speed' },
  { key: 'verify_gate', number: 6, lane: 'autonomous_infra', name: 'Verify Gate', detail: 'Change-stop · dry-run · blast radius · rollback' },
  { key: 'autonomy_levels', number: 7, lane: 'autonomous_infra', name: 'Autonomy Levels', detail: 'Observe → recommend → gated act → bounded auto-act' },
  { key: 'detect_decide', number: 8, lane: 'ai_soc', name: 'Detect → Decide', detail: 'Cross-domain correlation in seconds' },
  { key: 'containment', number: 9, lane: 'ai_soc', name: 'Deliberate Containment', detail: 'Evidence preserved before anything is destroyed' },
];

export const INITIAL_CONTROLS: Record<ControlKey, boolean> = {
  identity_attestation: false,
  artifact_provenance: false,
  runtime_monitoring: false,
  audit_journal: false,
  kill_switch: false,
  verify_gate: false,
  autonomy_levels: false,
  detect_decide: false,
  containment: false,
};

export const AUTONOMY_LADDER = [
  { level: 0, label: 'Observe', detail: 'Read-only telemetry' },
  { level: 1, label: 'Recommend', detail: 'Proposes changes, humans act' },
  { level: 2, label: 'Gated Act', detail: 'Writes pass the verify gate' },
  { level: 3, label: 'Bounded Auto-Act', detail: 'Low-risk, pre-approved envelope' },
] as const;

// ─── Control badge positions on the topology ──────────
export interface ControlBadgePosition {
  key: ControlKey;
  number: number;
  shortLabel: string;
  x: number;
  y: number;
}

export const CONTROL_BADGE_POSITIONS: ControlBadgePosition[] = [
  // WG1 badges live inside the control plane band across the top
  { key: 'identity_attestation', number: 1, shortLabel: 'IDENT', x: 150, y: 78 },
  { key: 'artifact_provenance', number: 2, shortLabel: 'PROVEN', x: 300, y: 78 },
  { key: 'runtime_monitoring', number: 3, shortLabel: 'RTMON', x: 450, y: 78 },
  { key: 'audit_journal', number: 4, shortLabel: 'JOURNAL', x: 600, y: 78 },
  { key: 'kill_switch', number: 5, shortLabel: 'KILL', x: 750, y: 78 },
  // WG2 badges at the foot of the infrastructure lane
  { key: 'verify_gate', number: 6, shortLabel: 'GATE', x: 120, y: 622 },
  { key: 'autonomy_levels', number: 7, shortLabel: 'AUTON', x: 250, y: 622 },
  // WG3 badges at the foot of the SOC lane
  { key: 'detect_decide', number: 8, shortLabel: 'DETECT', x: 470, y: 622 },
  { key: 'containment', number: 9, shortLabel: 'CONTAIN', x: 600, y: 622 },
];

// ─── Topology ─────────────────────────────────────────
// viewBox 0 0 1000 660
//  - control plane band: y 28..98 (visible when WG1 is online)
//  - infrastructure lane (WG2): x 20..350
//  - SOC lane (WG3):            x 370..700
//  - external:                  x 720..980

export const BASE_NODES: TopologyNode[] = [
  // Infrastructure fabric — WG2
  { id: 'agent-fabric-optimizer', type: 'agent', label: 'Fabric Optimizer', domain: 'infra', x: 118, y: 200, visible: true },
  { id: 'agent-noc-responder', type: 'agent', label: 'NOC Responder', domain: 'infra', x: 118, y: 340, visible: true },
  { id: 'core-fabric', type: 'device', label: 'Core Fabric', domain: 'infra', x: 290, y: 200, visible: true },
  { id: 'edge-routers', type: 'device', label: 'Edge Routers', domain: 'infra', x: 290, y: 340, visible: true },
  { id: 'telemetry-store', type: 'datastore', label: 'Telemetry', domain: 'infra', x: 290, y: 480, visible: true },
  { id: 'config-repo', type: 'datastore', label: 'Config Repo', domain: 'infra', x: 118, y: 480, visible: true },
  { id: 'verify-gate', type: 'gate', label: 'VERIFY GATE', domain: 'infra', x: 204, y: 270, visible: false },
  { id: 'poisoned-model', type: 'rogue', label: 'poisoned:v3.2', domain: 'infra', x: 50, y: 268, visible: false },

  // AI-enabled SOC — WG3
  { id: 'agent-soc-analyst', type: 'agent', label: 'SOC Analyst Agent', domain: 'soc', x: 460, y: 240, visible: true },
  { id: 'siem', type: 'datastore', label: 'SIEM / Data Lake', domain: 'soc', x: 625, y: 240, visible: true },
  { id: 'evidence-vault', type: 'datastore', label: 'Evidence Vault', domain: 'soc', x: 625, y: 390, visible: true },
  { id: 'containment-tool', type: 'tool', label: 'isolate_segment', domain: 'soc', x: 460, y: 390, visible: false },
  { id: 'sandbox', type: 'device', label: 'Artifact Sandbox', domain: 'soc', x: 545, y: 320, visible: false },

  // External
  { id: 'public-model-hub', type: 'datastore', label: 'Public Model Hub', domain: 'external', x: 850, y: 200, visible: true },
  { id: 'c2-server', type: 'rogue', label: 'C2 Mirror · AS64512', domain: 'external', x: 850, y: 360, visible: false },
  { id: 'threat-actor', type: 'rogue', label: 'Threat Actor', domain: 'external', x: 850, y: 520, visible: false },
];

export const BASE_EDGES: TopologyEdge[] = [
  { id: 'e-fab-core', from: 'agent-fabric-optimizer', to: 'core-fabric', type: 'data', visible: true, animated: true },
  { id: 'e-fab-tele', from: 'agent-fabric-optimizer', to: 'telemetry-store', type: 'data', visible: true, animated: true },
  { id: 'e-noc-edge', from: 'agent-noc-responder', to: 'edge-routers', type: 'data', visible: true, animated: true },
  { id: 'e-fab-noc', from: 'agent-fabric-optimizer', to: 'agent-noc-responder', type: 'a2a', visible: true, animated: true },
  { id: 'e-tele-siem', from: 'telemetry-store', to: 'siem', type: 'data', visible: true, animated: true },
  { id: 'e-soc-siem', from: 'agent-soc-analyst', to: 'siem', type: 'data', visible: true, animated: true },
];

export const INITIAL_METRICS: Metrics = {
  devicesReconfigured: 0,
  routesPoisoned: 0,
  telemetryBlind: '0m',
  topologyExfiltrated: '—',
  dwellTime: '—',
  estDamage: '$0',
  detectToDecide: '—',
  writesGated: 0,
  writesRejected: 0,
  evidenceItems: 0,
  buAgentsOnboarded: 0,
  approvalCycle: '—',
};

// ─── Beat 6 content ───────────────────────────────────
export interface BusinessUnitAgent {
  id: string;
  unit: string;
  agent: string;
  autonomy: string;
  gate: string;
}

export const BU_AGENTS: BusinessUnitAgent[] = [
  { id: 'bu-claims', unit: 'Insurance', agent: 'Claims Triage', autonomy: 'Gated act', gate: 'Payout > $10K → human' },
  { id: 'bu-surveil', unit: 'Capital Markets', agent: 'Trade Surveillance', autonomy: 'Recommend', gate: 'Every alert journaled' },
  { id: 'bu-supply', unit: 'Operations', agent: 'Supply Chain Planner', autonomy: 'Bounded auto-act', gate: 'PO ≤ $50K auto · else gate' },
  { id: 'bu-care', unit: 'Customer Care', agent: 'Case Resolution', autonomy: 'Gated act', gate: 'PII masked · DLP on output' },
];

export interface ProofPoint {
  id: string;
  org: string;
  product: string;
  headline: string;
  detail: string;
  framing: string;
  color: string;
}

export const PROOF_POINTS: ProofPoint[] = [
  {
    id: 'ey',
    org: 'EY',
    product: 'EY Canvas',
    headline: '~1.4 trillion lines of audit data a year',
    detail: '160,000 engagements · 150+ countries · federated governance for 130,000 professionals',
    framing: 'Regulated, mission-critical. This is what governed agents at scale look like.',
    color: '#facc15',
  },
  {
    id: 'cisco',
    org: 'Cisco',
    product: 'Personalized AI agent for every employee',
    headline: '~90,000 employees, starting FY27',
    detail: 'Not a pilot. A structural, Fortune-500-scale deployment from day one of the fiscal year.',
    framing: 'Frame around the ambition: every employee gets an agent, under one governance model.',
    color: '#38bdf8',
  },
  {
    id: 'salesforce',
    org: 'Salesforce',
    product: 'Agentforce at Reddit',
    headline: '84% faster case resolution',
    detail: '$100M+ in reported annual operational savings',
    framing: 'Vendor-reported — but directionally the size of the prize when agents run the business.',
    color: '#818cf8',
  },
];

export interface VendorLane {
  key: LaneKey;
  wg: string;
  name: string;
  challenge: string;
  proveIt: string[];
  color: string;
}

export const VENDOR_LANES: VendorLane[] = [
  {
    key: 'control_plane',
    wg: 'WG1',
    name: 'Agentic Control Plane',
    challenge: 'Supervise agents from outside. No self-attestation.',
    proveIt: ['Identity + provenance for every agent and artifact', 'Runtime rogue detection + kill switch', 'Immutable, hash-chained audit journal'],
    color: '#f97316',
  },
  {
    key: 'autonomous_infra',
    wg: 'WG2',
    name: 'Autonomous Infrastructure',
    challenge: 'Let agents run the fabric — with every write mediated.',
    proveIt: ['Verify gate: change-stop · dry-run · blast radius · rollback', 'Declared autonomy levels per agent', 'Bounded auto-act with automatic revert'],
    color: '#3b82f6',
  },
  {
    key: 'ai_soc',
    wg: 'WG3',
    name: 'AI-Enabled SOC',
    challenge: 'Compress detect-to-decide to seconds — without destroying evidence.',
    proveIt: ['Cross-domain correlation: fabric + plane + SOC', 'Deliberate, gated containment', 'Evidence preserved with chain of custody'],
    color: '#06b6d4',
  },
];
