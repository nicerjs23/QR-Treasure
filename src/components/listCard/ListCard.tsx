import * as S from "./ListCard.styled";
import F5Icon from "@assets/icons/f5.svg";
import { useState } from "react";

interface ListCardProps {
  headerTitle: string;
  index1: string;
  index2: string;
  index3: string;
  children?: React.ReactNode;
  onRefresh?: () => Promise<void> | void; // 새로고침 콜백 함수 추가
  isRefreshing?: boolean; // 외부에서 새로고침 상태 전달 가능
}
/**
 * 리스트 형태의 데이터를 카드 형태로 표시하는 컴포넌트
 * - 헤더에 새로고침 버튼 포함
 * - 테이블 형태의 본문 구조 (3열)
 */
const ListCard = ({
  headerTitle,
  index1,
  index2,
  index3,
  children,
  onRefresh,
  isRefreshing: externalRefreshing,
}: ListCardProps) => {
  // 내부 새로고침 상태 관리 (외부 상태가 없을 경우)
  const [internalRefreshing, setInternalRefreshing] = useState(false);

  // 실제 사용할 새로고침 상태 (외부 또는 내부)
  const isRefreshing =
    externalRefreshing !== undefined ? externalRefreshing : internalRefreshing;

  // 새로고침 버튼 클릭 처리
  const handleF5Click = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // 이미 새로고침 중이면 중복 실행 방지
    if (isRefreshing) return;
    console.log("F5 버튼 클릭");
    // 새로고침 애니메이션 처리
    const imgElement = event.currentTarget.querySelector("img");
    if (imgElement) {
      // 외부 새로고침 상태가 없으면 내부 상태 사용
      if (externalRefreshing === undefined) {
        setInternalRefreshing(true);
      }

      // 기존 애니메이션 클래스가 있다면 제거 (초기화)
      imgElement.classList.remove("animate");

      // 강제로 리플로우 발생시켜 애니메이션 재시작 (중요!)
      void imgElement.offsetWidth;

      // 애니메이션 클래스 추가
      imgElement.classList.add("animate");
      // 새로고침 콜백 실행
      if (onRefresh) {
        try {
          console.log("onRefresh 콜백 호출");
          await onRefresh();
          console.log("onRefresh 콜백 완료");
        } catch (error) {
          console.error("새로고침 실패:", error);
        }
      }

      // 애니메이션 종료 후 상태 초기화
      setTimeout(() => {
        console.log("애니메이션 종료");
        if (externalRefreshing === undefined) {
          setInternalRefreshing(false);
        }
      }, 1000);
    }
  };

  return (
    <S.CardWrapper>
      <S.CardHeader>
        <S.CardHeaderText>{headerTitle}</S.CardHeaderText>
        <S.F5Btn onClick={handleF5Click} disabled={isRefreshing}>
          <img src={F5Icon} alt="새로고침" />
        </S.F5Btn>
      </S.CardHeader>
      <S.CardBody>
        <S.CardBodyHeader>
          <S.CardBodyHeaderText style={{ width: "15%" }}>
            {index1}
          </S.CardBodyHeaderText>
          <S.CardBodyHeaderText style={{ width: "70%" }}>
            {index2}
          </S.CardBodyHeaderText>
          <S.CardBodyHeaderText style={{ width: "15%" }}>
            {index3}
          </S.CardBodyHeaderText>
        </S.CardBodyHeader>
        {/* 순위카드 맵으로 출력 */}
        <S.CardBodyContent>{children}</S.CardBodyContent>
      </S.CardBody>
    </S.CardWrapper>
  );
};

export default ListCard;
