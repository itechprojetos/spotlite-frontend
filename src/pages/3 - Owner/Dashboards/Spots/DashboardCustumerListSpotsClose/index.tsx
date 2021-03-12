import React, {
  useEffect, useState, useCallback,
} from 'react';

import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../../../hooks/auth';
import { useToast } from '../../../../../hooks/toast';

import Table from '../../../../../components/Table';

import api from '../../../../../services/api';

import {
  Container,
  Title,
  Header,
  OptionsContainer,
  OptionSelected,
  OptionUnselected,
} from './styles';

  interface Spots {
    id: string;
    spot_providers_id: string;

    title: string;
    pickup_city_state: string;
    delivery_city_state: string;
    modal: string;
    load_type: string;
    closure_days: string;
    status_description: string;

    name: string; // Nome do analista responsável

    approved_by: string; // Nome de quem aprovou a cotação
}

const DashboardCustumerListSpotsClose: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const { addToast } = useToast();

  const [spots, setSpots] = useState<Spots[]>([]);

  useEffect(() => {
    if (user.permission === 'MASTER') {
      api.get('spot/show-spots-client-MASTER-open-close', { params: { owner_company: user.company_id, closure_status: 'CLOSE' } }).then((response) => setSpots(response.data));
    } else {
      api.get('spot/show-spots-client-open-close', { params: { owner_user: user.id, closure_status: 'CLOSE' } }).then((response) => setSpots(response.data));
    }
  }, [user.id, user.permission, user.company_id]);

  const handleSummary = useCallback(async (id, spot_providers_id, title, pickup_city_state, delivery_city_state, modal, load_type, closure_days, name, approved_by) => {
    localStorage.setItem('id', id);
    localStorage.setItem('spot_providers_id', spot_providers_id);
    localStorage.setItem('title', title);
    localStorage.setItem('pickup_city_state', pickup_city_state);
    localStorage.setItem('delivery_city_state', delivery_city_state);
    localStorage.setItem('modal', modal);
    localStorage.setItem('load_type', load_type);
    localStorage.setItem('closure_days', closure_days);
    localStorage.setItem('name', name);
    localStorage.setItem('approved_by', approved_by);

    history.push('/client-summary-values-close');

    addToast({
      type: 'info',
      title: 'Processando...',
      description: 'Carregando o histórico desse Spot...',
    });
  }, [addToast, history]);

  return (
    <>
      <Container>
        <Header>
          <Title onClick={() => history.push('/home')}>Spots</Title>

          <OptionsContainer>
            <OptionUnselected onClick={() => { history.push('/dash-client-spots-open'); }}>
              Abertos
            </OptionUnselected>
            <OptionSelected onClick={() => { history.push('/dash-client-spots-close'); }}>
              Encerrados
            </OptionSelected>
          </OptionsContainer>

        </Header>

        <Table
          columns={[
            { title: 'Título', field: 'title' },
            { title: 'Coleta', field: 'pickup_city_state' },
            { title: 'Entrega', field: 'delivery_city_state' },
            { title: 'Modal', field: 'modal' },
            { title: 'Carga', field: 'load_type' },
            { title: 'Encerramento (dias)', field: 'closure_days' },
            // { title: 'Status', field: 'status_description' },
          ]}
          data={spots}
          actions={[
            {
              icon: 'dashboard',
              iconProps: { style: { color: '#CC6200' } },
              tooltip: 'Painel de resumo',
              onClick: (event: any, row: Spots): void => {
                handleSummary(row.id, row.spot_providers_id, row.title, row.pickup_city_state, row.delivery_city_state, row.modal, row.load_type, row.closure_days, row.name, row.approved_by);
              },
            },
            {
              icon: 'remove_red_eye',
              iconProps: { style: { color: '#3F3F3F' } },
              tooltip: 'Ver detalhes',
              onClick: (): void => {
                addToast({
                  type: 'info',
                  title: 'Em desenvolvimento...',
                });
              },
            },
            {
              icon: 'login',
              iconProps: { style: { color: '#5c677d' } },
              tooltip: 'Reabrir Spot',
              onClick: (event: any, row: Spots): void => {
                history.push({ pathname: '/new-spot-secound-round', state: { spot_id: row.id } });
              },
            },
          ]}
        />

      </Container>
    </>
  );
};


export default DashboardCustumerListSpotsClose;
