import styled from "styled-components";
import Logo from "@components/mainLogo/Logo";

const LogoWithName = () => {
  const team = 7;
  const name = "이동건";
  return (
    <LogoWithNameWrapper>
      <Logo />
      <NameText>
        {team}조 {name}님
      </NameText>
    </LogoWithNameWrapper>
  );
};
export default LogoWithName;

const LogoWithNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 17px;
  margin-bottom: 14px;
`;

const NameText = styled.div`
  ${({ theme }) => theme.fonts.subtitle30};
  color: ${({ theme }) => theme.colors.page.gold};
`;
