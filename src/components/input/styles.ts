import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #fff;
    border-radius: 4px;
    padding: 16px;
    width: 100%;
    color: #666360;
    border: 2px solid #E7E7E7;

    display: flex;
    align-items: center;

    & + div {
            margin-top: 8px;
        }

    ${(props) => props.isErrored && css`
        border-color: #C53030;
    `}

    ${(props) => props.isFocused && css`
        color: #0B7FE3;
        border-color: #0B7FE3;
    `}

    ${(props) => props.isFilled && css`
        color: #0B7FE3;
    `}



    input {
        flex: 1;
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
