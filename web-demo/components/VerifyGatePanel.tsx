'use client';

import { motion } from 'framer-motion';
import { GateProposal, GateCheck } from '@/lib/types';

interface VerifyGatePanelProps {
  proposal: GateProposal;
}

function statusStyle(status: GateCheck['status']) {
  switch (status) {
    case 'pass': return { icon: '✓', color: 'text-green-400', border: 'border-green-500/50', bg: 'bg-green-500/10' };
    case 'fail': return { icon: '✕', color: 'text-red-400', border: 'border-red-500/60', bg: 'bg-red-500/10' };
    default: return { icon: '…', color: 'text-gray-500', border: 'border-gray-700', bg: 'bg-gray-800/30' };
  }
}

function verdictStyle(v?: GateProposal['verdict']) {
  switch (v) {
    case 'APPROVED': return 'bg-green-500/20 text-green-300 border-green-500';
    case 'REJECTED': return 'bg-red-500/20 text-red-300 border-red-500';
    case 'ESCALATED': return 'bg-yellow-500/20 text-yellow-200 border-yellow-500';
    default: return 'bg-gray-800 text-gray-400 border-gray-700';
  }
}

export default function VerifyGatePanel({ proposal }: VerifyGatePanelProps) {
  const anyFail = proposal.checks.some(c => c.status === 'fail');
  return (
    <motion.div
      key={proposal.title}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-lg border bg-gray-900/80 backdrop-blur-sm overflow-hidden ${anyFail ? 'border-red-500/50' : 'border-orange-500/50 glow-orange'}`}
    >
      <div className="px-3 py-2 border-b border-gray-800 flex items-center gap-3">
        <span className="text-orange-400 text-base">{'◈'}</span>
        <h2 className="text-xs font-bold uppercase tracking-widest text-orange-300">Verify Gate</h2>
        <span className="text-[11px] text-gray-300 truncate flex-1">{proposal.title}</span>
        <span className="text-[10px] text-gray-500 font-mono">requested by {proposal.requestedBy}</span>
        {proposal.verdict && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: proposal.checks.length * 0.35 + 0.2, type: 'spring', stiffness: 400, damping: 20 }}
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${verdictStyle(proposal.verdict)}`}
          >
            {proposal.verdict}
          </motion.span>
        )}
      </div>
      <div className={`grid gap-2 p-2`} style={{ gridTemplateColumns: `repeat(${proposal.checks.length}, minmax(0, 1fr))` }}>
        {proposal.checks.map((c, i) => {
          const s = statusStyle(c.status);
          return (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.35 }}
              className={`rounded border px-2.5 py-2 ${s.border} ${s.bg}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.35 + 0.2, type: 'spring', stiffness: 500, damping: 18 }}
                  className={`text-sm font-bold ${s.color}`}
                >
                  {s.icon}
                </motion.span>
                <span className={`text-[11px] font-bold uppercase tracking-wide ${s.color}`}>{c.label}</span>
              </div>
              <div className="text-[10px] text-gray-400 font-mono leading-snug">{c.detail}</div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
