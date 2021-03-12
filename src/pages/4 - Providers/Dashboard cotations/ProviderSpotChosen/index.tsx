import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import Table from '../../../../components/Table';
import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';

import 'react-day-picker/lib/style.css';
import api from '../../../../services/api';

import {
  Container, Title, Header, OptionsContainer, OptionSelected, OptionUnselected,
} from './styles';

interface Spots {
    status: string;
    download: string;
    id: string;
    corporate_name: string;
    title: string;
    pickup_city_state: string;
    delivery_city_state: string;
    modal: string;
    load_type: string;
}

const columns = [
  { title: 'Cliente', field: 'corporate_name' },
  { title: 'Título', field: 'title' },
  { title: 'Coleta', field: 'pickup_city_state' },
  { title: 'Entrega', field: 'delivery_city_state' },
  { title: 'Modal', field: 'modal' },
  { title: 'Carga', field: 'load_type' },
];

const ProviderSpotOpen: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const { addToast } = useToast();

  const [spots, setSpots] = useState<Spots[]>([]);

  useEffect(() => {
    api.get(`spot-providers/chose/${user.id}`, { params: { chose: '0' } }).then((response) => setSpots(response.data));
  }, [user.id]);

  return (
    <>
      <Container>
        <Header>
          <Title onClick={() => history.push('/home')}>Painel</Title>

          <OptionsContainer>
            <OptionUnselected onClick={() => { history.push('/spot-open'); }}>
              Em aberto
            </OptionUnselected>
            <OptionSelected onClick={() => { history.push('/spot-chosen'); }}>
              Eleitas
            </OptionSelected>
            <OptionUnselected onClick={() => { history.push('/spot-not-chosen'); }}>
              Não eleitas
            </OptionUnselected>
          </OptionsContainer>

        </Header>

        <Table
          columns={[
            { title: 'Cliente', field: 'corporate_name' },
            { title: 'Título', field: 'title' },
            { title: 'Coleta', field: 'pickup_city_state' },
            { title: 'Entrega', field: 'delivery_city_state' },
            { title: 'Modal', field: 'modal' },
            { title: 'Carga', field: 'load_type' },
          ]}
          data={spots}
          actions={[
            {
              icon: 'download',
              iconProps: { style: { color: '#CC6200' } },
              tooltip: 'Baixar instruções',
              onClick: (): void => {
                addToast({
                  type: 'info',
                  title: 'Em desenvolvimento...',
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
