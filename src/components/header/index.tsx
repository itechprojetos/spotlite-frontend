import React from 'react';

import {
  FaTh, FaThLarge, FaPlus, FaWhmcs, FaClone, FaPowerOff, FaSignOutAlt, FaDoorOpen,
} from 'react-icons/fa';

import { useHistory } from 'react-router-dom';

import {
  HeaderContainer, HeaderContent,
} from './styles';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';


const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  const history = useHistory();

  return (
    <>
      <HeaderContainer>
        {/* <img src={logoImg} alt="Logo" /> */}

        {/* <text>SPOT Lite</text> */}

        <HeaderContent>


          <button type="button" onClick={() => history.push('/home')}>
            <FaThLarge />
          </button>

          <button type="button" onClick={() => history.push('/new-spot-air-internacional-importation')}>
            <FaPlus />
          </button>

          <button type="button">
            <FaClone />
          </button>

          <button type="button">
            <FaWhmcs />
          </button>

          <button type="button" onClick={signOut}>
            <FaSignOutAlt />
          </button>

        </HeaderContent>
      </HeaderContainer>
    </>
  );
};

export default Header;
