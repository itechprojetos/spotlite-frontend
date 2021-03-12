import React from 'react';

import 'react-day-picker/lib/style.css';

import {
  Content, HiMessage, AskMessage,
} from './styles';

const Welcome: React.FC = () => (
  <>
    <Content>
      <HiMessage>Olá!</HiMessage>
      <AskMessage>Escolha, no meu ao lado, o que você deseja fazer</AskMessage>
    </Content>
  </>
);


export default Welcome;
