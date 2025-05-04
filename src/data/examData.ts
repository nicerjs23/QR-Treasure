import { ITreasure } from "../types/treasure";
import { IUser } from "../types/user";
import { ITeam } from "../types/team";

// 샘플 팀 데이터
export const teamsData: ITeam[] = [
  { teamId: 1, totalScore: 0, members: [] },
  { teamId: 2, totalScore: 0, members: [] },
];

// 샘플 사용자 데이터 (관리자 계정 포함)
export const usersData: Omit<IUser, "id">[] = [
  { username: "관리자", team: 0, findTreasures: [], score: 0, isAdmin: true },
];

// 샘플 보물 데이터
export const treasuresData: ITreasure[] = [
  {
    treasureKey: 1,
    description: "샘플 보물",
    isFind: false,
    type: "SCORE",
    score: 10,
    customId: "sample1",
  },
];
