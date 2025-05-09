import * as S from "./TeamLankPage.styled";
import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import useRefreshable from "@hooks/useRefreshable";

import YellowTitleHeader from "@components/header/YellowTitleHeader";
import LogoWithName from "@components/mainLogo/LogoWithName";
import ListCard from "@components/listCard/ListCard";
import CardItem from "@components/listCard/CardItem";

// 팀 타입 정의
export interface ITeam {
  teamId: number;
  totalScore: number;
  members: string[];
}
const TeamLankPage = () => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const fetchTeams = useCallback(async () => {
    const teamsCollection = collection(db, "teams");
    const teamsSnapshot = await getDocs(teamsCollection);
    const teamsList: ITeam[] = teamsSnapshot.docs.map(
      (doc) => doc.data() as ITeam
    );

    // 점수가 동일한 경우 teamId로 정렬
    teamsList.sort((a, b) => {
      if (a.totalScore === b.totalScore) {
        return a.teamId - b.teamId; // teamId 기준 정렬
      }
      return b.totalScore - a.totalScore; // 점수 기준 내림차순 정렬
    });

    setTeams(teamsList);
  }, []);

  // 새로고침 관련 상태와 함수
  const { isRefreshing, refresh, refreshKey } = useRefreshable(fetchTeams);

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return (
    <S.TeamLankWrapper>
      <YellowTitleHeader title="팀별 점수" />
      <LogoWithName />
      <ListCard
        headerTitle="팀 랭킹"
        index1="순위"
        index2="조 이름"
        index3="획득 점수"
        onRefresh={refresh}
        isRefreshing={isRefreshing}
      >
        {/* refreshKey를 key로 사용하여 리렌더링 트리거 */}

        {teams.map((team, idx) => (
          <CardItem
            key={`${team.teamId}-${refreshKey}`} // 여기에 refreshKey 추가
            leftValue={idx + 1}
            centerValue={`${team.teamId}조`}
            rightValue={`+ ${team.totalScore}p`}
            rank={idx + 1}
          />
        ))}
      </ListCard>
    </S.TeamLankWrapper>
  );
};

export default TeamLankPage;
