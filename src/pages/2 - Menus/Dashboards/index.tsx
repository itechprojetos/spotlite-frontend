import React from 'react';

import { useHistory } from 'react-router-dom';

import 'react-day-picker/lib/style.css';

import {
  FaThLarge,
  FaBan,
} from 'react-icons/fa';


import {
  Container,
  Content,
  HiMessageName,
  DivFlex,
  Option1,
  Option2,
} from './styles';

const Dashboards: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Container>

        <Content>

          {/* <HiMessage>
            Olá,
            {' '} */}
          <HiMessageName>Dashboards</HiMessageName>
          {/* </HiMessage> */}
          {/* <AskMessage>Qual dashboard você deseja visualizar?</AskMessage> */}

          <DivFlex>

            <Option1
              onClick={() => history.push('/dash-client-spots-open')}
            >
              <FaThLarge />
              Minhas cotações
            </Option1>

            <Option2
              onClick={() => {}}
            >
              <FaBan />
              Outro
            </Option2>

          </DivFlex>

          {/* <OptionsContent>

            <OptionNew onClick={() => history.push('/dash-client-spots-open')}>
              <OptionDescription>Spots</OptionDescription>
            </OptionNew>

          </OptionsContent> */}

        </Content>
      </Container>
    </>
  );
};


export default Dashboards;
