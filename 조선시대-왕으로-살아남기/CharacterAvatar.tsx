import React from 'react';
import { AvatarType, KingStyle, GamePhase } from '../types';

interface CharacterAvatarProps {
  type: AvatarType;
  speakerRole?: string;
  kingStyle?: KingStyle;
  phase?: GamePhase;
  age?: number;
  mood?: 'happy' | 'worried' | 'angry' | 'smug' | 'neutral';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showFrame?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  type,
  kingStyle = 'neutral',
  phase = 'prince',
  size = 'lg',
  showFrame = true,
}) => {
  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44',
  }[size];

  // Render King / Crown Prince Avatar
  if (type === 'king' || type === 'prince') {
    const isPrince = phase === 'prince' || type === 'prince';
    
    // Robe Colors
    let robeColor = '#b91c1c'; // Default Red Dragon Robe
    let robeCollar = '#7f1d1d';
    let hatColor = '#1c1917';
    let eyeType = 'normal';
    let crownJewel = '#f59e0b';

    if (isPrince) {
      robeColor = '#4338ca'; // Violet / Indigo Prince Robe (자적용포)
      robeCollar = '#312e81';
      crownJewel = '#a855f7';
    } else if (kingStyle === 'virtuous') {
      robeColor = '#dc2626'; // Bright Royal Scarlet
      robeCollar = '#991b1b';
      crownJewel = '#fbbf24';
      eyeType = 'gentle';
    } else if (kingStyle === 'iron') {
      robeColor = '#1e293b'; // Black/Iron Dragon Robe
      robeCollar = '#0f172a';
      crownJewel = '#e11d48';
      eyeType = 'sharp';
    } else if (kingStyle === 'tyrant') {
      robeColor = '#881337'; // Crimson Tyrant Robe
      robeCollar = '#4c0519';
      crownJewel = '#ef4444';
      eyeType = 'crazed';
    } else if (kingStyle === 'reformer') {
      robeColor = '#0d9488'; // Teal Reformer / Jade Robe
      robeCollar = '#115e59';
      crownJewel = '#38bdf8';
      eyeType = 'clever';
    }

    return (
      <div className={`relative ${sizeClasses} flex items-center justify-center select-none`}>
        {showFrame && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-600/30 to-amber-900/10 border-2 border-amber-500/40 shadow-inner" />
        )}
        <svg viewBox="0 0 140 140" className="w-full h-full drop-shadow-md">
          {/* Subtle back aura for virtuous or tyrant */}
          {kingStyle === 'virtuous' && !isPrince && (
            <circle cx="70" cy="70" r="58" fill="url(#virtueGlow)" opacity="0.4" />
          )}
          {kingStyle === 'iron' && !isPrince && (
            <circle cx="70" cy="70" r="58" fill="url(#ironGlow)" opacity="0.3" />
          )}

          <defs>
            <radialGradient id="virtueGlow">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="ironGlow">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="dragonBadge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Shoulders & Robe */}
          <path
            d="M 25 125 C 25 96, 42 88, 70 88 C 98 88, 115 96, 115 125 Z"
            fill={robeColor}
          />
          {/* Robe Collar (Dongjeong) */}
          <path
            d="M 52 88 L 70 110 L 88 88 L 76 88 L 70 98 L 64 88 Z"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          <path
            d="M 55 92 L 70 113 L 85 92"
            fill="none"
            stroke={robeCollar}
            strokeWidth="3"
          />

          {/* Dragon Badge (용보) */}
          <circle cx="70" cy="116" r="10" fill="url(#dragonBadge)" stroke="#b45309" strokeWidth="1.2" />
          {/* Mini dragon icon on badge */}
          <path
            d="M 66 114 Q 70 111 74 114 Q 72 118 68 118 Z"
            fill="#78350f"
          />

          {/* Head & Face */}
          <ellipse cx="70" cy="62" rx="27" ry="25" fill="#fde68a" />

          {/* Cute Rosy Blushes */}
          <ellipse cx="50" cy="69" rx="5" ry="3" fill="#f43f5e" opacity={isPrince ? 0.5 : 0.3} />
          <ellipse cx="90" cy="69" rx="5" ry="3" fill="#f43f5e" opacity={isPrince ? 0.5 : 0.3} />

          {/* Eyes & Eyebrows based on personality */}
          {eyeType === 'gentle' ? (
            <>
              {/* Smiling curved crescent eyes */}
              <path d="M 53 62 Q 59 58 65 63" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 75 63 Q 81 58 87 62" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Soft smile */}
              <path d="M 64 72 Q 70 77 76 72" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : eyeType === 'sharp' ? (
            <>
              {/* Fierce eyebrows */}
              <path d="M 50 54 L 64 57" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M 90 54 L 76 57" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" />
              {/* Piercing eyes */}
              <circle cx="58" cy="63" r="3.5" fill="#0f172a" />
              <circle cx="82" cy="63" r="3.5" fill="#0f172a" />
              {/* Determined mouth */}
              <path d="M 65 74 L 75 74" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : eyeType === 'crazed' ? (
            <>
              {/* Wild raised brows */}
              <path d="M 50 53 Q 58 52 64 58" stroke="#4c0519" strokeWidth="3" fill="none" />
              <path d="M 90 53 Q 82 52 76 58" stroke="#4c0519" strokeWidth="3" fill="none" />
              {/* Red tinted eyes */}
              <circle cx="58" cy="63" r="4.5" fill="#fecdd3" stroke="#e11d48" strokeWidth="2" />
              <circle cx="58" cy="63" r="1.8" fill="#881337" />
              <circle cx="82" cy="63" r="4.5" fill="#fecdd3" stroke="#e11d48" strokeWidth="2" />
              <circle cx="82" cy="63" r="1.8" fill="#881337" />
              {/* Smirking mouth */}
              <path d="M 63 74 Q 71 80 78 72" stroke="#881337" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : eyeType === 'clever' ? (
            <>
              {/* Smart eyebrows */}
              <path d="M 52 56 Q 59 54 65 57" stroke="#134e4a" strokeWidth="2.5" fill="none" />
              <path d="M 88 56 Q 81 54 75 57" stroke="#134e4a" strokeWidth="2.5" fill="none" />
              <circle cx="58" cy="63" r="3.8" fill="#134e4a" />
              <circle cx="82" cy="63" r="3.8" fill="#134e4a" />
              <circle cx="59.5" cy="61.5" r="1.2" fill="#ffffff" />
              <circle cx="83.5" cy="61.5" r="1.2" fill="#ffffff" />
              {/* Golden round spectacles (안경) for reformer! */}
              <circle cx="58" cy="63" r="8" fill="none" stroke="#ca8a04" strokeWidth="1.5" opacity="0.8" />
              <circle cx="82" cy="63" r="8" fill="none" stroke="#ca8a04" strokeWidth="1.5" opacity="0.8" />
              <line x1="66" y1="63" x2="74" y2="63" stroke="#ca8a04" strokeWidth="1.5" />
              <path d="M 66 73 Q 70 76 74 73" stroke="#134e4a" strokeWidth="2" fill="none" />
            </>
          ) : (
            <>
              {/* Normal Crown Prince / Standard Young King */}
              <circle cx="58" cy="63" r="4" fill="#1c1917" />
              <circle cx="82" cy="63" r="4" fill="#1c1917" />
              {/* Eye sparkle */}
              <circle cx="56.5" cy="61" r="1.5" fill="#ffffff" />
              <circle cx="80.5" cy="61" r="1.5" fill="#ffffff" />
              <path d="M 65 73 Q 70 77 75 73" stroke="#78350f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </>
          )}

          {/* Headwear: 복건 (Prince) vs 익선관 (King) */}
          {isPrince ? (
            // Prince Bokgeon / Hogun (귀여운 복건)
            <g>
              <path
                d="M 40 46 C 42 22, 60 16, 70 16 C 80 16, 98 22, 100 46 C 100 48, 40 48, 40 46 Z"
                fill={hatColor}
              />
              {/* Back ribbons flowing down */}
              <path d="M 44 44 C 36 60, 36 78, 38 88" stroke={hatColor} strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M 96 44 C 104 60, 104 78, 102 88" stroke={hatColor} strokeWidth="5" fill="none" strokeLinecap="round" />
              {/* Golden prince emblem */}
              <circle cx="70" cy="30" r="4" fill={crownJewel} />
              <path d="M 43 45 L 97 45" stroke="#f59e0b" strokeWidth="2" />
            </g>
          ) : (
            // Royal Ikseongwan (익선관 - 날개 달린 모자)
            <g>
              {/* Hat dome */}
              <path
                d="M 45 44 C 47 24, 60 20, 70 20 C 80 20, 93 24, 95 44 Z"
                fill={hatColor}
              />
              <rect x="42" y="42" width="56" height="7" rx="3" fill="#09090b" stroke="#3f3f46" strokeWidth="0.8" />
              {/* Ikseongwan Twin Wings (매미 날개 모양 뿔) */}
              <path
                d="M 52 24 C 48 10, 52 4, 58 6 C 63 8, 62 18, 59 23 Z"
                fill="#27272a"
                stroke="#52525b"
                strokeWidth="1"
              />
              <path
                d="M 88 24 C 92 10, 88 4, 82 6 C 77 8, 78 18, 81 23 Z"
                fill="#27272a"
                stroke="#52525b"
                strokeWidth="1"
              />
              {/* Royal center jade/gold ornament */}
              <circle cx="70" cy="27" r="3.5" fill={crownJewel} stroke="#b45309" strokeWidth="1" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // NPC Ministers & Courtiers
  return (
    <div className={`relative ${sizeClasses} flex items-center justify-center select-none`}>
      {showFrame && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-stone-700/20 to-stone-900/40 border border-stone-600/40 shadow-sm" />
      )}
      <svg viewBox="0 0 140 140" className="w-full h-full drop-shadow-md">
        {type === 'minister' && (
          // 영의정 / 판서 (원로 대신, 회색 수염과 사모)
          <g>
            {/* Robe (청록색 관복) */}
            <path d="M 28 125 C 28 98, 44 90, 70 90 C 96 90, 112 98, 112 125 Z" fill="#0f766e" />
            {/* Rank badge with crane */}
            <rect x="61" y="104" width="18" height="18" rx="2" fill="#f8fafc" stroke="#042f2e" strokeWidth="1" />
            <path d="M 70 108 L 74 116 L 66 116 Z" fill="#0f766e" />

            {/* Face & Head */}
            <ellipse cx="70" cy="65" rx="26" ry="24" fill="#fde68a" />
            <ellipse cx="52" cy="70" rx="4" ry="2.5" fill="#f43f5e" opacity="0.3" />
            <ellipse cx="88" cy="70" rx="4" ry="2.5" fill="#f43f5e" opacity="0.3" />

            {/* Dignified wise eyes */}
            <path d="M 53 64 Q 59 60 65 64" stroke="#1e293b" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            <path d="M 75 64 Q 81 60 87 64" stroke="#1e293b" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            {/* White long beard (풍성한 수염) */}
            <path d="M 60 76 Q 70 95 80 76 Q 75 73 65 73 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />

            {/* Samo (사모 - 대신 모자 양쪽 날개) */}
            <rect x="44" y="32" width="52" height="24" rx="10" fill="#18181b" />
            {/* Samo wings left & right */}
            <ellipse cx="32" cy="46" rx="15" ry="4" fill="#27272a" />
            <ellipse cx="108" cy="46" rx="15" ry="4" fill="#27272a" />
          </g>
        )}

        {type === 'scholar' && (
          // 대사헌 / 사간원 유생 (갓을 쓴 깐깐한 유학자)
          <g>
            {/* Blue Dopo Robe */}
            <path d="M 30 125 C 30 99, 45 92, 70 92 C 95 92, 110 99, 110 125 Z" fill="#1d4ed8" />
            {/* Face */}
            <ellipse cx="70" cy="67" rx="25" ry="23" fill="#fef08a" />
            {/* Serious, earnest eyes */}
            <line x1="53" y1="62" x2="63" y2="65" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="87" y1="62" x2="77" y2="65" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" />
            <circle cx="58" cy="68" r="3" fill="#0f172a" />
            <circle cx="82" cy="68" r="3" fill="#0f172a" />
            <path d="M 66 77 L 74 77" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

            {/* Traditional Gat (흑립/갓) */}
            <ellipse cx="70" cy="50" rx="48" ry="12" fill="#09090b" opacity="0.95" />
            <path d="M 52 48 L 56 22 L 84 22 L 88 48 Z" fill="#18181b" />
            {/* Gat string (갓끈) */}
            <path d="M 48 52 Q 70 98 92 52" stroke="#d97706" strokeWidth="2" fill="none" />
          </g>
        )}

        {type === 'general' && (
          // 훈련대장 (투구와 두정갑을 착용한 늠름한 무관)
          <g>
            {/* Armor (두정갑) */}
            <path d="M 26 125 C 26 96, 44 88, 70 88 C 96 88, 114 96, 114 125 Z" fill="#991b1b" />
            {/* Armor studs (두정갑 철못) */}
            <circle cx="55" cy="105" r="2" fill="#fbbf24" />
            <circle cx="70" cy="105" r="2" fill="#fbbf24" />
            <circle cx="85" cy="105" r="2" fill="#fbbf24" />
            <circle cx="62" cy="116" r="2" fill="#fbbf24" />
            <circle cx="78" cy="116" r="2" fill="#fbbf24" />

            {/* Face */}
            <ellipse cx="70" cy="63" rx="26" ry="24" fill="#fde68a" />
            {/* Fierce warrior eyes & mustache */}
            <path d="M 52 56 L 64 60" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M 88 56 L 76 60" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <circle cx="58" cy="64" r="3" fill="#000" />
            <circle cx="82" cy="64" r="3" fill="#000" />
            {/* Black mustache */}
            <path d="M 58 74 Q 70 70 82 74" stroke="#18181b" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Helmet (조선 투구 & 붉은 상모) */}
            <path d="M 44 48 C 45 28, 58 24, 70 24 C 82 24, 95 28, 96 48 Z" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
            {/* Gold dragon trident ornament */}
            <polygon points="70,12 73,24 67,24" fill="#f59e0b" />
            {/* Red plume (상모 깃) */}
            <path d="M 70 12 Q 86 6 92 18" stroke="#ef4444" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        )}

        {type === 'queen' && (
          // 중전 / 왕비 (녹원삼/당의와 기품 있는 가체/비녀)
          <g>
            {/* Green Dangui Robe */}
            <path d="M 28 125 C 28 98, 44 90, 70 90 C 96 90, 112 98, 112 125 Z" fill="#047857" />
            <circle cx="70" cy="114" r="9" fill="#f59e0b" />

            {/* Face */}
            <ellipse cx="70" cy="65" rx="25" ry="24" fill="#fffbeb" />
            <ellipse cx="51" cy="71" rx="4.5" ry="2.5" fill="#f43f5e" opacity="0.45" />
            <ellipse cx="89" cy="71" rx="4.5" ry="2.5" fill="#f43f5e" opacity="0.45" />

            {/* Elegant eyes & lips */}
            <path d="M 53 63 Q 59 58 65 62" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 75 62 Q 81 58 87 63" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="59" cy="64" r="2.5" fill="#1e293b" />
            <circle cx="81" cy="64" r="2.5" fill="#1e293b" />
            <ellipse cx="70" cy="74" rx="3.5" ry="2" fill="#e11d48" />

            {/* Traditional Royal Gache (가체 & 첩지/옥비녀) */}
            <ellipse cx="70" cy="45" rx="34" ry="16" fill="#18181b" />
            {/* Jade Hairpin (옥비녀) */}
            <line x1="32" y1="42" x2="108" y2="42" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
            <circle cx="34" cy="42" r="5" fill="#f59e0b" />
            {/* Cheopji (첩지 - 이마 장식) */}
            <rect x="66" y="47" width="8" height="6" rx="2" fill="#d97706" />
          </g>
        )}

        {type === 'commoner' && (
          // 백성 돌쇠 / 농민 (삿갓과 순박한 눈망울)
          <g>
            {/* Hemp clothes (삼베옷) */}
            <path d="M 30 125 C 30 99, 45 92, 70 92 C 95 92, 110 99, 110 125 Z" fill="#a16207" />
            {/* Face */}
            <ellipse cx="70" cy="66" rx="25" ry="23" fill="#fed7aa" />
            <ellipse cx="52" cy="71" rx="5" ry="3" fill="#f97316" opacity="0.4" />
            <ellipse cx="88" cy="71" rx="5" ry="3" fill="#f97316" opacity="0.4" />

            {/* Honest teary/pleading eyes */}
            <circle cx="58" cy="65" r="4" fill="#451a03" />
            <circle cx="82" cy="65" r="4" fill="#451a03" />
            <circle cx="56.5" cy="63.5" r="1.5" fill="#fff" />
            <circle cx="80.5" cy="63.5" r="1.5" fill="#fff" />
            <path d="M 64 76 Q 70 81 76 76" stroke="#7c2d12" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Satgat (삿갓 - 대나무 원뿔 모자) */}
            <polygon points="70,20 25,54 115,54" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
            <line x1="70" y1="20" x2="70" y2="54" stroke="#b45309" strokeWidth="1" />
            <line x1="70" y1="20" x2="45" y2="54" stroke="#b45309" strokeWidth="1" />
            <line x1="70" y1="20" x2="95" y2="54" stroke="#b45309" strokeWidth="1" />
          </g>
        )}

        {type === 'chronicler' && (
          // 사관 (모든 것을 기록하는 붓을 든 서기관)
          <g>
            <path d="M 30 125 C 30 99, 45 92, 70 92 C 95 92, 110 99, 110 125 Z" fill="#475569" />
            <ellipse cx="70" cy="65" rx="25" ry="23" fill="#fde68a" />
            {/* Quick focused eyes */}
            <circle cx="58" cy="63" r="3.5" fill="#0f172a" />
            <circle cx="82" cy="63" r="3.5" fill="#0f172a" />
            <path d="M 66 74 L 74 74" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

            {/* Scribe hat */}
            <rect x="46" y="34" width="48" height="20" rx="6" fill="#1e293b" />
            {/* Brush & Scroll */}
            <rect x="85" y="80" width="22" height="30" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            <line x1="102" y1="70" x2="92" y2="92" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            <circle cx="91" cy="94" r="2" fill="#000" />
          </g>
        )}

        {type === 'eunuch' && (
          // 도승지 / 상선 (어명을 받드는 충신)
          <g>
            <path d="M 30 125 C 30 99, 45 92, 70 92 C 95 92, 110 99, 110 125 Z" fill="#0284c7" />
            <ellipse cx="70" cy="65" rx="25" ry="23" fill="#fef08a" />
            <circle cx="58" cy="64" r="3" fill="#0f172a" />
            <circle cx="82" cy="64" r="3" fill="#0f172a" />
            <path d="M 64 74 Q 70 78 76 74" stroke="#0369a1" strokeWidth="2" fill="none" />
            <rect x="46" y="34" width="48" height="22" rx="6" fill="#0f172a" />
          </g>
        )}

        {type === 'envoy_qing' && (
          // 청나라 칙사 (청나라 관모와 공작 깃털)
          <g>
            <path d="M 28 125 C 28 98, 44 90, 70 90 C 96 90, 112 98, 112 125 Z" fill="#701a75" />
            <ellipse cx="70" cy="65" rx="26" ry="24" fill="#fde68a" />
            {/* Proud haughty look */}
            <path d="M 52 59 L 64 63" stroke="#4a044e" strokeWidth="2.5" />
            <path d="M 88 59 L 76 63" stroke="#4a044e" strokeWidth="2.5" />
            <circle cx="58" cy="65" r="3.2" fill="#4a044e" />
            <circle cx="82" cy="65" r="3.2" fill="#4a044e" />

            {/* Qing hat with red tassel & peacock feather */}
            <polygon points="70,22 40,46 100,46" fill="#18181b" />
            <circle cx="70" cy="22" r="5" fill="#dc2626" />
            <line x1="70" y1="22" x2="98" y2="12" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {type === 'envoy_west' && (
          // 서양 사절 / 과학자 (삼각모자와 망원경)
          <g>
            <path d="M 28 125 C 28 98, 44 90, 70 90 C 96 90, 112 98, 112 125 Z" fill="#3b82f6" />
            <ellipse cx="70" cy="65" rx="25" ry="24" fill="#ffedd5" />
            <circle cx="57" cy="64" r="3.5" fill="#0284c7" />
            <circle cx="83" cy="64" r="3.5" fill="#0284c7" />
            {/* Western Tricorne Hat */}
            <polygon points="70,20 30,46 110,46" fill="#1e293b" />
            <path d="M 40 46 Q 70 38 100 46" fill="#334155" />
            <circle cx="70" cy="38" r="4" fill="#fbbf24" />
          </g>
        )}
      </svg>
    </div>
  );
};
