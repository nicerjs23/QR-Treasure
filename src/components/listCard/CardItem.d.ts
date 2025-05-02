interface CardItemProps {
  leftValue: string | number; // 좌측(번호, 순위 등)
  centerValue: string | number; // 중앙(설명, 팀명 등)
  rightValue: string | number; // 우측(발견자, 점수 등)
  isRed?: boolean; // (선택) 강조 색상
  isFind?: boolean; // (선택) 보물 발견 여부
}

export interface CardItemWrapperProps {
  isFind?: boolean;
}
export interface ItemBoxContentTextProps {
  isRed?: boolean;
}
