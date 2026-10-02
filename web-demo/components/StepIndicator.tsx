'use client';

import { motion } from 'framer-motion';
import { Beat } from '@/lib/types';
import { BEAT_LABELS } from '@/lib/steps';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  beat: Beat;
  stepTitle: string;
  /** Touch navigation. A phone has no arrow keys, and the hint bar below lists seven. */
  onPrev?: () => void;
  onNext?: () => void;
}

function beatColors(beat: Beat): { text: string; bar: string } {
  switch (beat) {
    case 1: return { text: 'text-red-400', bar: 'bg-red-500' };
    case 2: case 3: return { text: 'text-orange-400', bar: 'bg-orange-500' };
    case 4: return { text: 'text-blue-400', bar: 'bg-blue-500' };
    case 5: return { text: 'text-cyan-400', bar: 'bg-cyan-500' };
    case 6: return { text: 'text-purple-300', bar: 'bg-purple-500' };
    case 7: return { text: 'text-green-400', bar: 'bg-green-500' };
    default: return { text: 'text-cyan-400', bar: 'bg-cyan-500' };
  }
}

export default function StepIndicator({ currentStep, totalSteps, beat, stepTitle, onPrev, onNext }: StepIndicatorProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const { text, bar } = beatColors(beat);
  const label = BEAT_LABELS[beat] ?? '';

  return (
    <div className="h-full flex items-center gap-4 px-4 bg-gray-900/50 rounded-lg border border-gray-800">
      <div className="hidden lg:flex items-center gap-2 text-gray-600 text-[10px] font-mono flex-shrink-0">
        <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-400 border border-gray-700">&larr;</kbd>
        <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-400 border border-gray-700">&rarr;</kbd>
        <span>navigate</span>
        <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-400 border border-gray-700">1–7</kbd>
        <span>beat</span>
        <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-400 border border-gray-700">F</kbd>
        <span>fullscreen</span>
        <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-400 border border-gray-700">P</kbd>
        <span>pause</span>
        <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-400 border border-gray-700">N</kbd>
        <span>voice</span>
        <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-400 border border-gray-700">T</kbd>
        <span>text</span>
        <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-400 border border-gray-700">R</kbd>
        <span>reset</span>
      </div>

      {/* Below lg the hint bar above is hidden, so these are the only way forward. Buttons
          rather than swipe alone: a swipe you have to guess at is not a way forward. */}
      <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
        <button
          onClick={onPrev}
          disabled={currentStep === 0}
          aria-label="Previous step"
          className="h-9 w-11 rounded border border-gray-700 text-gray-300 text-lg leading-none disabled:opacity-30"
        >
          &larr;
        </button>
        <button
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1}
          aria-label="Next step"
          className="h-9 px-4 rounded border border-cyan-700 text-cyan-300 text-sm font-mono tracking-wide disabled:opacity-30"
        >
          NEXT &rarr;
        </button>
      </div>

      {label && (
        <span className={`hidden sm:inline text-[10px] font-bold uppercase tracking-wider ${text} flex-shrink-0`}>{label}</span>
      )}

      <span className="hidden sm:block text-xs text-gray-400 truncate flex-1 min-w-0">{stepTitle}</span>
      <span className="sm:hidden flex-1" />

      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-16 lg:w-40 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${bar} rounded-full`}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-[11px] font-mono text-gray-500 w-10 text-right">
          {currentStep + 1}/{totalSteps}
        </span>
      </div>
    </div>
  );
}
