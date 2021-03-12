import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    place-content: center;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 700px;

    form {
        margin: 50px 0;
        text-align: center;

        div {
            width: 450px;
        }
    }
`;
export const Title = styled.text`
    font-size: 70px;
    font-weight: 700;
    color: #023E7D;
    font-family: 'Ubuntu'
`;
