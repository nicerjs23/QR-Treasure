import * as S from "./TeamLankPage.styled";

import YellowTitleHeader from "@components/header/YellowTitleHeader";
import LogoWithName from "@components/mainLogo/LogoWithName";
import ListCard from "@components/listCard/ListCard";
import CardItem from "@components/listCard/CardItem";
const TeamLankPage = () => {
  return (
    <S.TeamLankWrapper>
      <YellowTitleHeader title="팀별 점수" />
      <LogoWithName />
      <ListCard
        headerTitle="팀 랭킹"
        index1="순위"
        index2="조 이름"
        index3="획득 점수"
      >
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </ListCard>
    </S.TeamLankWrapper>
  );
};

export default TeamLankPage;
