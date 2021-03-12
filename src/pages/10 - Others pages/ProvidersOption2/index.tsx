import React from 'react';

import { useHistory } from 'react-router-dom';

import 'react-day-picker/lib/style.css';

import { useAuth } from '../../../hooks/auth';

import {
  Container, Content, HiMessage, AskMessage, OptionsContent, OptionNew, OptionTemplate, OptionDescription,
} from './styles';

const ProvidersOption2: React.FC = () => {
  const history = useHistory();

  const { signOut } = useAuth();

  return (
    <>
      <Content>
        <HiMessage>Provedores</HiMessage>
        <AskMessage>Opção 2</AskMessage>
      </Content>
    </>
  );
};


export default ProvidersOption2;
