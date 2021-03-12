import React, {
  useRef, useEffect, useState, useCallback,
} from 'react';

import { useHistory } from 'react-router-dom';
import {
  FiType, FiSearch, FiPlusCircle, FiPlus,
} from 'react-icons/fi';

import * as Yup from 'yup';
import { useAuth } from '../../../../hooks/auth';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
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

interface Customers {
  id: string;
  corporate_name: string;
  fantasy_name: string;
  cnpj: string;
  ie: string;
  im: string;
  adress: string;
  financial_contact: string;
  comercial_contact: string;
  obs: string;
  payment_terms: string;
  active: string;
  inactivity_date: Date;
  reason_inactivation: string;
  user_id: string;
  user: {
    id: string;
    name: string;
    email: string;
    permission: string;
    active: string;
    approval_limit: number;
    company_id: string;
    company_name: string;
    phone1: string;
    phone2: string;
    obs: string;
    currency1: string;
    currency2: string;
    currency3: string;
  }
}

  interface FindCustomers {
    name: string;
  }

const CustomersMain: React.FC = () => {
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { user } = useAuth();

  const [customers, setCustomers] = useState<Customers[]>([]);

  useEffect(() => {
    api.get('/company').then((response) => setCustomers(response.data));
  }, []);

  const handleUpdateCustomers = useCallback((id, corporate_name, fantasy_name, cnpj, ie, im, adress, financial_contact, comercial_contact, obs, payment_terms, inactivity_date, reason_inactivation, name, email) => {
    localStorage.setItem('idCompany_IN', id);
    localStorage.setItem('corporate_name_IN', corporate_name);
    localStorage.setItem('fantasy_name_IN', fantasy_name);
    localStorage.setItem('cnpj_IN', cnpj);
    localStorage.setItem('ie_IN', ie);
    localStorage.setItem('im_IN', im);
    localStorage.setItem('adress_IN', adress);
    localStorage.setItem('financial_contact_IN', financial_contact);
    localStorage.setItem('comercial_contact_IN', comercial_contact);
    localStorage.setItem('obs_IN', obs);
    localStorage.setItem('payment_terms_IN', payment_terms);
    localStorage.setItem('inactivity_date_IN', inactivity_date);
    localStorage.setItem('reason_inactivation_IN', reason_inactivation);
    localStorage.setItem('name_IN', name);
    localStorage.setItem('email_IN', email);

    history.push('/customers-edit');
  }, [history]);

  const handleInactivateCustomers = useCallback(async (company_id, user_id) => {
    try {
      const active = '1';

      await api.patch(`/company/company-inativated/${company_id}`, { active });
      await api.patch(`/users/suppliers-inativated/${user_id}`, { active });

      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'O cliente foi inativado com sucesso!',
      });

      api.get('/company').then((response) => setCustomers(response.data));
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao inativar esse cliente. Por favor, tente novamente.',
      });
    }
  }, [addToast]);

  const handleActivateCustomers = useCallback(async (company_id, user_id) => {
    try {
      const active = '0';

      await api.patch(`/company/company-inativated/${company_id}`, { active });
      await api.patch(`/users/suppliers-inativated/${user_id}`, { active });

      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'O cliente foi ativado com sucesso!',
      });
      api.get('/company').then((response) => setCustomers(response.data));
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao ativar esse cliente. Por favor, tente novamente.',
      });
    }
  }, [addToast]);

  const handleSubmit = useCallback(async (data: FindCustomers) => {
    try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
            name: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name } = data;

        await api.get('/company/find-one', {
          params: {
            info: name,
          },
        }).then((response) => {
            setCustomers(response.data);
        });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao buscar esse provedor. Por favor, tente novamente.',
      });
    }
  }, [addToast]);
  return (
    <>
      <Container>
        <Header>
          <Title onClick={() => history.push('/my-clients')}>Clientes</Title>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <AddButton>
              <FiPlus
                onClick={() => history.push({pathname: '/customers-new', state: {nome: 'Marcelo', idade: '28'}})}
                style={{
                  width: 40, height: 40, color: '#fff',
                }}
              />
            </AddButton>
            <Input onKeyPress={() => {}} name="name" icon={FiType} placeholder="Buscar cliente..." />

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
{customers.length !== 0 ?
<>
<ContainerHeaderGrid>
                  <HeaderGrid>
                    <ItemsContainer>
                      <HeaderSpotTitle>Empresa</HeaderSpotTitle>
                      <HeaderSpotPickup>Usuário master</HeaderSpotPickup>
                    </ItemsContainer>

                    <ButtonsContainer>

                      <SpaceEmptyHeader />

                    </ButtonsContainer>
                  </HeaderGrid>
                </ContainerHeaderGrid>
{customers.map((customer) => (
            <SuppliersList key={customer.id}>
              <Grid>
                <ItemsContainer>
                  <SpotTitle>{customer.fantasy_name}</SpotTitle>
                  <SpotPickup>{customer.user.name}</SpotPickup>
                </ItemsContainer>
                <ButtonsContainer>
                  <ButtonSettings
                    onClick={() => { handleUpdateCustomers(customer.id, customer.corporate_name, customer.fantasy_name, customer.cnpj, customer.ie, customer.im, customer.adress, customer.financial_contact, customer.comercial_contact, customer.obs, customer.payment_terms, customer.inactivity_date, customer.reason_inactivation, customer.user.name, customer.user.email ); }}
                  >
                    Editar
                  </ButtonSettings>
                  {customer.active === '0' ? (
                    <ButtonActiveUser
                      onClick={() => { handleInactivateCustomers(customer.id, customer.user_id); }}
                    >
                      Inativar
                    </ButtonActiveUser>
                  ) : (
                    <ButtonInativeUser
                      onClick={() => { handleActivateCustomers(customer.id, customer.user_id); }}
                    >
                      Reativar
                    </ButtonInativeUser>
                  )}

                </ButtonsContainer>
              </Grid>
            </SuppliersList>
          ))}
          </> : <SearchContainer><SearchMessage>Nenhum cliente foi encontrado ;(</SearchMessage></SearchContainer>}


        </Content>

      </Container>
    </>
  );
};


export default CustomersMain;
