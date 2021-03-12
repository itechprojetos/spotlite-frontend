import React, {
  useRef, useEffect, useState, useCallback,
} from 'react';

import { useHistory } from 'react-router-dom';
import {
  FiPlus,
} from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useAuth } from '../../../../hooks/auth';
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

interface Analysts {
    id: string;
    name: string;
    email: string;
    company_id: string;
    approval_limit: string;
    // Status desse analista
    active: string;
  }

const columns = [
  { title: 'Analista', field: 'name', cellStyle: { width: '60%' } },
  { title: 'Limite de aprovação', field: 'approval_limit', cellStyle: { width: '30%' } },
  { title: 'Status', field: 'active', cellStyle: { width: '10%' } },
];

const AnalystsMain: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { user } = useAuth();

  const [analysts, setAnalysts] = useState<Analysts[]>([]);

  const load = useCallback(async () => {
    try {
      api.get('/users/find-analysts-company', { params: { company_id: user.company_id } }).then((response) => {
        const mydata: any = [];
        response.data.map((item: Analysts) => {
          const status = item.active === '0' ? 'Ativo' : 'Inativo';
          const limit = Number(item.approval_limit).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
          mydata.push({ ...item, active: status, approval_limit: limit });
        });
        setAnalysts(mydata);
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
  }, [user.company_id]);

  const handleUpdateAnalyst = useCallback((id, name, email, approval_limit) => {
    localStorage.setItem('id_IN', id);
    localStorage.setItem('name_IN', name);
    localStorage.setItem('email_IN', email);
    localStorage.setItem('approvalLimit_IN', approval_limit);

    history.push('/analysts-edit');
  }, [history]);

  const handleInactivateAnalyst = useCallback(async (id) => {
    try {
      const active = '1';

      await api.patch(`/users/suppliers-inativated/${id}`, { active });

      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'O analista foi inativado com sucesso!',
      });

      load();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao inativar esse analista. Por favor, tente novamente.',
      });
    }
  }, [addToast, user.company_id]);

  const handleActivateAnalyst = useCallback(async (id) => {
    try {
      const active = '0';

      await api.patch(`/users/suppliers-inativated/${id}`, { active });

      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'O analista foi ativado com sucesso!',
      });
      load();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao ativar esse analista. Por favor, tente novamente.',
      });
    }
  }, [addToast, user.company_id]);

  return (
    <>
      <Container>
        <Header>
          <Title>Analistas</Title>

          <Form ref={formRef} onSubmit={() => {}}>

            <AddButton>
              <FiPlus
                onClick={() => history.push('/analysts-new')}
                style={{
                  width: 40, height: 40, color: '#fff',
                }}
              />
            </AddButton>
          </Form>


        </Header>

        <Table
          columns={[
            { title: 'Analista', field: 'name', cellStyle: { width: '60%' } },
            { title: 'Limite de aprovação', field: 'approval_limit', cellStyle: { width: '30%' } },
            { title: 'Status', field: 'active', cellStyle: { width: '10%' } },
          ]}
          data={analysts}
          actions={[
            {
              icon: 'person_add_alt_1',
              iconProps: { style: { color: '#CC6200' } },
              tooltip: 'Reativar',
              onClick: (event: any, row: Analysts): void => {
                handleActivateAnalyst(row.id);
              },
            },
            {
              icon: 'mode_edit',
              iconProps: { style: { color: '#3F3F3F' } },
              tooltip: 'Editar',
              onClick: (event: any, row: Analysts): void => {
                handleUpdateAnalyst(row.id, row.name, row.email, row.approval_limit);
              },
            },
            {
              icon: 'person_off',
              iconProps: { style: { color: '#5c677d' } },
              tooltip: 'Inativar',
              onClick: (event: any, row: Analysts): void => {
                handleInactivateAnalyst(row.id);
              },
            },
          ]}
        />

      </Container>
    </>
  );
};


export default AnalystsMain;
