import styled from 'styled-components';

// Container do cabeçalho
export const HeaderContainer = styled.header`
    padding: 18px 0;
    background: #E7E7E7;
    display: flex;
    justify-content: space-between;
    place-content: flex-end;

    text {
        font-size: 30px;
        font-family: 'Roboto Slab';
        font-weight: 700;
        margin-left: 10px;
        color: #0B7FE3;
        min-width: 150px;
    }

    img {
        width: 100px;
    }
`;

// Conteúdo do cabeçalho
export const HeaderContent = styled.div`
max-width: 1180px;
    display: flex;
    place-content: flex-end;
    padding: 0 50px 0 0;

    button {
        margin-left: 50px;
        background: transparent;
        border: 0;

        svg {
            color: #113F8C;
            width: 20px;
            height: 20px;
        }
    }
`;
