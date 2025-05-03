// src/hooks/useRefreshable.ts

import { useState, useCallback } from "react";

/**
 * 데이터 새로고침 기능을 제공하는 커스텀 훅
 *
 * @param fetchFunction - 데이터를 불러오는 함수
 * @returns {Object} - 새로고침 상태와 새로고침 함수
 */
const useRefreshable = <T>(fetchFunction: () => Promise<T>) => {
  // 새로고침 상태 관리
  const [isRefreshing, setIsRefreshing] = useState(false);
  // 새로고침 키: 자식 컴포넌트 강제 리렌더링을 위해 사용
  const [refreshKey, setRefreshKey] = useState(0);

  /**
   * 데이터 새로고침 처리 함수
   * 1. 새로고침 상태 활성화
   * 2. 데이터 다시 불러오기
   * 3. 리렌더링을 위한 키 증가
   * 4. 작업 완료 후 새로고침 상태 비활성화
   */
  const refresh = useCallback(async () => {
    // 이미 새로고침 중이면 중복 실행 방지
    if (isRefreshing) return;

    try {
      console.log("새로고침 시작");
      setIsRefreshing(true);
      await fetchFunction();
      console.log("데이터 불러오기 완료");
      // refreshKey를 의존성 배열에서 제거하고 함수형 업데이트 사용
      setRefreshKey((prev) => {
        console.log("refreshKey 업데이트:", prev + 1);
        return prev + 1;
      });
    } catch (error) {
      console.error("새로고침 실패:", error);
    } finally {
      setIsRefreshing(false);
      console.log("새로고침 상태 비활성화");
    }
  }, [fetchFunction, isRefreshing]);

  return {
    isRefreshing,
    refresh,
    refreshKey,
  };
};

export default useRefreshable;
