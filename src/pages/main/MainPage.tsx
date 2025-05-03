import * as S from "./MainPage.styled";

import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import useRefreshable from "@hooks/useRefreshable";

import LogoWithName from "@components/mainLogo/LogoWithName";
import TreasureHeader from "@components/header/TreasureHeader";
import MainLogoImg from "./_components/MainLogoImg";
import LankCard from "../../components/listCard/ListCard";
import CardItem from "../../components/listCard/CardItem";
// 팀 타입 정의
export interface ITeam {
  teamId: number;
  totalScore: number;
  members: string[];
}
const MainPage = () => {
  const [teams, setTeams] = useState<ITeam[]>([]);

  // 팀 데이터 가져오는 함수
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

  // useRefreshable 훅 사용
  const { isRefreshing, refresh } = useRefreshable(fetchTeams);

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return (
    <S.MainWrapper>
      <TreasureHeader />
      <LogoWithName />
      <S.MainContentWrapper>
        <MainLogoImg />
        <LankCard
          headerTitle="팀 랭킹"
          index1="순위"
          index2="조 이름"
          index3="획득 점수"
          onRefresh={refresh} // 새로고침 콜백 전달
          isRefreshing={isRefreshing} // 새로고침 상태 전달
        >
          {teams.slice(0, 4).map((team, idx) => (
            <CardItem
              key={team.teamId}
              leftValue={idx + 1} // 순위
              centerValue={`${team.teamId}조`} // 조 이름
              rightValue={`+ ${team.totalScore}p`} // 획득 점수
            />
          ))}
        </LankCard>
      </S.MainContentWrapper>
    </S.MainWrapper>
  );
};

export default MainPage;
