import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQRStore } from "@store/qrStore";
import { useAuthStore } from "@store/authStore";

import styled from "styled-components";

import Lottie from "lottie-react";
import loading from "@assets/lottie/loading.json";

/**
 * QR 주소(예: /qr-redirect?id=12)로 접근 시
 * 1. 보물 ID 저장
 * 2. 보물 상태에 따라 /qr 또는 /qrfind로 이동
 * (로그인 체크는 ProtectedLayout에서만 처리)
 */
const QRRedirect = () => {
  const [params] = useSearchParams(); // URL의 쿼리 파라미터를 가져옴
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
  const { setTreasureId, fetchTreasure, treasure } = useQRStore(); // QR 스토어에서 상태와 액션을 가져옴
  const user = useAuthStore((state) => state.user);

  // ID 확인 및 저장, 로그인 상태 확인
  useEffect(() => {
    const id = params.get("id");
    if (!id) {
      navigate("/home"); // ID가 없으면 홈으로 이동
      return;
    }

    // 보물 ID 저장 (로그인 여부와 관계없이)
    setTreasureId(id);

    // 로그인 상태 확인
    if (!user) {
      // 로그인 안 된 경우, 로그인 페이지로 리다이렉트
      navigate("/", { replace: true });
    } else {
      // 로그인 된 경우, 보물 정보 가져오기
      fetchTreasure();
    }
  }, [params, navigate, setTreasureId, fetchTreasure, user]);

  // 보물 정보에 따른 페이지 이동 (로그인 된 경우만 실행)
  useEffect(() => {
    if (treasure && user) {
      treasure.isFind
        ? navigate("/qrfind", { replace: true })
        : navigate("/qr", { replace: true });
    }
  }, [treasure, navigate, user]);

  return (
    <Wrapper>
      <LoadingText>보물을 찾는 중입니다...</LoadingText>
      <Lottie animationData={loading} loop={true} />
    </Wrapper>
  );
};
export default QRRedirect;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);

  background-color: rgba(0, 0, 0, 0.75);
`;

const LoadingText = styled.div`
  ${({ theme }) => theme.fonts.big20}
  color: ${({ theme }) => theme.colors.font.white};
`;
