import * as S from "./MyTreasurePage.styled";

import LogoWithName from "@components/mainLogo/LogoWithName";
import YellowTitleHeader from "@components/header/YellowTitleHeader";
import MyTreasureCard from "./_components/MyTreasureCard";
import CardItem from "@components/listCard/CardItem";
const MyTreasurePage = () => {
  return (
    <S.MyTreasureWrapper>
      <YellowTitleHeader title="내 보물" />
      <LogoWithName />
      <MyTreasureCard
        headerTitle="내 보물"
        index1="번호"
        index2="보물"
        index3="발견자"
        treasureNum={0}
      >
        <CardItem isRed={true} />
        <CardItem isFind={true} />
        <CardItem />
        <CardItem />
      </MyTreasureCard>
    </S.MyTreasureWrapper>
  );
};

export default MyTreasurePage;
