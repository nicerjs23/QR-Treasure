import * as S from "./TreasureListPage.styled";

import { useEffect, useState, useCallback } from "react";
import { ITreasure } from "../../types/treasure";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import useRefreshable from "@hooks/useRefreshable";

import LogoWithName from "@components/mainLogo/LogoWithName";
import TreasureHeader from "@components/header/TreasureHeader";
import ListCard from "@components/listCard/ListCard";
import CardItem from "@components/listCard/CardItem";
const TreasureListPage = () => {
  const [treasures, setTreasures] = useState<ITreasure[]>([]);

  // 보물 데이터 가져오는 함수 (찾은 보물 아래로내림)
  const fetchTreasures = useCallback(async () => {
    const treasuresSnap = await getDocs(collection(db, "treasures"));
    const treasureList = treasuresSnap.docs
      .map((doc) => doc.data() as ITreasure)
      .sort((a, b) => {
        // isFind가 false인 경우 우선순위가 높도록 정렬
        if (a.isFind === b.isFind) {
          return a.treasureKey - b.treasureKey; // treasureKey 기준 정렬
        }
        return a.isFind ? 1 : -1; // 찾지 않은 보물이 먼저 오도록
      });
    setTreasures(treasureList);
  }, []);

  // useRefreshable 훅 사용
  const { isRefreshing, refresh } = useRefreshable(fetchTreasures);

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchTreasures();
  }, [fetchTreasures]);

  return (
    <S.TreasureListWrapper>
      <TreasureHeader />
      <LogoWithName />
      <ListCard
        headerTitle="보물 목록"
        index1="번호"
        index2="보물 내용"
        index3="발견자"
        onRefresh={refresh} // 새로고침 콜백 전달
        isRefreshing={isRefreshing} // 새로고침 상태 전달
      >
        {treasures.map((treasure) => (
          <CardItem
            key={treasure.treasureKey}
            leftValue={treasure.treasureKey}
            centerValue={treasure.description}
            rightValue={
              treasure.isFind ? treasure.finderName || "미발견" : "미발견"
            }
            isRed={treasure.type === "PENALTY"}
            isFind={treasure.isFind}
          />
        ))}
      </ListCard>
    </S.TreasureListWrapper>
  );
};

export default TreasureListPage;
