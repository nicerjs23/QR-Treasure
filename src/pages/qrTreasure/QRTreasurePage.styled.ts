import styled from "styled-components";

export const QRTreasureWrapper = styled.div`
  display: flex;
  width: 100%;
  /* min-height: calc(100vh);
  border: 5px solid red; */
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  padding-top: 43px;
`;

export const TreasureBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 400px;
  @media (max-width: 540px) {
    height: 368px;
  }
`;
export const TreasureBox = styled.div`
  display: flex;
  width: 80%;
  min-width: 300px;
  height: auto;
`;

export const Modal = styled.div`
  position: fixed; // 화면에 고정
  top: 0;

  width: 100%;
  height: 100%;
  max-width: 540px;

  background: rgba(39, 39, 39, 0.6); // 배경 색상
  z-index: 1000; // 다른 요소 위에 표시

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 130px;
  box-sizing: border-box;
`;
