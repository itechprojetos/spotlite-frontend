import styled from 'styled-components';
import { shade } from 'polished';

// Container macro
export const Container = styled.main`
    overflow-y: hidden;
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
    background-color: #0B7FE3;
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
    /* margin: auto; */
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
    /* margin: 10px 40px; */
    width: 220px;
`;

export const SpotPickup = styled.div`
    font-size: 22px;
    font-weight: 900;
    color: #33415C;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 170px;
`;

export const SpotDelivery = styled.div`
    font-size: 22px;
    font-weight: 900;
    color: #33415C;
    font-family: 'Montserrat';
    /* margin: 10px 10px; */
    width: 170px;
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
    /* width: 370px; */
    display: flex;
    align-items: center;
    place-content: center;
    /* justify-content: space-around; */
    /* margin: 30px 0 0 0; */
    /* border: #000 solid 4px; */
`;

export const ButtonActiveUser = styled.button`
    margin-top: 20px;
    width: 250px;
    height: 60px;
    border: 1px solid #33415C;
    border-radius: 3px;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
    color: #FFF;
    background: #33415C;
    font-weight: 700;
    font-size: 15px;
    margin-right: 5px;

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

export const ButtonInativeUser = styled.button`
    width: 150px;
    height: 35px;
    align-items: center;
    border: #A10000 solid 1px;
    border-radius: 10px;
    color: #A10000;
    font-size: 12px;
    font-weight: 600;
`;

export const Grid = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const ContainerHeaderGrid = styled.div`
    width: 95%;
    display: flex;
    border-radius: 2px;

    & + div {
        margin-top: 6px;
    }
`;

export const ContainerHeaderSpecifications = styled.div`
    width: 95%;
    margin-left: 60px;
    /* display: flex; */

    border-radius: 4px;

    border: #33415C solid 4px;
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

    border-bottom: #0B7FE3 solid 4px ;

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
    display: flex;
    width: 900px;
    margin-top: 5px;
    /* margin-bottom: 20px; */

    font-size: 25px;
    font-weight: 800;
    color: #33415C;

    place-content: center;

    /* border-bottom: #0B7FE3 solid 4px ; */
`;

export const AnalystName = styled.h1`
    font-size: 25px;
    font-weight: 800;
    color: #CC6200;
    margin-left: 10px;
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

    border-bottom: #D4D4D4 solid 0.8px ;
`;

export const InputTaxTitle = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: #666360;
    font-family: 'Montserrat';
    width: 390px;

    /* border: #000 solid 4px; */
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

    /* border: #000 solid 4px; */
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

    div {
        height: 40px;
        border-radius: 2px;

        input {
            font-size: 15px;
        }
    }

    /* border: #000 solid 4px; */
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

// Cartão dos melhores

export const ContainerCardBestPriceTime = styled.div`
    margin-top: 40px;
    width: 50%;
    justify-content: space-around;
    display: flex;
`;

export const CardBestPriceTime = styled.div`
    width: 100%;
    justify-content: space-between;
    /* display: flex; */
    background: #CC6200;
    width: 250px;
    height: 85px;
    border-radius: 12px;
    margin-bottom: 8px;

    /* :hover {
        cursor: pointer;
        box-shadow: 5px 5px 5px 2.5px #CACACA;
    } */
`;

export const CardHeaderBestPriceTime = styled.div`
    display: flex;
    background: #ffffff;
    width: 250px;
    height: 25px;
    border-radius: 10px 10px 0 0;

    font-size: 18px;
    font-weight: 700;
    color: #CC6200;
    font-family: 'Roboto Slab';

    place-content: center;

    svg {
        color: #CC6200;
        align-self: center;
        width: 20px;
        height: 20px;

        margin-right: 5px;
    }
`;

export const CardItemProvider = styled.div`
    display: flex;
    width: 250px;
    height: 25px;

    font-size: 20px;
    font-weight: 800;
    color: #D4D4D4;

    border-bottom: #FFF solid 1px;

    place-content: center;
`;

export const CardItem = styled.div`
    display: flex;
    width: 250px;
    height: 25px;

    font-size: 25px;
    font-weight: 700;
    color: #FFF;

    place-content: center;
`;

// Cartão dos demais

export const ContainerCardOthers = styled.div`
    margin-top: 40px;
    width: 80%;
    justify-content: space-around;
    display: flex;
`;

export const CardOthers = styled.div`
    width: 100%;
    /* justify-content: space-around; */
    /* display: flex; */
    background: #33415C;
    width: 160px;
    height: 70px;
    border-radius: 8px;
    margin: 15px 0;

    place-content: center;
    align-items: center;
    justify-content: center;

    :hover {
        cursor: pointer;
        box-shadow: 3px 3px 3px 2px #CACACA;
    }

`;

export const CardAnalysts = styled.div`
    width: 100%;
    /* justify-content: space-around; */
    /* display: flex; */
    background: #33415C;
    width: 160px;
    /* height: 46px; */
    border-radius: 8px;
    margin: 15px 0;

    place-content: center;
    align-items: center;
    justify-content: center;

    :hover {
        cursor: pointer;
        box-shadow: 3px 3px 3px 2px #CACACA;
    }

`;


export const CardOthersItemProvider = styled.div`
    display: flex;
    width: 160px;

    font-size: 15px;
    font-weight: 700;
    color: #33415C;
    background: #FFF;
    border-radius: 7px 7px 0 0;
    font-family: 'Roboto Slab';

    place-content: center;
`;

export const CardOthersItem = styled.div`
    display: flex;
    width: 160px;

    font-size: 20px;
    font-weight: 700;
    color: #FFF;

    place-content: center;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const CardItemAnalysts = styled.div`
    display: flex;
    width: 160px;

    font-size: 20px;
    font-weight: 700;
    color: #CC6200;

    text-align: center;
    place-content: center;
/*
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
`;

export const ContainerColunmsDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    justify-content: space-around;
    width: 95%;
`;

export const HeaderColunmDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;

    background: #33415C;
    color: #FFF;
    font-size: 30px;
    font-weight: 700;
    font-family: 'Roboto Slab';

`;

export const ColunmDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
    margin-top: 40px;
    margin-bottom: 5px;

    border: #33415C solid 3px;
    border-radius: 4px;
`;

export const AboutThisCotationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
    margin-top: 40px;
    margin-bottom: 5px;

    border: #33415C solid 3px;
    border-radius: 4px;
`;

export const NonePrices = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    text-align: center;
    width: 100%;
    height: 100%;

    color: #CC6200;
    font-size: 25px;
    font-weight: 700;
    font-family: 'Roboto Slab';

    margin-bottom: 25px;

`;

export const DivFlex = styled.div`
    display: flex;
    align-items: center;
    place-content: center;
    justify-content: space-between;

    width: 100%;

    > div {
        width: 100%;
        margin-top: 8px;
    }
`;

export const ContainerButtons = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Option1 = styled.div`
    margin-top: 20px;
    width: 350px;
    height: 60px;
    border: 1px solid #33415C;
    border-radius: 3px;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
    color: #FFF;
    background: #33415C;
    font-weight: 700;
    font-size: 15px;
    margin-right: 5px;

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

export const Option2 = styled.div`
    margin-top: 20px;
    width: 350px;
    height: 60px;
    border: 1px solid #33415C;
    border-radius: 3px;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
    color: #FFF;
    background: #33415C;
    font-weight: 700;
    font-size: 15px;
    margin-right: 5px;

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

export const Option3 = styled.div`
    margin-top: 20px;
    width: 350px;
    height: 60px;
    border: 1px solid #33415C;
    border-radius: 3px;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
    color: #FFF;
    background: #33415C;
    font-weight: 700;
    font-size: 15px;
    margin-right: 5px;

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

        svg {
            color: #33415C;
        }
    }
`;

export const ElectedProviderTitle = styled.div`
    display: flex;
    margin: 20px 0;

    font-size: 15px;
    font-weight: 700;
    color: #565656;

    place-content: center;
`;

export const ElectedProviderHeaderSpecifications = styled.div`
    border-radius: 4px;
    border: #33415C solid 2px;
    display: flex;

    padding: 0 4px;
`;

export const ElectedProviderItensContent = styled.div`
`;

export const ElectedProviderHeader = styled.div`
    font-size: 12px;
    font-weight: 800;
    color: #CC6200;
    font-family: 'Montserrat';
    width: 150px;
`;

export const ElectedProviderDescription = styled.div`
    font-size: 17px;
    font-weight: 900;
    color: #33415C;
    font-family: 'Montserrat';
    width: 150px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
