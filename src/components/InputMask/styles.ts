import styled from 'styled-components';

// Container macro
export const Container = styled.div`
    display: flex;
`;

export const Label = styled.div`
    padding: 6px 12px;
    font-size: 14px;
    color: #555;
    background-color: #FFF;
    border: 1px solid #ccc;

    display: flex;
    align-items: center;

    border-radius: 4px 0 0 4px;
`;

export const InputText = styled.input`
    flex: 1;
    padding: 6px 12px;
    border: 1px solid #ccc;
    background: transparent;
    border-radius: 4px;
    height: 40px;
    font-family: 'Roboto'
`;
