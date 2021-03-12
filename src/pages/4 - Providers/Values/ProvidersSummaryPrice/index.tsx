import React, {
  useRef, useEffect, useState, useCallback, useMemo,
} from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

import { useHistory } from 'react-router-dom';
import {
  FaTelegramPlane,
} from 'react-icons/fa';

import {
  parseISO,
  format,
  formatRelative,
  formatDistance,
} from 'date-fns';

import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';

import 'react-day-picker/lib/style.css';
import api from '../../../../services/api';

import Input from '../../../../components/input';
import Button from '../../../../components/button';

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
  OptionsContainer,
  OptionSelected,
  OptionUnselected,
  //   HeaderOptions,
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
  ContainerHeaderSpecifications,
  SectionContainer,
  TitleSection,
  HeaderTaxesContainer,
  HeaderTaxTitle,
  HeaderTaxCurrency,
  HeaderTaxAmount,
  InputsTaxesContainer,
  InputTaxTitle,
  InputTaxCurrency,
  InputTaxCurrencyPicker,
  InputTaxAmount,
  InputTaxAmount2,
  SendButton,
} from './styles';

interface SpotProvidersData {
    pickup_min: number;
    pickup_min_currency: string;

    pickup_ton: number;
    pickup_ton_currency: string;

    lcl_min: number;
    lcl_min_currency: string;

    lcl_ton: number;
    lcl_ton_currency: string;

    desconsol: number;
    desconsol_currency: string;

    handling: number;
    handling_currency: string;

    transit_time: string;

    provider: {
        name: string;
    };

    spot: {
        weight: number;
    };
}

interface SendTaxesFormData {
    pickup_min: number;
    pickup_ton: number;
    lcl_min: number;
    lcl_ton: number;
    desconsol: number;
    handling: number;
}

const ProvidersSummaryPrice: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();

  const { addToast } = useToast();

  const [spotProviders, setSpotProviders] = useState<SpotProvidersData>();

  // Variável que armazenará as caracteríticas da mercadoria e que será usada como fator na multiplicação
  let transferData: SpotProvidersData;

  const [pickup_min_currency_state, setPickup_min_currency] = useState(spotProviders?.pickup_min_currency);
  const [pickup_ton_currency_state, setPickup_ton_currency] = useState(spotProviders?.pickup_ton_currency);
  const [lcl_min_currency_state, setLcl_min_currency] = useState(spotProviders?.lcl_min_currency);
  const [lcl_ton_currency_state, setLcl_ton_currency] = useState(spotProviders?.lcl_ton_currency);
  const [desconsol_currency_state, setDesconsol_currency] = useState(spotProviders?.desconsol_currency);
  const [handling_currency_state, setHandling_currency] = useState(spotProviders?.handling_currency);

  const spot_providers_id_OUT = localStorage.getItem('spot_providers_id');
  const title_OUT = localStorage.getItem('title');
  const pickup_city_state_OUT = localStorage.getItem('pickup_city_state');
  const delivery_city_state_OUT = localStorage.getItem('delivery_city_state');
  const modal_OUT = localStorage.getItem('modal');
  const load_type_OUT = localStorage.getItem('load_type');
  const closure_days_OUT = localStorage.getItem('closure_days');


  const loadForm = useCallback(async () => {
    const values = await api.get(`/spot-providers/find-one-spot-provider/${spot_providers_id_OUT}`);
    const transfer = values.data;
    transferData = values.data;
    setSpotProviders(transfer);
  }, [spot_providers_id_OUT]);

  useEffect(() => {
    loadForm();
  }, [loadForm]);

  const handleSubmit = useCallback(async (data: SendTaxesFormData) => {
    try {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            pickup_min: Yup.number().required('Campo obrigatório'),
            pickup_ton: Yup.number().required('Campo obrigatório'),
            lcl_min: Yup.number().required('Campo obrigatório'),
            lcl_ton: Yup.number().required('Campo obrigatório'),
            desconsol: Yup.number().required('Campo obrigatório'),
            handling: Yup.number().required('Campo obrigatório'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const {
            pickup_min,
            pickup_ton,
            lcl_min,
            lcl_ton,
            desconsol,
            handling,
          } = data;

          // PICKUP

          const pickupWeight = transferData.spot.weight * pickup_ton;

          const finalPickup = Math.max(pickupWeight, pickup_min);

          // LCL

          const lclWeight = transferData.spot.weight * lcl_ton;

          const finalLcl = Math.max(lclWeight, lcl_min);

          const total = (finalPickup + finalLcl + Number(handling) + Number(desconsol));

          const formData = {
            pickup_min,
            pickup_min_currency: pickup_min_currency_state,
            pickup_ton,
            pickup_ton_currency: pickup_ton_currency_state,
            lcl_min,
            lcl_min_currency: lcl_min_currency_state,
            lcl_ton,
            lcl_ton_currency: lcl_ton_currency_state,
            desconsol,
            desconsol_currency: desconsol_currency_state,
            handling,
            handling_currency: handling_currency_state,
            quoted: '0',
            amount_final: total,
          };

          await api.put(`/spot-providers/send-taxes/${spot_providers_id_OUT}`, formData);

          addToast({
            type: 'sucess',
            title: 'Sucesso!',
            description: 'Acabamos de enviar a edição do seu orçamento para o cliente.',
          });

          history.push('/spot-open');
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao enviar a sua cotação. Por favor, tente novamente.',
      });
    }
  }, [addToast, history, spot_providers_id_OUT, pickup_min_currency_state, pickup_ton_currency_state, lcl_min_currency_state, lcl_ton_currency_state, desconsol_currency_state, handling_currency_state]);


  return (
    <>
      <Container>
        <Header>
          <Title onClick={() => history.push('/home')}>Resumo da proposta</Title>

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

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              pickup_min: spotProviders?.pickup_min,
              pickup_ton: spotProviders?.pickup_ton,
              lcl_min: spotProviders?.lcl_min,
              lcl_ton: spotProviders?.lcl_ton,
              desconsol: spotProviders?.desconsol,
              handling: spotProviders?.handling,
            }}
          >
            {/* Seção 1 */}
            <SectionContainer>
              <TitleSection>Custos de origem</TitleSection>
            </SectionContainer>

            <HeaderTaxesContainer>
              <HeaderTaxTitle>Descrição</HeaderTaxTitle>
              <HeaderTaxCurrency>Moeda</HeaderTaxCurrency>
              <HeaderTaxAmount>Valor</HeaderTaxAmount>
            </HeaderTaxesContainer>

            <InputsTaxesContainer>

              <InputTaxTitle>Pickup mínimo</InputTaxTitle>
              <InputTaxCurrencyPicker>
                <NativeSelect
                  value={pickup_min_currency_state || spotProviders?.pickup_min_currency}
                  onChange={(event) => setPickup_min_currency(event.target.value)}
                  inputProps={{
                    name: 'value',
                    id: 'age-native-label-placeholder',
                  }}
                >
                  <option value="">Selecione...</option>
                  <option value="BRL">BRL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </NativeSelect>
              </InputTaxCurrencyPicker>
              <InputTaxAmount>
                <Input name="pickup_min" placeholder="Valor..." />
              </InputTaxAmount>

            </InputsTaxesContainer>

            <InputsTaxesContainer>

              <InputTaxTitle>Pickup por tonelada</InputTaxTitle>
              <InputTaxCurrencyPicker>
                <NativeSelect
                  value={pickup_ton_currency_state || spotProviders?.pickup_ton_currency}
                  onChange={(event) => setPickup_ton_currency(event.target.value)}
                  inputProps={{
                    name: 'value',
                    id: 'age-native-label-placeholder',
                  }}
                >
                  <option value="">Selecione...</option>
                  <option value="BRL">BRL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </NativeSelect>
              </InputTaxCurrencyPicker>
              <InputTaxAmount>
                <Input name="pickup_ton" placeholder="Valor..." />
              </InputTaxAmount>

            </InputsTaxesContainer>


            {/* Seção 2 */}
            <SectionContainer>
              <TitleSection>Custos de frete</TitleSection>
            </SectionContainer>

            <HeaderTaxesContainer>
              <HeaderTaxTitle>Descrição</HeaderTaxTitle>
              <HeaderTaxCurrency>Moeda</HeaderTaxCurrency>
              <HeaderTaxAmount>Valor</HeaderTaxAmount>
            </HeaderTaxesContainer>

            <InputsTaxesContainer>

              <InputTaxTitle>LCL mínimo</InputTaxTitle>
              <InputTaxCurrencyPicker>
                <NativeSelect
                  value={lcl_min_currency_state || spotProviders?.lcl_min_currency}
                  onChange={(event) => setLcl_min_currency(event.target.value)}
                  inputProps={{
                    name: 'value',
                    id: 'age-native-label-placeholder',
                  }}
                >
                  <option value="">Selecione...</option>
                  <option value="BRL">BRL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </NativeSelect>
              </InputTaxCurrencyPicker>
              <InputTaxAmount>
                <Input name="lcl_min" placeholder="Valor..." />
              </InputTaxAmount>

            </InputsTaxesContainer>

            <InputsTaxesContainer>

              <InputTaxTitle>LCL por tonelada</InputTaxTitle>
              <InputTaxCurrencyPicker>
                <NativeSelect
                  value={lcl_ton_currency_state || spotProviders?.lcl_ton_currency}
                  onChange={(event) => setLcl_ton_currency(event.target.value)}
                  inputProps={{
                    name: 'value',
                    id: 'age-native-label-placeholder',
                  }}
                >
                  <option value="">Selecione...</option>
                  <option value="BRL">BRL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </NativeSelect>
              </InputTaxCurrencyPicker>
              <InputTaxAmount>
                <Input name="lcl_ton" placeholder="Valor..." />
              </InputTaxAmount>

            </InputsTaxesContainer>


            {/* Seção 3 */}
            <SectionContainer>
              <TitleSection>Custos de destino</TitleSection>
            </SectionContainer>

            <HeaderTaxesContainer>
              <HeaderTaxTitle>Descrição</HeaderTaxTitle>
              <HeaderTaxCurrency>Moeda</HeaderTaxCurrency>
              <HeaderTaxAmount>Valor</HeaderTaxAmount>
            </HeaderTaxesContainer>

            <InputsTaxesContainer>

              <InputTaxTitle>Desconsol</InputTaxTitle>
              <InputTaxCurrencyPicker>
                <NativeSelect
                  value={desconsol_currency_state || spotProviders?.desconsol_currency}
                  onChange={(event) => setDesconsol_currency(event.target.value)}
                  inputProps={{
                    name: 'value',
                    id: 'age-native-label-placeholder',
                  }}
                >
                  <option value="">Selecione...</option>
                  <option value="BRL">BRL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </NativeSelect>
              </InputTaxCurrencyPicker>
              <InputTaxAmount>
                <Input name="desconsol" placeholder="Valor..." />
              </InputTaxAmount>

            </InputsTaxesContainer>

            <InputsTaxesContainer>

              <InputTaxTitle>Handling</InputTaxTitle>
              <InputTaxCurrencyPicker>
                <NativeSelect
                  value={handling_currency_state || spotProviders?.handling_currency}
                  onChange={(event) => setHandling_currency(event.target.value)}
                  inputProps={{
                    name: 'value',
                    id: 'age-native-label-placeholder',
                  }}
                >
                  <option value="">Selecione...</option>
                  <option value="BRL">BRL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </NativeSelect>
              </InputTaxCurrencyPicker>
              <InputTaxAmount>
                <Input name="handling" placeholder="Valor..." />
              </InputTaxAmount>

            </InputsTaxesContainer>

            <Button type="submit">
              Editar valores
            </Button>
          </Form>

        </Content>

      </Container>
    </>
  );
};


export default ProvidersSummaryPrice;
