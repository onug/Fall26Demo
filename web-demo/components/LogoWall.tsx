'use client';

import { motion } from 'framer-motion';
import { FOUNDING_MEMBERS, PRACTITIONER_MEMBERS, MemberMark } from '@/lib/data';
import { asset } from '@/lib/assets';

interface LogoWallProps {
  mode: 'strip' | 'wall';
  delay?: number;
}

// Every mark reads on a light tile (the portal's rule, same files), so tiles are
// white on the dark stage. A member with no mark on file renders as a wordmark:
// their name, not a mock-up of their logo.
function Tile({ m, size, i, delay }: { m: MemberMark; size: 'sm' | 'lg'; i: number; delay: number }) {
  const h = size === 'sm' ? 'h-10 px-3' : 'h-16 px-5';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + i * 0.06, duration: 0.35 }}
      className={`${h} rounded-md bg-white flex items-center justify-center flex-shrink-0`}
      title={m.name}
    >
      {m.file ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset(`/logos/${m.file}`)} alt={m.name} className={`${size === 'sm' ? 'h-6 max-w-[140px]' : 'h-10 max-w-[200px]'} w-auto object-contain`} />
      ) : (
        <span className={`font-bold text-gray-800 tracking-tight ${size === 'sm' ? 'text-xs' : 'text-base'}`}>{m.name}</span>
      )}
    </motion.div>
  );
}

export default function LogoWall({ mode, delay = 0.8 }: LogoWallProps) {
  if (mode === 'strip') {
    return (
      <div className="space-y-2.5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">ONUG Collaborative · practitioner members</p>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-6xl mx-auto">
          {PRACTITIONER_MEMBERS.map((m, i) => <Tile key={m.name} m={m} size="sm" i={i} delay={delay} />)}
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 pt-1">founding members</p>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-6xl mx-auto">
          {FOUNDING_MEMBERS.map((m, i) => <Tile key={m.name} m={m} size="sm" i={i} delay={delay + PRACTITIONER_MEMBERS.length * 0.06} />)}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">Practitioner members</p>
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-6xl mx-auto">
          {PRACTITIONER_MEMBERS.map((m, i) => <Tile key={m.name} m={m} size="lg" i={i} delay={delay} />)}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">Founding members</p>
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-6xl mx-auto">
          {FOUNDING_MEMBERS.map((m, i) => <Tile key={m.name} m={m} size="lg" i={i} delay={delay + PRACTITIONER_MEMBERS.length * 0.06} />)}
        </div>
      </div>
    </div>
  );
}
