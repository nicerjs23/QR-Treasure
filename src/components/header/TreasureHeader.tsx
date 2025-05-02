import styled from "styled-components";
import { useState, useEffect } from "react"; // useEffect 추가
import HeaderKeyIcon from "@assets/icons/headerKeyIcon.svg";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase"; // firebase 설정 경로에 맞게 수정

const TreasureHeader = () => {
  const [foundCount, setFoundCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Firestore에서 보물 데이터 가져오기
  useEffect(() => {
    const fetchTreasureData = async () => {
      try {
        // 전체 보물 개수 가져오기
        const treasuresCollection = collection(db, "treasures");
        const treasuresSnapshot = await getDocs(treasuresCollection);
        const total = treasuresSnapshot.size;
        setTotalCount(total);

        // 찾은 보물 개수 가져오기
        const foundTreasuresQuery = query(
          collection(db, "treasures"),
          where("isFind", "==", true)
        );
        const foundTreasuresSnapshot = await getDocs(foundTreasuresQuery);
        const found = foundTreasuresSnapshot.size;
        setFoundCount(found);
      } catch (error) {
        console.error("보물 데이터 가져오기 실패:", error);
        // 오류 발생 시 기본값 유지
      }
    };

    fetchTreasureData();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

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
