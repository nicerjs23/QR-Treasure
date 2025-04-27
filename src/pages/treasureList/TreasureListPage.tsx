import * as S from "./TreasureListPage.styled";

import LogoWithName from "@components/mainLogo/LogoWithName";
import TreasureHeader from "@components/header/TreasureHeader";
import ListCard from "@components/listCard/ListCard";
import CardItem from "@components/listCard/CardItem";
const TreasureListPage = () => {
  return (
    <S.TreasureListWrapper>
      <TreasureHeader />
      <LogoWithName />
      <ListCard
        headerTitle="보물 목록"
        index1="번호"
        index2="보물 내용"
        index3="발견자"
      >
        <CardItem />
        <CardItem isFind={true} isRed={true} />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem isFind={true} isRed={true} />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem isFind={true} isRed={true} />
        <CardItem />
        <CardItem />
      </ListCard>
    </S.TreasureListWrapper>
  );
};

export default TreasureListPage;
