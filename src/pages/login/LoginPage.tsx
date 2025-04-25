import styled from "styled-components";
const LoginPage = () => {
    return (
      <div>
        로그인페이지
        <Logo>로고</Logo>
        <Subtitle>부제목</Subtitle>
        <Big>큰 텍스트</Big>
        <Nomal>일반 텍스트</Nomal>
        <Detail>세부 텍스트</Detail>
        <Small>작은 텍스트</Small>  
      </div>
    );
  };
  
  export default LoginPage;

  
const Logo = styled.div`
${({ theme }) => theme.fonts.logo50};
color: ${({ theme }) => theme.colors.font.textRed};
`;
const Subtitle = styled.div`
${({ theme }) => theme.fonts.subtitle30};
`;
const Big = styled.div`
${({ theme }) => theme.fonts.big20};
`;  
const Nomal = styled.div`
${({ theme }) => theme.fonts.nomal18};
`;
const Detail = styled.div`
${({ theme }) => theme.fonts.detail14};
`;  
const Small = styled.div`
${({ theme }) => theme.fonts.small12};
`;  

