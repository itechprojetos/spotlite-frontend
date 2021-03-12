import styled from 'styled-components';

export const Container = styled.button`
    width: 500px;
    max-width: 100%;
    margin: 0 auto;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background: #FFF;
    padding: 10px 20px 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border: none;

    svg {
        margin-bottom: 15px;

        width: 30px;
        height: 30px;
        align-self: flex-end;
        color: #CC6200;

        :hover {
            cursor: pointer;
        }
    }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 999;
`;
