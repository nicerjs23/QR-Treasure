import * as S from "./TreasureListPage.styled";

import { useEffect, useState } from "react";
import { ITreasure } from "../../types/treasure";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import LogoWithName from "@components/mainLogo/LogoWithName";
import TreasureHeader from "@components/header/TreasureHeader";
import ListCard from "@components/listCard/ListCard";
import CardItem from "@components/listCard/CardItem";
const TreasureListPage = () => {
  const [treasures, setTreasures] = useState<ITreasure[]>([]);
  useEffect(() => {
    (async () => {
      const treasuresSnap = await getDocs(collection(db, "treasures"));
      const treasureList = treasuresSnap.docs
        .map((doc) => doc.data() as ITreasure)
        .sort((a, b) => a.treasureKey - b.treasureKey); // treasureKey 기준 정렬
      setTreasures(treasureList);
    })();
  }, []);

  return (
    <S.TreasureListWrapper>
      <TreasureHeader />
      <LogoWithName />
      <ListCard
        headerTitle="보물 목록"
        index1="번호"
        index2="보물 내용"
        index3="발견자"
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
