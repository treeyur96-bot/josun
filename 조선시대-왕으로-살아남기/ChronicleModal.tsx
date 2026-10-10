import React from 'react';
import { ChronicleEntry } from '../types';
import { Scroll, X, Award } from 'lucide-react';
import { sound } from '../utils/sound';

interface ChronicleModalProps {
  chronicles: ChronicleEntry[];
  kingName: string;
  onClose: () => void;
}

export const ChronicleModal: React.FC<ChronicleModalProps> = ({
  chronicles,
  kingName,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-stone-900 border-2 border-amber-600/60 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-amber-950/70 border-b border-amber-700/40">
          <div className="flex items-center gap-2 text-amber-300">
            <Scroll size={20} />
            <h2 className="font-myeongjo font-bold text-base tracking-wide">
              {kingName}대왕 실록 (實錄)
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playGayageum(300);
              onClose();
            }}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Chronicle Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-royal-pattern">
          {chronicles.length === 0 ? (
            <div className="text-center py-12 text-stone-500 font-batang text-sm">
              아직 기록된 실록의 사초가 없사옵니다.
            </div>
          ) : (
            chronicles.map((entry, idx) => (
              <div
                key={idx}
                className="relative pl-4 border-l-2 border-amber-600/40 py-1 font-batang"
              >
                {/* Timeline Dot */}
                <span className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-amber-500 shadow" />

                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-600/30">
                    {entry.yearName}
                  </span>
                  <span className="text-xs font-semibold text-stone-300">
                    {entry.title}
                  </span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed bg-stone-800/60 p-2.5 rounded-lg border border-stone-700/40">
                  {entry.chronicleLog}
                </p>

                {/* Changes badge summary */}
                <div className="flex flex-wrap gap-1.5 mt-1.5 text-[10px]">
                  {entry.statChanges.people !== undefined && entry.statChanges.people !== 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded font-mono ${
                        entry.statChanges.people > 0
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-800/40'
                          : 'bg-stone-900 text-stone-400'
                      }`}
                    >
                      민심 {entry.statChanges.people > 0 ? `+${entry.statChanges.people}` : entry.statChanges.people}
                    </span>
                  )}
                  {entry.statChanges.nobles !== undefined && entry.statChanges.nobles !== 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded font-mono ${
                        entry.statChanges.nobles > 0
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                          : 'bg-stone-900 text-stone-400'
                      }`}
                    >
                      충성 {entry.statChanges.nobles > 0 ? `+${entry.statChanges.nobles}` : entry.statChanges.nobles}
                    </span>
                  )}
                  {entry.statChanges.treasury !== undefined && entry.statChanges.treasury !== 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded font-mono ${
                        entry.statChanges.treasury > 0
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                          : 'bg-stone-900 text-stone-400'
                      }`}
                    >
                      국고 {entry.statChanges.treasury > 0 ? `+${entry.statChanges.treasury}` : entry.statChanges.treasury}
                    </span>
                  )}
                  {entry.statChanges.military !== undefined && entry.statChanges.military !== 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded font-mono ${
                        entry.statChanges.military > 0
                          ? 'bg-blue-950/80 text-blue-300 border border-blue-800/40'
                          : 'bg-stone-900 text-stone-400'
                      }`}
                    >
                      군사 {entry.statChanges.military > 0 ? `+${entry.statChanges.military}` : entry.statChanges.military}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-stone-400 font-batang">
            <Award size={14} className="text-amber-500" />
            <span>총 {chronicles.length}개의 주요 국정 결정 기록</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs font-batang transition active:scale-95 shadow"
          >
            실록 덮기
          </button>
        </div>
      </div>
    </div>
  );
};
