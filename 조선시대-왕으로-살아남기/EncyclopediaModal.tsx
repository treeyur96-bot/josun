import React from 'react';
import { ENDINGS } from '../data/endings';
import { X, Award, Lock, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface EncyclopediaModalProps {
  unlockedEndingIds: string[];
  onClose: () => void;
}

export const EncyclopediaModal: React.FC<EncyclopediaModalProps> = ({
  unlockedEndingIds,
  onClose,
}) => {
  const allEndings = Object.values(ENDINGS);
  const total = allEndings.length;
  const unlockedCount = unlockedEndingIds.length;
  const percentage = Math.round((unlockedCount / total) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-stone-900 border-2 border-amber-600/60 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-amber-950/70 border-b border-amber-700/40">
          <div className="flex items-center gap-2 text-amber-300">
            <Award size={20} />
            <h2 className="font-myeongjo font-bold text-base tracking-wide">
              조선 제왕 묘호 도감 (廟號 圖鑑)
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

        {/* Collection Progress Bar */}
        <div className="px-4 py-2.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="text-xs font-batang text-stone-300">
            수집률: <span className="font-bold text-amber-400">{unlockedCount}</span> / {total} ({percentage}%)
          </div>
          <div className="w-32 h-2 bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Ending Grid List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 bg-royal-pattern">
          {allEndings.map((ending) => {
            const isUnlocked = unlockedEndingIds.includes(ending.id);

            return (
              <div
                key={ending.id}
                className={`p-3 rounded-xl border transition-all ${
                  isUnlocked
                    ? 'bg-stone-800/80 border-amber-600/50 shadow-md'
                    : 'bg-stone-950/50 border-stone-800 opacity-65'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {isUnlocked ? (
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    ) : (
                      <Lock size={16} className="text-stone-500 shrink-0" />
                    )}
                    <div>
                      <h4
                        className={`text-sm font-bold font-myeongjo ${
                          isUnlocked ? 'text-amber-300' : 'text-stone-400'
                        }`}
                      >
                        {isUnlocked ? ending.templeName : '봉인된 묘호'}
                      </h4>
                      <p className="text-[11px] text-stone-400 font-batang">
                        {isUnlocked ? ending.title : '특정 국정 운영 또는 가상 역사 달성 시 해금'}
                      </p>
                    </div>
                  </div>

                  {isUnlocked && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ending.isVictory
                          ? 'bg-amber-900/60 text-amber-300 border border-amber-600/40'
                          : 'bg-rose-950/60 text-rose-300 border border-rose-700/40'
                      }`}
                    >
                      {ending.isVictory ? '대업 성취' : '퇴진/폐위'}
                    </span>
                  )}
                </div>

                {isUnlocked && (
                  <p className="text-xs text-stone-300 font-batang mt-2 pl-6 leading-relaxed line-clamp-2">
                    "{ending.epithet}"
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-950 border-t border-stone-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-batang font-bold transition active:scale-95"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
