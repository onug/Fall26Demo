'use client';

import { motion } from 'framer-motion';
import { THREAT_SCENARIOS } from '@/lib/data';

interface ThreatCardProps {
  title: string;
}

// Baird Kaake's ask: the demo shows one threat path; the controls address several
// more. One card, each scenario mapped to the control that stops it.
export default function ThreatCard({ title }: ThreatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center px-10 py-6 gap-8 max-w-7xl mx-auto w-full"
    >
      <div className="text-center">
        <p className="text-xs tracking-[0.35em] font-bold text-green-400/80 mb-3">THE CLOSE · BEAT 7 · WHAT ELSE THE SAME CONTROLS STOP</p>
        <h1 className="text-4xl font-bold text-green-400 tracking-tight">{title}</h1>
        <p className="text-gray-400 mt-3">The demo showed one path in: a poisoned artifact. The same nine capabilities address these.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full">
        {THREAT_SCENARIOS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.4, duration: 0.5 }}
            className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 flex flex-col"
          >
            <div className="text-[10px] uppercase tracking-widest text-red-400/80 mb-2">Threat scenario {i + 1}</div>
            <div className="text-xl font-bold text-gray-100 leading-tight mb-3">{t.name}</div>
            <div className="text-[13px] text-gray-400 leading-relaxed mb-5">{t.what}</div>
            <div className="mt-auto rounded-lg border border-green-500/40 bg-green-500/5 p-3">
              <div className="text-[10px] uppercase tracking-widest text-green-400 mb-1">Stopped by</div>
              <div className="text-[12.5px] text-green-200 leading-snug">{t.control}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="text-sm text-gray-500 text-center max-w-4xl"
      >
        One demo, one path. The working groups carry the full threat catalogue; this is the shape of the answer, not the list.
      </motion.p>
    </motion.div>
  );
}
