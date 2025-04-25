import { Outlet } from "react-router-dom";
import styled from "styled-components";
import bgImg from "@assets/images/bgsvg.svg";
import bgImg2 from "@assets/images/bgImg.png";
import Footer from "@components/footer/Footer";

import { useFooterVisible } from "@hooks/useFooterVisibe"; // 경로는 상황에 맞게 조정

const DefaultLayout = () => {
  const isFooterVisible = useFooterVisible();

  return (
    <Wrapper>
      
        <Outlet />
      
      {isFooterVisible && <Footer/>}
    </Wrapper>
  );
};

export default DefaultLayout;

const Wrapper = styled.section`
display: flex;
flex-direction: column;
justify-content: space-between;
flex-grow: 1;
min-height: calc(var(--vh, 1vh) * 100); // CSS 환경 변수 사용

/* padding-top: 3.5rem; */

background-color: ${({ theme }) => theme.colors.background.darkPurple};

background-image: url(${bgImg2}); // 배경 이미지 경로
  background-size: cover; // 비율을 유지하며 꽉 차게
  background-position: center; // 중앙 정렬


`;