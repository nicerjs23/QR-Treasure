import styled from "styled-components";

export const AdminWrapper = styled.div`
  max-width: 800px;
  padding: 20px;
  box-sizing: border-box;
`;

export const AdminTitle = styled.h1`
  ${({ theme }) => theme.fonts.nomal18};
  color: ${({ theme }) => theme.colors.font.white};
  text-align: center;
  margin-bottom: 8px;
`;

export const AdminInfo = styled.p`
  ${({ theme }) => theme.fonts.nomal18};
  color: ${({ theme }) => theme.colors.font.white};
  span {
    color: ${({ theme }) => theme.colors.page.gold};
  }
  text-align: center;
  margin-bottom: 30px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

export const AdminButton = styled.button`
  ${({ theme }) => theme.fonts.nomal18};
  padding: 15px;
  background-color: #4361ee;
  color: white;
  border: none;
  border-radius: 6px;

  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #3a56d4;
  }

  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;

export const StatusMessage = styled.div`
  ${({ theme }) => theme.fonts.nomal18};
  padding: 15px;
  background-color: #f8f9fa;
  border-left: 4px solid #4361ee;
  margin: 20px 0;
  font-weight: bold;
`;

export const AdminSection = styled.div`
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
`;

export const SectionTitle = styled.h3`
  ${({ theme }) => theme.fonts.nomal18};
  color: #333;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

export const DataPreview = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

export const DataItem = styled.div`
  ${({ theme }) => theme.fonts.nomal18};
  padding: 8px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export const LogoutButton = styled.button`
  ${({ theme }) => theme.fonts.nomal18};
  margin-top: 30px;
  padding: 10px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;

  &:hover {
    background-color: #c82333;
  }
`;
