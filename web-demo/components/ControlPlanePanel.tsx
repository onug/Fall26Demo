'use client';

import { motion } from 'framer-motion';
import { ControlKey, LaneKey, AutonomyLevel } from '@/lib/types';
import { CONTROLS, LANES, AUTONOMY_LADDER } from '@/lib/data';

interface ControlPlanePanelProps {
  controls: Record<ControlKey, boolean>;
  enforcing: ControlKey[];
  autonomyLevel: AutonomyLevel;
  activeLanes: Set<LaneKey>;
}

export default function ControlPlanePanel({ controls, enforcing, autonomyLevel, activeLanes }: ControlPlanePanelProps) {
  const anyOn = Object.values(controls).some(Boolean);
  const ladderOn = controls.autonomy_levels;

  return (
    <div className={`rounded-lg border transition-all duration-500 bg-gray-900/50 ${anyOn ? 'border-orange-500/60 glow-orange' : 'border-gray-800'}`}>
      <div className="px-3 py-2 border-b border-gray-800 flex items-center gap-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Control Plane</h2>
        {anyOn ? (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded-full font-bold">
            ONLINE
          </motion.span>
        ) : (
          <span className="text-[10px] bg-red-500/15 text-red-400 px-1.5 py-0.5 rounded-full font-bold">ABSENT</span>
        )}
      </div>

      <div className="p-2 space-y-2">
        {LANES.map(lane => {
          const laneControls = CONTROLS.filter(c => c.lane === lane.key);
          const laneLit = activeLanes.has(lane.key);
          return (
            <div key={lane.key} className={`rounded transition-opacity ${laneLit ? 'opacity-100' : anyOn ? 'opacity-50' : 'opacity-70'}`}>
              <div className="flex items-center gap-1.5 px-1 mb-1">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: lane.color }}>{lane.wg}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: lane.color }}>{lane.name}</span>
              </div>
              <div className="space-y-1">
                {laneControls.map(ctrl => {
                  const on = controls[ctrl.key];
                  const pulse = enforcing.includes(ctrl.key);
                  return (
                    <motion.div
                      key={ctrl.key}
                      layout
                      className={`flex items-center gap-2 px-2 py-1 rounded transition-all duration-500 ${
                        on ? 'bg-green-500/10' : 'bg-gray-800/30'
                      } ${pulse ? 'animate-pulse-green' : ''}`}
                    >
                      <div className={`relative w-7 h-3.5 rounded-full transition-all duration-500 flex-shrink-0 ${on ? 'bg-green-500' : 'bg-red-900/60'}`}>
                        <motion.div
                          animate={{ x: on ? 14 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className={`absolute top-0.5 left-0.5 w-2.5 h-2.5 rounded-full ${on ? 'bg-white' : 'bg-red-400'}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className={`text-[11px] font-bold ${on ? 'text-green-400' : 'text-gray-500'}`}>{ctrl.number}</span>
                          <span className={`text-[11px] font-medium truncate ${on ? 'text-green-300' : 'text-gray-400'}`}>{ctrl.name}</span>
                        </div>
                        <div className="text-[9px] text-gray-600 truncate">{ctrl.detail}</div>
                      </div>
                      {on && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400 text-xs flex-shrink-0">{'✓'}</motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Autonomy ladder */}
        {ladderOn && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="pt-1 border-t border-gray-800">
            <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 px-1 mb-1">Autonomy Level</div>
            <div className="grid grid-cols-4 gap-1 px-1">
              {AUTONOMY_LADDER.map(l => {
                const current = l.level === autonomyLevel;
                const reached = l.level <= autonomyLevel;
                return (
                  <div
                    key={l.level}
                    title={l.detail}
                    className={`rounded px-1 py-1 text-center border transition-all duration-500 ${
                      current
                        ? 'bg-blue-500/25 border-blue-400 text-blue-100 glow-blue'
                        : reached
                        ? 'bg-blue-500/10 border-blue-800 text-blue-400'
                        : 'bg-gray-800/40 border-gray-800 text-gray-600'
                    }`}
                  >
                    <div className="text-[10px] font-bold font-mono">{l.level}</div>
                    <div className="text-[8px] leading-tight">{l.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
