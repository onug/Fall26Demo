'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AuditEntry } from '@/lib/types';

interface AuditJournalProps {
  entries: AuditEntry[];
  visible: boolean;
}

function resultColor(result: AuditEntry['result']): string {
  switch (result) {
    case 'ALLOWED': return 'text-green-400';
    case 'GATED': return 'text-orange-300';
    case 'PRESERVED': return 'text-cyan-300';
    case 'ESCALATED': return 'text-yellow-300';
    default: return 'text-red-400';
  }
}

function isPlane(actor: string): boolean {
  return actor.startsWith('aomc/');
}

export default function AuditJournal({ entries, visible }: AuditJournalProps) {
  return (
    <AnimatePresence>
      {visible && entries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg border border-cyan-500/30 bg-gray-900/80 backdrop-blur-sm overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-gray-800 flex items-center gap-2">
            <span className="text-base">{'📋'}</span>
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Immutable Audit Journal</h2>
            <span className="text-[10px] text-gray-500 font-mono">append-only · hash-chained · agents have no read/write path</span>
            <span className="text-[10px] text-gray-500 ml-auto">{entries.length} entries</span>
          </div>
          <div className="overflow-auto max-h-[240px]">
            <table className="w-full text-[11px] font-mono">
              <thead>
                <tr className="text-gray-500 border-b border-gray-800">
                  <th className="px-3 py-1.5 text-left sticky top-0 bg-gray-900 z-10">T+</th>
                  <th className="px-3 py-1.5 text-left sticky top-0 bg-gray-900 z-10">ACTOR</th>
                  <th className="px-3 py-1.5 text-left sticky top-0 bg-gray-900 z-10">ACTION</th>
                  <th className="px-3 py-1.5 text-left sticky top-0 bg-gray-900 z-10">RESULT</th>
                  <th className="px-3 py-1.5 text-left sticky top-0 bg-gray-900 z-10">HASH</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, i) => {
                  const plane = isPlane(e.actor);
                  return (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`border-b border-gray-800/50 ${plane ? 'bg-orange-500/5 border-l-2 border-l-orange-500' : ''}`}
                    >
                      <td className="px-3 py-1 text-gray-500">{e.ts}</td>
                      <td className={`px-3 py-1 font-bold ${plane ? 'text-orange-300' : 'text-gray-300'}`}>{e.actor}</td>
                      <td className="px-3 py-1 text-gray-400">{e.action}</td>
                      <td className={`px-3 py-1 font-bold ${resultColor(e.result)}`}>{e.result}</td>
                      <td className="px-3 py-1 text-gray-600">{e.hash}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
