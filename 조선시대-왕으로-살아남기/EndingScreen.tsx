import React from 'react';
import { Ending, KingStyle } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { Scroll, RotateCcw, BookOpen, Crown, Skull } from 'lucide-react';
import { sound } from '../utils/sound';

interface EndingScreenProps {
  ending: Ending;
  kingName: string;
  kingStyle: KingStyle;
  turnsSurvived: number;
  finalStats: { people: number; nobles: number; treasury: number; military: number };
  onRestart: () => void;
  onOpenChronicle: () => void;
  onOpenEncyclopedia: () => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
  ending,
  kingName,
  kingStyle,
  turnsSurvived,
  finalStats,
  onRestart,
  onOpenChronicle,
  onOpenEncyclopedia,
}) => {
  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen flex flex-col justify-between p-4 bg-dark-palace text-stone-100 select-none animate-fadeIn">
      {/* Top Banner */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border shadow-lg bg-stone-900 border-amber-600/50">
          {ending.isVictory ? (
            <>
              <Crown size={14} className="text-amber-400" />
              <span className="text-amber-300 font-batang">태평성대와 대업 달성</span>
            </>
          ) : (
            <>
              <Skull size={14} className="text-rose-400" />
              <span className="text-rose-300 font-batang">비운의 퇴진과 몰락</span>
            </>
          )}
        </div>

        {/* Temple Name (묘호) */}
        <h1 className="text-2xl sm:text-3xl font-extrabold font-myeongjo text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200 drop-shadow">
          {ending.templeName}
        </h1>
        <p className="text-sm font-semibold text-amber-500 font-batang mt-0.5">
          {ending.title}
        </p>
      </div>

      {/* Main Visual & Epithet Card */}
      <div className="my-3 rounded-2xl bg-stone-900/90 border-2 border-amber-600/40 p-4 shadow-2xl relative overflow-hidden flex flex-col items-center">
        {/* Hanji texture background */}
        <div className="absolute inset-0 bg-hanji/10 pointer-events-none" />

        {/* King Avatar */}
        <div className="relative my-1">
          <CharacterAvatar
            type="king"
            kingStyle={ending.isVictory ? kingStyle : (kingStyle === 'iron' ? 'iron' : 'tyrant')}
            phase="reign"
            size="xl"
            showFrame={true}
          />
        </div>

        {/* Epithet badge */}
        <div className="mt-2 px-3 py-1 rounded-lg bg-amber-950/70 border border-amber-600/40 text-amber-300 text-xs font-bold text-center">
          "{ending.epithet}"
        </div>

        {/* Description */}
        <p className="text-xs text-stone-300 font-batang text-center leading-relaxed mt-3 px-2">
          {ending.description}
        </p>

        {/* Scribe's Review (사관의 논평) */}
        <div className="w-full mt-3 p-3 rounded-xl bg-stone-950/80 border border-amber-900/40 text-stone-300">
          <div className="text-[11px] font-bold text-amber-400 mb-1 flex items-center gap-1 font-myeongjo">
            <Scroll size={12} />
            <span>사신(史臣)의 직필(直筆)</span>
          </div>
          <p className="text-xs font-batang leading-relaxed italic text-stone-400">
            "{ending.sasinReview}"
          </p>
        </div>

        {/* Final Stats Summary Pill Grid */}
        <div className="w-full grid grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-stone-800 text-center text-[10px]">
          <div className="bg-stone-950/60 p-1 rounded border border-rose-900/40">
            <span className="text-stone-400 block">민심</span>
            <span className="font-bold text-rose-400">{finalStats.people}</span>
          </div>
          <div className="bg-stone-950/60 p-1 rounded border border-amber-900/40">
            <span className="text-stone-400 block">충성</span>
            <span className="font-bold text-amber-400">{finalStats.nobles}</span>
          </div>
          <div className="bg-stone-950/60 p-1 rounded border border-emerald-900/40">
            <span className="text-stone-400 block">국고</span>
            <span className="font-bold text-emerald-400">{finalStats.treasury}</span>
          </div>
          <div className="bg-stone-950/60 p-1 rounded border border-blue-900/40">
            <span className="text-stone-400 block">군사</span>
            <span className="font-bold text-blue-400">{finalStats.military}</span>
          </div>
        </div>

        <div className="mt-2 text-[11px] text-stone-400 font-mono">
          총 <span className="text-amber-400 font-bold">{turnsSurvived}</span>개 국정 연차 통치
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pb-2">
        <button
          onClick={() => {
            sound.playGong();
            onRestart();
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-extrabold text-sm font-batang flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
        >
          <RotateCcw size={16} />
          <span>새로운 왕세자로 다시 즉위하기</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              sound.playGayageum(392);
              onOpenChronicle();
            }}
            className="py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-xs font-bold font-batang flex items-center justify-center gap-1.5 transition active:scale-95 shadow"
          >
            <Scroll size={14} className="text-amber-400" />
            <span>조선왕조실록 열람</span>
          </button>

          <button
            onClick={() => {
              sound.playGayageum(440);
              onOpenEncyclopedia();
            }}
            className="py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-xs font-bold font-batang flex items-center justify-center gap-1.5 transition active:scale-95 shadow"
          >
            <BookOpen size={14} className="text-amber-400" />
            <span>엔딩 도감 (수집)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
