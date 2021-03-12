import styled from 'styled-components';
// import { shade } from 'polished';

// Container macro
export const Container = styled.div`
    display: flex;
`;

// Container do conteúdo principal da página
export const Content = styled.div`
    max-width: 1120px;
    margin: 194px auto;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

// Mensagem de boas-vindas
export const HiMessage = styled.h1`
    font-size: 80px;
    color: #33415C;
    font-family: 'Montserrat';
    font-weight: 800;

    margin-bottom: 25px;
`;

export const HiMessageName = styled.text`
    font-size: 80px;
    color: #CC6200;
    font-family: 'Montserrat';
    font-weight: 800;
`;

// Mensagem de orientação
export const AskMessage = styled.h1`
    font-size: 30px;
    color: #33415C;
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
export const OptionDescription = styled.h1`
    font-size: 20px;
    font-weight: 800;
    color: #fff;
    font-family: 'Montserrat';
    font-style: italic;
`;

export const DivFlex = styled.div`
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

        svg {
            color: #33415C;
        }
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
        cursor: no-drop;
        /* background: transparent;
        color: #33415C;

        svg {
            color: #33415C;
        } */
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

// ****************************************************************************
