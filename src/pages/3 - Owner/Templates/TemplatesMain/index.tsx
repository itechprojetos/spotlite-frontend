import React, {
  useRef, useEffect, useState, useCallback,
} from 'react';

import { useHistory } from 'react-router-dom';
import {
  FiType, FiSearch, FiPlusCircle, FiPlus,
} from 'react-icons/fi';

import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';

import 'react-day-picker/lib/style.css';
import api from '../../../../services/api';

import Input from '../../../../components/input';

import {
  Container,
  Content,
  Title,
  Header,
  Items,
  SuppliersList,
  ButtonsContainer,
  ButtonSettings,
  ButtonActiveUser,
  Grid,
  ButtonInativeUser,
  SearchButton,
  AddButton,
  SearchMessage,
  SearchContainer,
  //   HeaderOptions,
  SpotTitle,
  SpotPickup,
  SpotDelivery,
  SpotModal,
  SpotLoadType,
  SpotClosureDays,
  SpotStatusDescription,
  ItemsContainer,
  HeaderGrid,
  ContainerHeaderGrid,
  HeaderSpotTitle,
  HeaderSpotPickup,
  HeaderSpotDelivery,
  HeaderSpotModal,
  HeaderSpotLoadType,
  HeaderSpotClosureDays,
  HeaderSpotStatusDescription,
  SpaceEmptyHeader,
} from './styles';

  interface Templates {
      id: string;
      title: string;
      pickup_city_state: string;
      delivery_city_state: string;
      modal: string;
      load_type: string;
    }

    interface FindTemplates {
      info: string;
      owner_user: string;
      template: string;
    }

const TemplatesMain: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();

  const { addToast } = useToast();

  const [templates, setTemplates] = useState<Templates[]>([]);

  useEffect(() => {
    api.get('/spot/show-templates-spots', { params: { owner_user: user.id, template: 1 } }).then((response) => setTemplates(response.data));
  }, [user.id]);


  const handleOpenTemplate = useCallback(async (id) => {
    addToast({
      type: 'info',
      title: 'Sucesso!',
      description: 'Transformando template em uma nova cotação nesse exato momento.',
    });
  }, [addToast]);

  const handleSubmit = useCallback(async (data: FindTemplates) => {
    try {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            template: Yup.string().required('Campo obrigatório'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const { template } = data;

          await api.get('/spot/show-templates-spots-text', {
            params: {
              info: template,
              owner_user: user.id,
              template: '1',
            },
          }).then((response) => {
            setTemplates(response.data);
          });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao buscar esse provedor. Por favor, tente novamente.',
      });
    }
  }, [addToast, user.id]);

  return (
    <>
      <Container>
        <Header>
          <Title onClick={() => history.push('/home')}>Templates</Title>

          <Form ref={formRef} onSubmit={handleSubmit}>


            <Input onKeyPress={() => {}} name="template" icon={FiType} placeholder="Buscar template..." />


            <SearchButton type="submit">
              <FiSearch
                style={{
                  width: 30, height: 30, color: '#fff',
                }}
              />
            </SearchButton>
          </Form>


        </Header>

        <Content>
          {templates.length !== 0
            ? (
              <>
                <ContainerHeaderGrid>
                  <HeaderGrid>
                    <ItemsContainer>
                      <HeaderSpotTitle>Título</HeaderSpotTitle>
                      <HeaderSpotPickup>Coleta</HeaderSpotPickup>
                      <HeaderSpotDelivery>Entrega</HeaderSpotDelivery>
                      <HeaderSpotModal>Modal</HeaderSpotModal>
                      <HeaderSpotLoadType>Carga</HeaderSpotLoadType>
                    </ItemsContainer>

                    <ButtonsContainer>

                      <SpaceEmptyHeader />

                    </ButtonsContainer>
                  </HeaderGrid>
                </ContainerHeaderGrid>
                {templates.map((template) => (
                  <SuppliersList key={template.id}>
                    <Grid>
                      <ItemsContainer>
                        <SpotTitle>{template.title}</SpotTitle>
                        <SpotPickup>{template.pickup_city_state}</SpotPickup>
                        <SpotDelivery>{template.delivery_city_state}</SpotDelivery>
                        <SpotModal>{template.modal}</SpotModal>
                        <SpotLoadType>{template.load_type}</SpotLoadType>
                      </ItemsContainer>
                      <ButtonsContainer>
                        <ButtonActiveUser
                          onClick={() => { handleOpenTemplate(template.id); }}
                        >
                          Utilizar
                        </ButtonActiveUser>

                      </ButtonsContainer>
                    </Grid>
                  </SuppliersList>
                ))}
              </>
            ) : <SearchContainer><SearchMessage>Nenhum template foi encontrado ;(</SearchMessage></SearchContainer>}


        </Content>

      </Container>
    </>
  );
};


export default TemplatesMain;
