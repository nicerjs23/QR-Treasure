import * as S from "./LoginCard.styled";

import LoginCardForm from "./LoginCardForm";
const LoginCard=()=>{
    return(
        <S.CardWrapper>
            <S.CardHeader>로그인 해주세요.</S.CardHeader>
            <S.CardBody>
                <LoginCardForm/>
            </S.CardBody>
        </S.CardWrapper>
    )
}   

export default LoginCard;
