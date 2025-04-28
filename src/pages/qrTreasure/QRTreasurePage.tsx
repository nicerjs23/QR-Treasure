import * as S from "./QRTreasurePage.styled";

import { useState, useEffect } from "react"; // useState와 useEffect 추가

import Lottie from "lottie-react";
import TreasureBox from "@assets/lottie/treasureBox.json";
import Shining from "@assets/lottie/Shining.json";

import LogoWithName from "@components/mainLogo/LogoWithName";
import QRTreasureCard from "./_components/QRTreasureCard";
import HomeBtn from "./_components/HomeBtn";
import TreasureInfoCard from "./_components/TreasureInfoCard";
// Lottie 애니메이션 데이터의 타입을 명시적으로 지정
type AnimationData = typeof TreasureBox | typeof Shining;

const QRTreasurePage = () => {
  const [animationData, setAnimationData] =
    useState<AnimationData>(TreasureBox); // 초기 애니메이션 데이터 설정 // 초기 애니메이션 데이터 설정
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부 상태 추가

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationData(Shining); // 2초 후 애니메이션 데이터 변경
    }, 2000);

    const modalTimer = setTimeout(() => {
      setShowModal(true); // 3초 후 모달 표시
    }, 3000);

    return () => {
      clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
      clearTimeout(modalTimer); // 모달 타이머 정리
    };
  }, []);

  return (
    <S.QRTreasureWrapper>
      <LogoWithName />
      <S.TreasureBoxWrapper>
        <S.TreasureBox>
          <Lottie animationData={animationData} loop autoplay />
        </S.TreasureBox>
      </S.TreasureBoxWrapper>
      {/* 모달이 나타날 때 QRTreasureCard 숨기기 */}
      {!showModal && (
        <QRTreasureCard
          cardHeaderNum={27}
          cardBodyText="보물 상자에서 나온것은..."
        />
      )}

      {/* 모달 추가 */}
      {showModal && (
        <S.Modal>
          <div style={{ width: "100%", height: "50px" }} />
          <TreasureInfoCard text="+15 점" />
          <HomeBtn />
        </S.Modal>
      )}
    </S.QRTreasureWrapper>
  );
};

export default QRTreasurePage;
