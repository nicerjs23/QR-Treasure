import * as S from "./ListCard.styled";
import F5Icon from "@assets/icons/f5.svg";

interface ListCardProps {
  headerTitle: string;
  index1: string;
  index2: string;
  index3: string;
  children?: React.ReactNode;
}

const ListCard = ({
  headerTitle,
  index1,
  index2,
  index3,
  children,
}: ListCardProps) => {
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
        <S.CardBodyContent>{children}</S.CardBodyContent>
      </S.CardBody>
    </S.CardWrapper>
  );
};

export default ListCard;
