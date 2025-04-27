import { Outlet } from "react-router-dom";
import styled, { css } from "styled-components";
import bgImg from "@assets/images/bgImg.png";
import Footer from "@components/footer/Footer";

//hooks
import useFooterVisible from "@hooks/useFooterVisibe"; // 경로는 상황에 맞게 조정
import useBackgroundVisible from "@hooks/useBackgroundVisible";

const DefaultLayout = () => {
  const isFooterVisible = useFooterVisible();
  const isBackgroundVisible = useBackgroundVisible();
  return (
    <Wrapper
      hasBackground={isBackgroundVisible}
      isFooterVisible={isFooterVisible}
    >
      <Outlet />
      <Footer isFooterVisible={isFooterVisible} />
    </Wrapper>
  );
};

export default DefaultLayout;

interface WrapperProps {
  hasBackground: boolean;
  isFooterVisible: boolean; // isFooterVisible prop 추가
}

const Wrapper = styled.section<WrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  min-height: calc(var(--vh, 1vh) * 100); // CSS 환경 변수 사용
  box-sizing: border-box;

  // 푸터가 있을 때만 패딩 추가
  @media (min-width: 540px) {
    padding-bottom: ${({ isFooterVisible }) =>
      isFooterVisible ? "150px" : "0"}; /* 조건에 맞을 때 padding-bottom 추가 */
  }
  @media (max-width: 400px) {
    padding-bottom: ${({ isFooterVisible }) =>
      isFooterVisible ? "115px" : "0"}; /* 조건에 맞을 때 padding-bottom 추가 */
  }
  background-color: ${({ theme }) => theme.colors.background.darkPurple};

  ${({ hasBackground }) =>
    hasBackground
      ? css`
          background-image: url(${bgImg});
          background-size: cover;
          background-position: center;
        `
      : css`
          /* 배경 이미지 관련 스타일 비활성화 */
        `}
`;
