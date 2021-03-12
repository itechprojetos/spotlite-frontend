import React, {
  useEffect, useState, useCallback,
} from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { FiXCircle } from 'react-icons/fi';

import { useToast } from '../../../../hooks/toast';
import { useAuth } from '../../../../hooks/auth';

import 'react-day-picker/lib/style.css';
import api from '../../../../services/api';

import Table from '../../../../components/Table';

import {
  Container,
  Title,
  Header,
  SelectedProviders,
  ProviderSelected,
  ProviderSelectedName,
  ButtonSendEmails,
} from './styles';

interface Suppliers {
    // id: string;
    provider_id: string;
    company_name: string;
    name: string;
    email: string;
    phone1?: string;
    phone2?: string;
    obs?: string;
    // Status desse provedor
    active?: string;
    // Gerenciador de seleção
    selected?: boolean;
}

// PASSAGEM DE PARÂMETROS - PASSO 2: Tipar o useLocation é necessário para poder acesar os parâmetros individualmente
interface LocationState {
    spot_id: string;
  }

interface ConvertSporProviders {
    spot_id: string;
    provider_id: string;
    analyst_id: string;
    owner_company_id: string;
    quoted: string;
    chose: string;
    download: string;
}

const NewSpotProvisionalProviders: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { user } = useAuth();
  const { addToast } = useToast();

  // Armezena os dados que a API retornou com os provedores pesquisados
  const [suppliers, setSuppliers] = useState<Suppliers[]>([]);
  const [suppliersSelected, setSuppliersSelected] = useState<Suppliers[]>([]);

  const loadProviders = useCallback(async () => {
    // Recebo todos os MEUS provedores
    const myProviders = await (await api.get(`/my-providers/${user.company_id}`)).data;

    // Recebo todos os provedores que já estão em concorrência para esse Spot em específico
    const addedProviders = await (await api.get(`/spot-providers/for-add-provider-to-spot/${location.state.spot_id}`)).data;

    // Filtro para que seja mostrado ao usuário somente os provedores que ainda não foram incluídos nesse Spot
    const filteredProviders = myProviders.filter(({ provider_id: ok }: Suppliers) => !addedProviders.some(({ provider_id: nok }: Suppliers) => nok === ok));

    setSuppliers(filteredProviders);
  }, []);

  useEffect(() => {
    loadProviders();
  }, [loadProviders]);

  // Adicionar múltiplos PROVEDORES ao cabeçalho de selecionados
  const handleSelectProvider = useCallback((idProvider, companyName, name, email) => {
    // Adiciona o provedor no array de provedores selecionados
    const data = {
      provider_id: idProvider, company_name: companyName, name, email,
    };
    setSuppliersSelected([...suppliersSelected, data]);

    // Remove o provedor do array inicial
    const array = [...suppliers];
    const index = array.map((item) => item.provider_id).indexOf(idProvider);
    array.splice(index, 1);
    setSuppliers(array);
  }, [suppliersSelected, suppliers]);
  // Remove o provedor do cabeçalho de selecionados
  const handleRemoveProvider = useCallback((idProvider, companyName, name, email) => {
    // Remove o provedor da lista de selecionados
    const array = [...suppliersSelected];
    const index = array.map((item) => item.provider_id).indexOf(idProvider);
    array.splice(index, 1);
    setSuppliersSelected(array);

    // Inclui na lista inicial de provedores
    const data = {
      provider_id: idProvider, company_name: companyName, name, email,
    };
    setSuppliers([...suppliers, data]);
  }, [suppliersSelected, suppliers]);

  const handleSendEmails = useCallback(async () => {
    try {
      // Envia os e-mails
      await api.post('/spot/mail-to-many', suppliersSelected);
      // Cria um registro para cada provedor (1 linha na tabela) referente a essa cotação, que receberá os valores inputados por ele e fará os devidos cálculos
      // *** FALTA COLOCAR O CORPO DA REQUISIÇÃO, EM FORMATO DE ARRAY ***

      const transform: ConvertSporProviders[] = [];
      suppliersSelected.map((item) => {
        const data = {
          // PASSAGEM DE PARÂMETROS - PASSO 3: O acesso ao parâmetro 'spot_id' é feito como abaixo (location.state.spot_id)
          spot_id: location.state.spot_id, provider_id: item.provider_id, analyst_id: user.id, owner_company_id: user.company_id, quoted: '1', chose: '1', download: '1',
        };

        transform.push(data);
      });

      await api.post('/spot-providers', transform);

      await api.put(`/spot/update-spot/${location.state.spot_id}`, { status_description: 'Em aberto' });


      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'Acabamos de enviar o e-mail para os provedores que você selecionou. Agora é só aguardar.',
      });

      history.push('/dash-client-spots-open');
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao enviar o e-mail para esses provedores. Por favor, tente novamente.',
      });
    }
  }, [addToast, history, suppliersSelected, location.state.spot_id, user.id, user.company_id]);

  return (
    <>
      <Container>
        <Header>
          <Title>Seleção de provedores</Title>

          {/* Cabeçalho que contém os provedores escolhidos */}
          <SelectedProviders>
            {suppliersSelected.map((item) => (
              <ProviderSelected
                key={item.provider_id}
              >
                <ProviderSelectedName>{item.company_name}</ProviderSelectedName>
                <FiXCircle
                  onClick={() => { handleRemoveProvider(item.provider_id, item.company_name, item.name, item.email); }}
                />
              </ProviderSelected>
            ))}

          </SelectedProviders>

          <ButtonSendEmails
            onClick={handleSendEmails}
          >
            Enviar

          </ButtonSendEmails>


        </Header>

        <Table
          columns={[
            { title: 'Empresa', field: 'company_name' },
            { title: 'Contato', field: 'name' },
            { title: 'Email', field: 'email' },
          ]}
          data={suppliers}
          actions={[
            {
              icon: 'check',
              iconProps: { style: { color: '#CC6200' } },
              tooltip: 'Selecionar',
              onClick: (event: any, row: Suppliers): void => {
                handleSelectProvider(row.provider_id, row.company_name, row.name, row.email);
              },
            },
          ]}
        />

      </Container>
    </>
  );
};


export default NewSpotProvisionalProviders;
