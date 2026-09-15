'use client';

import { motion } from 'framer-motion';
import { RaKey } from '@/lib/types';
import { RA_CARDS } from '@/lib/data';
import { asset } from '@/lib/assets';

interface RACardProps {
  ra: RaKey;
  title: string;
}

// One card per working group: the ratified drawing, as drawn, on a white panel
// (the source drawings are light-on-white and are shown unaltered), with the
// three things the room needs to take from it on the right.
export default function RACard({ ra, title }: RACardProps) {
  const card = RA_CARDS[ra];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col px-8 py-4 gap-3 max-w-[1800px] mx-auto w-full min-h-0"
    >
      <div className="flex items-end justify-between gap-6 flex-shrink-0">
        <div>
          <p className="text-xs tracking-[0.35em] font-bold mb-1.5" style={{ color: card.color }}>{card.kicker}</p>
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight">{title}</h1>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-gray-300">{card.title}</div>
          <div className="text-[11px] font-mono text-gray-500">{card.version}</div>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex-[3] min-w-0 rounded-xl bg-white border overflow-hidden flex items-center justify-center p-2"
          style={{ borderColor: `${card.color}80`, boxShadow: `0 0 28px ${card.color}22` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(card.file)} alt={card.title} className="max-h-full max-w-full object-contain" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex-[1.15] min-w-[300px] max-w-[440px] flex flex-col gap-3"
        >
          <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-4">
            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Planning phase</div>
            <div className="text-sm text-gray-200 leading-snug">{card.planning}</div>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-4">
            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Execution phase</div>
            <div className="text-sm text-gray-200 leading-snug">{card.execution}</div>
          </div>
          <div className="rounded-xl border p-4" style={{ borderColor: `${card.color}90`, backgroundColor: `${card.color}12` }}>
            <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: card.color }}>The gate</div>
            <div className="text-sm font-bold text-gray-100 leading-snug">{card.gate}</div>
          </div>
          <ul className="rounded-xl border border-gray-800 bg-gray-900/40 p-4 space-y-2 flex-1">
            {card.lines.map((l, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.25 }}
                className="text-[12.5px] text-gray-400 leading-snug flex gap-2"
              >
                <span style={{ color: card.color }}>▸</span><span>{l}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
