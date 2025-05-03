import * as S from "./MyTreasurePage.styled";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthStore } from "@store/authStore";
import useRefreshable from "@hooks/useRefreshable"; // 훅 임포트

import { ITreasure } from "../../types/treasure"; // 타입은 ITreasure

import search from "@assets/lottie/search.json";

import LogoWithName from "@components/mainLogo/LogoWithName";
import YellowTitleHeader from "@components/header/YellowTitleHeader";
import MyTreasureCard from "./_components/MyTreasureCard";
import CardItem from "@components/listCard/CardItem";
import LogoutBtn from "@components/logoutBtn/LogoutBtn";
const MyTreasurePage = () => {
  const user = useAuthStore((state) => state.user);
  const refreshUser = useAuthStore((state) => state.refreshUser);
  // 내가 찾은 보물 정보 리스트
  const [myTreasures, setMyTreasures] = useState<ITreasure[]>([]);

  // 보물 데이터 가져오는 함수
  const fetchTreasures = async () => {
    if (!user || !user.findTreasures || user.findTreasures.length === 0) {
      setMyTreasures([]);
      return;
    }

    const treasures: ITreasure[] = [];
    for (const docId of user.findTreasures) {
      const docRef = doc(db, "treasures", docId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log(`Document ${docId} does not exist`);
        continue;
      }
      const data = docSnap.data();
      console.log("Fetched treasure:", data);
      treasures.push(data as ITreasure);
    }
    console.log("Found treasures:", treasures);
    setMyTreasures(treasures);
  };

  // useRefreshable 훅 사용
  const { isRefreshing, refresh } = useRefreshable(fetchTreasures);

  // 페이지 진입 시 사용자 정보 새로고침
  useEffect(() => {
    refreshUser();
  }, []);

  // 보물 데이터 가져오기
  useEffect(() => {
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
        onRefresh={refresh} // 새로고침 콜백 전달
        isRefreshing={isRefreshing} // 새로고침 상태 전달
      >
        {myTreasures.length === 0 ? ( // 보물이 없을 경우
          <S.MyTreasureNone>
            찾은 보물이 없습니다!
            <S.SearchWrapper>
              <S.SearchLottie animationData={search} loop={true} />
            </S.SearchWrapper>
          </S.MyTreasureNone>
        ) : (
          myTreasures.map((treasure, idx) => (
            <CardItem
              key={idx} // treasure.treasureKey가 없을 수 있으므로 idx로 대체
              leftValue={idx + 1}
              centerValue={treasure.description || "보물 설명 없음"} // 기본값 제공
              rightValue={user ? user.username : "이름 없음"}
              isRed={treasure.type === "PENALTY"}
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
