import styled, { css } from 'styled-components';

import Tooltip from '../TooltipLabel';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: 60%;
  height: 100%;
  flex-direction: column;
  position: relative;
  /* border: 2px solid #E7E7E7; */
  /* border-radius: 4px; */

    /* & + div {
            margin-top: 8px;
        } */

    ${(props) => props.isErrored && css`
        color: #C53030;
        border: 2px solid #C53030;
        /* border-color: #C53030; */
    `}

    ${(props) => props.isFocused && css`
        color: #0B7FE3;
        /* border-color: #33415C; */
        border: 2px solid #33415C;
    `}

    ${(props) => props.isFilled && css`
        color: #33415C;
    `}

    .Active {
        transform: translate(0, 2px) scale(0.75);
        /* color: #33415C; */
    }

    input {
        height: 100%;
        width: 100%;
        padding: 14px 16px 0 10px;
        outline: 0;
        border: 1px solid transparent;
        background: #fff;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 500;
        color: #535353;
    }

    svg {
        margin-right: 16px;
    }

    label {
        font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
        padding: 0 15px;
        color: #999;
        pointer-events: none;

        position: absolute;
        transform: translate(0, 13px) scale(1);
        transform-origin: top left;
        transition: all 0.2s ease-out;
    }

    :focus-within label {
        transform: translate(0, 2px) scale(0.75);
        /* color: #33415C; */
    }
`;

export const Error = styled(Tooltip)`

    svg {

    }

    span {
        background: #C53030;
        color: #FFF;

        &::before {
            border-color: #C53030 transparent;
        }
    }
`;
