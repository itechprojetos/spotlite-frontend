import React, {
  useRef, useEffect, useState, useCallback, useMemo,
} from 'react';

import { useHistory } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';


import {
  FaMedal,
  FaUser,
  FaPlus,
  FaClone,
  FaDoorOpen,
  FaCheck,
  FaBan,
} from 'react-icons/fa';

import {
  FiTrendingUp,
  FiCheck,
} from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Input from '../../../../components/InputLabel';

import api from '../../../../services/api';

import {
  Container,
  Content,
  Title,
  Header,
  SuppliersList,
  ButtonsContainer,
  ButtonActiveUser,
  Grid,
  ButtonInativeUser,
  SpotTitle,
  SpotPickup,
  SpotDelivery,
  SpotModal,
  SpotLoadType,
  SpotClosureDays,
  ItemsContainer,
  HeaderGrid,
  ContainerHeaderGrid,
  HeaderSpotTitle,
  HeaderSpotPickup,
  HeaderSpotDelivery,
  HeaderSpotModal,
  HeaderSpotLoadType,
  HeaderSpotClosureDays,
  ContainerHeaderSpecifications,
  SectionContainer,
  ContainerCardBestPriceTime,
  CardBestPriceTime,
  CardHeaderBestPriceTime,
  CardItem,
  ContainerCardOthers,
  CardOthers,
  CardOthersItemProvider,
  CardOthersItem,
  ContainerColunmsDiv,
  HeaderColunmDiv,
  ColunmDiv,
  NonePrices,
  DivFlex,
  ContainerButtons,
  Option1,
  Option2,
  Option3,
  AnalystName,
  ElectedProviderTitle,
  ElectedProviderHeaderSpecifications,
  ElectedProviderHeader,
  ElectedProviderDescription,
} from './styles';

import { useToast } from '../../../../hooks/toast';
import { useAuth } from '../../../../hooks/auth';

import DialogBox from '../../../../components/DialogBox';

interface SpotProvidersData {
    id: string;

    amount_final: number;
    transit_time: number;

    provider: {
        name: string;
        id: string;
        email: string;
    };

    weight: number;

    // pickup_min: number;
    // pickup_min_currency: string;

    // pickup_ton: number;
    // pickup_ton_currency: string;

    // lcl_min: number;
    // lcl_min_currency: string;

    // lcl_ton: number;
    // lcl_ton_currency: string;

    // desconsol: number;
    // desconsol_currency: string;

    // handling: number;
    // handling_currency: string;
}

interface Analysts {
    id: string;
    name: string;
    email: string;
    company_id: string;
    approval_limit: string;
    active: string; // Status desse analista
  }

interface ElectWinningProviderFormData {
    availability_boarding: string;
    name_contact_clarification: string;
    email_contact_clarification: string;
    phone_contact_clarification: string;
    boarding_instructions: string;
}

const useStyles = makeStyles({
  root: {
    width: 200,
    '& .MuiOutlinedInput-input': {
      color: 'gray',
    },
    '& .MuiInputLabel-root': {
      color: 'gray',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'gray',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: '#33415C',
    },
    '&:hover .MuiInputLabel-root': {
      color: '#33415C',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#33415C',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: '#33415C',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#33415C',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#33415C',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid #33415C',
      //   color: '#33415C',
    },
  },
});

const ClientSummaryValuesSpots: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const classes = useStyles();

  const { addToast } = useToast();
  const { user } = useAuth();

  const [bestPriceValue, setBestPriceValue] = useState<SpotProvidersData[]>([]);
  const [bestTransitTime, setBestTransitTime] = useState<SpotProvidersData[]>([]);

  const [analystBoxIsOpen, setAnalystBoxIsOpen] = useState(false);
  const [analysts, setAnalysts] = useState<Analysts[]>([]);
  const [electionBoxIsOpen, setElectionBoxIsOpen] = useState(false);

  const [selectedSpotProvidersId, setSelectedSpotProvidersId] = useState<string>();
  const [selectedProviderId, setSelectedProviderId] = useState<string>();
  const [selectedProviderName, setSelectedProviderName] = useState<string>();
  const [selectedProviderEmail, setSelectedProviderEmail] = useState<string>();
  const [selectedProviderValue, setSelectedProviderValue] = useState<string>();
  const [selectedProviderTransitTime, setSelectedProviderTransitTime] = useState<number>();

  const [loading, setLoading] = useState(false);

  // Valores transferidos da página anterior referente a esse Spot
  const id_OUT = localStorage.getItem('id');
  const title_OUT = localStorage.getItem('title');
  const pickup_city_state_OUT = localStorage.getItem('pickup_city_state');
  const delivery_city_state_OUT = localStorage.getItem('delivery_city_state');
  const modal_OUT = localStorage.getItem('modal');
  const load_type_OUT = localStorage.getItem('load_type');
  const closure_days_OUT = localStorage.getItem('closure_days');
  const nameOUT = localStorage.getItem('name');

  const [currentAnalyst, setCurrentAnalyst] = useState(nameOUT);
  const [selectedAnalyst, setSelectedAnalyst] = useState('');

  const loadSummary = useCallback(async () => {
    // Cotações elencadas por preço
    const cotationsForPrice = await api.get(`/spot-providers/summary-spot-provider/amount_final/${id_OUT}`);
    const transferForPrice = cotationsForPrice.data;
    console.log(transferForPrice);
    setBestPriceValue(transferForPrice);

    // Cotações elencadas por tempo
    const cotationsForTime = await api.get(`/spot-providers/summary-spot-provider/transit_time/${id_OUT}`);
    const transferForTime = cotationsForTime.data;
    setBestTransitTime(transferForTime);
  }, [id_OUT]);

  const bestPrice = useMemo(() => {
    const spot_providers_id = bestPriceValue[0]?.id;
    const provider = bestPriceValue[0]?.provider.name;
    const provider_id = bestPriceValue[0]?.provider.id;
    const email = bestPriceValue[0]?.provider.email;
    const value = Number(bestPriceValue[0]?.amount_final).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    const time = bestPriceValue[0]?.transit_time;

    return {
      spot_providers_id, provider, provider_id, email, value, time,
    };
  }, [bestPriceValue]);

  const bestTime = useMemo(() => {
    const spot_providers_id = bestTransitTime[0]?.id;
    const provider = bestTransitTime[0]?.provider.name;
    const provider_id = bestTransitTime[0]?.provider.id;
    const email = bestTransitTime[0]?.provider.email;
    const value = Number(bestTransitTime[0]?.amount_final).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    const time = bestTransitTime[0]?.transit_time;

    return {
      spot_providers_id, provider, provider_id, email, value, time,
    };
  }, [bestTransitTime]);

  const allForPrice = useMemo(() => bestPriceValue
    .slice(1) // Não incluir o primeiro item, que é mostrado de forma separada
    .map((quote) => {
      const spot_providers_id = quote.id;
      const provider = quote.provider.name;
      const provider_id = quote.provider.id;
      const { email } = quote.provider;
      const value = Number(quote.amount_final).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      const time = quote.transit_time;

      return {
        spot_providers_id, provider, provider_id, email, value, time,
      };
    }), [bestPriceValue]);

  const allForTime = useMemo(() => bestTransitTime
    .slice(1) // Não incluir o primeiro item, que é mostrado de forma separada
    .map((quote) => {
      const spot_providers_id = quote.id;
      const provider = quote.provider.name;
      const provider_id = quote.provider.id;
      const { email } = quote.provider;
      const value = Number(quote.amount_final).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      const time = quote.transit_time;

      return {
        spot_providers_id, provider, provider_id, email, value, time,
      };
    }), [bestTransitTime]);

  const openValueComparator = useCallback(async () => {
    localStorage.setItem('bestPriceValue_IN', JSON.stringify(bestPriceValue));
    history.push('compare-all-values');
  }, [history, bestPriceValue]);

  const handleCancelSpot = useCallback(async () => {
    await api.put(`/spot-providers/update-closure-status/${id_OUT}`);

    addToast({
      type: 'sucess',
      title: 'Sucesso!',
      description: 'Essa cotação foi cancelada com sucesso!',
    });

    history.push('/dash-client-spots-open');
  }, [addToast, id_OUT, history]);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  const handleLoadAnalysts = useCallback(async () => {
    setAnalystBoxIsOpen(true);

    await api.get('/users/find-analysts-company', { params: { company_id: user.company_id } }).then((response) => setAnalysts(response.data));
  }, [user.company_id]);

  const handleChangeAnalyst = useCallback(async () => {
    try {
      await api.put(`/spot/reassign-analyst/${id_OUT}`, { analyst_id: selectedAnalyst });

      addToast({
        type: 'info',
        title: 'Sucesso!',
        description: 'Já reatribuímos a responsabilidade dessa cotação',
      });

      // Cria uma expressão Regex com a variável provider
      const regex = new RegExp(selectedAnalyst, 'i');
      // Com essa expressão criada, filtrei o array (FILTER) testando (test) a condição 'company_name'
      const myAnalyst = analysts.filter((item) => regex.test(item.id));
      const myAnalystName = myAnalyst[0].name;

      setCurrentAnalyst(myAnalystName);

      setAnalystBoxIsOpen(false);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Tenta novamente, por favor',
      });
    }
  }, [addToast, selectedAnalyst, analysts, id_OUT]);

  const handleChoseProvider = useCallback((spot_id: string, provider_name: string, provider_id: string, provider_email: string, value: string, transit: number) => {
    setSelectedSpotProvidersId(spot_id);
    setSelectedProviderId(provider_id);
    setSelectedProviderName(provider_name);
    setSelectedProviderEmail(provider_email);
    setSelectedProviderValue(value);
    setSelectedProviderTransitTime(transit);

    setElectionBoxIsOpen(true);
  }, []);

  const handleElectWinningProvider = useCallback(async (data: ElectWinningProviderFormData) => {
    try {
        formRef.current?.setErrors({});

        setLoading(true);

        const {
          availability_boarding,
          name_contact_clarification,
          email_contact_clarification,
          phone_contact_clarification,
          boarding_instructions,
        } = data;

        const formData = {
          approved_by: user.name,
          chosen_provider_id: selectedProviderId,
          availability_boarding,
          name_contact_clarification,
          email_contact_clarification,
          phone_contact_clarification,
          boarding_instructions,
        };

        await api.put(`/spot/elect-winning-provider/${id_OUT}/${selectedSpotProvidersId}`, formData);
        await api.post('/spot/mail-winner-provider', { name: selectedProviderName, email: selectedProviderEmail });

        // console.log(`Spot Provider ID: ${formData}`);
        // console.log(`Nome do provedor: ${selectedSpotProvidersId}`);
        // console.log(formData);

        history.push('dash-client-spots-open');

        addToast({
          type: 'sucess',
          title: 'Sucesso',
          description: 'Acabamos de notificar o provedor escolhido de que ele foi o vencedor. Agora é só aguardar o contato.',
        });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Ocorreu um erro ao notificar esse provedor. Por favor, verifique as informações e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }, [selectedProviderName, selectedProviderId, user.name, history, id_OUT, selectedSpotProvidersId, selectedProviderEmail, addToast]);

  return (
    <>
      <Container>
        <Header>
          <Title>Detalhamento</Title>

        </Header>

        <Content>

          <ContainerHeaderSpecifications>
            <ContainerHeaderGrid>
              <HeaderGrid>
                <ItemsContainer>
                  <HeaderSpotTitle>Título</HeaderSpotTitle>
                  <HeaderSpotPickup>Coleta</HeaderSpotPickup>
                  <HeaderSpotDelivery>Entrega</HeaderSpotDelivery>
                  <HeaderSpotModal>Modal</HeaderSpotModal>
                  <HeaderSpotLoadType>Carga</HeaderSpotLoadType>
                  <HeaderSpotClosureDays>Encerramento</HeaderSpotClosureDays>
                </ItemsContainer>
              </HeaderGrid>
            </ContainerHeaderGrid>

            <SuppliersList>
              <Grid>
                <ItemsContainer>
                  <SpotTitle>{title_OUT}</SpotTitle>
                  <SpotPickup>{pickup_city_state_OUT}</SpotPickup>
                  <SpotDelivery>{delivery_city_state_OUT}</SpotDelivery>
                  <SpotModal>{modal_OUT}</SpotModal>
                  <SpotLoadType>{load_type_OUT}</SpotLoadType>
                  <SpotClosureDays>{`${closure_days_OUT} dias`}</SpotClosureDays>
                </ItemsContainer>

              </Grid>
            </SuppliersList>
          </ContainerHeaderSpecifications>

          <SectionContainer>
            Para nomear um vencedor, clique no cartão do provedor
          </SectionContainer>

          <ContainerColunmsDiv>
            <ColunmDiv>

              <HeaderColunmDiv>MELHOR CUSTO</HeaderColunmDiv>

              {bestPriceValue.length !== 0 ? (
                <CardBestPriceTime
                  onClick={() => handleChoseProvider(bestPrice.spot_providers_id, bestPrice.provider, bestPrice.provider_id, bestPrice.email, bestPrice.value, bestPrice.time)}
                >
                  <CardHeaderBestPriceTime>
                    {bestPrice.provider}
                  </CardHeaderBestPriceTime>
                  <CardItem>{bestPrice.value}</CardItem>
                  <CardItem>
                    {bestPrice.time}
                    {' '}
                    dias
                  </CardItem>
                </CardBestPriceTime>
              ) : (
                <>
                  <NonePrices>Nenhum orçamento enviado, por enquanto...</NonePrices>
                </>
              )}


              {allForPrice.map((quote) => (
                <CardOthers
                  onClick={() => handleChoseProvider(quote.spot_providers_id, quote.provider, quote.provider_id, quote.email, quote.value, quote.time)}
                >
                  <CardOthersItemProvider>{quote.provider}</CardOthersItemProvider>
                  <CardOthersItem>{quote.value}</CardOthersItem>
                  <CardOthersItem>
                    {quote.time}
                    {' '}
                    dias
                  </CardOthersItem>
                </CardOthers>
              ))}
            </ColunmDiv>

            <ColunmDiv>
              <HeaderColunmDiv>MELHOR TRANSIT TIME</HeaderColunmDiv>

              {bestTransitTime.length !== 0 ? (
                <CardBestPriceTime
                  onClick={() => handleChoseProvider(bestTime.spot_providers_id, bestTime.provider, bestTime.provider_id, bestTime.email, bestTime.value, bestTime.time)}

                >
                  <CardHeaderBestPriceTime>
                    {bestTime.provider}
                  </CardHeaderBestPriceTime>
                  <CardItem>{bestTime.value}</CardItem>
                  <CardItem>
                    {bestTime.time}
                    {' '}
                    dias
                  </CardItem>
                </CardBestPriceTime>
              ) : (
                <>
                  <NonePrices>Nenhum orçamento enviado, por enquanto...</NonePrices>
                </>
              )}

              {allForTime.map((quote) => (
                <CardOthers
                  onClick={() => handleChoseProvider(quote.spot_providers_id, quote.provider, quote.provider_id, quote.email, quote.value, quote.time)}

                >
                  <CardOthersItemProvider>{quote.provider}</CardOthersItemProvider>
                  <CardOthersItem>{quote.value}</CardOthersItem>
                  <CardOthersItem>
                    {quote.time}
                    {' '}
                    dias
                  </CardOthersItem>
                </CardOthers>
              ))}
            </ColunmDiv>
          </ContainerColunmsDiv>

          {user.permission === 'MASTER' ? (
            <SectionContainer>
              Analista responsável:
              <AnalystName>{currentAnalyst}</AnalystName>
            </SectionContainer>
          ) : (
            <></>
          )}

          <ContainerButtons>

            <Option1
              onClick={openValueComparator}
            >
              <FiTrendingUp />
              Comparar valores
            </Option1>

            <Option2
              onClick={handleCancelSpot}
            >
              <FaBan />
              Cancelar cotação
            </Option2>

          </ContainerButtons>

          <ContainerButtons>
            {user.permission === 'MASTER' ? (
              <Option1
                onClick={handleLoadAnalysts}
              >
                <FaUser />
                Reatribuir analista
              </Option1>
            ) : (
              <></>
            )}

            {/* Essa opção só é necessária se a cotação estiver fechada */}
            {/* <Option2
              onClick={() => {}}
            >
              <FaMedal />
              Reatribuir vencedor
            </Option2> */}

          </ContainerButtons>

          {/* Reatribuir a cotação a um novo analista */}
          <DialogBox
            open={analystBoxIsOpen}
            onClose={() => setAnalystBoxIsOpen(false)}
          >
            <DivFlex>
              <FormControl variant="outlined" className={classes.root}>
                <InputLabel>Selecione o novo analista</InputLabel>
                <Select
                  value={selectedAnalyst}
                //   displayEmpty
                  onChange={(value: any) => { setSelectedAnalyst(value.target.value); }}
                  label="Selecione o novo analista"
                >
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  {analysts.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DivFlex>

            <ButtonsContainer>
              <ButtonActiveUser
                onClick={handleChangeAnalyst}
              >
                Salvar
              </ButtonActiveUser>

            </ButtonsContainer>

          </DialogBox>

          {/* Atribuir a cotação a um provedor */}
          <DialogBox
            open={electionBoxIsOpen}
            onClose={() => setElectionBoxIsOpen(false)}
          >

            <ElectedProviderHeaderSpecifications>
              <div>
                <ElectedProviderHeader>Provedor</ElectedProviderHeader>
                <ElectedProviderDescription>{selectedProviderName}</ElectedProviderDescription>
              </div>

              <div>
                <ElectedProviderHeader>Custo total</ElectedProviderHeader>
                <ElectedProviderDescription>{selectedProviderValue}</ElectedProviderDescription>
              </div>

              <div>
                <ElectedProviderHeader>Transit time</ElectedProviderHeader>
                <ElectedProviderDescription>
                  {selectedProviderTransitTime}
                  {' '}
                  dias
                </ElectedProviderDescription>
              </div>
            </ElectedProviderHeaderSpecifications>


            <ElectedProviderTitle>
              Você poderá utilizar os campos opcionais abaixo antes do envio dessa nomeação
            </ElectedProviderTitle>

            <Form ref={formRef} onSubmit={handleElectWinningProvider}>
              <Input autoComplete="off" id="1" name="availability_boarding" label="Data da disponibilidade de embarque" />
              <Input autoComplete="off" id="2" name="name_contact_clarification" label="Nome do contato para esclarecimentos" />
              <Input autoComplete="off" id="3" name="email_contact_clarification" label="E-mail" />
              <Input autoComplete="off" id="4" name="phone_contact_clarification" label="Telefone" />
              <Input autoComplete="off" id="5" name="boarding_instructions" label="Instruções de embarque" />

              <ButtonsContainer>
                {loading ? (
                  <ButtonActiveUser>
                    Enviando...
                  </ButtonActiveUser>
                ) : (
                  <ButtonActiveUser
                    type="submit"
                  >
                    Enviar
                  </ButtonActiveUser>
                )}


              </ButtonsContainer>
            </Form>


          </DialogBox>


        </Content>

      </Container>
    </>
  );
};


export default ClientSummaryValuesSpots;
