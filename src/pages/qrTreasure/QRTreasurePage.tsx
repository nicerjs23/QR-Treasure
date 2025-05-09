import * as S from "./QRTreasurePage.styled";

import { useState, useEffect, useRef } from "react"; // useState와 useEffect 추가
import { useQRStore } from "@store/qrStore";
import { useAuthStore } from "@store/authStore";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [animationData, setAnimationData] =
    useState<AnimationData>(TreasureBox);
  const [showModal, setShowModal] = useState(false);

  // 중복 호출 방지를 위한 ref
  const findTreasureExecuted = useRef(false);

  // QR Store에서 보물 정보와 찾기 함수 가져오기
  const { treasure, findTreasure, clearQRData } = useQRStore();
  // 현재 로그인한 사용자 정보 가져오기
  const user = useAuthStore((state) => state.user);

  // 보물 찾기 처리 함수
  const handleFindTreasure = async () => {
    // 이미 실행됐거나 유저 정보가 없으면 중단
    if (!user || findTreasureExecuted.current) {
      console.log("이미 실행되었거나 유저 정보가 없습니다.");
      return;
    }

    // 실행 플래그 설정 (중복 실행 방지)
    findTreasureExecuted.current = true;
    console.log("보물 찾기 시작");

    try {
      // 보물 찾기 API 호출
      await findTreasure(user);
      console.log("보물 찾기 완료");

      // 애니메이션 및 모달 표시 타이머 설정
      setTimeout(() => {
        setAnimationData(Shining); // 애니메이션 변경
      }, 2000);

      setTimeout(() => {
        setShowModal(true); // 모달 표시
      }, 3000);
    } catch (error) {
      console.error("보물 찾기 실패:", error);
      // 에러 발생 시에도 플래그는 유지 (중복 실행 방지)
    }
  };

  // 컴포넌트 마운트 시 보물 찾기 처리 실행 (한 번만)
  useEffect(() => {
    if (!findTreasureExecuted.current) {
      handleFindTreasure();
    }

    // 컴포넌트 언마운트 시에는 플래그를 초기화하지 않음
    // 이렇게 하면 StrictMode에서도 중복 실행되지 않음
  }, []);

  // 홈으로 이동 시 QR 데이터 초기화
  const handleGoHome = () => {
    clearQRData(); // QR Store 데이터 초기화
    // 페이지 이동 시 플래그 초기화 (다음 QR 스캔을 위해)
    findTreasureExecuted.current = false;
    navigate("/home");
  };

  // 보물 설명 텍스트 생성 함수
  const getTreasureDescription = () => {
    if (!treasure) return "";

    if (treasure.type === "SCORE") {
      return `+${treasure.score} 점`;
    } else {
      return treasure.description;
    }
  };

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
          cardHeaderNum={treasure?.treasureKey || 0}
          cardBodyText="보물 상자에서 나온것은..."
        />
      )}

      {/* 모달 추가 */}
      {showModal && (
        <S.Modal>
          <div style={{ width: "100%", height: "50px" }} />
          <TreasureInfoCard
            text={getTreasureDescription()}
            isPenalty={treasure?.type === "PENALTY"}
          />
          <HomeBtn onClick={handleGoHome} />
        </S.Modal>
      )}
    </S.QRTreasureWrapper>
  );
};

export default QRTreasurePage;
