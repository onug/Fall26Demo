'use client';

import { motion } from 'framer-motion';
import { PROOF_POINTS } from '@/lib/data';

interface ProofPointsProps {
  title: string;
}

export default function ProofPoints({ title }: ProofPointsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center px-10 py-6 gap-8 max-w-7xl mx-auto w-full"
    >
      <div className="text-center">
        <p className="text-xs tracking-[0.35em] font-bold text-purple-300/80 mb-3">GREED · BEAT 6 · PUBLIC PROOF POINTS</p>
        <h1 className="text-4xl font-bold text-purple-300 tracking-tight">{title}</h1>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full">
        {PROOF_POINTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.4, duration: 0.5 }}
            className="rounded-xl border bg-gray-900/60 p-6 flex flex-col"
            style={{ borderColor: `${p.color}80`, boxShadow: `0 0 24px ${p.color}22` }}
          >
            <div className="text-2xl font-bold mb-0.5" style={{ color: p.color }}>{p.org}</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-5">{p.product}</div>
            <div className="text-2xl font-bold text-gray-100 leading-tight mb-3">{p.headline}</div>
            <div className="text-sm text-gray-400 leading-relaxed mb-5">{p.detail}</div>
            <div className="mt-auto text-[11px] text-gray-500 italic border-t border-gray-800 pt-3">{p.framing}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="text-center max-w-4xl space-y-3"
      >
        <p className="text-lg text-gray-200">
          An employee&apos;s <span className="text-sky-300 font-bold">personal agent</span> is easy to interrupt: one circuit breaker.
          A company&apos;s <span className="text-orange-300 font-bold">agentic workflow</span>, with its own identity, rights and data, is what the plane exists to govern.
        </p>
        <p className="text-sm text-gray-500">
          Every large regulated organization now has an AI governance board, and the human review is the biggest time lag.
          Prove the controls are in place and your own approval pipeline gets faster.
        </p>
      </motion.div>
    </motion.div>
  );
}
