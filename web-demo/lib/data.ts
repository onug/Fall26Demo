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
  { key: 'artifact_provenance', number: 2, lane: 'control_plane', name: 'Artifact Provenance', detail: 'Approved source · SBOM · new artifacts run sandboxed first' },
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
  { id: 'managed-registry', type: 'datastore', label: 'Managed Registry', domain: 'infra', x: 204, y: 480, visible: true },
  { id: 'verify-gate', type: 'gate', label: 'VERIFY GATE', domain: 'infra', x: 198, y: 270, visible: false },
  { id: 'poisoned-model', type: 'rogue', label: 'poisoned:v3.2', domain: 'infra', x: 50, y: 268, visible: false },
  // Beat 1 ransomware endgame (Mick Currey): what the attacker reaches on day six
  { id: 'identity-provider', type: 'datastore', label: 'Identity · IdP', domain: 'infra', x: 60, y: 400, visible: false },
  { id: 'backups', type: 'datastore', label: 'Backups', domain: 'infra', x: 60, y: 560, visible: false },

  // AI-enabled SOC — WG3
  { id: 'agent-soc-analyst', type: 'agent', label: 'SOC Analyst Agent', domain: 'soc', x: 460, y: 232, visible: true },
  { id: 'siem', type: 'datastore', label: 'SIEM / Data Lake', domain: 'soc', x: 625, y: 232, visible: true },
  { id: 'evidence-vault', type: 'datastore', label: 'Evidence Vault', domain: 'soc', x: 625, y: 390, visible: true },
  { id: 'containment-tool', type: 'tool', label: 'isolate_segment', domain: 'soc', x: 460, y: 390, visible: false },
  { id: 'sandbox', type: 'device', label: 'Artifact Sandbox', domain: 'soc', x: 560, y: 300, visible: false },
  { id: 'poisoned-sandbox', type: 'rogue', label: 'v3.2 in sandbox', domain: 'soc', x: 640, y: 300, visible: false },

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
    framing: 'Personal agents: one per person, easy to interrupt with a circuit breaker. The easier case.',
    color: '#38bdf8',
  },
  {
    id: 'salesforce',
    org: 'Salesforce',
    product: 'Agentforce at Reddit',
    headline: '84% faster case resolution',
    detail: '$100M+ in reported annual operational savings',
    framing: 'Vendor-reported — but a business process run by an agent, which is the harder case the plane exists for.',
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

// ─── Reference architectures (public/ra/*.svg, lifted from the WG drawings) ───
export interface RaCard {
  key: 'map' | 'wg1' | 'wg2' | 'wg3';
  file: string;
  wg: string;
  color: string;
  kicker: string;
  title: string;
  version: string;
  planning: string;
  execution: string;
  gate: string;
  lines: string[];
}

export const RA_CARDS: Record<RaCard['key'], RaCard> = {
  map: {
    key: 'map', file: '/ra/map.svg', wg: 'WG1 · WG2 · WG3', color: '#f97316',
    kicker: 'HOW THE REFERENCE ARCHITECTURES CONNECT',
    title: 'One Control Plane, Every Domain — Unified Architecture Map',
    version: 'Draft v0.2 · 6 August 2026 · composite of WG1 v0.2, WG2 v0.6, WG3 v0.6',
    planning: 'Every domain defines a persona: autonomy · models · estate',
    execution: 'Every persona runs its ops loop on the same enforcement layer',
    gate: 'Cross-domain cooperation goes through the plane, never around it',
    lines: [
      'NOC and SOC are the first two personas. Cloud ops, DevOps, data, OT: same template.',
      'The plane is the shared Access Enforcement & Audit layer beneath all of them.',
      'Build the enforcement machinery once; reuse it everywhere.',
    ],
  },
  wg1: {
    key: 'wg1', file: '/ra/wg1.svg', wg: 'WG1', color: '#f97316',
    kicker: 'WORKING GROUP 1 · AGENTIC CONTROL PLANE',
    title: 'Agentic Control Plane — Reference Architecture',
    version: 'Draft v0.2 · ratified at the 28 July session',
    planning: 'Human oversight & governance on top (AOMC-6)',
    execution: 'Four components, six controls, outside the agents',
    gate: 'Identity air gap: agents receive identity from the plane, never reach into it',
    lines: [
      'Agent Trust Fabric: non-human identity, per-step scoped tokens, deprovisioning first.',
      'Registry, Personas & Agent BOM: who / what / why for every agent.',
      'Runtime Supervision: policy on every message, injection filtered, immutable audit.',
      'Private Open Router: every model call routed by cost, risk, sovereignty.',
    ],
  },
  wg2: {
    key: 'wg2', file: '/ra/wg2.svg', wg: 'WG2', color: '#3b82f6',
    kicker: 'WORKING GROUP 2 · AUTONOMOUS INFRASTRUCTURE',
    title: 'Autonomous Infrastructure — Reference Architecture',
    version: 'Draft v0.6 · 6 August 2026',
    planning: 'Agent persona creation: autonomy level · models & model location · estate under management',
    execution: 'Agent operations loop 1–6: detect · diagnose · propose · verify · execute · validate',
    gate: 'Step 4 = the Verify Gate: change-stop · dry-run · blast radius · rollback',
    lines: [
      'Two access patterns, both valid: direct agent-to-agent, or an orchestrator that is itself governed.',
      'Access Enforcement & Audit sits outside agent control and influence.',
      'Only one box in the loop can mutate state, and it is visually unmistakable.',
    ],
  },
  wg3: {
    key: 'wg3', file: '/ra/wg3.svg', wg: 'WG3', color: '#06b6d4',
    kicker: 'WORKING GROUP 3 · AI-ENABLED SOC',
    title: 'Agentic-Enabled SOC — Reference Architecture',
    version: 'Draft v0.6 · 6 August 2026 · same skeleton as WG2',
    planning: 'Agent persona creation: conservative autonomy ceiling · models · estate under watch',
    execution: 'Agent operations loop 1–6: detect · investigate · propose · decide · respond · validate',
    gate: 'Step 4 = the Decide Gate: contain now, or observe & trace',
    lines: [
      'L3 auto-act exists only for corroborated known-bad signatures.',
      'Responses stage monitor → flag → block, never blanket.',
      'The immutable audit journal doubles as the evidence trail: chain of custody, forensic replay.',
    ],
  },
};

// ─── Beat 1 gap analysis (Chris Hertenstein's framing) ───
export interface GapRow {
  happened: string;
  control: string;
  hadIt: boolean;
  note?: string;
}

export const GAP_ROWS: GapRow[] = [
  { happened: 'Artifact pulled from a public hub', control: 'Managed registry: scan · SBOM · CVE check · cooling-off hold', hadIt: true, note: 'most companies do not' },
  { happened: 'Payload fired after every scan passed', control: 'New artifacts run sandboxed first, with no network path, watched from outside', hadIt: false },
  { happened: 'Agent wrote straight to the fabric', control: 'Verify gate on every write: change-stop · dry-run · blast radius · rollback', hadIt: false },
  { happened: 'Routes and telemetry changed, unnoticed', control: 'Config-drift scanner that reverts within a day and alarms the CSIRT', hadIt: false },
  { happened: 'Poisoned agent reached the identity system', control: 'Identity air gap: agents receive identity from the plane, never reach into it · time-limited checked-out credentials', hadIt: false },
  { happened: 'Backups deleted, disks encrypted', control: 'Immutable backups · a journal the agent cannot touch · kill switch', hadIt: false },
];

// ─── The other threat scenarios the same controls address (Baird Kaake) ───
export interface ThreatScenario {
  id: string;
  name: string;
  what: string;
  control: string;
}

export const THREAT_SCENARIOS: ThreatScenario[] = [
  {
    id: 'injection',
    name: 'Indirect prompt injection · payload poisoning',
    what: 'An agent that gathers web content on a structured, ongoing basis will eventually ingest instructions or a payload planted for it.',
    control: 'Runtime supervision from outside the agent: declared persona vs observed behaviour · verify gate on every write. An injected instruction can change what the agent wants, not what it is allowed to do.',
  },
  {
    id: 'misuse',
    name: 'Agent misuse of legitimate rights',
    what: 'The agent is tricked into using rights it already holds: its prompt altered, or the content it decides on altered, so it changes data it can write, or reads and shares content it should not — outbound or internally.',
    control: 'Identity with a declared persona and approved task set · per-step scoped tokens · immutable audit journal the agent cannot see.',
  },
  {
    id: 'writes',
    name: 'Over-broad write access',
    what: 'Agents in production typically hold read and write across large databases, which is what makes misuse easy.',
    control: 'Compartmentalise writes to the smallest atomic subset a step needs — the WG1 objective that answers this scenario.',
  },
];

// ─── Members on the wall (public/logos/, copied from the collaborative portal) ───
export interface MemberMark {
  name: string;
  file?: string;   // absent: render the name as a wordmark
}

export const FOUNDING_MEMBERS: MemberMark[] = [
  { name: 'Aviatrix', file: 'aviatrix.svg' },
  { name: 'BlueCat', file: 'bluecat.svg' },
  { name: 'Bonfy', file: 'bonfy.png' },
  { name: 'Cigna', file: 'cigna.png' },
  { name: 'Cisco', file: 'cisco.svg' },
  { name: 'CodiLime', file: 'codilime.png' },
  { name: 'Connectbase', file: 'connectbase.png' },
  { name: 'cPacket', file: 'cpacket.png' },
  { name: 'FedEx', file: 'fedex.png' },
  { name: 'Gluware', file: 'gluware.png' },
  { name: 'Google Cloud', file: 'google-cloud.png' },
  { name: 'HSBC', file: 'hsbc.png' },
  { name: 'Lumen', file: 'lumen.svg' },
  { name: 'Memorial Sloan Kettering', file: 'memorial-sloan-kettering.png' },
  { name: 'NetBrain', file: 'netbrain.svg' },
  { name: 'PalC Networks', file: 'palc-networks.svg' },
  { name: 'RTX', file: 'rtx.png' },
  { name: 'TrueFoundry', file: 'truefoundry.svg' },
  { name: 'Zentera', file: 'zentera.svg' },
];

// Practitioner member companies not on the founding wall. No mark on file yet:
// they render as wordmarks until the company supplies one (drop <file> in public/logos/).
export const PRACTITIONER_MEMBERS: MemberMark[] = [
  { name: 'Citi' },
  { name: 'eBay' },
  { name: 'Fidelity' },
  { name: 'Goldman Sachs' },
  { name: 'Huntington' },
  { name: 'NBCUniversal' },
];

export const REVIEWERS: { name: string; org: string }[] = [
  { name: 'Mick Currey', org: 'Fidelity' },
  { name: 'Rick Casarez', org: 'eBay' },
  { name: 'Chris Hertenstein', org: 'Huntington' },
  { name: 'Baird Kaake', org: 'Cigna' },
  { name: 'Peter Campbell', org: 'ONUG' },
];

export const VENDOR_MECHANICS = [
  { k: '1', t: 'Fork the reference', d: 'github.com/onug/Fall26Demo · use the working-group terminology' },
  { k: '2', t: 'Pick your lane', d: 'one lane is the structure, not a concession' },
  { k: '3', t: 'Submit a 5–10 minute MP4', d: 'screen capture · on loop in the showcase theatre · presentation schedule · office hours' },
  { k: '4', t: 'Best in Show, per lane', d: 'attending members vote in the Whova app' },
];
