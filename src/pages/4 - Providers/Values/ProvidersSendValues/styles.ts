import styled from 'styled-components';
import { shade } from 'polished';
import trash from '../../../../assets/logo2.svg';

// Container macro
export const Container = styled.main`
overflow-y: hidden;

    form {
        width: 60%;
        /* display: flex; */
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 20px;
        /* justify-content: space-between; */
        /* align-content: center; */
        /* place-content: center; */

        /* > div {
            width: 610px;
            font-weight: 400;
        } */
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
    background-color: #0F36A5;
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
    display: flex;

    /* border: #000 solid 4px; */

`;
// Título
export const Title = styled.h1`
    font-size: 70px;
    font-weight: 700;
    color: #023E7D;
    font-family: 'Ubuntu'
`;

export const Items = styled.h1`
    font-size: 15px;
    font-weight: 600;
    color: #666360;
    font-family: 'Montserrat';
`;

export const SpotTitle = styled.div`
    font-size: 22px;
    font-weight: 900;
    color: #33415C;
    font-family: 'Montserrat';
    width: 220px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SpotPickup = styled.div`
    font-size: 22px;
    font-weight: 900;
    color: #33415C;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 170px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SpotDelivery = styled.div`
    font-size: 22px;
    font-weight: 900;
    color: #33415C;
    font-family: 'Montserrat';
    /* margin: 10px 10px; */
    width: 170px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SpotModal = styled.div`
    font-size: 22px;
    font-weight: 900;
    color: #33415C;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 100px;
`;

export const SpotLoadType = styled.div`
    font-size: 22px;
    font-weight: 900;
    color: #33415C;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 40px;
`;

export const SpotClosureDays = styled.div`
    font-size: 22px;
    font-weight: 900;
    color: #33415C;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 90px;
`;

export const SpotStatusDescription = styled.div`
    font-size: 22px;
    font-weight: 900;
    color: #33415C;
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
    align-items: center;
    border-color: transparent;
    border-radius: 40px;
    background: #0F36A5;
    color: #fff;
    /* margin-right: 50px; */
    font-family: 'Montserrat';
    font-size: 13px;

    /* font-style: italic; */
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
`;

export const ContainerHeaderSpecifications = styled.div`
    width: 95%;
    margin-left: 60px;
    /* display: flex; */

    border-radius: 4px;

    border: #33415C solid 3px;
    padding: 1rem 0;
`;

export const ContainerHeaderGrid = styled.div`
    width: 95%;
    display: flex;
    border-radius: 2px;

    & + div {
        margin-top: 6px;
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

export const SearchMessage = styled.h1`
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
    color: #666666;
    font-family: 'Montserrat';

    border-bottom: #0F36A5 solid 4px ;

    :hover {
        cursor: pointer;
    }
`;

export const OptionUnselected = styled.div`
    font-size: 30px;
    font-weight: 300;
    color: #666666;
    font-family: 'Montserrat';

    :hover {
        cursor: pointer;
    }
`;


// Títulos dos cabeçalhos

export const HeaderSpotTitle = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #CC6200;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 220px;
`;

export const HeaderSpotPickup = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #CC6200;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 170px;
`;

export const HeaderSpotDelivery = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #CC6200;
    font-family: 'Montserrat';
    /* margin: 10px 10px; */
    width: 170px;
`;

export const HeaderSpotModal = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #CC6200;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 100px;
`;

export const HeaderSpotLoadType = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #CC6200;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 40px;
`;

export const HeaderSpotClosureDays = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #CC6200;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 90px;
`;

export const HeaderSpotStatusDescription = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #CC6200;
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

export const SectionContainer = styled.div`
    width: 100%;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: #33415C solid 3px;

    /* border: #000 solid 4px; */
`;

export const TitleSection = styled.h1`
    font-size: 20px;
    font-weight: 800;
    color: #7D8597;
    font-family: 'Montserrat';
`;

// Cabeçalho das taxas

export const HeaderTaxesContainer = styled.div`
    width: 100%;
    justify-content: space-between;
    display: flex;
`;

export const HeaderTaxTitle = styled.div`
    font-size: 17px;
    font-weight: 800;
    color: #666360;
    font-family: 'Montserrat';
    width: 390px;

    /* border: #000 solid 4px; */
`;

export const HeaderTaxCurrency = styled.div`
    font-size: 17px;
    font-weight: 800;
    color: #666360;
    font-family: 'Montserrat';
    width: 150px;

    /* border: #000 solid 4px; */
`;

export const HeaderTaxAmount = styled.div`
    font-size: 17px;
    font-weight: 800;
    color: #666360;
    font-family: 'Montserrat';
    width: 190px;

    /* border: #000 solid 4px; */
`;

// Input das taxas

export const InputsTaxesContainer = styled.div`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;

    margin-top: 10px;

    border-bottom: #D4D4D4 solid 0.8px;
`;

export const InputsTaxesContainerList = styled.div`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;

    margin-top: 10px;

    border-bottom: #D4D4D4 solid 0.8px ;

    /* :hover{
        cursor: no-drop;
    } */
`;

export const InputTaxTitle = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #535353;
    width: 390px;

    /* border: #000 solid 4px; */
`;

export const InputTaxTitleList = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #535353;
    width: 350px;

    padding: 0 0 0 13px;
`;

export const InputTaxCurrency = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: #666360;
    font-family: 'Montserrat';
    width: 150px;

    /* border: #000 solid 4px; */
`;

export const InputTaxCurrencyPicker = styled.div`
    width: 150px;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #535353;
`;

export const InputTaxCurrencyPickerSecondaryValue = styled.div`
    width: 150px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-style: italic;
    font-weight: 500;
    color: #979797;
`;

export const InputSubtotalCurrencyPicker = styled.div`
    width: 150px;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #535353;
    margin-top: 8px;
    height: 35px;
    display: flex;
    align-items: center;
`;

export const InputTaxAmount = styled.div`
    /* font-size: 17px;
    font-weight: 500;
    color: #666360;
    font-family: 'Montserrat'; */
    width: 190px;
    place-content: center;
    align-items: center;
    justify-content: center;

    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #535353;

    div {
        /* height: 40px; */
        /* border-radius: 2px; */

        input {
            font-size: 15px;
        }
    }

    /* border: #000 solid 4px; */
`;

export const InputTaxAmountList = styled.div`
    width: 190px;
    place-content: center;
    align-items: center;
    justify-content: center;

    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #535353;

    padding: 0 0 0 13px;
`;

export const InputTaxAmountListSecondary = styled.div`
    width: 190px;
    place-content: center;
    align-items: center;
    justify-content: center;

    font-family: 'Roboto', sans-serif;
    font-style: italic;
    font-size: 14px;
    font-weight: 500;
    color: #979797;

    padding: 0 0 0 13px;
`;

export const InputTaxAmount2 = styled.div`
    font-size: 17px;
    font-weight: 500;
    color: #666360;
    font-family: 'Montserrat';
    width: 190px;
    place-content: center;
    align-items: center;
    justify-content: center;

    /* border: #000 solid 4px; */
`;

// Botão de opção: TEMPLATE
export const SendButton = styled.div`
    width: 200px;
    height: 75px;
    align-items: center;
    border-color: transparent;
    border-radius: 40px;
    background: #00A1CB;
    color: #fff;
`;

export const ContainerButtons = styled.div`
    display: flex;
    margin-top: 20px;
    align-items: center;
    place-content: center;
    /* justify-content: space-between; */

    /* background: #000; */
    /* justify-content: space-between; */
`;

export const Option1 = styled.button`
    /* margin-top: 20px; */
    width: 45%;
    height: 60px;
    border: 1px solid #33415C;
    border-radius: 3px;

    align-items: center;
    place-content: center;
    display: flex;
    /* margin-bottom: 8px; */
    color: #FFF;
    background: #33415C;
    font-weight: 700;
    font-size: 15px;
    /* margin-right: 5px; */

    svg {
        color: #CC6200;
        margin-right: 25px;
        flex-shrink: 0;
        width: 20px;
        height: 20px;
    }

    :hover {
        cursor: pointer;
        background: transparent;
        color: #33415C;
    }
`;

export const SubtotalCalculator = styled.button`
    /* width: 45%; */
    height: 60px;
    border: 1px solid #33415C;
    border-radius: 3px;

    align-items: center;
    place-content: center;
    display: flex;
    /* margin-bottom: 8px; */
    color: #FFF;
    background: #33415C;
    font-weight: 700;
    font-size: 15px;
    /* margin-right: 5px; */

    svg {
        color: #CC6200;
        margin-right: 25px;
        flex-shrink: 0;
        width: 20px;
        height: 20px;
    }

    :hover {
        cursor: pointer;
        background: transparent;
        color: #33415C;
    }
`;

export const SubtotalTaxTitle = styled.div`
    font-size: 17px;
    font-weight: 800;
    color: #33415C;
    width: 390px;
    margin-top: 8px;
    height: 35px;
    display: flex;
    align-items: center;
`;

export const TotalTaxTitle = styled.div`
    font-size: 22px;
    font-weight: 800;
    color: #CC6200;
    font-family: 'Montserrat';
    width: 390px;
    margin-top: 8px;

    /* border: #000 solid 4px; */
`;

export const SubtotalTaxCurrency = styled.button`
    display: flex;
    align-items: center;
    place-content: center;
    border: 0;
    font-size: 17px;
    font-weight: 800;
    color: #CC6200;
    font-family: 'Montserrat';
    width: 150px;
    margin-top: 8px;

    svg {
        width: 20px;
        height: 20px;

        :hover {
            cursor: pointer;
            color: ${shade(0.09, '#CC6200')};
        }
    }
`;

export const TotalTaxCurrency = styled.div`
    font-size: 22px;
    font-weight: 800;
    color: #CC6200;
    font-family: 'Montserrat';
    width: 150px;
    margin-top: 8px;

    /* border: #000 solid 4px; */
`;

export const SubtotalTaxAmount = styled.div`
    font-size: 22px;
    font-weight: 800;
    color: #33415C;
    width: 188px;
    margin-top: 8px;
    background: #D4D4D4;
    border-radius: 4px;
    height: 35px;
    display: flex;
    align-items: center;
    padding: 0 17px;
`;

export const SubtotalTaxAmountSecondary = styled.div`
    font-size: 22px;
    font-weight: 800;
    color: #33415C;
    font-family: 'Montserrat';
    width: 190px;
    margin-top: 2px;

    /* border: #000 solid 4px; */
`;

export const TotalTaxAmount = styled.div`
    font-size: 22px;
    font-weight: 800;
    color: #CC6200;
    font-family: 'Montserrat';
    width: 190px;
    margin-top: 8px;

    /* border: #000 solid 4px; */
`;
