import React, { useEffect, useState, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../../../hooks/auth';
import { useToast } from '../../../../../hooks/toast';

import api from '../../../../../services/api';

import Table from '../../../../../components/Table';

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
}

const DashboardCustumerListSpotsOpen: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const { addToast } = useToast();

  const [spots, setSpots] = useState<Spots[]>([]);

  useEffect(() => {
    if (user.permission === 'MASTER') {
      api.get('spot/show-spots-client-MASTER-open-close', { params: { owner_company: user.company_id, closure_status: 'OPEN' } }).then((response) => setSpots(response.data));
    } else {
      api.get('spot/show-spots-client-open-close', { params: { owner_user: user.id, closure_status: 'OPEN' } }).then((response) => setSpots(response.data));
    }
  }, [user.id, user.permission, user.company_id]);

  const handleSummary = useCallback(async (id, spot_providers_id, title, pickup_city_state, delivery_city_state, modal, load_type, closure_days, name) => {
    localStorage.setItem('id', id);
    localStorage.setItem('spot_providers_id', spot_providers_id);
    localStorage.setItem('title', title);
    localStorage.setItem('pickup_city_state', pickup_city_state);
    localStorage.setItem('delivery_city_state', delivery_city_state);
    localStorage.setItem('modal', modal);
    localStorage.setItem('load_type', load_type);
    localStorage.setItem('closure_days', closure_days);
    localStorage.setItem('name', name);

    history.push('/client-summary-values');

    addToast({
      type: 'info',
      title: 'Processando...',
      description: 'Carregando o resumo com as melhores cotações...',
    });
  }, [addToast, history]);

  return (
    <>
      <Container>
        <Header>
          <Title onClick={() => history.push('/home')}>Spots</Title>

          <OptionsContainer>
            <OptionSelected onClick={() => { history.push('/dash-client-spots-open'); }}>
              Abertos
            </OptionSelected>
            <OptionUnselected onClick={() => { history.push('/dash-client-spots-close'); }}>
              Encerrados
            </OptionUnselected>
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
            { title: 'Status', field: 'status_description' },
          ]}
          data={spots}
          actions={[
            {
              icon: 'trending_up',
              iconProps: { style: { color: '#CC6200' } },
              tooltip: 'Resumo',
              onClick: (event: any, row: Spots): void => {
                handleSummary(row.id, row.spot_providers_id, row.title, row.pickup_city_state, row.delivery_city_state, row.modal, row.load_type, row.closure_days, row.name);
              },
            },
            {
              icon: 'mode_edit',
              iconProps: { style: { color: '#3F3F3F' } },
              tooltip: 'Editar',
              onClick: (): void => {
                addToast({
                  type: 'info',
                  title: 'Em desenvolvimento...',
                });
              },
            },
            // {
            //   icon: 'login',
            //   iconProps: { style: { color: '#3F3F3F' } },
            //   tooltip: 'Escolher provedores',
            //   onClick: (event: any, row: Spots): void => {
            //     history.push({ pathname: '/newSpotProvisionalProviders', state: { spot_id: row.id } });
            //   },
            // },
            {
              icon: 'person_add_alt_1',
              iconProps: { style: { color: '#CC6200' } },
              tooltip: 'Adicionar provedor',
              onClick: (event: any, row: Spots): void => {
                history.push({ pathname: '/newSpotProvisionalProviders', state: { spot_id: row.id } });
              },
            },
          ]}
        />

      </Container>
    </>
  );
};


export default DashboardCustumerListSpotsOpen;
