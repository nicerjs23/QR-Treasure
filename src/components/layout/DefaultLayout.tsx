import { Outlet } from "react-router-dom";
import styled from "styled-components";
const DefaultLayout = () => {
  return (
    <Wrapper>
      <section>
        <Outlet />
        </section>
      <footer>바텀 버튼</footer>
    </Wrapper>
  );
};

export default DefaultLayout;

const Wrapper = styled.section`
display: flex;
flex-direction: column;
flex-grow: 1;
min-height: 100vh;
/* padding-top: 3.5rem; */

background-color: ${({ theme }) => theme.colors.background.white};

`;