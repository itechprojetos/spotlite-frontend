import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    place-content: center;
`;

export const Title = styled.text`
    font-size: 60px;
    font-weight: 600;
    color: #666360;
    font-family: 'Montserrat';
`;

export const Test = styled.text`
    font-size: 30px;
    font-weight: 600;
    color: #CC6200;
    font-family: 'Montserrat';
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;

    width: 100%;
    /* max-width: 700px; */

    form {
        /* margin: 50px 0;
        width: 340px; */
        text-align: center;
    }
`;

export const DivFlex = styled.div`
    display: flex;
    align-items: center;
    place-content: center;

    width: 100%;

    > div {
        margin-top: 10px;
    }
`;

export const DivFlexAdress = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    place-content: center;
    margin-top: 10px;
`;


export const SuppliersList = styled.div`
    width: 1120px;
    /* margin: auto; */
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

export const Grid = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Items = styled.text`
    font-size: 20px;
    font-weight: 600;
    color: #666360;
    font-family: 'Montserrat';
    margin: 10px 40px;

    /* & + text {
        margin: 10px 50px;
    } */
`;
