import styled from "styled-components";
import twingkle from "@assets/lottie/Twingkle.json";
import Lottie from "lottie-react";

const Logo = () => {
    
    return (
        <Wrapper>
        {/* 왼쪽 반짝이 */}
        <Twingkle top={-20} left={-75} />
      {/* 오른쪽 위 반짝이 */}
      <Twingkle top={-65} right={-65} />
      {/* 오른쪽 반짝이 */}
      <Twingkle bottom={-55} right={-75} />
      MT사이트</Wrapper>
    );
}

export default Logo;

const Wrapper = styled.div`
display: flex;
position: relative; /* absolute 기준점 */
${({ theme }) => theme.fonts.logo50}
color: ${({ theme }) => theme.colors.font.white};
/* -webkit-text-stroke-width: 2px;
-webkit-text-stroke-color: #000; */
`;

// 각 위치 prop이 있을 때만 적용되도록 처리
interface TwingkleProps {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  }

const Twingkle: React.FC<TwingkleProps> = ({ top, left, right, bottom }) => {
    const style: React.CSSProperties = {
      position: 'absolute',
      width: 130, // 이미지에 맞게 크기 축소
      height: 130, // 이미지에 맞게 크기 축소
      pointerEvents: 'none',
    };
    
    if (top !== undefined) style.top = `${top}px`;
    if (left !== undefined) style.left = `${left}px`;
    if (right !== undefined) style.right = `${right}px`;
    if (bottom !== undefined) style.bottom = `${bottom}px`;
  
    return (
      <Lottie
        animationData={twingkle}
        loop
        autoplay
        style={style}
      />
    );
  };