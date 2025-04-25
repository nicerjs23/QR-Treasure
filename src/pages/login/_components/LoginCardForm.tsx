import * as S from "./LoginCardForm.styled";
import { useNavigate } from 'react-router-dom';

const LoginCardForm=()=>{
    const navigate = useNavigate();
    return(
        <S.FormWrapper>
            <S.CardInput type="text" placeholder="꼭 본인의 이름을 입력해주세요."/>
            <S.CardButtonWrapper>
                <S.CardErrorText>** 존재하지 않는 사자입니다.</S.CardErrorText>
                <S.CardButton onClick={()=>navigate("/home")}>확인</S.CardButton>
            </S.CardButtonWrapper>
        </S.FormWrapper>
    )
}

export default LoginCardForm;
