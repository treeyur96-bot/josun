import React, { useState } from 'react';
import { CharacterAvatar } from './CharacterAvatar';
import { sound } from '../utils/sound';
import { Crown, Sparkles, BookOpen, Volume2, VolumeX, Shield, Heart, Coins } from 'lucide-react';

interface TitleScreenProps {
  onStartGame: (profile: { name: string; trait: string; initialStats: { people: number; nobles: number; treasury: number; military: number } }) => void;
  onOpenEncyclopedia: () => void;
}

interface Archetype {
  id: string;
  name: string;
  title: string;
  motif: string;
  desc: string;
  bonusText: string;
  initialStats: { people: number; nobles: number; treasury: number; military: number };
}

const ARCHETYPES: Archetype[] = [
  {
    id: 'sejong',
    name: '이도 (세종 모티브)',
    title: '성군이자 애민 학구파',
    motif: '민생과 과학을 중시하는 지혜로운 세자',
    desc: '백성의 눈물을 닦아주고 문화를 꽃피우는 성군의 길을 걷습니다.',
    bonusText: '민심 +10 (기본 60)',
    initialStats: { people: 60, nobles: 50, treasury: 50, military: 45 },
  },
  {
    id: 'taejong',
    name: '이방 (태종 모티브)',
    title: '철혈의 결단자',
    motif: '강력한 왕권과 군사력을 추구하는 패왕',
    desc: '간신과 외척을 가차 없이 숙청하고 국방을 굳건히 다집니다.',
    bonusText: '군사력 +10 (기본 60)',
    initialStats: { people: 45, nobles: 50, treasury: 50, military: 60 },
  },
  {
    id: 'gwanghae',
    name: '이원 (광해 모티브)',
    title: '난세의 실리 정치가',
    motif: '대동법과 균형외교를 추진하는 전략가',
    desc: '열강의 틈바구니에서 외교적 실리와 재정 개혁을 모색합니다.',
    bonusText: '충성도 +10 (기본 60)',
    initialStats: { people: 50, nobles: 60, treasury: 45, military: 50 },
  },
  {
    id: 'reformer',
    name: '이홍 (가상 개혁 세자)',
    title: '자유로운 신문명 개혁가',
    motif: '증기선과 대항해, 백성의 의회를 꿈꾸는 풍운아',
    desc: '구태를 벗어던지고 조선의 산업혁명과 가상 역사를 개척합니다.',
    bonusText: '국고 +10 (기본 60)',
    initialStats: { people: 50, nobles: 45, treasury: 60, military: 50 },
  },
];

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartGame,
  onOpenEncyclopedia,
}) => {
  const [selectedArch, setSelectedArch] = useState<Archetype>(ARCHETYPES[0]);
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted());
  const [showGuide, setShowGuide] = useState<boolean>(false);

  const handleMuteToggle = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  const handleStart = () => {
    sound.playGong();
    onStartGame({
      name: selectedArch.name,
      trait: selectedArch.id,
      initialStats: selectedArch.initialStats,
    });
  };

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen flex flex-col justify-between p-4 bg-dark-palace text-stone-100 select-none">
      {/* Top Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleMuteToggle}
          className="p-2 rounded-xl bg-stone-900/80 border border-amber-900/40 text-stone-300 hover:text-amber-400 transition"
          title={isMuted ? '음소거 해제' : '음소거'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playGayageum(330);
              setShowGuide(true);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-900/80 border border-amber-900/40 text-xs font-batang text-stone-300 hover:text-amber-300 transition"
          >
            <Shield size={14} className="text-amber-400" />
            <span>통치 지침서</span>
          </button>

          <button
            onClick={() => {
              sound.playGayageum(440);
              onOpenEncyclopedia();
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-900/80 border border-amber-900/40 text-xs font-batang text-amber-300 hover:bg-stone-800 transition"
          >
            <BookOpen size={14} />
            <span>묘호 도감</span>
          </button>
        </div>
      </div>

      {/* Main Title & Hero Branding */}
      <div className="flex flex-col items-center text-center my-auto py-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-2 bg-amber-950/80 border border-amber-600/40 text-amber-300 shadow">
          <Crown size={14} />
          <span>조선 왕실 정치 생존 시뮬레이션</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-myeongjo text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 drop-shadow-lg tracking-tight">
          조선시대 왕으로<br />살아남기
        </h1>

        <p className="text-xs text-stone-400 font-batang mt-1 max-w-xs leading-relaxed">
          동궁의 세자부터 시작하여 민심과 충성도를 다스리고,<br />
          역사적 사건과 가상 역사를 쓰며 살아남으소서.
        </p>

        {/* Selected Prince Chibi Preview */}
        <div className="my-3 relative">
          <CharacterAvatar
            type="prince"
            size="xl"
            kingStyle="neutral"
            phase="prince"
            showFrame={true}
          />
          <div className="absolute -bottom-2 inset-x-0 flex justify-center">
            <span className="px-3 py-0.5 rounded-full bg-stone-900 text-amber-300 text-[11px] font-bold border border-amber-600/60 shadow">
              {selectedArch.title}
            </span>
          </div>
        </div>

        {/* Archetype Selector Radio Grid */}
        <div className="w-full grid grid-cols-2 gap-2 mt-4 text-left">
          {ARCHETYPES.map((arch) => {
            const isSelected = selectedArch.id === arch.id;
            return (
              <button
                key={arch.id}
                onClick={() => {
                  sound.playGayageum(350);
                  setSelectedArch(arch);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-amber-950/80 border-amber-400 shadow-lg ring-1 ring-amber-400/50'
                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="text-xs font-bold font-myeongjo text-amber-200">
                  {arch.name}
                </div>
                <div className="text-[10px] text-amber-400/90 font-medium truncate">
                  {arch.title}
                </div>
                <div className="text-[10px] text-emerald-400 font-mono mt-1 font-semibold">
                  {arch.bonusText}
                </div>
              </button>
            );
          })}
        </div>

        {/* Description of Chosen Prince */}
        <div className="w-full mt-2.5 p-2.5 rounded-xl bg-stone-950/70 border border-stone-800 text-[11px] text-stone-300 font-batang text-center leading-relaxed">
          {selectedArch.desc}
        </div>
      </div>

      {/* Start Button */}
      <div className="w-full pb-2">
        <button
          onClick={handleStart}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-700 via-amber-600 to-red-700 hover:from-red-600 hover:to-amber-500 text-yellow-100 font-extrabold text-base font-myeongjo tracking-wider shadow-2xl active:scale-95 transition border border-amber-400/40 animate-royal-glow"
        >
          세자 책봉 및 통치 시작하기
        </button>
        <p className="text-[10px] text-center text-stone-500 mt-2 font-batang">
          호흡: 약 15~20분 (30~40턴) | 16종 멀티 엔딩 수집
        </p>
      </div>

      {/* Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-sm rounded-2xl bg-stone-900 border-2 border-amber-600/60 p-4 shadow-2xl text-stone-200 font-batang">
            <h3 className="text-base font-bold font-myeongjo text-amber-300 mb-2 flex items-center gap-1.5">
              <Shield size={16} />
              <span>조선 왕실 통치 생존 지침</span>
            </h3>
            <div className="space-y-2 text-xs leading-relaxed text-stone-300">
              <p>
                <strong>1. 4대 수치 관리:</strong> <span className="text-rose-400">민심</span>, <span className="text-amber-400">충성도</span>, <span className="text-emerald-400">국고</span>, <span className="text-blue-400">군사력</span> 중 어느 하나라도 <strong>0</strong>이 되면 민란, 독살, 국가부도, 외침 등으로 왕위에서 쫓겨납니다!
              </p>
              <p>
                <strong>2. 세자에서 즉위로:</strong> 세자 시절의 군주 수업을 거쳐 부왕이 승하하면 옥좌에 올라 붉은 곤룡포를 입고 진정한 치세를 펼칩니다.
              </p>
              <p>
                <strong>3. 가상 역사 분기:</strong> 치세 중후반에는 성리학의 틀을 벗어나 <em>증기기관 산업혁명</em>, <em>북벌 만주수복</em>, <em>해양무역 제국</em>, <em>만백성 의회</em> 등의 가상 역사를 쓸 수 있습니다.
              </p>
              <p>
                <strong>4. 실록과 묘호:</strong> 매 턴 전하가 내린 어명이 조선왕조실록에 기록되며, 퇴임 시 사관의 직필과 함께 영원한 묘호(廟號)가 부여됩니다.
              </p>
            </div>
            <button
              onClick={() => setShowGuide(false)}
              className="w-full mt-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs"
            >
              지침 확인 완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
