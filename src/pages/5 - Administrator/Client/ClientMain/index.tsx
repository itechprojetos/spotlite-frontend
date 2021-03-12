import React, {
  useRef, useEffect, useState, useCallback,
} from 'react';

import { useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useToast } from '../../../../hooks/toast';

import 'react-day-picker/lib/style.css';
import api from '../../../../services/api';

import Table from '../../../../components/Table';


import {
  Container,
  Title,
  Header,
  AddButton,
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
    };
}

const columns = [
  { title: 'Empresa', field: 'fantasy_name', cellStyle: { width: '50%' } },
  { title: 'Usuário master', field: 'user.name', cellStyle: { width: '45%' } },
  { title: 'Status', field: 'active', cellStyle: { width: '5%' } },
];

const ClientMain: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [customers, setCustomers] = useState<Customers[]>([]);

  const load = useCallback(async () => {
    try {
      api.get('/company').then((response) => {
        const mydata: any = [];
        response.data.map((item: Customers) => {
          const status = item.active === '0' ? 'Ativo' : 'Inativo';
          mydata.push({ ...item, active: status });
        });
        setCustomers(mydata);
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao ativar esse cliente. Por favor, tente novamente.',
      });
    }
  }, [addToast]);

  useEffect(() => {
    load();
  }, []);

  const handleActivateClient = useCallback(async (company_id) => {
    try {
      const formCompanyData = {
        reason_inactivation: '',
        active: '0',
      };

      // Passo 1: Atualiza a empresa
      await api.put(`/company/${company_id}`, formCompanyData);
      // Passo 1: Atualiza todos os usuários dessa empresa
      await api.patch(`/users/inativated-all-users-company/${company_id}`, { active: '0' });


      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'O cliente foi ativado com sucesso!',
      });
      load();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao ativar esse cliente. Por favor, tente novamente.',
      });
    }
  }, [addToast]);

  return (
    <>
      <Container>
        <Header>
          <Title>Clientes</Title>

          <Form ref={formRef} onSubmit={() => {}}>
            <AddButton>
              <FiPlus
                onClick={() => history.push('/client-new')}
                style={{
                  width: 40, height: 40, color: '#fff',
                }}
              />
            </AddButton>
          </Form>


        </Header>

        <Table
          columns={[
            { title: 'Empresa', field: 'fantasy_name', cellStyle: { width: '50%' } },
            { title: 'Usuário master', field: 'user.name', cellStyle: { width: '45%' } },
            { title: 'Status', field: 'active', cellStyle: { width: '5%' } },
          ]}
          data={customers}
          actions={[
            {
              icon: 'person_add_alt_1',
              iconProps: { style: { color: '#CC6200' } },
              tooltip: 'Reativar',
              onClick: (event: any, row: Customers): void => {
                handleActivateClient(row.id);
              },
            },
            {
              icon: 'mode_edit',
              iconProps: { style: { color: '#3F3F3F' } },
              tooltip: 'Editar',
              onClick: (event: any, row: Customers): void => {
                history.push({
                  pathname: '/client-edit',
                  state: {
                    id: row.id, corporate_name: row.corporate_name, fantasy_name: row.fantasy_name, cnpj: row.cnpj, ie: row.ie, im: row.im, adress: row.adress, financial_contact: row.financial_contact, comercial_contact: row.comercial_contact, obs: row.obs, payment_terms: row.payment_terms, inactivity_date: row.inactivity_date, reason_inactivation: row.reason_inactivation, user_id: row.user_id, user_name: row.user.name, user_email: row.user.email, active: row.active, edit: '0',
                  },
                });
              },
            },
            {
              icon: 'person_off',
              iconProps: { style: { color: '#5c677d' } },
              tooltip: 'Inativar',
              onClick: (event: any, row: Customers): void => {
                history.push({
                  pathname: '/client-edit',
                  state: {
                    id: row.id, corporate_name: row.corporate_name, fantasy_name: row.fantasy_name, cnpj: row.cnpj, ie: row.ie, im: row.im, adress: row.adress, financial_contact: row.financial_contact, comercial_contact: row.comercial_contact, obs: row.obs, payment_terms: row.payment_terms, inactivity_date: row.inactivity_date, reason_inactivation: row.reason_inactivation, user_id: row.user_id, user_name: row.user.name, user_email: row.user.email, active: '1', edit: '1',
                  },
                });
              },
            },
          ]}
        />

      </Container>
    </>
  );
};


export default ClientMain;
