import styled from "styled-components";
import { useAuthStore } from "@store/authStore"; // zustand 스토어 import

const LogoutBtn = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(); // 상태에서 user를 null로 만듦
  };
  return <LogoutBtnWrapper onClick={handleLogout}>로그아웃</LogoutBtnWrapper>;
};

export default LogoutBtn;

const LogoutBtnWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 32px;

  border-radius: 5px;
  border: 1px solid #000;

  background: linear-gradient(180deg, #383442 43.75%, #292734 55.77%);

  color: ${({ theme }) => theme.colors.font.white};
  ${({ theme }) => theme.fonts.nomal16}
`;
