import React, {
  useState, useCallback, useEffect, memo,
} from 'react';

import {
  FaThLarge, FaPlus, FaClone, FaTruckLoading, FaChevronCircleLeft, FaChevronCircleRight, FaSignOutAlt, FaPowerOff,
} from 'react-icons/fa';

import { NavLink } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container, SignOutButton } from './styles';

const Sidebar: React.FC = () => {
  const [isOpened, setIsOpened] = useState(() => {
    const sidebarState = localStorage.getItem('@PontoLoc:sidebarState');

    if (sidebarState) {
      return true;
    }

    return false;
  });

  const handleToggleSidebar = useCallback(() => {
    setIsOpened((state) => !state);
  }, []);

  useEffect(() => {
    if (isOpened) {
      localStorage.setItem('@Spot:sidebarState', String(isOpened));
    } else {
      localStorage.removeItem('@Spot:sidebarState');
    }
  }, [isOpened]);

  const { signOut } = useAuth();

  return (
    <Container isOpened={!!isOpened}>
      <div>
        <button type="button" onClick={handleToggleSidebar}>
          {isOpened ? <FaChevronCircleLeft size={20} /> : <FaChevronCircleRight size={20} />}
        </button>
      </div>
      <nav>
        <NavLink to="/home">
          <FaThLarge size={20} />
          {isOpened && 'Dashboard'}
        </NavLink>
        <NavLink to="/new-spot-air-internacional-importation">
          <FaPlus size={20} />
          {isOpened && 'Cotação'}
        </NavLink>
        <NavLink to="/templates">
          <FaClone size={20} />
          {isOpened && 'Templates'}
        </NavLink>
        <NavLink to="/providers">
          <FaTruckLoading size={20} />
          {isOpened && 'Provedores'}
        </NavLink>
        <SignOutButton isOpened={!!isOpened} onClick={signOut}>
          <FaPowerOff size={20} />
          {isOpened && <strong>Sair</strong>}
        </SignOutButton>
      </nav>
    </Container>
  );
};

export default memo(Sidebar);
