import styled from 'styled-components';
import * as material from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';

export const Container = styled.div`
  position: absolute;
  padding: 2rem;
  width: 900px;
  top: 50%;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  border-radius: 0.2rem;
  -webkit-box-shadow: 0px 0px 81px 3px rgba(0,0,0,0.15);
  -moz-box-shadow: 0px 0px 81px 3px rgba(0,0,0,0.15);
  box-shadow: 0px 0px 81px 3px rgba(0,0,0,0.15);
`;

export const CloseModalButton = styled(FaTimes)`
  position: absolute;
  top: 25px;
  right: 25px;
  cursor: pointer;
`;

export const Tabs = styled(material.Tabs)`
  border-right: 1px solid #e3e3e3;
`;

export const Tab = styled(material.Tab)`
  .MuiTab-wrapper {
    align-items: left;
    text-align: left;
    display: initial;
  }
`;
