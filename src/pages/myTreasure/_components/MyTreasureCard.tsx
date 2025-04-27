import * as S from "./MyTreasureCard.styled";
import F5Icon from "@assets/icons/f5.svg";

interface MyTreasureCardProps {
  headerTitle: string;
  index1: string;
  index2: string;
  index3: string;
  treasureNum: number;
  children?: React.ReactNode;
}

const MyTreasureCard = ({
  headerTitle,
  index1,
  index2,
  index3,
  treasureNum,
  children,
}: MyTreasureCardProps) => {
  return (
    <S.CardWrapper>
      <S.CardHeader>
        <S.CardHeaderText>{headerTitle}</S.CardHeaderText>
        <S.F5Btn>
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
