//현재 경로가 내가 미리 입력해둔 경로와 비교하는 훅
//배경이미지를 특정경로에서만 없애기 위해 만들었음

import { useLocation } from "react-router-dom";

// 배경 이미지를 숨길 경로를 배열로 정의
const hideBackgroundPaths = ["/mytreasure", "/treasurelist", "/team"]; // 필요에 따라 추가

function useBackgroundVisible(): boolean {
  const location = useLocation();

  // 숨김 경로에 포함되면 false 반환
  if (hideBackgroundPaths.includes(location.pathname)) {
    return false;
  }

  // 기본적으로 true (숨김 경로에 해당하지 않으면 표시)
  return true;
}

export default useBackgroundVisible;
