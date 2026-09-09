'use client';

import { motion } from 'framer-motion';
import { Metrics } from '@/lib/types';
import { BU_AGENTS, CONTROLS } from '@/lib/data';

interface AcceleratorViewProps {
  title: string;
  metrics: Metrics;
}

export default function AcceleratorView({ title, metrics }: AcceleratorViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center px-10 py-6 gap-6 max-w-7xl mx-auto w-full"
    >
      <div className="text-center">
        <p className="text-xs tracking-[0.35em] font-bold text-purple-300/80 mb-3">GREED · BEAT 6</p>
        <h1 className="text-4xl font-bold text-purple-300 tracking-tight">{title}</h1>
      </div>

      {/* The plane */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full rounded-xl border-2 border-orange-500/70 bg-orange-500/5 glow-orange px-6 py-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500 text-white">WG1</span>
          <span className="text-sm font-bold text-orange-300 tracking-wide">AOMC AGENTIC CONTROL PLANE</span>
          <span className="text-[11px] text-orange-200/60 font-mono">governance every business unit inherits, none of it built by them</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CONTROLS.map((c, i) => (
            <motion.span
              key={c.key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="text-[11px] px-2.5 py-1 rounded-full border border-green-500/50 bg-green-500/10 text-green-300 font-mono"
            >
              <span className="font-bold mr-1">{c.number}</span>{c.name}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Plug-in lines */}
      <div className="w-full grid grid-cols-4 gap-6 relative">
        {BU_AGENTS.map((bu, i) => (
          <div key={bu.id} className="flex flex-col items-center">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.8 + i * 0.35, duration: 0.3 }}
              style={{ transformOrigin: 'top' }}
              className="w-0.5 h-8 bg-gradient-to-b from-orange-500 to-purple-500"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.35, duration: 0.4 }}
              className="w-full rounded-xl border border-purple-500/50 bg-purple-500/5 glow-purple p-4"
            >
              <div className="text-[10px] uppercase tracking-widest text-purple-400/80 mb-1">{bu.unit}</div>
              <div className="text-lg font-bold text-gray-100 mb-3">{bu.agent}</div>
              <div className="space-y-1.5 text-[11px] font-mono">
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span><span className="text-gray-400">identity issued by plane</span></div>
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span><span className="text-gray-400">autonomy: <span className="text-blue-300">{bu.autonomy}</span></span></div>
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span><span className="text-gray-400">gate: <span className="text-orange-300">{bu.gate}</span></span></div>
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span><span className="text-gray-400">journaled · kill switch armed</span></div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Bottom line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="grid grid-cols-3 gap-8 w-full max-w-4xl"
      >
        {[
          { v: metrics.buAgentsOnboarded.toString(), l: 'business-unit agents onboarded' },
          { v: metrics.approvalCycle, l: 'AI governance board approval cycle' },
          { v: '0', l: 'governance controls built by the business unit' },
        ].map((m, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-bold font-mono text-green-400">{m.v}</div>
            <div className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">{m.l}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
