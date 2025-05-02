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
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setTreasureId, fetchTreasure } = useQRStore();

  useEffect(() => {
    const id = params.get("id");
    if (!id) {
      navigate("/home");
      return;
    }

    setTreasureId(id);

    // 보물 정보 fetch 후 상태에 따라 분기
    (async () => {
      await fetchTreasure();
      // fetchTreasure 후 store의 treasure를 확인
      setTimeout(() => {
        const treasure = useQRStore.getState().treasure;
        if (treasure?.isFind) {
          navigate("/qrfind", { replace: true });
        } else {
          navigate("/qr", { replace: true });
        }
      }, 0);
    })();
  }, [params, navigate, setTreasureId, fetchTreasure]);

  return <div>리다이렉트 중...</div>;
};

export default QRRedirect;
