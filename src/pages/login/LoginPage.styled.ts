import styled from "styled-components";

export const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 100%;
min-height: calc(var(--vh, 1vh) * 100);
/* margin-top: 100px; */
padding-top: 100px;
padding-bottom: 15px;
box-sizing: border-box;
`;

export const MadeBy=styled.div`
display: flex;
width: 100%;
padding-right: 10px;
margin-top: 50px;
box-sizing: border-box;
justify-content: flex-end;
${({ theme }) => theme.fonts.small10}
color: ${({ theme }) => theme.colors.font.white};
`;
