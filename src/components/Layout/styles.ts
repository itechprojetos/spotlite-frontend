import styled from 'styled-components';
// import { shade } from 'polished';

// Container macro
export const Container = styled.div`
    height: 100vh;
    display: flex;
`;

// Container do conteúdo principal da página
export const Content = styled.div`
    /* max-width: 1120px; */
    margin: 0 auto;
    flex: 1;
    align-items: center;
    flex-direction: column;

    /* border: #000 solid 4px; */
`;

// TESTE
export const GroupBox = styled.div`
    border: #AA1035 solid 4px;
`;

// Mensagem de boas-vindas
export const HiMessage = styled.text`
    font-size: 60px;
    color: #717171;
    font-family: 'Montserrat';
    font-weight: 700;
`;

// Mensagem de orientação
export const AskMessage = styled.text`
    font-size: 30px;
    color: #717171;
    font-family: 'Montserrat';
    font-weight: 400;
`;

// Container das opções
export const OptionsContent = styled.div`
    flex: 1;
    margin: 34px auto;
    align-items: center;
    border-color: #000;
    border-width: 2px;
`;

// Botão de opção: NOVA COTAÇÃO
export const OptionNew = styled.button`
    width: 200px;
    height: 75px;
    align-items: center;
    border-color: transparent;
    border-radius: 40px;
    background: #113F8C;
    color: #fff;
    margin-right: 50px;
`;

// Botão de opção: TEMPLATE
export const OptionTemplate = styled.button`
    width: 200px;
    height: 75px;
    align-items: center;
    border-color: transparent;
    border-radius: 40px;
    background: #00A1CB;
    color: #fff;
`;

// Texto das opções
export const OptionDescription = styled.text`
    font-size: 20px;
    font-weight: 800;
    color: #fff;
    font-family: 'Montserrat';
    font-style: italic;
`;

// ****************************************************************************
