import * as S from "./LoginCardForm.styled";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useLogin } from "@hooks/useLogin";
import { useAuthStore } from "@store/authStore";

const LoginCardForm = () => {
  const { username, handleChange, handleSubmit, isLoading, error } = useLogin();
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  // 로그인 성공 시 /home으로 이동
  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

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
