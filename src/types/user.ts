export interface IUser {
  id: string;
  username: string;
  team: number;
  // createdAt: Date;
  findTreasures: string[]; // 찾은 보물 ID 배열 파이어스토어문서id라 스트링
  score: number; // user가 찾은 총 점수
  isAdmin?: boolean; // 관리자 여부
}
