import styled from 'styled-components';
import { shade } from 'polished';

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
            /* height: 60px; */
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
    border-radius: 80px;
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
    font-family: 'Ubuntu'
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
    width: 260px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-top: 10px;

    /* border: #000 solid 4px; */
`;

// Botão de opção: NOVA COTAÇÃO
export const ButtonSettings = styled.button`
    width: 150px;
    height: 35px;
    border: 1px solid #5C677D;
    border-radius: 4px;

    align-items: center;
    place-content: center;
    display: flex;
    color: #5C677D;
    font-weight: 700;
    font-size: 13px;

    :hover {
        cursor: pointer;
        background: #5C677D;
        color: #FFF;

        svg {
            color: #FFF;
        }
    }
`;

export const ButtonActiveUser = styled.button`
    width: 150px;
    height: 35px;
    border: 1px solid #33415C;
    border-radius: 4px;

    align-items: center;
    place-content: center;
    display: flex;
    color: #FFF;
    background: #33415C;
    font-weight: 500;
    font-size: 13px;

    :hover {
        cursor: pointer;
        background: transparent;
        color: #33415C;

        svg {
            color: #FFF;
        }
    }
`;

export const ButtonInativeUser = styled.button`
    width: 150px;
    height: 35px;
    border: 1px solid #CC6200;
    border-radius: 4px;

    align-items: center;
    place-content: center;
    display: flex;
    color: #FFF;
    background: #CC6200;
    font-weight: 500;
    font-size: 13px;

    :hover {
        cursor: pointer;
        background: transparent;
        color: #CC6200;

        svg {
            color: #FFF;
        }
    }
`;

export const Grid = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
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
    width: 260px;
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
