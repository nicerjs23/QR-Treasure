import styled from "styled-components";
import Logo from "@components/mainLogo/Logo";
import { useAuthStore } from "@store/authStore";

const LogoWithName = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <LogoWithNameWrapper>
      <Logo />
      <NameText>
        {user
          ? `${user.team || "0조"}조 ${user.username || "이름없음"}님`
          : "0조 이름없음"}
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
