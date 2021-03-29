import styled from 'styled-components';

export const Container = styled.main`
    height: 100vh;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    place-content: center;
    padding: 0 150px 0 150px;

    form {
        /* display: flex; */
        flex-direction: column;
        align-items: center;
        place-content: center;
        width: 600px;
        height: 500px;
        margin: 20px 0;
        background: #FFF;
        padding: 0 15px 0 15px;
        border-radius: 20px;
    }
`;

export const ButtonNextStep = styled.button`
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
    }
`;
