import * as S from "./MyTreasurePage.styled";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthStore } from "@store/authStore";

import { ITreasure } from "../../types/treasure"; // 타입은 ITreasure

import LogoWithName from "@components/mainLogo/LogoWithName";
import YellowTitleHeader from "@components/header/YellowTitleHeader";
import MyTreasureCard from "./_components/MyTreasureCard";
import CardItem from "@components/listCard/CardItem";
import LogoutBtn from "@components/logoutBtn/LogoutBtn";
const MyTreasurePage = () => {
  const user = useAuthStore((state) => state.user);
  // 변수명은 myTreasures로!
  const [myTreasures, setMyTreasures] = useState<ITreasure[]>([]);

  useEffect(() => {
    if (!user || !user.findTreasures || user.findTreasures.length === 0) {
      setMyTreasures([]);
      return;
    }

    const fetchTreasures = async () => {
      const treasures: ITreasure[] = [];
      const chunkSize = 10;
      for (let i = 0; i < user.findTreasures.length; i += chunkSize) {
        const chunk = user.findTreasures.slice(i, i + chunkSize);
        const chunkDocs = await Promise.all(
          chunk.map(async (id) => {
            const docRef = doc(db, "treasures", id.toString());
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? (docSnap.data() as ITreasure) : null;
          })
        );
        treasures.push(...(chunkDocs.filter(Boolean) as ITreasure[]));
      }
      setMyTreasures(treasures);
    };

    fetchTreasures();
  }, [user]);

  return (
    <S.MyTreasureWrapper>
      <YellowTitleHeader title="내 보물" />
      <LogoWithName />
      <MyTreasureCard
        headerTitle="내 보물"
        index1="번호"
        index2="보물"
        index3="발견자"
        treasureNum={myTreasures.length}
      >
        {myTreasures.length === 0 ? ( // 보물이 없을 경우
          <S.MyTreasureNone>찾은 보물이 없습니다!</S.MyTreasureNone>
        ) : (
          myTreasures.map((treasure, idx) => (
            <CardItem
              key={treasure.id}
              leftValue={idx + 1}
              centerValue={treasure.description}
              rightValue={user ? user.username : "이름 없음"}
              isRed={treasure.type === "PENALTY"}
              isFind={true}
            />
          ))
        )}
      </MyTreasureCard>
      <S.BtnWrapper>
        <LogoutBtn />
      </S.BtnWrapper>
    </S.MyTreasureWrapper>
  );
};

export default MyTreasurePage;
