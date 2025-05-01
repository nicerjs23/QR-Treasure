import { useState } from "react";
import { useAuthStore } from "@store/authStore";

// 로그인 폼에서 사용할 커스텀 훅
export const useLogin = () => {
  const [username, setUsername] = useState("");
  const { login, isLoading, error, clearError } = useAuthStore();

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(username); // 에러 처리는 authStore에서 처리
  };

  // 입력 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    clearError();
  };

  return {
    username,
    handleChange,
    handleSubmit,
    isLoading,
    error,
  };
};
