import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 94%;
  height: 100%;

  justify-content: space-between;

  /* padding: 0 10px; */
  box-sizing: border-box;
`;

export const CardInput = styled.input`
  width: 100%;
  height: 35px;
  padding: 0.625rem 0.75rem;
  box-sizing: border-box;

  border-radius: 0.3125rem;
  border: 1px solid ${({ theme }) => theme.colors.font.black};
  background-color: ${({ theme }) => theme.colors.page.cardBeige};

  color: ${({ theme }) => theme.colors.font.charcoal}; /* 입력된 텍스트 색상 */
  ${({ theme }) => theme.fonts.nomal16}/* 입력된 텍스트 폰트 */;

  /* 클릭 시 이펙트 제거 */
  &:focus {
    outline: none; /* 기본 테두리 제거 */
    box-shadow: none; /* 추가적인 그림자 제거 */
  }
`;

export const CardButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
export const CardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80px;
  height: 30px;

  border-radius: 0.375rem;
  border: 1px solid #000;
  background: linear-gradient(180deg, #383442 43.75%, #292734 55.77%);

  color: ${({ theme }) => theme.colors.font.white};
  ${({ theme }) => theme.fonts.nomal18}
`;

export const CardErrorText = styled.div`
  display: flex;

  ${({ theme }) => theme.fonts.detail14};
  color: ${({ theme }) => theme.colors.font.coralRed};
`;
