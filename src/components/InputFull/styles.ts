import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #FFF;
    border-radius: 2px;
    padding: 0 16px;
    width: 100%;
    height: 100%;
    color: #666360;
    /* border: 2px solid #E7E7E7; */

    display: flex;

    ${(props) => props.isErrored && css`
        border: 2px solid #C53030;
    `}

    ${(props) => props.isFocused && css`
        color: #0B7FE3;
        border: 2px solid #33415C;
    `}

    ${(props) => props.isFilled && css`
        /* border: 2px solid #0B7FE3; */
    `}



    input {
        width: 100%;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        background: transparent;
        border: 0;
        color: #4F4F4F;

        &:placeholder {
            color: #666360;
        }
    }

    svg {
        margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;

    svg {
        margin: 0;
    }

    span {
        background: #C53030;
        color: #FFF;

        &::before {
            border-color: #C53030 transparent;
        }
    }
`;
