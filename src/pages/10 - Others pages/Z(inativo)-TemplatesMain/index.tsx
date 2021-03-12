import React, { useRef } from 'react';

import { useHistory } from 'react-router-dom';
import { FiType, FiSearch } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import 'react-day-picker/lib/style.css';

import Header from '../../../components/header/index';
import Sidebar from '../../../components/sidebar/index';

import Input from '../../../components/input';

import {
  Container, Content, Title, ButtonsContainer, ButtonTemplates, ButtonSpots, SearchBox,
} from './styles';

const TemplatesMain: React.FC = () => {
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);


  return (
    <>
      <Container>

        <Content>

          <Title onClick={() => history.push('/home')}>Templates</Title>

          <ButtonsContainer>
            <ButtonTemplates onClick={() => {}}>Meus templates</ButtonTemplates>
            <ButtonSpots type="submit">Usar cotações</ButtonSpots>
          </ButtonsContainer>


          <Form ref={formRef} onSubmit={() => {}}>
            <Input name="email" placeholder="Buscar por título..." />
            <Input name="email" placeholder="Buscar por origem..." />
            <Input name="email" placeholder="Buscar por destino..." />
            <Input name="email" placeholder="Buscar por modal..." />
            <Input name="email" placeholder="Buscar por tipo..." />
            {/* <input placeholder="Buscar por título..." />
            <input placeholder="Buscar por origem..." />
            <input placeholder="Buscar por destino..." />
            <input placeholder="Buscar por modal..." />
            <input placeholder="Buscar por tipo..." /> */}
          </Form>

          <FiSearch style={{
            marginTop: 20, width: 30, height: 30, color: '#00A1CB',
          }}
          />
        </Content>

      </Container>
    </>
  );
};


export default TemplatesMain;
