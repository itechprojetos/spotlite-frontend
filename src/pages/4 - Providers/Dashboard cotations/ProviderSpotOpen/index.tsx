import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';
import Table from '../../../../components/Table';

import api from '../../../../services/api';


import {
  Container, Title, Header, OptionsContainer, OptionSelected, OptionUnselected,
} from './styles';

interface Spots {
    name: string;
    email: string;
    id: string;
    spot_providers_id: string;
    corporate_name: string;
    title: string;
    pickup_city_state: string;
    delivery_city_state: string;
    modal: string;
    load_type: string;
    closure: Date;
    closure_days: string;
    quoted: string;
}

const ProviderSpotOpen: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [spots, setSpots] = useState<Spots[]>([]);

  useEffect(() => {
    api.get(`spot-providers/${user.id}`, { params: { closure_status: 'OPEN' } }).then((response) => {
      const mydata: any = [];

      response.data.map((item: Spots) => {
        const status = item.quoted === '0' ? 'Cotado' : 'Cotar';
        const closure = `${item.closure_days} dias`;
        mydata.push({ ...item, quoted: status, closure_days: closure });
      });
      setSpots(mydata);
    });
  }, [user.id]);

  return (
    <>
      <Container>
        <Header>
          <Title onClick={() => history.push('/home')}>Painel</Title>

          <OptionsContainer>
            <OptionSelected onClick={() => { history.push('/spot-open'); }}>
              Em aberto
            </OptionSelected>
            <OptionUnselected onClick={() => { history.push('/spot-chosen'); }}>
              Eleitas
            </OptionUnselected>
            <OptionUnselected onClick={() => { history.push('/spot-not-chosen'); }}>
              Não eleitas
            </OptionUnselected>
          </OptionsContainer>


        </Header>

        <Table
          columns={[
            { title: 'Cliente', field: 'corporate_name', cellStyle: { width: '20%' } },
            { title: 'Título', field: 'title', cellStyle: { width: '20%' } },
            { title: 'Coleta', field: 'pickup_city_state', cellStyle: { width: '14%' } },
            { title: 'Entrega', field: 'delivery_city_state', cellStyle: { width: '14%' } },
            { title: 'Modal', field: 'modal', cellStyle: { width: '14%' } },
            { title: 'Carga', field: 'load_type', cellStyle: { width: '10%' } },
            { title: 'Encerramento', field: 'closure_days', cellStyle: { width: '7%' } },
            { title: 'Status', field: 'quoted', cellStyle: { width: '7%' } },
          ]}
          data={spots}
          actions={[
            {
              icon: 'near_me',
              iconProps: { style: { color: '#CC6200' } },

              tooltip: 'Enviar cotação',
              onClick: (event: any, row: Spots): void => {
                row.quoted === 'Cotar' ? history.push({
                  pathname: '/send-values',
                  state: {
                    name: row.name, email: row.email, spot_providers_id: row.spot_providers_id, title: row.title, pickup_city_state: row.pickup_city_state, delivery_city_state: row.delivery_city_state, modal: row.modal, load_type: row.load_type, closure_days: row.closure_days,
                  },
                }) : addToast({
                  type: 'info',
                  title: 'Você já enviou a cotação para esse Spot',
                });
              },
            },
            {
              icon: 'remove_red_eye',
              iconProps: { style: { color: '#3F3F3F' } },
              tooltip: 'Ver tarifas',
              onClick: (): void => {
                addToast({
                  type: 'info',
                  title: 'Em desenvolvimento...',
                });
              },
            },
          ]}
        />

      </Container>
    </>
  );
};

export default ProviderSpotOpen;
