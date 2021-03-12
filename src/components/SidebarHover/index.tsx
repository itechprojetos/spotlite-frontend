import React, {
  useState, useCallback, useEffect, memo,
} from 'react';


import {
  FaThLarge,
  FaHome,
  FaPlus,
  FaClone,
  FaTruckLoading,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaRegTimesCircle,
  FaPowerOff,
  FaUsers,
  FaUserTie,
  FaBalanceScaleLeft,
  FaAddressCard,
  FaRegMoneyBillAlt,
  FaStoreAlt,
  FaNetworkWired,
  FaUser,
} from 'react-icons/fa';

import {
  FiPower,
  FiAlertOctagon,
  FiDollarSign,
} from 'react-icons/fi';

import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  SignOutButton,
  UserInfoName,
  UserInfoPermission,
  UserInfoCompany,
  ApprovaLimit,
  ProfileIcon,
  InfoUserContainer,
  InfoUserData,
  AccountIcon,
} from './styles';

import logo from '../../assets/logo.svg';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();

  // Definições do tipo de formação que o 'valor limite de aprovação' sofrerá
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  // Converte o 'valor limite de aprovação' de string para Float
  const value_approval_limit = parseFloat(user.approval_limit);

  // Realiza a formatação conforme definição
  const approval_limit = formatter.format(value_approval_limit);

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
  // <Container isOpened={!!isOpened} onMouseEnter={handleToggleSidebar} onMouseLeave={handleToggleSidebar}>
    <Container isOpened={!!isOpened}>
      <div>
        {/* Botão que faz ir e voltar a sidebar */}
        <button type="button" onClick={handleToggleSidebar}>
          {isOpened ? <FaChevronCircleLeft size={20} /> : <FaChevronCircleRight size={20} />}
        </button>
        {/* <img src={logo} alt="Logo" /> */}
      </div>
      <nav>
        <>

          {isOpened ? (
            <InfoUserContainer
              onClick={() => { history.push('/profile'); }}
            >
              <AccountIcon />
              <InfoUserData>
                <UserInfoName>
                  {/* <FaUser /> */}
                  {user.name}
                </UserInfoName>

                {isOpened && (user.permission === 'ANALYST'
                  ? (
                    <ApprovaLimit>
                      {/* <FaRegMoneyBillAlt /> */}
                      {approval_limit}
                    </ApprovaLimit>
                  )
                  : (
                    <>
                    </>
                  ))}

                <UserInfoCompany>
                  {/* <FaStoreAlt /> */}
                  {user.company_name}
                </UserInfoCompany>

                <UserInfoPermission>
                  {/* <FaNetworkWired /> */}
                  {user.permission}
                </UserInfoPermission>
              </InfoUserData>
            </InfoUserContainer>
          ) : (
            <ProfileIcon>
              <FaAddressCard />
            </ProfileIcon>
          )}

        </>

        <NavLink to="/home">
          <FaHome size={20} />
          {isOpened && 'Início'}
        </NavLink>

        {user.permission === 'ADM' ? (
          <>
            <NavLink to="/my-clients">
              <FaUsers size={30} />
              {isOpened && 'Clientes'}
            </NavLink>
          </>
        ) : (
          <></>
        )}

        {user.permission === 'ANALYST' ? (
          <>
            <NavLink to="/newSpotAssistant">
              <FaPlus size={20} />
              {isOpened && 'Cotação'}
            </NavLink>

            <NavLink to="/dashboards">
              <FaThLarge size={20} />
              {isOpened && 'Dashboards'}
            </NavLink>

            <NavLink to="/home">
              <FaClone size={20} />
              {isOpened && 'Templates'}
            </NavLink>

            <NavLink to="/suppliers">
              <FaTruckLoading size={20} />
              {isOpened && 'Provedores'}
            </NavLink>
          </>
        ) : (
          <></>
        )}

        {user.permission === 'MASTER' ? (
          <>
            <NavLink to="/newSpotAssistant">
              <FaPlus size={20} />
              {isOpened && 'Cotação'}
            </NavLink>

            <NavLink to="/dashboards">
              <FaThLarge size={20} />
              {isOpened && 'Dashboards'}
            </NavLink>

            <NavLink to="/home">
              <FaClone size={20} />
              {isOpened && 'Templates'}
            </NavLink>

            <NavLink to="/suppliers">
              <FaTruckLoading size={20} />
              {isOpened && 'Provedores'}
            </NavLink>

            <NavLink to="/myAnalysts">
              <FaUsers size={30} />
              {isOpened && 'Analistas'}
            </NavLink>
          </>
        ) : (
          <></>
        )}

        {user.permission === 'PROVIDER' ? (
          <>
            <NavLink to="/spot-open">
              <FaThLarge size={20} />
              {isOpened && 'Cotações'}
            </NavLink>
          </>
        ) : (
          <></>
        )}
        <SignOutButton isOpened={!!isOpened} onClick={signOut}>
          <FiPower size={20} />
          {isOpened && <strong>Sair</strong>}
        </SignOutButton>
      </nav>
    </Container>
  );
};

export default memo(Sidebar);
