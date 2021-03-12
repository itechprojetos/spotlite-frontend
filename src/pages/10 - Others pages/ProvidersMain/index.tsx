import React from 'react';

import { useHistory } from 'react-router-dom';

import 'react-day-picker/lib/style.css';

import { useAuth } from '../../../hooks/auth';

import {
  Container, Content, HiMessage, AskMessage, OptionsContent, OptionNew, OptionTemplate, OptionDescription,
} from './styles';

const ProvidersMain: React.FC = () => {
  const history = useHistory();

  const { signOut } = useAuth();

  return (
    <>
      <Content>
        <HiMessage>Provedores</HiMessage>
        <OptionsContent>

          <OptionNew onClick={() => history.push('/option1')}>
            <OptionDescription>Opção 1</OptionDescription>
          </OptionNew>

          <OptionTemplate onClick={() => history.push('/option2')}>
            <OptionDescription>Opção 2</OptionDescription>
          </OptionTemplate>

        </OptionsContent>
      </Content>
    </>
  );
};


export default ProvidersMain;
