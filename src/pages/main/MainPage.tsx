import * as S from "./MainPage.styled";

import LogoWithName from "@components/mainLogo/LogoWithName";
import TreasureHeader from "@components/header/TreasureHeader";
import MainLogoImg from "./_components/MainLogoImg";
import LankCard from "../../components/listCard/ListCard";
import CardItem from "../../components/listCard/CardItem";

const MainPage = () => {
  /*
            위에서 이런식으로 불러오고
            const data = [
          { rank: 1, teamName: "1조", score: 15 },
          { rank: 2, teamName: "2조", score: 15 },
          // ...
        ];
          return안에서 이렇게 사용가능함 
        <ListCard headerTitle="팀 랭킹" index1="순위" index2="조 이름" index3="획득 점수">
          {data.map(item => (
            <CardItem key={item.rank} {...item} />
          ))}
        </ListCard> */

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
        >
          {/* 가로 540이상 세로가830px 이하일때는 카드아이템3개만 */}

          <CardItem isRed={true} />
          <CardItem isFind={true} />
          <CardItem />
          <CardItem />
        </LankCard>
      </S.MainContentWrapper>
    </S.MainWrapper>
  );
};

export default MainPage;
