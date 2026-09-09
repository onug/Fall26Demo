'use client';

interface NarrationPanelProps {
  text: string;
  speaking: boolean;
}

export default function NarrationPanel({ text, speaking }: NarrationPanelProps) {
  return (
    <div className="mx-auto max-w-6xl bg-gray-950/90 border border-cyan-900/60 rounded-lg px-5 py-2.5 backdrop-blur-sm shadow-xl">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 mt-0.5 text-[10px] font-bold text-cyan-600 uppercase tracking-widest">
          Narration
        </span>
        <p className="text-[13px] text-gray-200 leading-relaxed flex-1">{text}</p>
        <div className="flex items-center gap-2 flex-shrink-0 h-4">
          {speaking && (
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 bg-cyan-500 rounded animate-[soundbar_0.6s_ease-in-out_infinite]" style={{ height: '40%' }} />
              <span className="w-0.5 bg-cyan-500 rounded animate-[soundbar_0.6s_ease-in-out_infinite_0.1s]" style={{ height: '100%' }} />
              <span className="w-0.5 bg-cyan-500 rounded animate-[soundbar_0.6s_ease-in-out_infinite_0.2s]" style={{ height: '60%' }} />
              <span className="w-0.5 bg-cyan-500 rounded animate-[soundbar_0.6s_ease-in-out_infinite_0.05s]" style={{ height: '80%' }} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
