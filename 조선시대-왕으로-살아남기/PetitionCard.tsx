import React, { useState, useRef } from 'react';
import { EventCard, Choice, StatChanges, KingStyle } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { sound } from '../utils/sound';
import { BookOpen, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

interface PetitionCardProps {
  card: EventCard;
  kingStyle: KingStyle;
  onSelectChoice: (choice: Choice) => void;
  onPreviewChoice: (changes: StatChanges | null) => void;
}

export const PetitionCard: React.FC<PetitionCardProps> = ({
  card,
  kingStyle,
  onSelectChoice,
  onPreviewChoice,
}) => {
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showHistoryNote, setShowHistoryNote] = useState<boolean>(false);
  const [stampedChoice, setStampedChoice] = useState<'left' | 'right' | null>(null);

  const startXRef = useRef<number>(0);

  // Drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (stampedChoice) return;
    startXRef.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || stampedChoice) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    setDragOffset(diff);

    if (diff < -40) {
      onPreviewChoice(card.choiceLeft.changes);
    } else if (diff > 40) {
      onPreviewChoice(card.choiceRight.changes);
    } else {
      onPreviewChoice(null);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || stampedChoice) return;
    setIsDragging(false);

    if (dragOffset < -90) {
      commitChoice('left');
    } else if (dragOffset > 90) {
      commitChoice('right');
    } else {
      setDragOffset(0);
      onPreviewChoice(null);
    }
  };

  const commitChoice = (side: 'left' | 'right') => {
    const chosen = side === 'left' ? card.choiceLeft : card.choiceRight;
    setStampedChoice(side);
    sound.playSeal();

    setTimeout(() => {
      onSelectChoice(chosen);
      setDragOffset(0);
      setStampedChoice(null);
      onPreviewChoice(null);
      setShowHistoryNote(false);
    }, 450);
  };

  // Rotation & Opacity based on drag
  const rotation = dragOffset * 0.08;
  const clampedOffset = Math.min(180, Math.max(-180, dragOffset));
  const isLeftActive = clampedOffset < -30;
  const isRightActive = clampedOffset > 30;

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col items-center select-none px-2">
      {/* Historical Fact Toggle Pill */}
      {card.historicalNote && (
        <button
          onClick={() => {
            sound.playGayageum(440);
            setShowHistoryNote(!showHistoryNote);
          }}
          className="mb-2 flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-amber-950/60 border border-amber-600/40 text-amber-300 hover:bg-amber-900/60 transition active:scale-95 shadow-sm"
        >
          <BookOpen size={13} />
          <span>역사 속 배경지식 {showHistoryNote ? '닫기' : '보기'}</span>
        </button>
      )}

      {/* Historical Note Drawer */}
      {showHistoryNote && card.historicalNote && (
        <div className="w-full mb-3 p-3 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-xs leading-relaxed shadow-lg backdrop-blur-md animate-fadeIn">
          <div className="flex items-center gap-1 font-bold text-amber-400 mb-1">
            <Sparkles size={13} />
            <span>실록 한 토막</span>
          </div>
          <p>{card.historicalNote}</p>
        </div>
      )}

      {/* Main Draggable Petition Card */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${clampedOffset}px) rotate(${rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.25s ease-out',
        }}
        className={`relative w-full rounded-2xl bg-gradient-to-b from-stone-800 to-stone-900 border-2 border-amber-600/40 shadow-2xl p-4 flex flex-col items-center cursor-grab active:cursor-grabbing overflow-hidden ${
          stampedChoice ? 'pointer-events-none' : ''
        }`}
      >
        {/* Parchment inner panel */}
        <div className="absolute inset-2 rounded-xl bg-hanji/95 shadow-inner -z-0 opacity-95" />

        {/* Swipe Left Indicator Overlay */}
        {isLeftActive && (
          <div className="absolute top-4 left-4 z-20 border-2 border-rose-600 rounded-lg px-2.5 py-1 text-rose-700 font-extrabold text-sm rotate-[-12deg] bg-rose-100/90 shadow-md">
            {card.choiceLeft.text.slice(0, 14)}...
          </div>
        )}

        {/* Swipe Right Indicator Overlay */}
        {isRightActive && (
          <div className="absolute top-4 right-4 z-20 border-2 border-emerald-600 rounded-lg px-2.5 py-1 text-emerald-700 font-extrabold text-sm rotate-[12deg] bg-emerald-100/90 shadow-md">
            {card.choiceRight.text.slice(0, 14)}...
          </div>
        )}

        {/* Stamped Royal Seal Result Animation */}
        {stampedChoice && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
            <div
              className={`animate-stamp w-28 h-28 rounded-2xl border-4 flex flex-col items-center justify-center shadow-2xl ${
                stampedChoice === 'right'
                  ? 'border-red-700 bg-red-600/95 text-yellow-200'
                  : 'border-red-800 bg-red-700/95 text-stone-100'
              }`}
            >
              <div className="text-3xl font-extrabold font-myeongjo tracking-widest">
                {stampedChoice === 'right' ? '允許' : '不許'}
              </div>
              <div className="text-[11px] font-bold tracking-tight mt-1 opacity-90">
                {stampedChoice === 'right' ? '어명 윤허' : '어명 불허'}
              </div>
            </div>
          </div>
        )}

        {/* Header: Speaker Title & Role */}
        <div className="relative z-10 w-full flex items-center justify-between pb-2 border-b border-amber-800/20 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md border border-amber-700/20">
            {card.speakerRole}
          </span>
          <span className="text-xs font-semibold text-stone-700 font-batang truncate max-w-[170px]">
            {card.speaker}
          </span>
        </div>

        {/* Speaker Cute Chibi Avatar */}
        <div className="relative z-10 my-1 py-1">
          <CharacterAvatar
            type={card.speakerAvatar}
            speakerRole={card.speakerRole}
            kingStyle={kingStyle}
            size="lg"
            showFrame={true}
          />
        </div>

        {/* Card Title */}
        <h3 className="relative z-10 text-base font-extrabold text-stone-900 text-center font-myeongjo mt-1 mb-2 px-1 leading-snug">
          {card.title}
        </h3>

        {/* Dialogue Box (Scroll / Memorial Text) */}
        <div className="relative z-10 w-full min-h-[96px] bg-stone-100/90 rounded-xl p-3 border border-amber-900/15 shadow-inner flex items-center justify-center">
          <p className="text-stone-800 text-sm font-batang leading-relaxed text-center">
            "{card.dialogue}"
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="relative z-10 text-[10px] text-stone-500 font-medium tracking-tight mt-3 text-center">
          좌우로 카드를 밀거나 아래 결단 버튼을 누르소서
        </div>
      </div>

      {/* Quick Action Decision Buttons (Mobile-first friendly) */}
      <div className="w-full grid grid-cols-2 gap-2 mt-3 z-10">
        {/* Choice Left Button */}
        <button
          onClick={() => commitChoice('left')}
          onMouseEnter={() => onPreviewChoice(card.choiceLeft.changes)}
          onMouseLeave={() => onPreviewChoice(null)}
          className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 border-2 border-stone-600 hover:border-rose-500/80 text-left transition active:scale-95 shadow-md group"
        >
          <div className="flex items-center gap-1 text-xs font-bold text-rose-400 group-hover:text-rose-300 mb-0.5">
            <XCircle size={14} />
            <span>불허 / 반대</span>
          </div>
          <span className="text-xs font-medium text-stone-200 font-batang line-clamp-2 text-center leading-tight">
            {card.choiceLeft.text}
          </span>
          {card.choiceLeft.subtext && (
            <span className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">
              ({card.choiceLeft.subtext})
            </span>
          )}
        </button>

        {/* Choice Right Button */}
        <button
          onClick={() => commitChoice('right')}
          onMouseEnter={() => onPreviewChoice(card.choiceRight.changes)}
          onMouseLeave={() => onPreviewChoice(null)}
          className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-amber-950/80 hover:bg-amber-900/90 border-2 border-amber-700/80 hover:border-amber-400 text-left transition active:scale-95 shadow-md group"
        >
          <div className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:text-amber-300 mb-0.5">
            <CheckCircle2 size={14} />
            <span>윤허 / 결단</span>
          </div>
          <span className="text-xs font-medium text-amber-100 font-batang line-clamp-2 text-center leading-tight">
            {card.choiceRight.text}
          </span>
          {card.choiceRight.subtext && (
            <span className="text-[10px] text-amber-300/80 mt-0.5 line-clamp-1">
              ({card.choiceRight.subtext})
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
