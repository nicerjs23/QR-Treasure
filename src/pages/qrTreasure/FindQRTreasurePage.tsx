import styled from "styled-components";
import { useQRStore } from "@store/qrStore";
import { useNavigate } from "react-router-dom";

// components
import LogoWithName from "@components/mainLogo/LogoWithName";
import QRTreasureCard from "./_components/QRTreasureCard";
import HomeBtn from "./_components/HomeBtn";

import findTreasureBox from "@assets/images/findTreasureBox.png";
const FindQRTreasurePage = () => {
  const navigate = useNavigate();
  const { treasure, clearQRData } = useQRStore();

  // 홈으로 이동 시 QR 데이터 초기화
  const handleGoHome = () => {
    clearQRData(); // QR Store 데이터 초기화
    navigate("/home");
  };
  return (
    <FindQRTreasurePageWrapper>
      <LogoWithName />
      <ImgAndCardWrapper>
        <FindTreasureBox src={findTreasureBox} />
        <QRTreasureCard
          cardHeaderNum={treasure?.treasureKey || 0}
          cardBodyText="이미 스캔된 QR입니다."
        />
      </ImgAndCardWrapper>
      <HomeBtn onClick={handleGoHome} />
    </FindQRTreasurePageWrapper>
  );
};

export default FindQRTreasurePage;

const FindQRTreasurePageWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  /* border: 5px solid red; */
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding-top: 43px;
  padding-bottom: 50px;

  background: rgba(39, 39, 39, 0.6); // 배경에 오파시티 추가
`;

const ImgAndCardWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  margin-bottom: 100px;
  @media (max-height: 740px) {
    margin-bottom: 30px;
  }
`;
const FindTreasureBox = styled.img`
  display: flex;
  width: 60%;
  min-width: 265px;
  height: auto;
`;
