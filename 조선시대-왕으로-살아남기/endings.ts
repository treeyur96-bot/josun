import { Ending } from '../types';

export const ENDINGS: Record<string, Ending> = {
  // 1. 성군 천추의 명군
  sage_king: {
    id: 'sage_king',
    templeName: '세종대왕 (世宗大王)',
    title: '성군 천추의 명군',
    epithet: '백성을 하늘처럼 섬긴 해동의 요순(堯舜)',
    description: '전하의 치세에 백성들은 굶주림을 잊고 노래하였으며, 학문과 문화가 눈부시게 만개하였습니다. 전하께서 남기신 훈민(訓民)의 도리와 선정은 조선 500년은 물론 후세 만대에 걸쳐 영원한 불멸의 표상이 되었습니다.',
    sasinReview: '사신(史臣)은 논한다. 전하는 하늘이 낸 성군이라. 백성의 눈물을 닦아주고 대신들의 간언을 너그러이 품었으니, 당대에 태어난 이들이 태평성대를 노래하며 늙어갔다.',
    isVictory: true,
    category: 'virtuous',
    badgeColor: 'from-amber-500 to-yellow-600',
    illustrationKey: 'crown_gold',
  },

  // 2. 철혈의 패왕
  iron_king: {
    id: 'iron_king',
    templeName: '태종대왕 (太宗大王)',
    title: '철혈의 패자이자 국본의 수호자',
    epithet: '왕권을 반석 위에 올린 철혈의 군주',
    description: '권세가들의 사병을 혁파하고 외척과 간신들을 가차 없이 숙청하여 왕권을 절대의 반석 위에 올려놓았습니다. 백성에게는 질서를, 신하들에게는 두려움과 경외를 심어 조선의 기틀을 강철처럼 다졌습니다.',
    sasinReview: '사신은 논한다. 전하의 칼날은 서슬이 퍼렇고 피비린내가 궁궐을 씻어내렸으나, 그로 인해 사직의 기틀이 굳건해지고 후대 임금이 어진 정치를 펼칠 든든한 밭을 일구었도다.',
    isVictory: true,
    category: 'iron',
    badgeColor: 'from-slate-700 to-zinc-900',
    illustrationKey: 'sword_throne',
  },

  // 3. 조선 증기기관 산업혁명
  steampunk_revolution: {
    id: 'steampunk_revolution',
    templeName: '신종대왕 (新宗大王)',
    title: '동방의 산업혁명과 과학강국',
    epithet: '화포와 증기선을 앞세워 시대를 200년 앞당긴 혁신군주',
    description: '규장각과 서양 과학을 접목하여 한양에 철마(증기기관차)가 달리고, 수력 방적기와 거대한 철공소가 전국에 들어섰습니다. 조선은 아시아 최초로 기계 문명을 꽃피운 과학 부국으로 우뚝 섰습니다.',
    sasinReview: '사신은 논한다. 연기와 쇠의 소리가 산천을 뒤흔들었으니, 유학자들은 괴이하다 탄식하였으나 만백성은 손쉽게 비단을 짜고 기근을 면했다. 천하의 문명이 조선으로부터 일어났다.',
    isVictory: true,
    category: 'alt_history',
    badgeColor: 'from-cyan-600 to-blue-800',
    illustrationKey: 'steam_engine',
  },

  // 4. 만주 수복 대제국
  conquest_empire: {
    id: 'conquest_empire',
    templeName: '무종황제 (武宗皇帝)',
    title: '북벌 성공과 삼한통합 대제국',
    epithet: '고구려의 옛 영토를 되찾고 천하를 호령한 정복군주',
    description: '철기병과 신기전을 앞세워 압록강을 넘어 요동과 만주벌판을 수복하였습니다. 대륙의 패자들과 당당히 겨루어 승리하고 조선은 칭제건원(稱帝建元)을 선포하여 거대한 제국으로 발돋움했습니다.',
    sasinReview: '사신은 논한다. 백두산 정상에 세운 비석에 전하의 무공이 새겨졌도다. 잃어버렸던 천년의 고토를 회복하였으니, 그 기상은 광개토태왕에 비견되기에 부끄러움이 없도다.',
    isVictory: true,
    category: 'alt_history',
    badgeColor: 'from-red-700 to-orange-800',
    illustrationKey: 'conquest_map',
  },

  // 5. 해양무역 거북선 선단
  maritime_empire: {
    id: 'maritime_empire',
    templeName: '해종대왕 (海宗大王)',
    title: '오대양을 누비는 해양강국',
    epithet: '바다를 지배하는 자가 세상을 지배함을 증명한 군주',
    description: '조선의 개량 거북선과 판옥선 선단이 동지나해를 넘어 태평양과 인도양으로 나아갔습니다. 도자기, 인삼, 서책을 가득 실은 상선들이 세계 각국과 교역하며 국고에 황금이 마르지 않았습니다.',
    sasinReview: '사신은 논한다. 육지에 갇혀 있던 삼천리 강토가 푸른 바다로 활짝 열렸도다. 전하의 혜안 덕분에 왜국과 남만의 온갖 보화가 한양의 저잣거리로 쏟아져 들어왔도다.',
    isVictory: true,
    category: 'alt_history',
    badgeColor: 'from-teal-600 to-cyan-900',
    illustrationKey: 'turtle_ship',
  },

  // 6. 만백성의 군주 - 입헌탕평
  democratic_reformer: {
    id: 'democratic_reformer',
    templeName: '민종대왕 (民宗大王)',
    title: '백성의 의회와 탕평의 새 시대',
    epithet: '스스로 왕권을 백성과 나누어 영원한 화합을 이룬 개혁군주',
    description: '붕당의 당파 싸움을 타파하기 위해 백성들의 대표가 모이는 민회(民會)를 창설하고, 법치와 평등의 기초를 세웠습니다. 조선은 피 한 방울 흘리지 않고 근대적 대동(大同) 세상을 열었습니다.',
    sasinReview: '사신은 논한다. 임금이 권좌를 백성에게 내어주는 것은 고금에 없던 일이었으나, 백성이 나라의 주인이 되니 역모가 사라지고 사직은 천년 동안 평안을 누리게 되었다.',
    isVictory: true,
    category: 'alt_history',
    badgeColor: 'from-emerald-600 to-teal-800',
    illustrationKey: 'reform_scroll',
  },

  // 7. 문화 르네상스 대왕
  cultural_golden: {
    id: 'cultural_golden',
    templeName: '정조대왕 (正祖大王)',
    title: '문예부흥과 태평의 황금기',
    epithet: '학문과 예술, 실사구시로 꽃피운 조선의 르네상스',
    description: '규장각을 중심으로 젊은 인재들을 대거 등용하고 실학(實學)을 진흥시켰습니다. 백성들의 삶을 살피는 어진 법령과 화려한 도성 축조로 동방의 문화 중심지로 자리매김했습니다.',
    sasinReview: '사신은 논한다. 밤늦도록 서책을 놓지 않으시며 학자들과 토론하시던 전하의 열정이 마침내 조선의 문화를 천하제일의 경지로 끌어올렸도다.',
    isVictory: true,
    category: 'virtuous',
    badgeColor: 'from-indigo-600 to-purple-800',
    illustrationKey: 'palace_books',
  },

  // 8. 조용한 수성의 군주
  peaceful_caretaker: {
    id: 'peaceful_caretaker',
    templeName: '숙종대왕 (肅宗大王)',
    title: '치밀한 환국의 수성군주',
    epithet: '당쟁의 거센 파도를 타고 국가를 온전히 지켜낸 현실주의자',
    description: '극단적인 개혁이나 무리한 대외 정벌 대신, 붕당 간의 균형을 조율하며 30년 넘게 사직을 무탈히 보전하였습니다. 격변은 없었으나 백성들은 전란 없이 평온한 세월을 보냈습니다.',
    sasinReview: '사신은 논한다. 전하는 큰 모험을 피하고 능숙하게 대신들을 저울질하였으니, 난세에 큰 흠결 없이 종묘사직을 건사한 것만으로도 노련한 군주라 이를 만하다.',
    isVictory: true,
    category: 'virtuous',
    badgeColor: 'from-blue-600 to-indigo-900',
    illustrationKey: 'court_balance',
  },

  // 9. 폭군의 말로 (폐위)
  tyrant_dethroned: {
    id: 'tyrant_dethroned',
    templeName: '폐주 (廢主) 연산',
    title: '광기의 폭군과 중종반정',
    epithet: '피의 사화와 향락 끝에 옥좌에서 끌어내려진 비운의 군주',
    description: '간언하는 신하들의 목을 베고 국고를 탕진하며 음탕한 주색에 빠졌습니다. 분노한 훈구와 사림 대신들이 군사를 일으켜 궁궐의 문을 부수고 전하를 폐위하여 절도(絶島)로 유배 보냈습니다.',
    sasinReview: '사신은 논한다. 군주가 인의(仁義)를 버리고 백성을 도탄에 빠뜨렸으니, 천명이 떠나고 사직이 뒤엎어진 것은 자업자득이라. 후세의 경계로 삼을지로다.',
    isVictory: false,
    category: 'ruin',
    badgeColor: 'from-rose-800 to-red-950',
    illustrationKey: 'broken_crown',
  },

  // 10. 신하들의 꼭두각시 (독살/폐위)
  puppet_poisoned: {
    id: 'puppet_poisoned',
    templeName: '노산군 (魯山君)',
    title: '신하들의 손아귀에 갇힌 허수아비',
    epithet: '붕당의 권력 암투 속에 쓸쓸히 사라진 비운의 어린 왕',
    description: '대신들의 충성을 얻지 못하고 눈치만 살피다, 권신들의 음모로 옥새를 빼앗기고 강원도 영월의 깊은 산골로 유배되었습니다. 차가운 골짜기에서 눈물 속에 사약을 받았습니다.',
    sasinReview: '사신은 논한다. 임금이 유약하여 권세를 간신배들에게 농단당하니, 옥좌는 허깨비요 목숨조차 남의 손에 달렸도다. 슬프도다, 군주의 위엄을 세우지 못한 비극이여.',
    isVictory: false,
    category: 'death',
    badgeColor: 'from-purple-900 to-stone-900',
    illustrationKey: 'poison_cup',
  },

  // 11. 민란과 도성 함락 (민심 0)
  peasant_revolt: {
    id: 'peasant_revolt',
    templeName: '도성 함락 (都城陷落)',
    title: '성난 민초들의 횃불과 왕조의 종말',
    epithet: '백성의 신음과 눈물을 외면하다 역사의 뒤안길로 사라진 군주',
    description: '극심한 가뭄과 가렴주구에 견디다 못한 삼남(三南)의 농민들이 쇠스랑과 죽창을 들고 들고일어났습니다. 도성은 성난 횃불에 둘러싸였고, 백성들의 분노 앞에 왕궁은 잿더미가 되었습니다.',
    sasinReview: '사신은 논한다. 백성은 물이요 임금은 배라. 물은 배를 띄우기도 하지만 배를 뒤집기도 한다는 옛말이 한 치도 틀리지 않았음을 증명한 참담한 날이로다.',
    isVictory: false,
    category: 'ruin',
    badgeColor: 'from-amber-800 to-red-900',
    illustrationKey: 'burning_palace',
  },

  // 12. 국고 파탄과 망국 (국고 0)
  treasury_bankruptcy: {
    id: 'treasury_bankruptcy',
    templeName: '국고 고갈 (國庫枯渴)',
    title: '국가 부도와 왕실의 파멸',
    epithet: '곳간이 비어 군량조차 지급하지 못하고 무너진 왕실',
    description: '궁궐에는 쌀 한 됫박조차 남지 않았고, 녹봉을 받지 못한 관리들과 군사들은 뿔뿔이 흩어졌습니다. 상인들은 등을 돌렸고 나라는 빚더미에 앉아 스스로 붕괴하고 말았습니다.',
    sasinReview: '사신은 논한다. 다스림의 근본은 백성을 먹이고 국고를 건전케 함에 있거늘, 계산 없는 낭비와 실정으로 나라의 숨통을 스스로 끊어버렸도다.',
    isVictory: false,
    category: 'ruin',
    badgeColor: 'from-stone-700 to-amber-950',
    illustrationKey: 'empty_chest',
  },

  // 13. 전란의 비극과 함락 (군사 0)
  military_collapse: {
    id: 'military_collapse',
    templeName: '삼전도의 치욕 (三田渡之恥)',
    title: '외침에 짓밟힌 무방비의 나라',
    epithet: '국방을 소홀히 하여 오랑캐의 말발굽 아래 굴욕을 겪은 군주',
    description: '군비 축소와 기강 해이로 군사력이 바닥난 틈을 타 오랑캐와 왜적이 도성을 유린하였습니다. 성벽은 무너지고 왕은 남한산성에서 눈물을 머금고 적장 앞에 무릎을 꿇어야 했습니다.',
    sasinReview: '사신은 논한다. 평화에 젖어 칼을 녹여 보습을 만들더니, 적이 닥쳤을 때는 한 줌의 병사도 남아있지 않았도다. 나라를 지키지 못한 군주의 수치로다.',
    isVictory: false,
    category: 'ruin',
    badgeColor: 'from-red-900 to-zinc-900',
    illustrationKey: 'shattered_shield',
  },

  // 14. 폐세자의 비극 (세자 시절 패배)
  deposed_prince: {
    id: 'deposed_prince',
    templeName: '폐세자 (廢世子)',
    title: '즉위하지 못한 동궁의 눈물',
    epithet: '궁궐의 차가운 암투에 휩쓸려 뒤주 속에 갇힌 왕세자',
    description: '부왕의 신임을 잃고 간신들의 끈질긴 모함에 휘말려 세자의 자리에서 쫓겨났습니다. 옥좌에 올라 자신의 뜻을 펼쳐보지도 못한 채, 동궁전 깊은 곳에서 쓸쓸한 최후를 맞이했습니다.',
    sasinReview: '사신은 논한다. 싹이 트기도 전에 서리를 맞았으니, 궁중 암투의 비정함이 골육상잔의 비극을 낳았도다. 어린 세자의 탄식이 구천을 맴돌도다.',
    isVictory: false,
    category: 'death',
    badgeColor: 'from-indigo-900 to-slate-900',
    illustrationKey: 'tear_scroll',
  },

  // 15. 비운의 중립외교 - 광해의 후예
  tragic_diplomat: {
    id: 'tragic_diplomat',
    templeName: '광해군 (光海君)',
    title: '실리외교와 서인들의 반정',
    epithet: '명분보다 백성의 목숨을 택했으나 명분론에 희생된 고독한 군주',
    description: '명나라와 청나라 사이에서 절묘한 실리 외교로 전란을 막아내었으나, 성리학적 명분을 외치는 서인 세력들의 모반으로 옥좌에서 축출되었습니다. 백성들은 전하의 지혜를 그리워했습니다.',
    sasinReview: '사신은 논한다. 대의명분을 좇는 신하들의 외침 뒤에 숨은 칼날을 피하지 못하였도다. 그러나 피 한 방울 흘리지 않고 백성을 전란에서 구했으니 역사는 전하를 잊지 않을 것이다.',
    isVictory: false,
    category: 'ruin',
    badgeColor: 'from-purple-800 to-stone-900',
    illustrationKey: 'diplomacy_moon',
  },

  // 16. 불멸의 태평성대 (Perfect balanced run)
  immortal_reign: {
    id: 'immortal_reign',
    templeName: '성조대왕 (聖祖大王)',
    title: '사직 500년 최고의 태평성대',
    epithet: '하늘과 땅, 백성과 신하가 모두 경배한 완전무결의 군주',
    description: '민심은 바다 같고 대신들의 충성은 태산 같았으며, 국고는 넘쳐나고 군대는 천하무적이었습니다. 전하의 재위 30년은 조선 역사상 가장 찬란하고 흠결 없는 영광의 시대로 기록되었습니다.',
    sasinReview: '사신은 논한다. 전하는 군사(君師), 즉 임금이면서 동시에 큰 스승이셨다. 해와 달처럼 밝은 덕이 온 나라를 비추었으니, 그 공덕은 천추에 빛날 것이라!',
    isVictory: true,
    category: 'virtuous',
    badgeColor: 'from-yellow-500 via-amber-500 to-orange-600',
    illustrationKey: 'celestial_palace',
  },
};
