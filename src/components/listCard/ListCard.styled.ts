import styled, { keyframes } from "styled-components";

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 88.5%;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0px 0px;

  background: ${({ theme }) => theme.colors.page.brown};
  gap: 8px;
  width: 115px;
  height: 30px;
`;
export const CardHeaderText = styled.div`
  ${({ theme }) => theme.fonts.big20};
  color: ${({ theme }) => theme.colors.font.white};
`;
// 키프레임 애니메이션 정의
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const F5Btn = styled.button`
  display: flex;
  width: 18px;
  height: 18px;
  cursor: pointer; // 커서 추가
  img {
    &.animate {
      animation: ${rotate} 1s linear forwards; // linear 타이밍 함수 추가
    }
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 2px 4px 6px 0px rgba(0, 0, 0, 0.25);
`;

export const CardBodyHeader = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 20px;
  border-radius: 0px 5px 0px 0px;
  background: ${({ theme }) => theme.colors.page.brown};

  padding: 0 33px 0 20px;
  box-sizing: border-box;
`;
export const CardBodyHeaderText = styled.div`
  ${({ theme }) => theme.fonts.detail14};
  color: ${({ theme }) => theme.colors.font.white};
`;

export const CardBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 194px;

  padding: 10px;
  box-sizing: border-box;
  gap: 10px;

  border-radius: 0px 0px 5px 5px;
  background: ${({ theme }) => theme.colors.page.charcoal};
`;
