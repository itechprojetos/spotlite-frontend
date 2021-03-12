import styled from 'styled-components';
import { shade } from 'polished';

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

export const TitleContainer = styled.div`
    width: 100%;
    /* margin: auto; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    /* flex-direction: column; */
`;

// Container do número do passo
export const IndicatorStep = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
    background: #0B7FE3;
    border-radius: 10px;
`;

// Número do passo
export const StepNumber = styled.text`
    font-size: 50px;
    font-weight: 900;
    color: #fff;
    /* font-family: 'Montserrat';
    font-style: italic; */
    margin: 0 10px;
`;

// Título
export const Title = styled.text`
    font-size: 70px;
    font-weight: 600;
    color: #0B7FE3;
    font-family: 'Roboto Slab';
    /* font-style: italic; */
    /* margin-left: 8px; */
`;

export const SectionContainer = styled.div`
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
    margin-top: 25px;

    border-bottom: #B1B1B1 solid 0.8px ;
`;

export const TitleSection = styled.text`
    font-size: 30px;
    color: #414141;
    font-family: 'Montserrat';
`;

// Container de teste para renderização condicional
export const ConditionalContainer = styled.div`
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
    margin-top: 10px;
`;

// Container de teste para renderização condicional
export const DivDescription = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    margin-top: 10px;

    > div {
      width: 500px;
      height: 60px;

    }
`;


// Container de teste para renderização condicional
export const ConditionalContainerTwoFields = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    margin-top: 10px;

    > div {
      width: 300px;
      height: 60px;

    }
`;

// Container de teste para renderização condicional
export const ConditionalContainerThreeFields = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;

    > div {
      width: 300px;
      height: 60px;
      margin: 10px 3px;
      padding: 15px;
    }
`;

// Container de teste para renderização condicional
export const DivFlex = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
    /* place-content: center; */

    > div {
      width: 260px;
      height: 60px;
      margin: 0 0;
      /* padding: 15px; */
    }
`;

// Container de teste para renderização condicional
export const DivFlexTwo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    place-content: center;

    > div {
      width: 600px;
      height: 60px;
      /* margin: 10px 3px;
      padding: 15px; */
    }
`;

// Container de teste para renderização condicional
export const DivRetiradaEntrega = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    /* place-content: center; */

    div {
      width: 260px;
      height: 60px;
      margin: 0 0;
      padding: 15px;
      margin-bottom: 10px;
    }
`;

// Container de teste para renderização condicional
export const DivPesoQuantidade = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    place-content: center;
    margin-top: 4px;

    > div {
      width: 220px;
      height: 60px;
      margin: 0 0;

      > div {
        width: 200px;
        height: 65px;
        margin-top: 3px;
        margin-left: 3px;
      }
    }
`;

// Container de teste para renderização condicional
export const DivDimensoes = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    place-content: center;

    > div {
      width: 220px;
      height: 60px;
      margin: 0 0;

      > div {
        width: 150px;
        margin-top: 3px;
        margin-left: 3px;
      }
    }
`;

export const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

// Botão de opção: NOVA COTAÇÃO
export const ButtonSaveLikaATemplate = styled.button`
    width: 200px;
    height: 65px;
    align-items: center;
    border-color: transparent;
    border-radius: 40px;
    background: #0B7FE3;
    color: #fff;
    margin-right: 50px;
    font-family: 'Montserrat';
    font-weight: 600;
`;

export const ButtonNextStep = styled.button`
    width: 200px;
    height: 65px;
    align-items: center;
    border-color: transparent;
    border-radius: 40px;
    background: #113F8C;
    color: #fff;
    margin-right: 50px;
    font-family: 'Montserrat';
    font-weight: 600;
    /* font-style: italic; */
`;
