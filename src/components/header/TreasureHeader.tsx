import styled from "styled-components";
import { useState, useEffect } from "react"; // useEffect 추가
import HeaderKeyIcon from "@assets/icons/headerKeyIcon.svg";

const TreasureHeader = () => {
  const [foundCount, setFoundCount] = useState<number>(10); // 초기값 설정
  const [totalCount, setTotalCount] = useState<number>(50); // 기본값 설정
  // 나중에 Firebase에서 데이터 가져오는 로직을 추가할 수 있습니다.
  useEffect(() => {
    // 예: Firebase에서 데이터 가져오기
    const fetchData = async () => {
      // Firebase에서 foundCount와 totalCount를 가져오는 로직
      // setFoundCount(가져온 값);
      // setTotalCount(가져온 값);
    };

    fetchData();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // 찾은 비율 계산
  const foundRatio = foundCount / totalCount;
  // 채워질 바의 너비 계산
  const filledBarWidth = `${foundRatio * 100}%`;
  return (
    <HeaderWrapper>
      <img src={HeaderKeyIcon} alt="보물 아이콘" />
      <BarWrapper>
        <BarBorder>
          <Bar filledWidth={filledBarWidth} />
        </BarBorder>

        <BarText>
          {foundCount}/{totalCount} 개 찾았어요!
        </BarText>
      </BarWrapper>
    </HeaderWrapper>
  );
};

export default TreasureHeader;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 64px;
  background: rgba(0, 0, 0, 0.6);

  padding: 0 20px;
  box-sizing: border-box;
`;

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 30px;
`;

const BarBorder = styled.div`
  width: 100%;
  height: 16px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.page.gold};
`;

interface BarProps {
  filledWidth: string;
}
const Bar = styled.div<BarProps>`
  height: 16px;
  background-color: ${({ theme, filledWidth }) =>
    filledWidth !== "0%"
      ? theme.colors.page.gold
      : "transparent"}; /* 채워진 부분 gold 색상 */
  width: ${({ filledWidth }) => filledWidth}; /* 채워진 너비 설정 */
  transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out; /* 부드러운 애니메이션 효과 */
`;

const BarText = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  ${({ theme }) => theme.fonts.detail14};
  color: ${({ theme }) => theme.colors.font.white};
`;
