'use client';

import { motion } from 'framer-motion';
import { RaKey } from '@/lib/types';
import { RA_CARDS } from '@/lib/data';
import { asset } from '@/lib/assets';

interface RAPairCardProps {
  pair: [RaKey, RaKey];
  title: string;
}

// Two working groups' drawings side by side on one card, each on its white panel with
// its gate line beneath. Shown once, before Battleground 1, so the room sees the shared
// skeleton before either fight starts (Nick, 5 Oct 2026). The full-size drawings and the
// requirements stay behind the QR tile on the WG1 card.
export default function RAPairCard({ pair, title }: RAPairCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col px-8 py-4 gap-3 max-w-[1800px] mx-auto w-full min-h-0"
    >
      <div className="flex items-end justify-between gap-6 flex-shrink-0">
        <div>
          <p className="text-xs tracking-[0.35em] font-bold mb-1.5 text-gray-400">WORKING GROUPS 2 AND 3 · ONE SKELETON, TWO FIGHTS</p>
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight">{title}</h1>
        </div>
        <div className="text-right text-[12px] text-gray-400 leading-snug max-w-[520px]">
          Planning on top: who the agent is and what it may touch. Execution below, inside an enforcement boundary the agent cannot influence. Step four is the gate.
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {pair.map((key, i) => {
          const card = RA_CARDS[key];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: i === 0 ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.2, duration: 0.5 }}
              className="flex-1 min-w-0 flex flex-col gap-2 min-h-0"
            >
              <div className="flex items-baseline justify-between gap-3 flex-shrink-0">
                <div className="text-xs tracking-[0.3em] font-bold" style={{ color: card.color }}>{card.kicker}</div>
                <div className="text-[10px] font-mono text-gray-500 truncate">{card.version}</div>
              </div>
              <div
                className="flex-1 min-h-0 rounded-xl bg-white border overflow-hidden flex items-center justify-center p-2"
                style={{ borderColor: `${card.color}80`, boxShadow: `0 0 28px ${card.color}22` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(card.file)} alt={card.title} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="rounded-xl border px-4 py-2.5 flex-shrink-0" style={{ borderColor: `${card.color}90`, backgroundColor: `${card.color}12` }}>
                <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: card.color }}>The gate</div>
                <div className="text-sm font-bold text-gray-100 leading-snug">{card.gate}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
