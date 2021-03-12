import styled from 'styled-components';
import { shade } from 'polished';
import TextField from '@material-ui/core/TextField';

export const Container = styled.div``;

export const Header = styled.div`
    max-width: 1120px;
    margin: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const Title = styled.text`
    font-size: 70px;
    font-weight: 700;
    color: #023E7D;
    font-family: 'Ubuntu'
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1px auto 0;

    width: 100%;

    form {
        margin: 20px 0;
        width: 100%
        text-align: center;
        display: flex;
        flex-direction: column;

        h1 {
            margin-bottom: 24px;
            font-size: 60px;
            text-align: center;
            color: #fff;
        }

        a {
            color: #F4EDE8;
            display: block;
            margin-top: 14px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover{
                color: ${shade(0.2, '#F4EDE8')};
            }
        }

        input[name=old_password ] {
            margin-top: 24px;
        }
    }
`;

export const DivFlex = styled.div`
    display: flex;
    align-items: center;
    place-content: center;
    justify-content: space-between;

    width: 100%;

    > div {
        width: 420px;
        margin-top: 8px;
    }
`;

export const DivFlexCurrency = styled.div`
    display: flex;
    height: 70px;
    /* width: 99%; */
    align-items: center;
    place-content: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 10px;
    background-color: #fff;

    border: 3px solid #E7E7E7;
    border-radius: 7px;

    /* border: #000 solid 4px; */
`;

export const DivFlexCurrencyTwo = styled.div`
    display: flex;
    height: 70px;
    /* width: 99%; */
    align-items: center;
    place-content: center;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: 10px;
    /* background-color: #fff; */

    border: 1px solid #AEAEAE;
    border-radius: 7px;


    /* border: #000 solid 4px; */
`;

export const DivFlexPassword = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    place-content: center;
    justify-content: space-around;
    /* margin-top: 10px; */

    div {
        margin-top: 15px;
    }
`;

export const DivFlexPasswordTwo = styled.div`
    display: flex;
    margin: 10px 0;
    width: 100%;
    align-items: center;
    place-content: center;
    justify-content: space-between;

    > div {
        margin-top: 15px;
    }
`;

export const ApprovaLimitContainer = styled.div`
    margin: 30px 0 10px 0;
    display: flex;
    align-items: center;
    place-content: center;
    justify-content: space-around;

    width: 100%;

    /* > div {
        width: 420px;
        margin-top: 25px;
    } */
`;

export const ApprovaLimitLabel = styled.text`
    font-size: 30px;
    font-weight: 800;
    color: #666666;
    font-family: 'Montserrat';

    /* border-bottom: #0F36A5 solid 4px ; */

    :hover {
        cursor: pointer;
    }
`;

export const ApprovaLimit = styled.text`
    font-size: 30px;
    font-weight: 500;
    color: #666666;
    font-family: 'Montserrat';

    /* border-bottom: #0F36A5 solid 4px ; */

    :hover {
        cursor: pointer;
    }
`;

export const ButtonSave = styled.button`
    margin-top: 20px;
    /* width: 40%; */
    height: 50px;
    border: 1px solid #5C677D;
    border-radius: 4px;
    background: #5C677D;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
    color: #FFF;
    font-weight: 600;
    font-size: 16px;

    :hover {
        cursor: pointer;
        background: transparent;
        color: #5C677D;

        svg {
            color: #FFF;
        }
    }
`;

export const InputTextField = styled(TextField)`
    // Formata a cor da borda
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #33415C;
    }

    // Formata a cor do label em caso de foco
    .MuiInputLabel-outlined.Mui-focused {
        color: #33415C;
    }

    // Regula o tamanho da fonte do texto digitado
    .MuiInputBase-input {
        /* font-size: 12px; */
    }
`;
