'use client';

import { motion } from 'framer-motion';
import { AuditEntry } from '@/lib/types';

interface JournalCardProps {
  title: string;
  entries: AuditEntry[];
  facts: string[];
}

// Beat 5 closes on the whole journal, full screen, instead of a strip under the topology.
// Peter and Nick, review call of 5 Oct 2026: "have the whole audit journal come up and
// replace this for a moment at the end of that slide." Every gate check, every write and the
// evidence-vault snapshot from both battlegrounds, hash-chained, in one table.
function resultColor(result: AuditEntry['result']): string {
  switch (result) {
    case 'ALLOWED': return 'text-green-400';
    case 'GATED': return 'text-orange-300';
    case 'PRESERVED': return 'text-cyan-300';
    case 'ESCALATED': return 'text-yellow-300';
    default: return 'text-red-400';
  }
}

export default function JournalCard({ title, entries, facts }: JournalCardProps) {
  const plane = entries.filter(e => e.actor.startsWith('aomc/')).length;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col px-10 pt-3 pb-2 gap-3 max-w-7xl mx-auto w-full min-h-0"
    >
      <div className="flex items-end justify-between gap-6 flex-shrink-0">
        <div>
          <p className="text-[11px] tracking-[0.35em] font-bold text-cyan-500/80 mb-1">BEAT 5 · TWO BATTLEGROUNDS, ONE CONTROL PLANE</p>
          <h1 className="text-3xl font-bold text-cyan-300 tracking-tight whitespace-nowrap">{title}</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Every gate check, every write and the evidence-vault snapshot, from both fights, hash-chained in one journal no agent can read or alter.
          </p>
        </div>
        <div className="text-right text-[11px] font-mono text-gray-500 leading-relaxed flex-shrink-0">
          <div>{entries.length} entries · {plane} by the plane</div>
          <div>append-only · hash-chained · agents have no read/write path</div>
        </div>
      </div>

      <div className="flex-1 min-h-0 rounded-xl border border-cyan-500/30 bg-gray-900/70 overflow-hidden">
        <div className="h-full overflow-auto">
          <table className="w-full text-[12px] font-mono">
            <thead>
              <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-800">
                <th className="px-4 py-1.5 text-left sticky top-0 bg-gray-900 z-10">T+</th>
                <th className="px-4 py-1.5 text-left sticky top-0 bg-gray-900 z-10">Actor</th>
                <th className="px-4 py-1.5 text-left sticky top-0 bg-gray-900 z-10">Action</th>
                <th className="px-4 py-1.5 text-left sticky top-0 bg-gray-900 z-10">Result</th>
                <th className="px-4 py-1.5 text-left sticky top-0 bg-gray-900 z-10">Hash</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => {
                const byPlane = e.actor.startsWith('aomc/');
                return (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.04 }}
                    className={`border-b border-gray-800/50 ${byPlane ? 'bg-orange-500/5 border-l-2 border-l-orange-500' : ''}`}
                  >
                    <td className="px-4 py-[3px] text-gray-500 whitespace-nowrap">{e.ts}</td>
                    <td className={`px-4 py-[3px] font-bold whitespace-nowrap ${byPlane ? 'text-orange-300' : 'text-gray-300'}`}>{e.actor}</td>
                    <td className="px-4 py-[3px] text-gray-300">{e.action}</td>
                    <td className={`px-4 py-[3px] font-bold ${resultColor(e.result)}`}>{e.result}</td>
                    <td className="px-4 py-[3px] text-gray-600 whitespace-nowrap">{e.hash}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {facts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="grid grid-cols-3 gap-3 flex-shrink-0"
        >
          {facts.map((f, i) => (
            <div key={i} className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-1.5 text-[12px] text-gray-200 leading-snug">{f}</div>
          ))}
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="text-xl font-bold text-gray-100 text-center flex-shrink-0"
      >
        One set of nine controls. <span className="text-cyan-300">One plane.</span> Both fights.
      </motion.p>
    </motion.div>
  );
}
