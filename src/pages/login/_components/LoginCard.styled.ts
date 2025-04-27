import styled from "styled-components";

export const CardWrapper=styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 88%;
max-width: 400px;//로그인카드 너무 길어지는거 방지 
height: 124px;

border-radius: 0.3125rem;
box-shadow: 2px 4px 6px 0px rgba(0, 0, 0, 0.25);

margin-bottom: 150px;
`

export const CardHeader=styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 28%;

border-radius: 0.3125rem 0.3125rem 0 0; /* 상단 모서리만 둥글게 */
background-color: ${({ theme }) => theme.colors.page.brown};

${({ theme }) => theme.fonts.big20}
color: ${({ theme }) => theme.colors.font.white};
`

export const CardBody=styled.div`
display: flex;
justify-content: center;
/* align-items: center; */
padding: 10px 0 10px 0;


width: 100%;
height: 73%;

border-radius: 0 0 0.3125rem 0.3125rem; 
background-color: ${({ theme }) => theme.colors.page.charcoal};
`

