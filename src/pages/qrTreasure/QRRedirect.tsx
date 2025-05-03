import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQRStore } from "@store/qrStore";

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

  useEffect(() => {
    const id = params.get("id"); // 쿼리 파라미터에서 보물 ID를 가져옴
    if (!id) {
      navigate("/home"); // ID가 없으면 홈으로 이동
      return;
    }

    setTreasureId(id); // 보물 ID를 스토어에 저장
    fetchTreasure(); // 보물 정보를 가져오는 함수 호출
  }, [params, navigate, setTreasureId, fetchTreasure]); // 의존성 배열

  // treasure 상태가 변경될 때 라우팅 처리
  useEffect(() => {
    if (treasure) {
      // treasure 상태가 존재할 경우
      treasure.isFind
        ? navigate("/qrfind", { replace: true }) // 보물이 발견되었으면 /qrfind로 이동
        : navigate("/qr", { replace: true }); // 발견되지 않았으면 /qr로 이동
    }
  }, [treasure, navigate]); // treasure 상태가 변경될 때마다 실행

  return <div>리다이렉트 중...</div>; // 로딩 중 메시지
};

export default QRRedirect;
