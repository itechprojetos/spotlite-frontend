import styled, { css } from 'styled-components';

interface ContainerProps {
  isOpened: boolean;
}

export const Container = styled.div<ContainerProps>`
  max-width: ${(props) => (props.isOpened ? '200px' : '60px')};
  min-width: 60px;
  width: 100%;
  height: 100vh;
  background: #D9D9D9;
  transition: max-width 300ms ease;
  display: flex;
  flex-direction: column;
  z-index: 30;

  &:hover {

      }

  > div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;

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
              margin-right: 32px;
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
            color: #0B7FE3;
          }

      height: 100%;
      &.active {
        background: #BABABA;
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
            color: #0B7FE3;
          }

    height: 100%;
    &.active {
    background: #CDCDCD;
    }
    transition: background 0.3s;
    &:hover {
    background: #BABABA;
    }

`;
