import * as S from "./QRTreasurePage.styled";

import Lottie from "lottie-react";

import TreasureBox from "@assets/lottie/treasureBox.json";

import LogoWithName from "@components/mainLogo/LogoWithName";
import QRTreasureCard from "./_components/QRTreasureCard";
const QRTreasurePage = () => {
  return (
    <S.QRTreasureWrapper>
      <LogoWithName />

      <S.TreasureBox>
        <Lottie animationData={TreasureBox} loop autoplay />
      </S.TreasureBox>
      <QRTreasureCard
        cardHeaderNum={27}
        cardBodyText="보물 상자에서 나온것은..."
      />
    </S.QRTreasureWrapper>
  );
};

export default QRTreasurePage;
