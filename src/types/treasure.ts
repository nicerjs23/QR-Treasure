export type TreasureType = "SCORE" | "PRIZE" | "PENALTY";
//보물 타입설정 유니온타입!

export interface BaseTreasure {
  // id: number; // 보물 고유 ID -랜덤번호 부여하고싶음 삭제함 문서id로대체
  docId?: string; // 선택적 필드로 추가
  treasureKey: number; // 1~보물개수까지의 순번 (보물 목록 map key, UI 노출용)
  description: string; // 보물 설명
  isFind: boolean; // 발견 여부
  finderName?: string; // 발견자 이름
  timestamp?: Date; // 발견 시간
  type: TreasureType; // 보물 유형
  customId?: string; // 직접 지정할 문서 ID (선택적)
}

// 점수 보물
export interface ScoreTreasure extends BaseTreasure {
  type: "SCORE";
  score: number; // 점수
}

// 상품 보물
export interface PrizeTreasure extends BaseTreasure {
  type: "PRIZE";
}

// 벌칙 보물
export interface PenaltyTreasure extends BaseTreasure {
  type: "PENALTY";
}

export type ITreasure = ScoreTreasure | PrizeTreasure | PenaltyTreasure;
