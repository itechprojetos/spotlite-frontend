import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`

    background: #33415C;
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #33415C;
    padding: 0 16px;
    margin-top: 16px;

    align-items: center;
    place-content: center;
    display: flex;
    color: #FFF;
    font-weight: 500;
    font-size: 15px;

    :hover {
        cursor: pointer;
        background: transparent;
        color: #33415C;
        font-weight: 700;

        svg {
            color: #33415C;
        }
    }

    /* background: #33415C;
    height: 56px;
    border-radius: 4px;
    border: 0px;
    padding: 0 16px;
    color: #fff;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;

    &:hover {
        background: ${shade(0.2, '#113F8C')};
    } */
`;
