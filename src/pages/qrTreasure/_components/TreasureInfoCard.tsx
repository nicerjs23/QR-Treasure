import styled from "styled-components";

interface TreasureInfoCardProps {
  text: string;
  isPenalty?: boolean;
}
const TreasureInfoCard = ({ text, isPenalty }: TreasureInfoCardProps) => {
  return (
    <TreasureInfoCardWrapper isPenalty={isPenalty}>
      {text}
    </TreasureInfoCardWrapper>
  );
};

export default TreasureInfoCard;

const TreasureInfoCardWrapper = styled.div<{ isPenalty?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90%;
  min-width: 290px;
  height: 68px;

  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  background: ${({ isPenalty }) =>
    isPenalty
      ? "linear-gradient(90deg, rgba(37, 33, 48, 0.00) 0%, #252130 25%, #252130 75%, rgba(37, 33, 48, 0.00) 100%)"
      : "linear-gradient(90deg, rgba(142, 109, 56, 0) 0%, #f4bc61 25%, #f4bc61 75%, rgba(142, 109, 56, 0) 100%)"};

  ${({ theme }) => theme.fonts.subtitle32};
  color: ${({ theme }) => theme.colors.page.white};
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000;
`;
