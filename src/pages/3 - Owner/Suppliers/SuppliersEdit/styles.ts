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
        /* width: 340px; */
        text-align: center;
    }
`;
export const Title = styled.text`
    font-size: 70px;
    font-weight: 700;
    color: #023E7D;
    font-family: 'Ubuntu'
`;

export const DivFlex = styled.div`
    display: flex;
    align-items: center;
    place-content: center;
    justify-content: space-between;

    width: 100%;

    > div {
        width: 420px;
        margin-top: 8px;
    }
`;
