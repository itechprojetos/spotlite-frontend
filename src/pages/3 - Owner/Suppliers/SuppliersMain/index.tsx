import React, {
  useRef, useEffect, useState, useCallback,
} from 'react';

import { useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useToast } from '../../../../hooks/toast';
import { useAuth } from '../../../../hooks/auth';

import 'react-day-picker/lib/style.css';
import api from '../../../../services/api';

import Table from '../../../../components/Table';

import {
  Container,
  Title,
  Header,
  AddButton,
} from './styles';

  interface Suppliers {
      id: string;
      company_name: string;
      name: string;
      email: string;
      phone1: string;
      phone2: string;
      obs: string;
      // Status desse provedor
      active: string;
    }

interface FindSuppliers {
    provider: string;
    permission: string;
}

const columns = [
  { title: 'Empresa', field: 'company_name', cellStyle: { width: '30%' } },
  { title: 'Contato', field: 'name', cellStyle: { width: '30%' } },
  { title: 'E-mail', field: 'email', cellStyle: { width: '30%' } },
  { title: 'Status', field: 'active', cellStyle: { width: '10%' } },
];

const SuppliersMain: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { user } = useAuth();

  const [suppliers, setSuppliers] = useState<Suppliers[]>([]);

  const load = useCallback(async () => {
    try {
      api.get(`/my-providers/${user.company_id}`).then((response) => {
        const mydata: any = [];
        response.data.map((item: Suppliers) => {
          const status = item.active === '0' ? 'Ativo' : 'Inativo';
          mydata.push({ ...item, active: status });
        });
        setSuppliers(mydata);
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao ativar esse cliente. Por favor, tente novamente.',
      });
    }
  }, [addToast, user.company_id]);

  useEffect(() => {
    load();
  }, []);

  const handleUpdateSupplier = useCallback((id, company_name, email, name, obs, phone1, phone2) => {
    localStorage.setItem('id_IN', id);
    localStorage.setItem('company_name_IN', company_name);
    localStorage.setItem('email_IN', email);
    localStorage.setItem('name_IN', name);
    localStorage.setItem('obs_IN', obs);
    localStorage.setItem('phone1_IN', phone1);
    localStorage.setItem('phone2_IN', phone2);

    history.push('/suppliersEdit');
  }, [history]);

  const handleInactivateSupplier = useCallback(async (id) => {
    try {
      const active = '1';

      await api.put(`/my-providers/${id}`, { active });

      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'O provedor foi inativado com sucesso!',
      });

      load();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao inativar esse provedor. Por favor, tente novamente.',
      });
    }
  }, [addToast]);

  const handleActivateSupplier = useCallback(async (id) => {
    try {
      const active = '0';

      await api.put(`/my-providers/${id}`, { active });

      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'O provedor foi ativado com sucesso!',
      });
      load();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao ativar esse provedor. Por favor, tente novamente.',
      });
    }
  }, [addToast]);

  return (
    <>
      <Container>
        <Header>
          <Title onClick={() => history.push('/home')}>Provedores</Title>

          <Form ref={formRef} onSubmit={() => {}}>

            <AddButton>
              <FiPlus
                onClick={() => history.push('/suppliersNew')}
                style={{
                  width: 40, height: 40, color: '#fff',
                }}
              />
            </AddButton>
          </Form>


        </Header>

        <Table
          columns={[
            { title: 'Empresa', field: 'company_name', cellStyle: { width: '30%' } },
            { title: 'Contato', field: 'name', cellStyle: { width: '30%' } },
            { title: 'E-mail', field: 'email', cellStyle: { width: '30%' } },
            { title: 'Status', field: 'active', cellStyle: { width: '10%' } },
          ]}
          data={suppliers}
          actions={[
            {
              icon: 'person_add_alt_1',
              iconProps: { style: { color: '#CC6200' } },
              tooltip: 'Reativar',
              onClick: (event: any, row: Suppliers): void => {
                handleActivateSupplier(row.id);
              },
            },
            {
              icon: 'mode_edit',
              iconProps: { style: { color: '#3F3F3F' } },
              tooltip: 'Editar',
              onClick: (event: any, row: Suppliers): void => {
                handleUpdateSupplier(row.id, row.company_name, row.email, row.name, row.obs, row.phone1, row.phone2);
              },
            },
            {
              icon: 'person_off',
              iconProps: { style: { color: '#5c677d' } },
              tooltip: 'Inativar',
              onClick: (event: any, row: Suppliers): void => {
                handleInactivateSupplier(row.id);
              },
            },
          ]}
        />

      </Container>
    </>
  );
};


export default SuppliersMain;
