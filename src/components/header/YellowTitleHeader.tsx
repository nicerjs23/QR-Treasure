import styled from "styled-components";

interface YellowTitleHeaderProps {
  title: string;
}
const YellowTitleHeader = ({ title }: YellowTitleHeaderProps) => {
  return <YellowTitleHeaderWrapper>{title}</YellowTitleHeaderWrapper>;
};

export default YellowTitleHeader;

const YellowTitleHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 10px;

  width: 78%;
  min-width: 290px;
  height: 38px;

  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  background: linear-gradient(
    90deg,
    rgba(142, 109, 56, 0) 0%,
    #f4bc61 25%,
    #f4bc61 75%,
    rgba(142, 109, 56, 0) 100%
  );

  ${({ theme }) => theme.fonts.subtitle32};
  color: ${({ theme }) => theme.colors.page.white};
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000;
`;
