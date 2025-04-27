import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import styled from "styled-components";

import myTreasure from "@assets/icons/myTreasure.png";
import myTreasureActive from "@assets/icons/myTreasureActive.png";
import treasureList from "@assets/icons/treasureList.png";
import treasureListActive from "@assets/icons/treasureListActive.png";
import home from "@assets/icons/home.png";
import homeActive from "@assets/icons/homeActive.png";
import team from "@assets/icons/team.png";
import teamActive from "@assets/icons/teamActive.png";
const Footer = ({ isFooterVisible }: { isFooterVisible: boolean }) => {
  const navigate = useNavigate(); // useNavigate 사용
  const location = useLocation();

  const handleIconClick = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };
  return (
    <>
      <FooterWrapper style={{ display: isFooterVisible ? "flex" : "none" }}>
        <IconWrapper onClick={() => handleIconClick("/mytreasure")}>
          <img
            src={
              location.pathname === "/mytreasure"
                ? myTreasureActive
                : myTreasure
            }
            alt="My Treasure"
          />
        </IconWrapper>
        <IconWrapper onClick={() => handleIconClick("/treasurelist")}>
          <img
            src={
              location.pathname === "/treasurelist"
                ? treasureListActive
                : treasureList
            }
            alt="Treasure List"
          />
        </IconWrapper>
        <IconWrapper onClick={() => handleIconClick("/home")}>
          <img
            src={location.pathname === "/home" ? homeActive : home}
            alt="Home"
          />
        </IconWrapper>
        <IconWrapper onClick={() => handleIconClick("/team")}>
          <img
            src={location.pathname === "/team" ? teamActive : team}
            alt="Team"
          />
        </IconWrapper>
      </FooterWrapper>
      <Gap style={{ display: isFooterVisible ? "flex" : "none" }} />
    </>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 12px;
  display: flex;
  width: 100%;
  justify-content: space-around; /* 아이콘 간격 조정 */
  max-width: 540px;
`;

const IconWrapper = styled.div`
  flex: 1; /* 각 아이콘이 1/4씩 차지하도록 설정 */
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%; /* 비율에 맞게 이미지 크기 조정 */
    height: auto; /* 비율 유지 */
  }
`;

const Gap = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.background.darkPurple};
  max-width: 540px;
`;
