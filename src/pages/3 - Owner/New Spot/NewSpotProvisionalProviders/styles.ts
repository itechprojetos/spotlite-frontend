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
            height: 50px;
            border-radius: 20px;
            font-weight: 400;
            border-color: #fff;

            border-radius: 4px 0 0 4px;
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
    height: 50px;
    background-color: #5C677D;
    border: 0;
    border-radius: 0 4px 4px 0;
`;

export const AddButton = styled.button`
    place-content: center;
    width: 60px;
    height: 60px;
    background-color: #CC6200;
    border: 0;
    border-radius: 4px 0 0 4px;
`;
// Container do conteúdo principal da página
export const Content = styled.div`
    max-width: 1120px;
    margin: auto;
    margin-top: 35px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;
export const SuppliersList = styled.div`
    width: 95%;

    /* margin-left: 45px; */
    display: flex;

    border-bottom: #B1B1B1 solid 0.8px ;
`;
// Título
export const Title = styled.h1`
    font-size: 70px;
    font-weight: 700;
    color: #023E7D;
    font-family: 'Ubuntu'
`;

export const Items = styled.text`
    font-size: 20px;
    font-weight: 600;
    color: #666360;
    font-family: 'Montserrat';
    margin: 10px 40px;

    /* & + text {
        margin: 10px 50px;
    } */
`;


export const ButtonsContainer = styled.div`
    /* height: 50px; */
    width: 170px;
    height: 45px;
    display: flex;
    align-items: center;
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

export const ButtonActiveUser = styled.div`
    width: 100%;
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
        cursor: pointer;
        background: #33415C;
        color: #FFF;

        svg {
            color: #FFF;
        }
    }
`;

export const ButtonSendEmails = styled.div`
    width: 200px;
    height: 35px;
    margin-top: 5px;
    background: #CC6200;
    border-radius: 4px;

    align-items: center;
    place-content: center;
    display: flex;
    color: #FFF;
    font-weight: 700;
    font-size: 13px;

    :hover {
        cursor: pointer;
        background: transparent;
        border: 1px solid #CC6200;
        color: #CC6200;

        svg {
            color: #FFF;
        }
    }
`;

export const ButtonInativeUser = styled.button`
    width: 100px;
    height: 25px;
    align-items: center;
    border-color: transparent;
    border-radius: 40px;
    background: #565656;
    color: #fff;
    /* margin-right: 50px; */
    font-family: 'Montserrat';
    /* font-style: italic; */
`;

export const Grid = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    place-content: center;

    :hover {
        /* cursor: pointer;
        background: #CFCFCF; */
    }
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


export const SelectedProviders = styled.div`
    display: flex;
    align-items: center;
    place-content: center;

    width: 100%;
    height: 100px;
    margin-top: 10px;
    border-radius: 10px;
    border: 2px solid #002855;

    flex-wrap: wrap;
    overflow-y: auto;
`;

export const ProviderSelected = styled.div`
    display: flex;
    /* width: 130px; */
    height: 30px;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    /* margin-top: 10px; */
    border-radius: 10px;
    background: #E0E0E0;
    margin: 10px 10px 0;

    svg {
        color: #5C677D;
        width: 20px;
        height: 20px;
        margin-left: 20px;

        :hover {
            color: #CC6200;
        }
    }
`;

export const ProviderSelectedName = styled.h1`
    font-size: 15px;
    font-weight: 700;
    color: #666360;
    color: #023E7D;
`;

export const ContainerHeaderGrid = styled.div`
    width: 95%;
    height: 42px;

    /* margin-left: 45px; */
    display: flex;

    background: #33415C;

    border-radius: 2px;
`;

export const HeaderGrid = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const ItemsContainer = styled.div`
    width: 100%;
    justify-content: space-between;
    display: flex;
`;

export const HeaderSpotTitle = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #FFF;
    font-family: 'Montserrat';
    margin-left: 8px;
    width: 220px;

`;

export const HeaderSpotPickup = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #FFF;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 170px;

`;

export const HeaderSpotDelivery = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #FFF;
    font-family: 'Montserrat';
    /* margin: 10px 10px; */
    width: 170px;

`;

export const HeaderSpotModal = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #FFF;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 170px;

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

export const SpotTitle = styled.div`
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 800;
    color: #666360;
    font-family: 'Montserrat';
    margin-left: 8px;
    width: 220px;

`;

export const SpotPickup = styled.div`
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 800;
    color: #666360;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 170px;

`;

export const SpotDelivery = styled.div`
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 800;
    color: #666360;
    font-family: 'Montserrat';
    /* margin: 10px 10px; */
    width: 170px;

`;

export const SpotModal = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #666360;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 170px;
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
