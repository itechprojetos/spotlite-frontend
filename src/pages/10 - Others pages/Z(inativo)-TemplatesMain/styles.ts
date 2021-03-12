import styled from 'styled-components';
import { shade } from 'polished';

// Container macro
export const Container = styled.main`
overflow-y: hidden;
display: flex;

    form {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        align-items: center;
        justify-content: space-between;
        align-content: center;

        div {
            width: 210px;
            height: 50px;
            border-radius: 20px;
            font-weight: 400;
            /* border-color: transparent; */
            margin: 10px 3px;
            padding: 15px;
            font-style: italic;
        }


        input {
            border-radius: 20px;
            width: 210px;
            font-weight: 400;
            height: 40px;
            border-color: transparent;
            margin: 10px 3px;
            padding: 15px;
            font-family: 'Montserrat';
            font-style: italic;
        }
    }
`;

// Container do conteúdo principal da página
export const Content = styled.div`
    max-width: 1120px;
    margin: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

// Título
export const Title = styled.text`
    font-size: 50px;
    font-weight: 900;
    color: #00A1CB;
    font-family: 'Montserrat';
    font-style: italic;
`;

export const ButtonsContainer = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
    margin-top: 20px;
`;

// Botão de opção: NOVA COTAÇÃO
export const ButtonTemplates = styled.button`
    width: 200px;
    height: 45px;
    align-items: center;
    border-color: transparent;
    border-radius: 40px;
    background: #00A1CB;
    color: #fff;
    /* margin-right: 50px; */
    font-family: 'Montserrat';
    /* font-style: italic; */
`;

export const ButtonSpots = styled.button`
    width: 200px;
    height: 45px;
    align-items: center;
    border-color: transparent;
    border-radius: 40px;
    background: #B6B6B6;
    color: #fff;
    /* margin-right: 50px; */
    font-family: 'Montserrat';
    /* font-style: italic; */
`;

export const SearchBox = styled.div`
    /* width: 100%; */
    /* flex: 1;
    flex-direction: column; */
    display: flex;
    align-items: center;
    /* margin-bottom: 10px; */
    margin-top: 20px;

    border: #000 solid 4px;
`;
