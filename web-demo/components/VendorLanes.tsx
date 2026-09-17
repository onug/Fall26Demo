'use client';

import { motion } from 'framer-motion';
import { CONTROLS, VENDOR_LANES, VENDOR_MECHANICS } from '@/lib/data';

interface VendorLanesProps {
  title: string;
}

export default function VendorLanes({ title }: VendorLanesProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center px-10 py-6 gap-8 max-w-7xl mx-auto w-full"
    >
      <div className="text-center">
        <p className="text-xs tracking-[0.35em] font-bold text-green-400/80 mb-3">THE CLOSE · BEAT 7</p>
        <h1 className="text-4xl font-bold text-green-400 tracking-tight">{title}</h1>
        <p className="text-gray-400 mt-3">Pick your lane. No vendor is expected to cover all three. Specialize where you&apos;re strong.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full">
        {VENDOR_LANES.map((lane, i) => (
          <motion.div
            key={lane.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.3, duration: 0.5 }}
            className="rounded-xl border bg-gray-900/60 p-6 flex flex-col"
            style={{ borderColor: `${lane.color}90`, boxShadow: `0 0 24px ${lane.color}22` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: lane.color }}>{lane.wg}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500">Lane {i + 1}</span>
            </div>
            <div className="text-2xl font-bold mb-3" style={{ color: lane.color }}>{lane.name}</div>
            <div className="text-sm text-gray-200 mb-4 leading-relaxed">{lane.challenge}</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Prove it</div>
            <ul className="space-y-1.5">
              {lane.proveIt.map((p, j) => (
                <li key={j} className="text-[12px] text-gray-400 flex items-start gap-2">
                  <span style={{ color: lane.color }}>▸</span><span>{p}</span>
                </li>
              ))}
            </ul>
            {/* Peter's crosswalk: the controls a lane is judged on, by number, with the
                working-group requirement ids each one translates. */}
            <div className="mt-auto pt-3 border-t border-gray-800">
              <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">Controls · requirements</div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-mono leading-snug">
                {CONTROLS.filter(c => c.lane === lane.key).map(c => (
                  <span key={c.key} className="text-gray-500">#{c.number} <span className="text-gray-300">{c.reqs}</span></span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="grid grid-cols-4 gap-4 w-full max-w-5xl"
      >
        {VENDOR_MECHANICS.map(s => (
          <div key={s.k} className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-center">
            <div className="text-xs font-bold text-green-400 font-mono mb-1">{s.k}</div>
            <div className="text-sm font-bold text-gray-200">{s.t}</div>
            <div className="text-[11px] text-gray-500 mt-1">{s.d}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
