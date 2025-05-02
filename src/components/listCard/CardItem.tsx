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
}: CardItemProps) => {
  return (
    <CardItemWrapper isFind={isFind}>
      <ItemNumBoxWrapper>
        <ItemNumBox>{leftValue}</ItemNumBox>
      </ItemNumBoxWrapper>
      <ItemBoxContent>
        <ItemBoxContentText isRed={isRed}>{centerValue}</ItemBoxContentText>
        <InfoBox>{rightValue}</InfoBox>
      </ItemBoxContent>
    </CardItemWrapper>
  );
};

export default CardItem;

const CardItemWrapper = styled.div<CardItemWrapperProps>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 36px;
  border-radius: 5px;
  background: ${({ theme, isFind }) =>
    isFind
      ? theme.colors.page.green
      : theme.colors.page.cardBeige}; // isFind에 따라 배경 색상 변경
`;

const ItemNumBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 36px;
  height: 36px;

  border-radius: 5px;
  background: #f0d3a7;
`;

const ItemNumBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;

  border-radius: 3px;

  background: ${({ theme }) => theme.colors.page.green};

  ${({ theme }) => theme.fonts.subtitle32}

  color: ${({ theme }) => theme.colors.font.white};
  text-shadow: 1px 2px 0px #000;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000;
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
