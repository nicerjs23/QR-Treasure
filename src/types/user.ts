export interface IUser {
  id: string;
  username: string;
  team: number;
  // createdAt: Date;
  findTreasures: number[]; // 찾은 보물 ID 배열
  score: number; // user가 찾은 총 점수
}
