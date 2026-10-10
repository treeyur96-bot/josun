import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { EventCard, Choice, StatChanges, KingStyle, AltHistoryPath, ChronicleEntry, Ending, GamePhase } from './types';
import { EVENTS } from './data/events';
import { ENDINGS } from './data/endings';
import { StatBar } from './components/StatBar';
import { PetitionCard } from './components/PetitionCard';
import { CharacterAvatar } from './components/CharacterAvatar';
import { TitleScreen } from './components/TitleScreen';
import { EndingScreen } from './components/EndingScreen';
import { ChronicleModal } from './components/ChronicleModal';
import { EncyclopediaModal } from './components/EncyclopediaModal';
import { sound } from './utils/sound';
import { Scroll, Award, Sparkles, Volume2, VolumeX, Shield, Crown } from 'lucide-react';

const STORAGE_KEY = 'joseon_king_unlocked_endings';

export default function App() {
  const [gameState, setGameState] = useState<'title' | 'playing' | 'ended'>('title');
  const [kingName, setKingName] = useState<string>('이도');
  const [kingStyle, setKingStyle] = useState<KingStyle>('neutral');
  const [phase, setPhase] = useState<GamePhase>('prince');
  const [turn, setTurn] = useState<number>(1);
  const [altPath, setAltPath] = useState<AltHistoryPath>('none');

  // Core Stats
  const [stats, setStats] = useState({
    people: 50,
    nobles: 50,
    treasury: 50,
    military: 50,
  });

  const [previewChanges, setPreviewChanges] = useState<StatChanges | null>(null);
  const [chronicles, setChronicles] = useState<ChronicleEntry[]>([]);
  const [usedCardIds, setUsedCardIds] = useState<Set<string>>(new Set());
  const [currentCard, setCurrentCard] = useState<EventCard | null>(null);
  const [finalEnding, setFinalEnding] = useState<Ending | null>(null);

  // Modals & UI
  const [showChronicle, setShowChronicle] = useState<boolean>(false);
  const [showEncyclopedia, setShowEncyclopedia] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted());

  // Ending collection persistence
  const [unlockedEndings, setUnlockedEndings] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveUnlockedEnding = useCallback((endingId: string) => {
    setUnlockedEndings((prev) => {
      if (prev.includes(endingId)) return prev;
      const updated = [...prev, endingId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  }, []);

  // Compute Year Label
  const yearName = useMemo(() => {
    if (phase === 'prince') {
      return `세자(世子) ${turn}년`;
    }
    const reignYear = turn - 6;
    if (reignYear <= 0) return '즉위의 해 (元年)';
    return `즉위 ${reignYear}년`;
  }, [phase, turn]);

  // Style tallies for dynamic King evaluation
  const [styleTally, setStyleTally] = useState({
    virtuous: 0,
    iron: 0,
    reformer: 0,
    tyrant: 0,
  });

  // Pick Next Card
  const getNextCard = useCallback((currentTurn: number, currentPhase: GamePhase, currentAlt: AltHistoryPath, usedSet: Set<string>): EventCard => {
    // Turn 6: Coronation Event
    if (currentTurn === 6) {
      const coronationCard = EVENTS.find((c) => c.id === 'prince_06_coronation_eve');
      if (coronationCard) return coronationCard;
    }

    // Turn 16: Alt History Crossroads
    if (currentTurn === 16) {
      const branchCard = EVENTS.find((c) => c.id === 'branch_crossroads');
      if (branchCard) return branchCard;
    }

    // Crisis condition check (< 22 in any stat)
    if (stats.people < 22) {
      const revoltCard = EVENTS.find((c) => c.id === 'crisis_rebellion_hint' && !usedSet.has(c.id));
      if (revoltCard) return revoltCard;
    }
    if (stats.nobles < 22) {
      const coupCard = EVENTS.find((c) => c.id === 'crisis_noble_coup_hint' && !usedSet.has(c.id));
      if (coupCard) return coupCard;
    }

    // Filter cards for current phase
    const candidates = EVENTS.filter((card) => {
      if (usedSet.has(card.id)) return false;
      if (card.requiresAltPath && card.requiresAltPath !== currentAlt) return false;

      if (currentPhase === 'prince') {
        return card.phase === 'prince';
      }
      if (currentPhase === 'alt_history') {
        return card.phase === 'alt_history' || card.phase === 'reign' || card.phase === 'any';
      }
      return card.phase === 'reign' || card.phase === 'any';
    });

    if (candidates.length > 0) {
      const randomIndex = Math.floor(Math.random() * candidates.length);
      return candidates[randomIndex];
    }

    // If candidate pool exhausted, pick any non-prince or loop
    const fallback = EVENTS.filter((c) => c.phase !== 'prince');
    return fallback[Math.floor(Math.random() * fallback.length)] || EVENTS[0];
  }, [stats]);

  // Start new game
  const handleStartGame = (profile: { name: string; trait: string; initialStats: { people: number; nobles: number; treasury: number; military: number } }) => {
    setKingName(profile.name);
    setStats(profile.initialStats);
    setTurn(1);
    setPhase('prince');
    setAltPath('none');
    setKingStyle('neutral');
    setStyleTally({ virtuous: 0, iron: 0, reformer: 0, tyrant: 0 });
    setChronicles([]);
    setUsedCardIds(new Set());
    setFinalEnding(null);

    const firstCard = EVENTS.find((c) => c.id === 'prince_01_study') || EVENTS[0];
    setCurrentCard(firstCard);
    setGameState('playing');
  };

  // Choice Selection & Game Loop
  const handleSelectChoice = (choice: Choice) => {
    // 1. Calculate new stats
    const newStats = {
      people: Math.max(0, Math.min(100, stats.people + (choice.changes.people || 0))),
      nobles: Math.max(0, Math.min(100, stats.nobles + (choice.changes.nobles || 0))),
      treasury: Math.max(0, Math.min(100, stats.treasury + (choice.changes.treasury || 0))),
      military: Math.max(0, Math.min(100, stats.military + (choice.changes.military || 0))),
    };

    setStats(newStats);

    // 2. Play tension warning if any stat drops into danger zone
    if (newStats.people <= 20 || newStats.nobles <= 20 || newStats.treasury <= 20 || newStats.military <= 20) {
      sound.playWarning();
    }

    // 3. Record King style impact
    let currentStyle = kingStyle;
    if (choice.kingStyleImpact && choice.kingStyleImpact !== 'neutral') {
      const newTally = {
        ...styleTally,
        [choice.kingStyleImpact]: styleTally[choice.kingStyleImpact] + 1,
      };
      setStyleTally(newTally);

      // Determine dominant style
      const entries = Object.entries(newTally) as [KingStyle, number][];
      entries.sort((a, b) => b[1] - a[1]);
      if (entries[0][1] >= 2) {
        currentStyle = entries[0][0];
        setKingStyle(currentStyle);
      }
    }

    // 4. Update Alt History trigger
    let currentAlt = altPath;
    if (choice.altPathTrigger) {
      currentAlt = choice.altPathTrigger;
      setAltPath(currentAlt);
      setPhase('alt_history');
      sound.playTriumph();
    }

    // 5. Record chronicle entry
    if (currentCard) {
      const entry: ChronicleEntry = {
        turn,
        yearName,
        title: currentCard.title,
        speaker: currentCard.speaker,
        decisionText: choice.text,
        chronicleLog: choice.chronicleLog,
        statChanges: choice.changes,
      };
      setChronicles((prev) => [entry, ...prev]);
    }

    // 6. Check Game Over Conditions
    if (newStats.people <= 0) {
      triggerEnding(ENDINGS.peasant_revolt);
      return;
    }
    if (newStats.nobles <= 0) {
      triggerEnding(phase === 'prince' ? ENDINGS.deposed_prince : ENDINGS.puppet_poisoned);
      return;
    }
    if (newStats.treasury <= 0) {
      triggerEnding(ENDINGS.treasury_bankruptcy);
      return;
    }
    if (newStats.military <= 0) {
      triggerEnding(ENDINGS.military_collapse);
      return;
    }

    // Phase transition check: After coronation (turn 6) -> Reign phase
    let nextPhase = phase;
    if (turn === 6) {
      nextPhase = 'reign';
      setPhase('reign');
      sound.playTriumph();
    }

    // Turn 28+: Victory Climax Endings
    if (turn >= 26) {
      handleVictoryEnding(currentAlt, currentStyle, newStats);
      return;
    }

    // Advance turn & pick next card
    const nextTurn = turn + 1;
    setTurn(nextTurn);

    const nextUsed = new Set(usedCardIds);
    if (currentCard) nextUsed.add(currentCard.id);
    setUsedCardIds(nextUsed);

    const nextCard = getNextCard(nextTurn, nextPhase, currentAlt, nextUsed);
    setCurrentCard(nextCard);
  };

  const handleVictoryEnding = (
    currentAlt: AltHistoryPath,
    currentStyle: KingStyle,
    finalStats: { people: number; nobles: number; treasury: number; military: number }
  ) => {
    sound.playTriumph();

    if (currentAlt === 'science') {
      triggerEnding(ENDINGS.steampunk_revolution);
    } else if (currentAlt === 'conquest') {
      triggerEnding(ENDINGS.conquest_empire);
    } else if (currentAlt === 'navy') {
      triggerEnding(ENDINGS.maritime_empire);
    } else if (currentAlt === 'democracy') {
      triggerEnding(ENDINGS.democratic_reformer);
    } else if (currentStyle === 'virtuous') {
      if (finalStats.people >= 75 && finalStats.nobles >= 60) {
        triggerEnding(ENDINGS.immortal_reign);
      } else {
        triggerEnding(ENDINGS.sage_king);
      }
    } else if (currentStyle === 'iron') {
      triggerEnding(ENDINGS.iron_king);
    } else if (currentStyle === 'tyrant') {
      triggerEnding(ENDINGS.tyrant_dethroned);
    } else {
      triggerEnding(ENDINGS.peaceful_caretaker);
    }
  };

  const triggerEnding = (ending: Ending) => {
    if (!ending.isVictory) {
      sound.playRuin();
    }
    setFinalEnding(ending);
    saveUnlockedEnding(ending.id);
    setGameState('ended');
  };

  return (
    <div className="w-full min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans select-none">
      {/* 1. Title Screen */}
      {gameState === 'title' && (
        <TitleScreen
          onStartGame={handleStartGame}
          onOpenEncyclopedia={() => setShowEncyclopedia(true)}
        />
      )}

      {/* 2. Main Gameplay Screen */}
      {gameState === 'playing' && currentCard && (
        <div className="w-full max-w-md mx-auto min-h-screen flex flex-col justify-between bg-dark-palace relative">
          {/* Top Stat Bar */}
          <StatBar
            people={stats.people}
            nobles={stats.nobles}
            treasury={stats.treasury}
            military={stats.military}
            previewChanges={previewChanges}
          />

          {/* Reign Sub-header */}
          <div className="px-3 py-1.5 flex items-center justify-between border-b border-amber-900/20 bg-stone-950/40 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-myeongjo font-extrabold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-600/30 text-[11px]">
                {yearName}
              </span>
              <span className="text-[10px] text-stone-400 font-batang">
                {phase === 'prince' ? '동궁 시절' : phase === 'alt_history' ? '가상역사 신시대' : '치세'}
              </span>
            </div>

            {/* King Badge & Action Quick Modals */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playGayageum(300);
                  setShowChronicle(true);
                }}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-[11px] font-batang border border-stone-700 active:scale-95 transition"
              >
                <Scroll size={12} className="text-amber-400" />
                <span>실록</span>
              </button>

              <button
                onClick={() => {
                  const muted = sound.toggleMute();
                  setIsMuted(muted);
                }}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-200"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </div>

          {/* Center Stage: The King's Dynamic Mini Status Header */}
          <div className="flex items-center justify-center gap-2 py-1 px-4 text-center">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-amber-600/50 bg-stone-900 flex items-center justify-center shadow">
              <CharacterAvatar
                type={phase === 'prince' ? 'prince' : 'king'}
                kingStyle={kingStyle}
                phase={phase}
                size="sm"
                showFrame={false}
              />
            </div>
            <div className="text-left leading-none">
              <div className="text-xs font-bold font-myeongjo text-amber-200">
                {kingName}
              </div>
              <div className="text-[9px] text-stone-400 font-batang">
                성향: {
                  kingStyle === 'virtuous' ? '성군(聖君) 지향' :
                  kingStyle === 'iron' ? '철혈(鐵血) 패도' :
                  kingStyle === 'reformer' ? '개혁(改革) 군주' :
                  kingStyle === 'tyrant' ? '폭군(暴君) 위험' : '수성(守成) 군주'
                }
              </div>
            </div>
          </div>

          {/* Interactive Petition Card (The Reigns Core) */}
          <div className="flex-1 flex items-center justify-center py-2">
            <PetitionCard
              card={currentCard}
              kingStyle={kingStyle}
              onSelectChoice={handleSelectChoice}
              onPreviewChoice={setPreviewChanges}
            />
          </div>

          {/* Bottom Footnote & Turn Counter */}
          <div className="py-2 px-3 text-center text-[10px] text-stone-500 font-mono border-t border-stone-900">
            국정 턴: {turn} / 28 {altPath !== 'none' && `• 가상역사 [${
              altPath === 'science' ? '증기기관' :
              altPath === 'conquest' ? '북벌정벌' :
              altPath === 'navy' ? '해양무역' : '입헌민주'
            }]`}
          </div>
        </div>
      )}

      {/* 3. Ending Screen */}
      {gameState === 'ended' && finalEnding && (
        <EndingScreen
          ending={finalEnding}
          kingName={kingName}
          kingStyle={kingStyle}
          turnsSurvived={turn}
          finalStats={stats}
          onRestart={() => setGameState('title')}
          onOpenChronicle={() => setShowChronicle(true)}
          onOpenEncyclopedia={() => setShowEncyclopedia(true)}
        />
      )}

      {/* Modals */}
      {showChronicle && (
        <ChronicleModal
          chronicles={chronicles}
          kingName={kingName}
          onClose={() => setShowChronicle(false)}
        />
      )}

      {showEncyclopedia && (
        <EncyclopediaModal
          unlockedEndingIds={unlockedEndings}
          onClose={() => setShowEncyclopedia(false)}
        />
      )}
    </div>
  );
}
