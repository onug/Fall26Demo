'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Beat } from '@/lib/types';
import { REVIEWERS } from '@/lib/data';
import LogoWall from './LogoWall';
import { asset } from '@/lib/assets';

interface TitleSlideProps {
  title: string;
  subtitle?: string;
  beat: Beat;
  contributors?: boolean;
  logos?: 'strip' | 'wall';
  credits?: boolean;
  visible: boolean;
}

function beatStyle(beat: Beat): { text: string; glow: string; divider: string; kicker: string } {
  switch (beat) {
    case 1: return { text: 'text-red-500', glow: 'glow-red', divider: '#ef4444', kicker: 'FEAR · BEAT 1' };
    case 2: return { text: 'text-orange-400', glow: 'glow-orange', divider: '#f97316', kicker: 'THE AOMC CATCH · BEAT 2' };
    case 3: return { text: 'text-orange-300', glow: 'glow-orange', divider: '#f97316', kicker: 'WIDEN OUT · BEAT 3' };
    case 4: return { text: 'text-blue-400', glow: 'glow-blue', divider: '#3b82f6', kicker: 'BATTLEGROUND 1 · WG2 · BEAT 4' };
    case 5: return { text: 'text-cyan-400', glow: 'glow-cyan', divider: '#06b6d4', kicker: 'BATTLEGROUND 2 · WG3 · BEAT 5' };
    case 6: return { text: 'text-purple-300', glow: 'glow-purple', divider: '#a855f7', kicker: 'GREED · BEAT 6' };
    case 7: return { text: 'text-green-400', glow: 'glow-green', divider: '#22c55e', kicker: 'THE CLOSE · BEAT 7' };
    default: return { text: 'text-cyan-400', glow: 'glow-cyan', divider: '#06b6d4', kicker: '' };
  }
}

export default function TitleSlide({ title, subtitle, beat, contributors, logos, credits, visible }: TitleSlideProps) {
  const s = beatStyle(beat);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className={`text-center px-8 ${logos === 'wall' ? 'max-w-7xl' : 'max-w-5xl'}`}>
            {s.kicker && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`text-xs tracking-[0.35em] font-bold mb-5 ${s.text} opacity-80`}
              >
                {s.kicker}
              </motion.p>
            )}
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <h1 className={`${logos === 'wall' ? 'text-4xl mb-4' : 'text-5xl mb-6'} font-bold ${s.text} tracking-tight leading-tight`}>{title}</h1>
              <div className={`w-32 h-1 mx-auto ${logos === 'wall' ? 'mb-5' : 'mb-8'} rounded-full ${s.glow}`} style={{ backgroundColor: s.divider }} />
            </motion.div>

            {subtitle && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={`${logos === 'wall' ? 'text-lg mb-5' : 'text-xl mb-8'} text-gray-300 leading-relaxed whitespace-pre-line`}
              >
                {subtitle}
              </motion.div>
            )}

            {logos && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className={logos === 'wall' ? 'mb-5' : 'mb-6'}
              >
                <LogoWall mode={logos} delay={0.8} />
              </motion.div>
            )}

            {credits && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: logos === 'wall' ? 2.4 : 1.6, duration: 0.5 }}
                className={logos === 'wall' ? 'mb-4' : 'mb-6'}
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">Reviewed by the practitioners</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {REVIEWERS.map(r => (
                    <div key={r.name} className="flex items-center gap-2.5 rounded-md border border-gray-800 bg-gray-900/60 pl-1.5 pr-3 py-1.5">
                      <span className="h-8 px-2 rounded bg-white flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={asset(`/logos/${r.file}`)} alt={r.org} className="h-5 w-auto max-w-[84px] object-contain" />
                      </span>
                      <span className="text-left leading-tight">
                        <span className="block text-sm text-gray-200">{r.name}</span>
                        <span className="block text-[10px] uppercase tracking-wider text-gray-500">{r.org}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className={`${logos === 'wall' ? 'mt-4' : 'mt-12'} text-sm text-gray-600 font-mono`}
            >
              Press SPACE or &rarr; to continue
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
