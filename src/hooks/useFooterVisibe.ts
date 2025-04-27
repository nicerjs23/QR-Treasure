import { useLocation } from "react-router-dom";

// 푸터를 숨길 경로를 배열로 정의
const hideFooterPaths = ['/', ]; // 필요에 따라 추가
// 예시
// const hideFooterPatterns = ['/login', '/register', '/user/*'];
function useFooterVisible() {
    const location = useLocation();
  // 경로가 배열에 포함되어 있으면 false, 아니면 true 반환
    return !hideFooterPaths.includes(location.pathname);
}

export default useFooterVisible;