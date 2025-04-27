import styled from "styled-components";
import LogoImg from "@assets/images/homeImg.png";

// 메인 로고 이미지와 QR 버튼을 겹치는 컴포넌트
const MainLogoImg = () => {
  return (
    <MainImgWrapper>
      <MainImg src={LogoImg} alt="아기사자로고" />
      <QrBtn>QR을 찾아서 찍어줘!</QrBtn>
    </MainImgWrapper>
  );
};

export default MainLogoImg;

const MainImgWrapper = styled.div`
  position: relative; /* MainImg와 QrBtn을 겹치기 위한 position 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainImg = styled.img`
  height: 185px;
  width: auto;
`;

const QrBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 33px;
  border-radius: 5px;
  border: 2px solid #000;
  background: linear-gradient(
    180deg,
    #383442 43.75%,
    #292734 55.77%
  ); // 수정된 부분
  ${({ theme }) => theme.fonts.nomal16}
  color: ${({ theme }) => theme.colors.font.white};
  position: absolute; /* MainImgWrapper를 기준으로 위치 설정 */
  bottom: 10px; /* MainImg 하단으로부터 10px 위로 배치 (원하는 값으로 조절) */
  left: 100px; /* 원하는 값으로 조절 */
`;
