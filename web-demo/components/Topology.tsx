'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { TopologyState, ControlKey, LaneKey, Beat, TopologyEdge } from '@/lib/types';
import { CONTROL_BADGE_POSITIONS, ControlBadgePosition, LANE_BY_KEY } from '@/lib/data';

interface TopologyProps {
  topology: TopologyState;
  planeOnline: boolean;
  quarantined: Set<string>;
  compromised: Map<string, string>;
  controls: Record<ControlKey, boolean>;
  enforcingControls: ControlKey[];
  activeLanes: Set<LaneKey>;
  beat: Beat;
}

// Lane rectangles (below the control plane band)
const LANES = [
  { id: 'infra', laneKey: 'autonomous_infra' as LaneKey, wg: 'WG2', label: 'Infrastructure Fabric · Autonomous Infrastructure', x: 20, y: 115, w: 330, h: 530, color: '#3b82f6' },
  { id: 'soc', laneKey: 'ai_soc' as LaneKey, wg: 'WG3', label: 'Security Operations · AI-Enabled SOC', x: 370, y: 115, w: 330, h: 530, color: '#06b6d4' },
  { id: 'external', laneKey: null, wg: '', label: 'External · Public Internet', x: 720, y: 115, w: 260, h: 530, color: '#ef4444' },
];

const GOOD_BADGE = ['NOMINAL', 'ISOLATED', 'SNAPSHOTTED', 'FILTERED', 'PRESERVED', 'CLEAN'];

function nodeStroke(type: string): string {
  switch (type) {
    case 'rogue': return '#ef4444';
    case 'agent': return '#3b82f6';
    case 'datastore': return '#8b5cf6';
    case 'device': return '#60a5fa';
    case 'tool': return '#f59e0b';
    case 'gate': return '#f97316';
    default: return '#6b7280';
  }
}

function nodeFill(type: string): string {
  switch (type) {
    case 'rogue': return 'rgba(239,68,68,0.15)';
    case 'agent': return 'rgba(59,130,246,0.1)';
    case 'datastore': return 'rgba(139,92,246,0.1)';
    case 'device': return 'rgba(96,165,250,0.08)';
    case 'tool': return 'rgba(245,158,11,0.1)';
    case 'gate': return 'rgba(249,115,22,0.15)';
    default: return 'rgba(107,114,128,0.1)';
  }
}

function edgeStroke(type: string): string {
  switch (type) {
    case 'malicious': return '#ef4444';
    case 'blocked': return '#22c55e';
    case 'gated': return '#f97316';
    case 'a2a': return '#3b82f6';
    case 'data': return '#eab308';
    default: return '#6b7280';
  }
}

function edgeDash(type: string): string {
  switch (type) {
    case 'malicious': return '8,4';
    case 'blocked': return '4,8';
    case 'gated': return '10,4';
    case 'a2a': return '10,5';
    case 'data': return '6,3';
    default: return 'none';
  }
}

function edgeAnimClass(type: string): string {
  if (type === 'malicious') return 'animate-dash-malicious';
  if (type === 'blocked') return '';
  return 'animate-dash';
}

function nodeOffset(type: string): number {
  switch (type) {
    case 'agent': case 'rogue': return 24;
    case 'datastore': return 16;
    case 'device': return 22;
    case 'tool': return 14;
    case 'gate': return 22;
    default: return 16;
  }
}

function shortenLine(x1: number, y1: number, x2: number, y2: number, fromOffset: number, toOffset: number) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len === 0) return { x1, y1, x2, y2 };
  const ux = dx / len, uy = dy / len;
  return { x1: x1 + ux * fromOffset, y1: y1 + uy * fromOffset, x2: x2 - ux * toOffset, y2: y2 - uy * toOffset };
}

function NodeIcon({ type, x, y, stroke }: { type: string; x: number; y: number; stroke: string }) {
  switch (type) {
    case 'rogue':
      return <text x={x} y={y + 5} textAnchor="middle" fontSize={18} className="select-none">{'☠'}</text>;
    case 'agent':
      return <text x={x} y={y + 4} textAnchor="middle" fill={stroke} fontSize={11} className="select-none">{'⬢'}</text>;
    case 'datastore':
      return (
        <g>
          <ellipse cx={x} cy={y - 5} rx={10} ry={4} fill="none" stroke="#8b5cf6" strokeWidth={1.2} />
          <rect x={x - 10} y={y - 5} width={20} height={12} fill="rgba(139,92,246,0.1)" stroke="none" />
          <line x1={x - 10} y1={y - 5} x2={x - 10} y2={y + 7} stroke="#8b5cf6" strokeWidth={1.2} />
          <line x1={x + 10} y1={y - 5} x2={x + 10} y2={y + 7} stroke="#8b5cf6" strokeWidth={1.2} />
          <ellipse cx={x} cy={y + 7} rx={10} ry={4} fill="none" stroke="#8b5cf6" strokeWidth={1.2} />
        </g>
      );
    case 'device':
      return (
        <g>
          <rect x={x - 18} y={y - 12} width={36} height={24} rx={5} fill={nodeFill('device')} stroke={stroke} strokeWidth={1.4} />
          <text x={x} y={y + 4} textAnchor="middle" fill={stroke} fontSize={12} className="select-none">{'⇄'}</text>
        </g>
      );
    case 'tool':
      return (
        <polygon
          points={`${x},${y - 10} ${x + 9},${y - 5} ${x + 9},${y + 5} ${x},${y + 10} ${x - 9},${y + 5} ${x - 9},${y - 5}`}
          fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth={1.2}
        />
      );
    case 'gate':
      return (
        <g>
          <polygon
            points={`${x},${y - 20} ${x + 20},${y} ${x},${y + 20} ${x - 20},${y}`}
            fill={nodeFill('gate')} stroke="#f97316" strokeWidth={2}
            filter="url(#glow-orange)"
          />
          <text x={x} y={y + 4} textAnchor="middle" fill="#fdba74" fontSize={11} fontWeight="bold" className="select-none">{'◈'}</text>
        </g>
      );
    default:
      return null;
  }
}

function ControlBadge({ badge, active, enforcing, dim }: { badge: ControlBadgePosition; active: boolean; enforcing: boolean; dim: boolean }) {
  const w = 66, h = 18, r = 7;
  const on = active || enforcing;
  const bg = on ? '#15803d' : '#1f2937';
  const border = on ? '#22c55e' : '#374151';
  const text = on ? '#ffffff' : '#6b7280';
  return (
    <g opacity={dim && !on ? 0.35 : on ? 1 : 0.6}>
      {enforcing && (
        <motion.rect
          x={badge.x - w / 2 - 3} y={badge.y - h / 2 - 3} width={w + 6} height={h + 6} rx={11}
          fill="none" stroke="#22c55e" strokeWidth={1.5}
          animate={{ opacity: [0.8, 0.2, 0.8], scale: [1, 1.08, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          filter="url(#glow-green-strong)"
        />
      )}
      <rect x={badge.x - w / 2} y={badge.y - h / 2} width={w} height={h} rx={9} fill={bg} stroke={border} strokeWidth={1} />
      <circle cx={badge.x - w / 2 + r + 3} cy={badge.y} r={r} fill={on ? '#22c55e' : '#374151'} />
      <text x={badge.x - w / 2 + r + 3} y={badge.y + 3.5} textAnchor="middle" fill={on ? '#fff' : '#9ca3af'} fontSize={9} fontWeight="bold" fontFamily="var(--font-mono)">
        {badge.number}
      </text>
      <text x={badge.x + 8} y={badge.y + 3.5} textAnchor="middle" fill={text} fontSize={8} fontWeight="bold" fontFamily="var(--font-mono)">
        {badge.shortLabel}
      </text>
    </g>
  );
}

function EdgeLabel({ edge, x, y }: { edge: TopologyEdge; x: number; y: number }) {
  if (!edge.label) return null;
  const w = edge.label.length * 5.2 + 10;
  const color = edgeStroke(edge.type);
  return (
    <g>
      <rect x={x - w / 2} y={y - 7} width={w} height={13} rx={3} fill="#030712" stroke={color} strokeWidth={0.6} opacity={0.9} />
      <text x={x} y={y + 3} textAnchor="middle" fill={color} fontSize={8} fontFamily="var(--font-mono)" className="select-none">
        {edge.label}
      </text>
    </g>
  );
}

export default function Topology({ topology, planeOnline, quarantined, compromised, controls, enforcingControls, activeLanes, beat }: TopologyProps) {
  const nodeMap = new Map(topology.nodes.map(n => [n.id, n]));
  const wg1Online = ['identity_attestation', 'artifact_provenance', 'runtime_monitoring', 'audit_journal', 'kill_switch']
    .some(k => controls[k as ControlKey]);

  return (
    <div className="h-full w-full relative rounded-lg border border-gray-800 bg-gray-900/30 overflow-hidden">
      <svg viewBox="0 0 1000 660" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          {[
            ['glow-red', '#ef4444', 4, 0.6],
            ['glow-green', '#22c55e', 4, 0.6],
            ['glow-blue', '#3b82f6', 3, 0.4],
            ['glow-orange', '#f97316', 5, 0.7],
            ['glow-green-strong', '#22c55e', 6, 0.8],
          ].map(([id, color, dev, op]) => (
            <filter key={id as string} id={id as string} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={dev as number} result="blur" />
              <feFlood floodColor={color as string} floodOpacity={op as number} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          ))}
          {(['data', 'a2a', 'malicious', 'blocked', 'gated'] as const).map(t => (
            <marker key={t} id={`arrow-${t}`} viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 3 L 0 6 z" fill={edgeStroke(t)} />
            </marker>
          ))}
        </defs>

        {/* Lanes */}
        {LANES.map(l => {
          const lit = l.laneKey ? activeLanes.has(l.laneKey) : false;
          const wgInfo = l.laneKey ? LANE_BY_KEY[l.laneKey] : null;
          return (
            <g key={l.id}>
              <rect
                x={l.x} y={l.y} width={l.w} height={l.h} rx={12}
                fill={lit ? `${l.color}0f` : `${l.color}06`}
                stroke={l.color} strokeWidth={lit ? 2 : 1.2} strokeDasharray="8,4"
                opacity={lit ? 0.9 : 0.45}
              />
              {wgInfo && (
                <g opacity={lit ? 1 : 0.5}>
                  <rect x={l.x + 10} y={l.y + 8} width={36} height={16} rx={4} fill={l.color} />
                  <text x={l.x + 28} y={l.y + 20} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">{l.wg}</text>
                </g>
              )}
              <text x={l.x + (wgInfo ? 54 : 12)} y={l.y + 20} fill={l.color} fontSize={11} fontWeight="bold" opacity={lit ? 0.95 : 0.6}>
                {l.label}
              </text>
              {lit && (
                <motion.rect
                  x={l.x} y={l.y} width={l.w} height={l.h} rx={12}
                  fill="none" stroke={l.color} strokeWidth={1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              )}
            </g>
          );
        })}

        {/* Control plane band (or its absence) */}
        <AnimatePresence>
          {wg1Online ? (
            <motion.g key="plane" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <rect x={20} y={28} width={960} height={70} rx={12}
                fill="rgba(249,115,22,0.06)" stroke="#f97316" strokeWidth={2.5} strokeDasharray="12,6"
                className="animate-pulse-orange"
              />
              <rect x={30} y={36} width={40} height={16} rx={4} fill="#f97316" />
              <text x={50} y={48} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">WG1</text>
              <text x={78} y={48} fill="#fdba74" fontSize={12} fontWeight="bold">AOMC AGENTIC CONTROL PLANE</text>
              <text x={78} y={62} fill="#9a3412" fontSize={9} fontFamily="var(--font-mono)">sits OUTSIDE the agents · no self-attestation</text>
            </motion.g>
          ) : beat === 1 ? (
            <motion.g key="noplane" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <rect x={20} y={28} width={960} height={70} rx={12}
                fill="none" stroke="#7f1d1d" strokeWidth={1.5} strokeDasharray="6,10" opacity={0.7}
              />
              <text x={500} y={68} textAnchor="middle" fill="#7f1d1d" fontSize={13} fontWeight="bold" letterSpacing={3}>
                NO SUPERVISION PLANE
              </text>
            </motion.g>
          ) : null}
        </AnimatePresence>

        {/* Control badges */}
        {CONTROL_BADGE_POSITIONS.map(b => {
          const isWg1 = b.number <= 5;
          if (isWg1 && !wg1Online) return null;
          const laneKey: LaneKey = b.number <= 5 ? 'control_plane' : b.number <= 7 ? 'autonomous_infra' : 'ai_soc';
          return (
            <ControlBadge
              key={b.key}
              badge={b}
              active={controls[b.key]}
              enforcing={enforcingControls.includes(b.key)}
              dim={!activeLanes.has(laneKey)}
            />
          );
        })}

        {/* Edges */}
        <AnimatePresence>
          {topology.edges.filter(e => e.visible).map(edge => {
            const from = nodeMap.get(edge.from);
            const to = nodeMap.get(edge.to);
            if (!from || !to || !from.visible || !to.visible) return null;
            const stroke = edgeStroke(edge.type);
            const width = edge.type === 'malicious' ? 2.5 : edge.type === 'blocked' ? 2 : edge.type === 'gated' ? 2 : 1.5;
            const line = shortenLine(from.x, from.y, to.x, to.y, nodeOffset(from.type), nodeOffset(to.type));
            const mx = (line.x1 + line.x2) / 2, my = (line.y1 + line.y2) / 2;
            return (
              <motion.g key={edge.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <line
                  x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                  stroke={stroke} strokeWidth={width} strokeDasharray={edgeDash(edge.type)}
                  markerEnd={`url(#arrow-${edge.type})`}
                  className={edge.animated ? edgeAnimClass(edge.type) : ''}
                  opacity={edge.type === 'blocked' ? 0.6 : 0.85}
                />
                {edge.type === 'blocked' && (
                  <g>
                    <circle cx={mx} cy={my} r={10} fill="#16a34a" opacity={0.95} />
                    <text x={mx} y={my + 4} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold">{'✕'}</text>
                  </g>
                )}
                {edge.type === 'malicious' && edge.animated && (
                  <motion.circle
                    r={3} fill="#ef4444"
                    initial={{ cx: from.x, cy: from.y }}
                    animate={{ cx: [from.x, to.x, from.x], cy: [from.y, to.y, from.y] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    filter="url(#glow-red)"
                  />
                )}
                {edge.type === 'gated' && edge.animated && (
                  <motion.circle
                    r={3} fill="#fb923c"
                    initial={{ cx: from.x, cy: from.y }}
                    animate={{ cx: [from.x, to.x], cy: [from.y, to.y] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                    filter="url(#glow-orange)"
                  />
                )}
                {edge.type !== 'blocked' && <EdgeLabel edge={edge} x={mx} y={my - 9} />}
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* Nodes */}
        <AnimatePresence>
          {topology.nodes.filter(n => n.visible).map(node => {
            const isQ = quarantined.has(node.id);
            const cLabel = compromised.get(node.id);
            const isC = !!cLabel;
            const good = !!cLabel && GOOD_BADGE.some(k => cLabel.includes(k));
            const baseStroke = nodeStroke(node.type);
            const stroke = isQ ? '#ef4444' : isC ? (good ? '#22c55e' : '#ef4444') : baseStroke;
            const fill = isC && !good ? 'rgba(239,68,68,0.2)' : nodeFill(node.type);
            const isRogue = node.type === 'rogue';
            const labelY = node.type === 'datastore' ? 22 : node.type === 'tool' ? 22 : node.type === 'device' ? 26 : node.type === 'gate' ? 34 : 36;
            const glow = isRogue || (isC && !good) || isQ ? 'url(#glow-red)' : good ? 'url(#glow-green)' : node.type === 'agent' ? 'url(#glow-blue)' : undefined;

            return (
              <motion.g key={node.id} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.4 }}>
                {isC && !good && !isRogue && (
                  <motion.circle
                    cx={node.x} cy={node.y} fill="none" stroke="#ef4444" strokeWidth={1.5}
                    initial={{ r: 28, opacity: 0.4 }}
                    animate={{ r: [28, 36, 28], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    filter="url(#glow-red)"
                  />
                )}
                {(node.type === 'agent' || node.type === 'rogue') && (
                  <>
                    {isRogue && (
                      <motion.circle
                        cx={node.x} cy={node.y} fill="none" stroke="#ef4444" strokeWidth={1}
                        initial={{ r: 28, opacity: 0.3 }}
                        animate={{ r: [28, 34, 28], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <circle cx={node.x} cy={node.y} r={22} fill={fill} stroke={stroke} strokeWidth={2} filter={glow} opacity={isQ ? 0.6 : 1} />
                    <NodeIcon type={node.type} x={node.x} y={node.y} stroke={stroke} />
                  </>
                )}
                {(node.type === 'datastore' || node.type === 'tool' || node.type === 'device' || node.type === 'gate') && (
                  <g filter={glow}>
                    <NodeIcon type={node.type} x={node.x} y={node.y} stroke={stroke} />
                  </g>
                )}

                <text
                  x={node.x} y={node.y + labelY} textAnchor="middle"
                  fill={isQ ? '#f87171' : isC ? (good ? '#4ade80' : '#ef4444') : node.type === 'gate' ? '#fdba74' : '#9ca3af'}
                  fontSize={node.type === 'gate' ? 10 : 9} fontWeight={node.type === 'gate' ? 'bold' : 'normal'}
                  fontFamily="var(--font-mono)"
                >
                  {node.label}
                </text>

                {isC && cLabel && (
                  <g>
                    <rect x={node.x - cLabel.length * 3.1} y={node.y + labelY + 4} width={cLabel.length * 6.2} height={15} rx={3} fill={good ? '#16a34a' : '#ef4444'} opacity={0.92} />
                    <text x={node.x} y={node.y + labelY + 14.5} textAnchor="middle" fill="white" fontSize={8} fontWeight="bold" fontFamily="var(--font-mono)">
                      {cLabel}
                    </text>
                  </g>
                )}

                {isQ && (
                  <g>
                    <rect x={node.x + 14} y={node.y - 32} width={68} height={14} rx={3} fill="#ef4444" />
                    <text x={node.x + 48} y={node.y - 22} textAnchor="middle" fill="white" fontSize={8} fontWeight="bold">QUARANTINED</text>
                  </g>
                )}
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
}
