import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@store/authStore";
import { useAuth } from "@providers/AuthProvider"; // 추가: useAuth 임포트

// 인증된 사용자만 접근 가능한 라우트
const ProtectedLayout = () => {
  const user = useAuthStore((state) => state.user);
  const { isAuthenticating } = useAuth(); // 추가: 인증 상태 확인
  // 인증 중이면 로딩 표시
  if (isAuthenticating) {
    return <div>로딩 중...</div>;
  }

  if (!user) {
    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/" replace />;
  }

  // 인증된 경우 자식 라우트 렌더링
  return <Outlet />;
};

export default ProtectedLayout;
