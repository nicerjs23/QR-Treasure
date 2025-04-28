import styled from "styled-components";

interface QRTreasureCardProps {
  cardHeaderNum?: number;
  cardBodyText: string;
}
const QRTreasureCard = ({
  cardHeaderNum,
  cardBodyText,
}: QRTreasureCardProps) => {
  return (
    <QRTreasureCardWrapper>
      <CardHeader>{cardHeaderNum}번 상자</CardHeader>
      <CardBody>{cardBodyText}</CardBody>
    </QRTreasureCardWrapper>
  );
};

export default QRTreasureCard;

const QRTreasureCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 88%;
  min-height: 90px;

  border-radius: 5px;
  box-shadow: 2px 4px 6px 0px rgba(0, 0, 0, 0.25);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 30px;

  background: linear-gradient(180deg, #3a2628 41.19%, #402b2d 67.06%);

  border-radius: 5px 5px 0 0;
  ${({ theme }) => theme.fonts.big20}
  color: ${({ theme }) => theme.colors.page.gold};
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  min-height: 60px;
  ${({ theme }) => theme.fonts.nomal18}
  color: ${({ theme }) => theme.colors.font.white};

  box-sizing: border-box;
  padding: 10px 20px;

  background: ${({ theme }) => theme.colors.page.charcoal};
`;
