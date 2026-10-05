'use client';

import { motion } from 'framer-motion';
import { THREATS_WATCHED, THREAT_FAMILIES, THREAT_GAPS, THREAT_TOTAL } from '@/lib/data';

interface ThreatCardProps {
  title: string;
}

// Baird Kaake's threat and risk scenario catalogue for WG1, on one card: what the room has
// just watched, named as the catalogue names it; the eleven families the same controls
// address; and the catalogue's own list of what stays partly open, which is the question
// to put to a vendor. No requirement item numbers appear here on purpose (see data.ts).
export default function ThreatCard({ title }: ThreatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col px-10 py-5 gap-4 max-w-[1800px] mx-auto w-full min-h-0"
    >
      <div className="text-center flex-shrink-0">
        <p className="text-xs tracking-[0.35em] font-bold text-green-400/80 mb-2">THE CLOSE · BEAT 7 · THE THREAT CATALOGUE</p>
        <h1 className="text-4xl font-bold text-green-400 tracking-tight">{title}</h1>
        <p className="text-gray-400 mt-2">
          The demo showed one path in. The working group&apos;s catalogue lists {THREAT_TOTAL} scenarios in {THREAT_FAMILIES.length} families.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-[1.15fr_1.25fr_1fr] gap-5 min-h-0">
        {/* What you just watched */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-xl border border-gray-800 bg-gray-900/60 p-5 flex flex-col min-h-0"
        >
          <div className="text-[13px] uppercase tracking-widest text-red-400/90 font-bold mb-4">What you just watched, beat by beat</div>
          <ul className="space-y-4 flex-1 flex flex-col justify-between">
            {THREATS_WATCHED.map((t, i) => (
              <motion.li
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="flex gap-3"
              >
                <span className="flex-shrink-0 w-11 h-11 rounded-md bg-red-500/10 border border-red-500/30 text-red-300 font-bold font-mono flex flex-col items-center justify-center leading-none"><span className="text-[8px] tracking-widest text-red-400/70">BEAT</span><span className="text-[16px]">{t.beat}</span></span>
                <div className="min-w-0">
                  <div className="text-[19px] font-bold text-gray-100 leading-tight">
                    {t.scenario} <span className="text-[13px] font-mono font-normal text-gray-500">{t.id} · {t.asi}</span>
                  </div>
                  <div className="text-[15px] text-gray-400 leading-snug">{t.shown}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* The same controls also stop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="rounded-xl border border-green-500/40 bg-green-500/5 p-5 flex flex-col min-h-0"
        >
          <div className="text-[13px] uppercase tracking-widest text-green-400 font-bold mb-4">The same controls address the rest</div>
          <ul className="flex-1 flex flex-col justify-between">
            {THREAT_FAMILIES.map((f, i) => (
              <motion.li
                key={f.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.08 }}
                className="flex items-baseline gap-3"
              >
                <span className="flex-shrink-0 w-6 text-[15px] font-mono font-bold text-green-400">{f.key}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[18px] font-bold text-gray-100 leading-tight">{f.name}</div>
                  <div className="text-[14px] text-gray-400 leading-snug">{f.line}</div>
                </div>
                <span className="flex-shrink-0 text-[15px] font-mono text-green-300/80">{f.count}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Still open */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-5 flex flex-col min-h-0"
        >
          <div className="text-[13px] uppercase tracking-widest text-amber-400 font-bold mb-1">Only partly closed</div>
          <div className="text-[15px] text-amber-200/80 mb-4 leading-snug">When a vendor claims full coverage, ask to see the mechanism.</div>
          <ul className="flex-1 flex flex-col justify-between">
            {THREAT_GAPS.map((g, i) => (
              <motion.li
                key={g.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.2 + i * 0.15 }}
              >
                <div className="text-[18px] font-bold text-gray-100 leading-tight">
                  {g.name} <span className="text-[13px] font-mono font-normal text-gray-500">{g.id}</span>
                </div>
                <div className="text-[14.5px] text-gray-400 leading-snug">{g.why}</div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="text-[13px] text-gray-500 text-center flex-shrink-0"
      >
        Threat and risk scenario catalogue: Baird Kaake, Independent AI Cybersecurity Researcher, WG1 · cross-referenced to the OWASP Top 10 for Agentic Applications 2026 · one demo, one path; this is the map of the rest
      </motion.p>
    </motion.div>
  );
}
