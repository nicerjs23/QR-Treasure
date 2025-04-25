import * as S from "./LoginPage.styled";
import Logo from "@components/mainLogo/Logo";
import LoginCard from "./_components/LoginCard";
const LoginPage = () => {
    return (
      <S.Wrapper>
        <Logo />
        <LoginCard/>
        <S.MadeBy>@made by 동건 효준 서현</S.MadeBy>
      </S.Wrapper>
    );
  };
  
  export default LoginPage;

  

