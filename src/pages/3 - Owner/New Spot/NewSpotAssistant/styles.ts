import styled, { css } from 'styled-components';
import { shade } from 'polished';
import TextField from '@material-ui/core/TextField';

import {
  DeleteSweep,
  Add,
  NavigateNext,
  Save,
  AirplanemodeActive,
  DirectionsBoat,
  LocalShipping,
  FlightLand,
  FlightTakeoff,
  Translate,
  TextFormat,
  NextPlan,
} from '../../../../styles/Icons';

interface SelectedProp {
    selected: boolean;
  }


// Container macro
export const Container = styled.main`
    height: 100vh;
`;

// Container do conteúdo principal da página
export const Content = styled.div`
    max-width: 1120px !important;
    margin: auto !important;
    /* display: flex; */
    align-items: center !important;
    /* flex-direction: column; */
    padding: 0 150px 0 150px !important;
`;

export const DivFlex = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const TitleContainer = styled.div`
    width: 100%;
    /* margin: auto; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    /* flex-direction: column; */
`;

// Título
export const Title = styled.text`
    font-size: 70px;
    font-weight: 700;
    color: #023E7D;
    font-family: 'Ubuntu'
`;

export const Subtitle = styled.text`
    font-size: 30px;
    font-weight: 700;
    color: #5C677D;
    font-family: 'Ubuntu';
    /* font-style: italic; */
`;

export const SectionContainer = styled.div`
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
    margin-top: 25px;

    border-bottom: #3E3E3E solid 2px ;
`;

export const TitleSection = styled.text`
    font-size: 20px;
    font-weight: 500;
    color: #414141;
`;

export const ContainerHeaderSpecifications = styled.div`
    /* border-top: #414141 solid 3px; */
    border-bottom: #414141 solid 3px;

    /* border: #414141 dotted 2px; */
    /* border-radius: 4px; */


    background: #E6E6E6;
`;

export const ContainerHeaderGrid = styled.div`
    width: 95%;
    display: flex;
    border-radius: 2px;

    & + div {
        margin-top: 16px;
    }
`;

export const HeaderGrid = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;


export const ItemsContainerHeader = styled.div`
    width: 100%;
    height: 20px;
    justify-content: space-between;
    align-items: center;
    display: flex;

    border-radius: 5px 5px 0 0;

    background: #33415C;
`;

export const ItemsContainer = styled.div`
    width: 100%;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    display: flex;
`;

export const HeaderSpotTitle = styled.div`
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    color: #FFF;
    font-family: 'Montserrat';
    width: 220px;

    /* background: #000; */
`;

export const HeaderSpotPickup = styled.div`
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    color: #FFF;
    font-family: 'Montserrat';
    width: 220px;

    /* background: #000; */
`;

export const HeaderSpotDelivery = styled.div`
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    color: #FFF;
    font-family: 'Montserrat';
    width: 220px;

    /* background: #000; */
`;

export const ContainerInformations = styled.div`
    width: 95%;
    display: flex;

    /* border: #000 solid 4px; */

`;

export const Grid = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const SpotTitle = styled.div`
    font-size: 22px;
    font-weight: 900;
    text-align: center;
    color: #002855;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 220px;

    /* background: #000; */
`;

export const SpotPickup = styled.div`
    font-size: 22px;
    font-weight: 900;
    text-align: center;
    color: #002855;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 220px;

    /* background: #000; */
`;

export const SpotDelivery = styled.div`
    font-size: 22px;
    font-weight: 900;
    text-align: center;
    color: #002855;
    font-family: 'Montserrat';
    /* margin: 10px 40px; */
    width: 220px;

    /* background: #000; */
`;

export const InputTextField = styled(TextField)`
    width: 100%;
    border-radius: 4px;
    /* background: #FFF; */

    // Formata a cor da borda
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #767676;
    }

    // Formata a cor do label em caso de foco
    .MuiInputLabel-outlined.Mui-focused {
        color: #767676;
    }

    // Regula o tamanho da fonte do texto digitado
    .MuiInputBase-input {
        /* font-size: 12px; */
    }
`;

export const InputContainer = styled.div`
    /* display: flex; */
    margin-bottom: 8px;
    width: 40%;

    div {
        border-radius: 4px;
    }
`;

export const TagInput = styled.button`
    display: flex;
    place-content: initial;
    align-items: center;
    width: 110px;
    /* height: 57px; */
    /* background: #1F1D24; */
    border: 0;
    font-size: 11px;
    font-weight: 500;
    color: #767676;
    margin-bottom: 5px;
    padding: 0 0 0 5px;
`;

export const SelectContainer = styled.div`
    padding: 16px;
    width: 100%;
    height: 40px;
    color: #666360;
    border: 0.5px solid #B6B5B5;

    align-items: center;
    display: flex;
    margin-bottom: 8px;

    select {
        flex: 1;
        background: transparent;
        border: 0;
        font-family: 'Montserrat';
        font-weight: 500;
        color: #767676;
    }
`;

export const SelectContainerMeasures = styled.div`
    padding: 0 10px 0 16px;
    width: 100%;
    height: 40px;
    color: #666360;
    border: 0.5px solid #B6B5B5;

    align-items: center;
    display: flex;
    margin-bottom: 8px;
    justify-content: space-between;

    div {
        /* background: #000; */
        padding: 0;
        width: 40%;
        height: 35px;
        border-width: 0 0 0 0;
        border-radius: 0;
        border-bottom-width: 1px;
        background: transparent;

        input {
            font-size: 13px;
            font-weight: 500;
        }
    }

    select {
        width: 100px;
        background: transparent;
        border: 0;
        font-family: 'Inter';
        font-weight: 400;
        color: #767676;


    }
`;

export const SelectContainerDimensions = styled.div`
    padding: 0 10px 0 16px;
    width: 180px;
    height: 40px;
    color: #666360;
    border: 0.5px solid #B6B5B5;

    align-items: center;
    display: flex;
    margin-bottom: 8px;
    justify-content: space-between;

    div {
        /* background: #000; */
        padding: 0;
        width: 40%;
        height: 35px;
        border-width: 0 0 0 0;
        border-radius: 0;
        border-bottom-width: 1px;
        background: transparent;

        input {
            font-size: 13px;
            font-weight: 500;
        }
    }

    select {
        width: 100px;
        background: transparent;
        border: 0;
        font-family: 'Inter';
        font-weight: 400;
        color: #767676;
    }
`;

export const TypeButton = styled.div<SelectedProp>`
    margin-top: 20px;
    width: 350px;
    height: 40px;
    border: 1px solid #001233;
    border-radius: 3px;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
    color: ${(props) => (props.selected ? '#FFF' : '#001233')};
    background: ${(props) => (props.selected ? '#001233' : 'transparent')};
    /* color: #001233; */
    font-weight: 700;
    font-size: 13px;

    svg {
        color: ${(props) => (props.selected ? '#FFF' : '#001233')};
    }

    :hover {
        cursor: pointer;
        background: #001233;
        color: #FFF;

        svg {
            color: #FFF;
        }
    }
`;

export const NacionalIcon = styled(TextFormat)`
    flex-shrink: 0;
    width: 31px;
    height: 31px;
    color: #001233;
    margin-right: 10px;
`;

export const InternacionalIcon = styled(Translate)`
    flex-shrink: 0;
    width: 31px;
    height: 31px;
    color: #001233;
    margin-right: 10px;
`;

export const ModalButton = styled.div<SelectedProp>`
    margin-top: 20px;
    width: 250px;
    height: 40px;
    border: 1px solid #5C677D;
    border-radius: 3px;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
    color: ${(props) => (props.selected ? '#FFF' : '#5C677D')};
    background: ${(props) => (props.selected ? '#5C677D' : 'transparent')};
    font-weight: 700;
    font-size: 13px;

    svg {
        color: ${(props) => (props.selected ? '#FFF' : '#5C677D')};
    }

    :hover {
        cursor: pointer;
        background: #5C677D;
        color: #FFF;

        svg {
            color: #FFF;
        }
    }
`;

export const AirIcon = styled(AirplanemodeActive)`
    flex-shrink: 0;
    width: 31px;
    height: 31px;
    color: #5C677D;
    margin-right: 10px;
`;

export const SeaIcon = styled(DirectionsBoat)`
    flex-shrink: 0;
    width: 31px;
    height: 31px;
    color: #5C677D;
    margin-right: 10px;
`;

export const RoadIcon = styled(LocalShipping)`
    flex-shrink: 0;
    width: 31px;
    height: 31px;
    color: #5C677D;
    margin-right: 10px;
`;

export const FlowButton = styled.div<SelectedProp>`
    margin-top: 20px;
    width: 350px;
    height: 40px;
    border: 1px solid #0353A4;
    border-radius: 3px;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
    color: ${(props) => (props.selected ? '#FFF' : '#0353A4')};
    background: ${(props) => (props.selected ? '#0353A4' : 'transparent')};
    font-weight: 700;
    font-size: 13px;

    svg {
        color: ${(props) => (props.selected ? '#FFF' : '#0353A4')};
    }

    :hover {
        cursor: pointer;
        background: #0353A4;
        color: #FFF;

        svg {
            color: #FFF;
        }
    }
`;

export const ImportIcon = styled(FlightLand)`
    flex-shrink: 0;
    width: 31px;
    height: 31px;
    color: #0353A4;
    margin-right: 10px;
`;

export const ExportIcon = styled(FlightTakeoff)`
    flex-shrink: 0;
    width: 31px;
    height: 31px;
    color: #0353A4;
    margin-right: 10px;
`;

export const AddIcon = styled(Add)`
    flex-shrink: 0;
    width: 31px;
    height: 31px;
    color: #0466C8;
    margin-right: 10px;
`;

export const RemoveButton = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 40px;
    border: 1px solid #7B0707;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
    color: #7B0707;
    font-weight: 700;
    font-size: 13px;

    :hover {
        cursor: pointer;
        background: #7B0707;
        color: #FFF;

        svg {
            color: #FFF;
        }
    }
`;

export const DeleteIcon = styled(DeleteSweep)`
    flex-shrink: 0;
    width: 31px;
    height: 31px;
    color: #7B0707;
    margin-right: 10px;
`;

export const TwoInputsTextField = styled(TextField)`
    width: 40%;
    border-radius: 4px;
    /* background: #FFF; */

    // Formata a cor da borda
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #767676;
    }

    // Formata a cor do label em caso de foco
    .MuiInputLabel-outlined.Mui-focused {
        color: #767676;
    }

    // Regula o tamanho da fonte do texto digitado
    .MuiInputBase-input {
        /* font-size: 12px; */
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
`;

export const ButtonSaveLikaATemplate = styled.div`
margin-top: 20px;
    width: 40%;
    height: 40px;
    border: 1px solid #5C677D;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
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

export const TemplateIcon = styled(Save)`
    flex-shrink: 0;
    width: 31px;
    height: 31px;
    color: #5C677D;
    margin-right: 10px;
`;

export const ButtonNextStep = styled.div`
margin-top: 20px;
    width: 40%;
    height: 40px;
    border: 1px solid #001233;
    background: #001233;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
    color: #FFF;
    font-weight: 700;
    font-size: 13px;

    :hover {
        cursor: pointer;
        background: transparent;
        color: #001233;

        svg {
            color: #FFF;
        }
    }
`;

export const NextIcon = styled(NavigateNext)`
    flex-shrink: 0;
    width: 31px;
    height: 31px;
    color: #fff;
    margin-right: 10px;
    /* background: #fff; */
`;

export const NextContainer = styled.div`
    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    svg {
        width: 50px;
        height: 50px;
    }
`;

export const NextContent = styled.div`
    display: flex;
    align-items: center;
    place-content: center;
    justify-content: center;
    border-radius: 50px;
    height: 70px;
    width: 70px;

    :hover {
        background: #C9C9C9;
        cursor: pointer;
    }
`;

/* export const NextIcon = styled(NextPlan)`
    flex-shrink: 0;
    width: 31px;
    height: 31px;
    color: #0353A4;
    margin-right: 10px;
`; */
