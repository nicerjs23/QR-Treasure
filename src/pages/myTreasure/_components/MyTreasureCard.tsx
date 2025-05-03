import * as S from "./MyTreasureCard.styled";
import F5Icon from "@assets/icons/f5.svg";

interface MyTreasureCardProps {
  headerTitle: string;
  index1: string;
  index2: string;
  index3: string;
  treasureNum: number;
  children?: React.ReactNode;
  onRefresh?: () => Promise<void> | void; // 새로고침 콜백 함수 추가
  isRefreshing?: boolean; // 새로고침 상태 추가
}

const MyTreasureCard = ({
  headerTitle,
  index1,
  index2,
  index3,
  treasureNum,
  children,
  onRefresh, // 새로고침 콜백
  isRefreshing, // 새로고침 상태
}: MyTreasureCardProps) => {
  const handleF5Click = (event: React.MouseEvent<HTMLButtonElement>) => {
    const imgElement = event.currentTarget.querySelector("img");
    if (imgElement) {
      imgElement.classList.add("animate"); // 애니메이션 클래스 추가
      setTimeout(() => {
        imgElement.classList.remove("animate"); // 애니메이션 종료 후 클래스 제거
      }, 1000); // 애니메이션 지속 시간에 맞춰 조정
    }
    if (onRefresh) {
      onRefresh(); // 새로고침 콜백 호출
    }
  };
  return (
    <S.CardWrapper>
      <S.CardHeader>
        <S.CardHeaderText>{headerTitle}</S.CardHeaderText>
        <S.F5Btn onClick={handleF5Click} disabled={isRefreshing}>
          {/* 클릭 이벤트 핸들러 추가 */}
          <img src={F5Icon} alt="f5ICon" />
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
        <S.CardBodyContent>
          {children}
          <S.FindTreasure>총 {treasureNum}개 찾았어요!</S.FindTreasure>
        </S.CardBodyContent>
      </S.CardBody>
    </S.CardWrapper>
  );
};

export default MyTreasureCard;
