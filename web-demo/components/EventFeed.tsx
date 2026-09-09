'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventEntry } from '@/lib/types';

interface EventFeedProps {
  events: EventEntry[];
}

function eventColor(type: EventEntry['type']): string {
  switch (type) {
    case 'violation': return 'text-red-400';
    case 'blocked': return 'text-green-400';
    case 'damage': return 'text-red-500';
    case 'enable': return 'text-orange-400';
    case 'gate': return 'text-amber-300';
    case 'info': return 'text-cyan-400';
    case 'action': return 'text-gray-200';
    case 'log': return 'text-gray-500';
    default: return 'text-gray-400';
  }
}

function eventIcon(type: EventEntry['type']): string {
  switch (type) {
    case 'violation': return '⚠';
    case 'blocked': return '🛡';
    case 'damage': return '💥';
    case 'enable': return '✓';
    case 'gate': return '◈';
    case 'info': return '▶';
    case 'action': return '›';
    case 'log': return ' ';
    default: return '›';
  }
}

function trustBadge(trusted?: boolean): React.ReactNode {
  if (trusted === undefined) return null;
  return trusted ? (
    <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-1 rounded mr-1">TRUSTED</span>
  ) : (
    <span className="text-[10px] font-bold text-fuchsia-400 bg-fuchsia-400/10 px-1 rounded mr-1">UNTRUSTED</span>
  );
}

export default function EventFeed({ events }: EventFeedProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [events.length]);

  return (
    <div className="h-full flex flex-col bg-gray-900/50 rounded-lg border border-gray-800">
      <div className="px-3 py-2 border-b border-gray-800 flex-shrink-0 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Event Feed</h2>
        <span className="text-[10px] text-gray-600 font-mono">{events.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-1 font-mono text-[11px] leading-relaxed space-y-0.5">
        <AnimatePresence initial={false}>
          {events.map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`${eventColor(e.type)} py-0.5 flex`}
            >
              <span className="w-4 flex-shrink-0 text-center">{eventIcon(e.type)}</span>
              <span className="flex-1 min-w-0 break-words">
                {e.timestamp && <span className="text-gray-600 mr-1">{e.timestamp}</span>}
                {e.agent && (
                  <>
                    {trustBadge(e.trusted)}
                    <span className="font-bold mr-1">{e.agent}:</span>
                  </>
                )}
                {e.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
