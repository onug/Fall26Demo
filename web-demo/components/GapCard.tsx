'use client';

import { motion } from 'framer-motion';
import { GAP_ROWS } from '@/lib/data';

interface GapCardProps {
  title: string;
}

// Chris Hertenstein's framing: here is the demo, here are the risks, if you don't
// have these things in place you are exposed. The room sits on a maturity continuum;
// the card asks each person which column they are in.
export default function GapCard({ title }: GapCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center px-10 py-6 gap-6 max-w-7xl mx-auto w-full"
    >
      <div className="text-center">
        <p className="text-xs tracking-[0.35em] font-bold text-red-500/80 mb-3">FEAR · BEAT 1 · GAP ANALYSIS</p>
        <h1 className="text-4xl font-bold text-red-400 tracking-tight">{title}</h1>
        <p className="text-gray-400 mt-3">What happened, the control that would have stopped it, and whether this company had it.</p>
      </div>

      <div className="w-full rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
        <div className="grid grid-cols-[1.1fr_1.7fr_150px] text-[10px] uppercase tracking-widest text-gray-500 px-5 py-2 border-b border-gray-800">
          <div>What happened</div>
          <div>The control that stops it</div>
          <div className="text-center">This company</div>
        </div>
        {GAP_ROWS.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.28, duration: 0.4 }}
            className="grid grid-cols-[1.1fr_1.7fr_150px] items-center px-5 py-3 border-b border-gray-800/60 last:border-0"
          >
            <div className="text-[15px] text-red-300 font-medium pr-4">{r.happened}</div>
            <div className="text-[13.5px] text-gray-200 pr-4 leading-snug">{r.control}</div>
            <div className="text-center">
              <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full border font-mono ${
                r.hadIt ? 'bg-green-500/10 text-green-300 border-green-500/50' : 'bg-red-500/10 text-red-300 border-red-500/50'
              }`}>
                {r.hadIt ? 'HAD IT' : 'MISSING'}
              </span>
              {r.note && <div className="text-[10px] text-gray-500 mt-1">{r.note}</div>}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3 }}
        className="text-2xl font-bold text-gray-100 text-center"
      >
        Which of these do <span className="text-red-400">you</span> have?
      </motion.p>
    </motion.div>
  );
}
