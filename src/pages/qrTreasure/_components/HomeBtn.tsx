import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const HomeBtn = () => {
  const navigate = useNavigate();
  return (
    <HomeBtnWrapper onClick={() => navigate("/home")}>
      홈으로 가기
    </HomeBtnWrapper>
  );
};

export default HomeBtn;

const HomeBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 45px;

  ${({ theme }) => theme.fonts.big20}
  color: ${({ theme }) => theme.colors.font.white};

  border-radius: 6px;
  border: 1px solid #000;
  background: linear-gradient(180deg, #383442 43.75%, #292734 55.77%);
`;
