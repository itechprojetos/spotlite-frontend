import styled from 'styled-components';
import { shade } from 'polished';
import TextField from '@material-ui/core/TextField';

// Container macro
export const Container = styled.main`
overflow-y: hidden;

    form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        align-items: center;
        /* justify-content: space-between; */
        align-content: center;
        place-content: center;

        > div {
            width: 610px;
            height: 60px;
            border-radius: 20px;
            font-weight: 400;
            border-color: #fff;

            border-radius: 7px 0 0 7px;
        }
    }
`;
// Container do conteúdo principal da página
export const Header = styled.div`
    max-width: 1120px;
    margin: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const SearchButton = styled.button`
    place-content: center;
    width: 60px;
    height: 60px;
    background-color: #5C677D;
    border: 0;
    border-radius: 0 7px 7px 0;
`;

export const AddButton = styled.button`
    place-content: center;
    width: 60px;
    height: 60px;
    background-color: #CC6200;
    border: 0;
    border-radius: 10px 0 0 10px;
`;
// Container do conteúdo principal da página
export const Content = styled.div`
    /* max-width: 1120px; */
    margin: auto;
    margin-top: 35px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;
export const SuppliersList = styled.div`
    width: 95%;

    margin-left: 45px;
    display: flex;
    /* align-items: center; */

    /* border: #000 solid 4px; */

    border-bottom: #B1B1B1 solid 0.8px ;

    & + div {
        margin-top: 16px;
    }

    button {
        margin: 0 15px;
    }
`;
// Título
export const Title = styled.text`
    font-size: 70px;
    font-weight: 700;
    color: #023E7D;
    font-family: 'Ubuntu';
`;

export const Items = styled.text`
    font-size: 15px;
    font-weight: 600;
    color: #666360;
    font-family: 'Montserrat';
`;

export const SpotTitle = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #666360;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 220px;

    /* :hover {
        cursor: pointer;
        color: ${shade(0.2, '#0F36A5')};
    } */
`;

export const SpotPickup = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #666360;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 170px;
`;

export const SpotDelivery = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #666360;
    font-family: 'Montserrat';
    /* margin: 10px 10px; */
    width: 170px;
`;

export const SpotModal = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #666360;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 100px;
`;

export const SpotLoadType = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #666360;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 40px;
`;

export const SpotClosureDays = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #666360;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 90px;
`;

export const SpotStatusDescription = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #666360;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 230px;
`;


export const ButtonsContainer = styled.div`
    /* height: 50px; */
    width: 170px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
    margin-top: 10px;

    /* border: #000 solid 4px; */
`;

// Botão de opção: NOVA COTAÇÃO
export const ButtonSettings = styled.button`
    width: 100px;
    height: 25px;
    align-items: center;
    border-color: transparent;
    border-radius: 40px;
    background: #0B7FE3;
    color: #fff;
    /* margin-right: 50px; */
    font-family: 'Montserrat';
    /* font-style: italic; */
`;

export const ButtonActiveUser = styled.button`
    width: 150px;
    height: 35px;
    border: 1px solid #33415C;
    border-radius: 4px;

    align-items: center;
    place-content: center;
    display: flex;
    color: #33415C;
    font-weight: 700;
    font-size: 13px;

    :hover {
        cursor: no-drop;
        /* background: #33415C;
        color: #FFF; */

        svg {
            color: #FFF;
        }
    }
`;

export const ButtonInativeUser = styled.button`
    width: 150px;
    height: 35px;
    align-items: center;
    border-color: transparent;
    border-radius: 40px;
    background: #CC6200;
    color: #fff;
    /* margin-right: 50px; */
    font-family: 'Montserrat';
    font-size: 13px;

    /* font-style: italic; */
`;

export const Grid = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    :hover {
        cursor: pointer;
        background: #CFCFCF;
    }
`;

export const ContainerHeaderGrid = styled.div`
    width: 95%;

    margin-left: 45px;
    display: flex;

    background: #33415C;

    border-radius: 2px;

    /* border-bottom: #B1B1B1 solid 4px ; */

    & + div {
        margin-top: 16px;
    }

    button {
        margin: 0 15px;
    }
`;

export const HeaderGrid = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const ItemsContainer = styled.div`
    width: 100%;
    justify-content: space-around;
    display: flex;
`;

export const SearchMessage = styled.text`
    font-size: 30px;
    font-weight: 600;
    color: #666360;
    font-family: 'Montserrat';
`;

export const SearchContainer = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
`;

export const OptionsContainer = styled.div`
    /* height: 70px; */
    width: 50%;
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    margin-bottom: 30px;
`;

export const OptionSelected = styled.div`
    font-size: 30px;
    font-weight: 800;
    color: #5C677D;

    border-bottom: #CC6200 solid 4px ;

    :hover {
        cursor: pointer;
    }
`;

export const OptionUnselected = styled.div`
    font-size: 30px;
    font-weight: 300;
    color: #5C677D;
    font-family: 'Montserrat';

    :hover {
        cursor: pointer;
    }
`;


// Títulos dos cabeçalhos

export const HeaderSpotTitle = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #FFF;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 220px;
`;

export const HeaderSpotPickup = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #FFF;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 170px;
`;

export const HeaderSpotDelivery = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #FFF;
    font-family: 'Montserrat';
    /* margin: 10px 10px; */
    width: 170px;
`;

export const HeaderSpotModal = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #FFF;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 100px;
`;

export const HeaderSpotLoadType = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #FFF;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 40px;
`;

export const HeaderSpotClosureDays = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #FFF;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 90px;
`;

export const HeaderSpotStatusDescription = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #FFF;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 230px;
`;

export const SpaceEmptyHeader = styled.button`
    width: 150px;
    height: 35px;
    align-items: center;
    border-color: transparent;
    border-radius: 40px;
    background: transparent;
    color: #fff;
    /* margin-right: 50px; */
    font-family: 'Montserrat';
    font-size: 13px;
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
