import styled from "styled-components";
import Lottie from "lottie-react";
export const MyTreasureWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const BtnWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  width: 88.5%;
  justify-content: flex-end;
`;

export const MyTreasureNone = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;

  gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.big20}
  color: ${({ theme }) => theme.colors.font.white};
`;

export const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;

export const SearchLottie = styled(Lottie)`
  width: 100%;
`;
