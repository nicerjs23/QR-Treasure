import * as S from "./LoginCardForm.styled";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useLogin } from "@hooks/useLogin";
import { useAuthStore } from "@store/authStore";
import { useQRStore } from "@store/qrStore";
import { isAdmin } from "@services/adminService";

const LoginCardForm = () => {
  const { username, handleChange, handleSubmit, isLoading, error } = useLogin();
  const user = useAuthStore((state) => state.user);
  const { treasureId, fetchTreasure, treasure } = useQRStore();
  const [checkingAdmin, setCheckingAdmin] = useState(false);
  const navigate = useNavigate();

  // 로그인 성공 시 처리
  useEffect(() => {
    const checkUserAdmin = async () => {
      if (!user) return;

      setCheckingAdmin(true);
      try {
        // 관리자 계정인지 확인 (비동기 방식으로 변경)
        const adminAccess = await isAdmin(user.id);

        if (adminAccess) {
          navigate("/admin", { replace: true });
          return;
        }

        // 일반 사용자 처리
        if (treasureId) {
          fetchTreasure();
        } else {
          navigate("/home", { replace: true });
        }
      } catch (error) {
        console.error("관리자 권한 확인 오류:", error);
        navigate("/home", { replace: true });
      } finally {
        setCheckingAdmin(false);
      }
    };

    if (user && !checkingAdmin) {
      checkUserAdmin();
    }
  }, [user, navigate, treasureId, fetchTreasure, checkingAdmin]);

  // treasure 상태가 변경되면 적절한 페이지로 이동
  useEffect(() => {
    if (user && treasure) {
      treasure.isFind
        ? navigate("/qrfind", { replace: true })
        : navigate("/qr", { replace: true });
    }
  }, [user, treasure, navigate]);

  //엔터시 로그인되게
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit(event as React.FormEvent);
    }
  };
  return (
    <S.FormWrapper>
      <S.CardInput
        type="text"
        placeholder="꼭 본인의 이름을 입력해주세요."
        value={username}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러 추가
        disabled={isLoading}
      />
      <S.CardButtonWrapper>
        {/* 에러가 있을 때만 메시지 표시 */}
        {error && <S.CardErrorText>{error}</S.CardErrorText>}
        <S.CardButton type="button" onClick={handleSubmit} disabled={isLoading}>
          확인
        </S.CardButton>
      </S.CardButtonWrapper>
    </S.FormWrapper>
  );
};

export default LoginCardForm;
