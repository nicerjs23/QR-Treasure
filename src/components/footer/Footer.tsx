import { useState } from "react";
import styled from "styled-components";
import myTreasure from "@assets/icons/myTreasure.png";
import myTreasureActive from "@assets/icons/myTreasureActive.png";
import treasureList from "@assets/icons/treasureList.png";
import treasureListActive from "@assets/icons/treasureListActive.png";
import home from "@assets/icons/home.png";
import homeActive from "@assets/icons/homeActive.png";
import team from "@assets/icons/team.png";
import teamActive from "@assets/icons/teamActive.png";
const Footer = () => {
    const [activeIcon, setActiveIcon] = useState<string>("");

    const handleIconClick = (icon: string) => {
        setActiveIcon(icon);
    };

    return (
        <FooterWrapper>
            <IconWrapper onClick={() => handleIconClick("myTreasure")}>
                <img 
                    src={activeIcon === "myTreasure" ? myTreasureActive : myTreasure} 
                    alt="My Treasure" 
                />
            </IconWrapper>
            <IconWrapper onClick={() => handleIconClick("treasureList")}>
                <img 
                    src={activeIcon === "treasureList" ? treasureListActive : treasureList} 
                    alt="Treasure List" 
                />
            </IconWrapper>
            <IconWrapper onClick={() => handleIconClick("home")}>
                <img 
                    src={activeIcon === "home" ? homeActive : home} 
                    alt="Home" 
                />
            </IconWrapper>
            <IconWrapper onClick={() => handleIconClick("team")}>
                <img 
                    src={activeIcon === "team" ? teamActive : team} 
                    alt="Team" 
                />
            </IconWrapper>
        </FooterWrapper>
    );
};

export default Footer;

const FooterWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around; /* 아이콘 간격 조정 */
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