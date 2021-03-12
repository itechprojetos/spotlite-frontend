import styled, { css } from 'styled-components';
import { AccountCircle } from '../../styles/Icons';

interface ContainerProps {
  isOpened: boolean;
}

export const AccountIcon = styled(AccountCircle)``;

export const Container = styled.div<ContainerProps>`
  max-width: ${(props) => (props.isOpened ? '200px' : '60px')};
  min-width: 60px;
  position: fixed;
  width: 100%;
  height: 100vh;
  background: #D9D9D9;
  transition: max-width 300ms ease;
  display: flex;
  flex-direction: column;
  z-index: 11;

  &:hover {

      }

  > div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;

    > img {
        ${(props) => (props.isOpened
    ? css`
              height: 55px;
            `
    : css`
              height: 35px;
            `)}
    }

    button {
      width: 100%;
      height: 100%;
      background: none;
      border: none;
      display: flex;
      align-items: center;
      ${(props) => (props.isOpened
    ? css`
              justify-content: flex-end;
              margin-right: 28px;
            `
    : css`
              justify-content: center;
            `)}
      color: #8A8A8A;
      transition: color 0.3s;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  nav {
    height: 60px;
    a {
      display: flex;
      align-items: center;
      ${(props) => (props.isOpened
    ? css`
              justify-content: space-between;
              padding: 0 32px;
            `
    : css`
              justify-content: space-around;
            `)}
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      color: #8A8A8A;

          svg {
            color: #33415C;
          }

      height: 100%;
      &.active {
        background: #BABABA;
        svg {
            color: #CC6200;
          }

      }
      transition: background 0.3s;
      &:hover {
        background: #CFCFCF;
      }
    }
  }
`;

export const SignOutButton = styled.button<ContainerProps>`
    height: 60px;

      width: 100%;
      height: 100%;
      background: none;
      border: none;
      display: flex;
      align-items: center;
      ${(props) => (props.isOpened
    ? css`
              justify-content: flex-end;
              margin-right: 32px;
            `
    : css`
              justify-content: center;
            `)}
      color: #717171;
      transition: color 0.3s;

    display: flex;
    align-items: center;
    ${(props) => (props.isOpened
    ? css`
            justify-content: space-between;
            padding: 0 32px;
        `
    : css`
            justify-content: space-around;
        `)}
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    color: #8A8A8A;

    svg {
            color: #33415C;
          }

    height: 100%;
    &.active {
    background: #CDCDCD;
    }
    transition: background 0.3s;
    &:hover {
    background: #CFCFCF;
    }

`;

export const InfoUserContainer = styled.div`
    display: flex;
    // flex-direction: column;
    margin: 2px 0 10px 0;
    border: #33415C double 5px;
    border-radius: 4px;

    :hover {
        cursor: pointer;
    }

    svg {
        margin: 10px 10px 10px 5px;
        color: #CC6200;
        height: 55px;
        width: 55px;
    }
`;

export const InfoUserData = styled.div`
    display: flex;
    flex-direction: column;
    place-content: center;

`;

export const UserInfoName = styled.div`


    width:100%;
    font-size: 15px;
    font-weight: 800;
    color: #33415C;
    display: flex;
    // align-items: center;
    // place-content: center;

    // border-top: #CC6200 solid 3px;

    svg {
        width: 20px;
        height: 20px;
        color: #113F8C;
        margin-left: 10px;
        margin-right: 25px;
    }

    /* border: #000 solid 4px; */
`;

export const ApprovaLimit = styled.div`
    width:100%;
    font-size: 10px;
    font-weight: 800;
    color: #5C677D;
    display: flex;
    // align-items: center;
    // place-content: center;

    /* border: #000 solid 4px; */
    /* border-bottom: #0B7FE3 solid 3px; */

    svg {
        width: 15px;
        height: 15px;
        color: #113F8C;
        margin-left: 12.3px;
        margin-right: 28px;
    }
`;

export const UserInfoCompany = styled.div`
    width:100%;
    font-size: 10px;
    font-weight: 800;
    color: #5C677D;
    display: flex;
    // align-items: center;
    // place-content: center;

    svg {
        width: 15px;
        height: 15px;
        color: #113F8C;
        margin-left: 12.3px;
        margin-right: 28px;
    }
`;

export const UserInfoPermission = styled.div`
    width:100%;
    font-size: 10px;
    font-weight: 800;
    color: #5C677D;
    display: flex;
    // align-items: center;
    // place-content: center;

    margin-bottom: 3px;
    // border-bottom: #CC6200 solid 3px;

    svg {
        width: 15px;
        height: 15px;
        color: #5C677D;
        margin-left: 12.3px;
        margin-right: 28px;
    }

    /* border: #000 solid 4px; */
`;

export const ProfileIcon = styled.div`
    width:100%;
    height: 83px;
    place-content: center;
    align-items: center;

    svg {
        margin: 30px 7px;
        color: #7D8597;
        height: 45px;
        width: 45px;
    }
`;
