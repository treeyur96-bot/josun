export type StatType = 'people' | 'nobles' | 'treasury' | 'military';

export type GamePhase = 'prince' | 'reign' | 'alt_history' | 'ended';

export type KingStyle = 'virtuous' | 'iron' | 'reformer' | 'tyrant' | 'neutral';

export type AltHistoryPath = 'none' | 'science' | 'conquest' | 'navy' | 'democracy';

export interface StatChanges {
  people?: number;
  nobles?: number;
  treasury?: number;
  military?: number;
}

export interface Choice {
  text: string;
  subtext?: string;
  changes: StatChanges;
  kingStyleImpact?: KingStyle;
  chronicleLog: string;
  nextCardId?: string;
  altPathTrigger?: AltHistoryPath;
}

export type AvatarType = 
  | 'king'
  | 'prince'
  | 'minister'
  | 'scholar'
  | 'general'
  | 'queen'
  | 'commoner'
  | 'envoy_qing'
  | 'envoy_west'
  | 'eunuch'
  | 'chronicler'
  | 'merchant';

export interface EventCard {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  speakerAvatar: AvatarType;
  dialogue: string;
  historicalNote?: string;
  phase: 'prince' | 'reign' | 'alt_history' | 'crisis' | 'any';
  choiceLeft: Choice;
  choiceRight: Choice;
  requiresAltPath?: AltHistoryPath;
  minYear?: number;
  maxYear?: number;
  triggerOnce?: boolean;
}

export interface ChronicleEntry {
  turn: number;
  yearName: string;
  title: string;
  speaker: string;
  decisionText: string;
  chronicleLog: string;
  statChanges: StatChanges;
}

export interface Ending {
  id: string;
  templeName: string; // 묘호 (예: 성종대왕, 태종대왕, 노산군, 연산군)
  title: string;
  epithet: string; // 칭호 (예: 만백성의 성군, 철혈의 패자)
  description: string;
  sasinReview: string; // 사관의 논평 (사신은 논한다...)
  isVictory: boolean;
  category: 'virtuous' | 'iron' | 'reformer' | 'alt_history' | 'ruin' | 'death';
  badgeColor: string;
  illustrationKey: string;
}

export interface KingProfile {
  name: string;
  birthRank: string;
  title: string;
  motto: string;
}
