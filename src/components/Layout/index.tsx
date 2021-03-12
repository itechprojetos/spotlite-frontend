import React from 'react';

import 'react-day-picker/lib/style.css';

import Header from '../header/index';

import Sidebar from '../sidebar/index';
import SidebarHover from '../SidebarHover/index';

import { Container, Content } from './styles';

const Layout: React.FC = ({ children }) => (
  <>
    <Container>
      {/* <Sidebar /> */}

      <SidebarHover />
      <Content>
        { children }
      </Content>
    </Container>
  </>
);


export default Layout;
