import styled from "styled-components";
import {
  CardItemProps,
  ItemBoxContentTextProps,
  CardItemWrapperProps,
} from "./CardItem.d";

const CardItem = ({
  leftValue,
  centerValue,
  rightValue,
  isRed,
  isFind,
  rank,
}: CardItemProps) => {
  return (
    <CardItemWrapper isFind={isFind} rank={rank}>
      <ItemNumBoxWrapper rank={rank}>
        <ItemNumBox rank={rank}>{leftValue}</ItemNumBox>
      </ItemNumBoxWrapper>
      <ItemBoxContent>
        <ItemBoxContentText isRed={isRed}>{centerValue}</ItemBoxContentText>
        <InfoBox>{rightValue}</InfoBox>
      </ItemBoxContent>
    </CardItemWrapper>
  );
};

export default CardItem;

const CardItemWrapper = styled.div<CardItemWrapperProps & { rank?: number }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
  border-radius: 5px;
  background: ${({ theme, isFind, rank }) => {
    if (rank === 1) return theme.colors.page.gold;
    if (rank === 2) return "#79C7F0";
    if (rank === 3) return "#FF6B6B";
    return isFind ? theme.colors.page.green : theme.colors.page.cardBeige;
  }};
`;

const ItemNumBoxWrapper = styled.div<{ rank?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  border-radius: 5px;
  background: ${({ rank }) => {
    if (rank === 1) return "#F0D3A7";
    if (rank === 2) return "#297BB3";
    if (rank === 3) return "#FF9999";

    return "#F0D3A7"; // 기본 색상
  }};
`;

const ItemNumBox = styled.div<{ rank?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 3px;

  ${({ theme }) => theme.fonts.subtitle30}
  color: ${({ theme }) => theme.colors.font.white};
  -webkit-text-stroke: 1px #000;
  text-shadow: 1px 2px 0px #000;

  background: ${({ rank, theme }) => {
    if (rank === 1) return "#C99745";
    if (rank === 2) return "#505A83";
    if (rank === 3) return "#C85164";
    return theme.colors.page.green; // 기본 색상
  }};
`;

const ItemBoxContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 10px;
  box-sizing: border-box;
`;

const ItemBoxContentText = styled.div<ItemBoxContentTextProps>`
  ${({ theme }) => theme.fonts.big20}
  color: ${({ theme, isRed }) =>
    isRed ? theme.colors.font.red : theme.colors.font.black};
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 24px;
  border-radius: 10px;
  background: #2c281f;
  ${({ theme }) => theme.fonts.detail14}
  color: ${({ theme }) => theme.colors.font.white};
`;
