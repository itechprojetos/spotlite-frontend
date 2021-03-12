import React from 'react';

import { useHistory } from 'react-router-dom';

import 'react-day-picker/lib/style.css';

import {
  FaThLarge,
  FaPlus,
  FaClone,
  FaDoorOpen,
  FaCheck,
  FaBan,
  FaUsers,
} from 'react-icons/fa';
import { useAuth } from '../../../hooks/auth';

import {
  Container,
  Content,
  HiMessage,
  AskMessage,
  HiMessageName,
  DivFlex,
  Option1,
  Option2,
  Option3,
} from './styles';

const Home: React.FC = () => {
  const history = useHistory();
  const { signOut, user } = useAuth();

  return (
    <>
      <Container>

        <Content>

          <HiMessage onClick={signOut}>
            Olá,
            {' '}
            <HiMessageName>{user.name}</HiMessageName>
            !
          </HiMessage>
          <AskMessage>Qual opção você prefere?</AskMessage>

          {user.permission === 'PROVIDER' ? (
            <DivFlex>

              <Option1
                onClick={() => history.push('/spot-open')}
              >
                <FaDoorOpen />
                Cotações em aberto
              </Option1>

              <Option2
                onClick={() => history.push('/spot-chosen')}
              >
                <FaCheck />
                Cotações eleitas
              </Option2>

              <Option3
                onClick={() => history.push('/spot-not-chosen')}
              >
                <FaBan />
                Cotações não eleitas
              </Option3>

            </DivFlex>
          ) : (
            <>
            </>
          )}

          {user.permission === 'ANALYST' ? (
            <DivFlex>

              <Option1
                onClick={() => history.push('/newSpotAssistant')}
              >
                <FaPlus />
                Nova cotação
              </Option1>

              <Option2
                // onClick={() => history.push('/templates')}
                onClick={() => {}}
              >
                <FaClone />
                Template
              </Option2>

              <Option3
                onClick={() => history.push('/dash-client-spots-open')}
              >
                <FaThLarge />
                Painel de cotações
              </Option3>

            </DivFlex>
          ) : (
            <></>
          )}

          {user.permission === 'MASTER' ? (
            <DivFlex>

              <Option1
                onClick={() => history.push('/newSpotAssistant')}
              >
                <FaPlus />
                Nova cotação
              </Option1>

              <Option2
                // onClick={() => history.push('/templates')}
                onClick={() => {}}
              >
                <FaClone />
                Template
              </Option2>

              <Option3
                onClick={() => history.push('/dash-client-spots-open')}
              >
                <FaThLarge />
                Painel de cotações
              </Option3>

            </DivFlex>
          ) : (
            <></>
          )}

          {user.permission === 'ADM' ? (
            <DivFlex>

              <Option1
                onClick={() => history.push('/my-clients')}
              >
                <FaUsers />
                Clientes
              </Option1>

              <Option2
                onClick={() => {}}
              >
                <FaThLarge />
                Painel administrativo
              </Option2>

            </DivFlex>
          ) : (
            <></>
          )}


        </Content>
      </Container>
    </>
  );
};


export default Home;
