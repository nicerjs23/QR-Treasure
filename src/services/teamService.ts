import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { IUser } from "../types/user";
import { ITeam } from "../types/team";

/**
 * 모든 유저를 불러와 팀별로 점수와 멤버를 집계하여 랭킹 반환
 * (단일 책임 원칙: 팀 랭킹 집계만 담당)
 */
export const getTeamRankings = async (): Promise<ITeam[]> => {
  const usersSnap = await getDocs(collection(db, "users"));
  const users = usersSnap.docs.map((doc) => doc.data() as IUser);

  // 팀별로 점수 합산 및 멤버 수집
  const teamMap = new Map<number, ITeam>();
  users.forEach((user) => {
    if (!teamMap.has(user.team)) {
      teamMap.set(user.team, { teamId: user.team, totalScore: 0, members: [] });
    }
    const team = teamMap.get(user.team)!;
    team.totalScore += user.score;
    team.members.push(user.username); // 또는 user.id
  });

  // 점수 내림차순 정렬
  return Array.from(teamMap.values()).sort(
    (a, b) => b.totalScore - a.totalScore
  );
};
