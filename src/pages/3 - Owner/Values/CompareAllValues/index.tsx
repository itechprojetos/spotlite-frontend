import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';

import axios from 'axios';

import { format } from 'date-fns';

import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';

import 'react-day-picker/lib/style.css';
import api from '../../../../services/api';


import {
  Container,
  Content,
  Title,
  Header,
  SuppliersList,
  Grid,
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
  TitleSection,
  HeaderTaxesContainer,
  HeaderTaxTitle,
  InputsTaxesContainer,
  InputTaxTitle,
  ValuesList,
} from './styles';

interface SpotProvidersData {
    name: string;
    amount_final: number;
    transit_time: number;

    weight: number;

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
}

interface DollarAPI {
    cotacaoVenda: number;
}

const ProvidersSummaryPrice: React.FC = () => {
  const history = useHistory();

  const [dollar, setDollar] = useState<number>();
  const [euro, setEuro] = useState<number>();

  //   const { user } = useAuth();

  //   const { addToast } = useToast();

  //   const spot_providers_id_OUT = localStorage.getItem('spot_providers_id');
  const title_OUT = localStorage.getItem('title');
  const pickup_city_state_OUT = localStorage.getItem('pickup_city_state');
  const delivery_city_state_OUT = localStorage.getItem('delivery_city_state');
  const modal_OUT = localStorage.getItem('modal');
  const load_type_OUT = localStorage.getItem('load_type');
  const closure_days_OUT = localStorage.getItem('closure_days');

  // Recebe o array com as cotações da tela de resumo
  const bestPriceValue_OUT: SpotProvidersData[] = JSON.parse(localStorage.getItem('bestPriceValue_IN') || '[]');

  const loadAPI = useCallback(async () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const year = format(date, 'yyyy');
    const month = format(date, 'MM');
    const day = format(date, 'dd');

    const ptax = await axios.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=\'${month}-${day}-${year}\'&$top=100&$format=json&$select=cotacaoVenda`);

    const valuePTAX = ptax.data.value[0].cotacaoVenda;

    setDollar(valuePTAX);

    // ******************************************************************************************************

    const europeanAPI = await axios.get('https://api.exchangeratesapi.io/latest?symbols=BRL');

    const valueEuropeanAPI = europeanAPI.data.rates.BRL;

    setEuro(valueEuropeanAPI);
  }, []);


  useEffect(() => {
    loadAPI();
  }, [loadAPI]);

  const loadAllQuotes = useMemo(() => bestPriceValue_OUT
    .map((quote) => {
      // PICKUP
      const pickupWeight = quote.weight * quote.pickup_ton;
      const pickupParcial = `${Math.max(pickupWeight, quote.pickup_min)}`;
      // Na variável abaixo, somar todos os valores referente aos CUSTOS DE ORIGEM
      const originCosts = pickupParcial;
      const originCostsFormatted = `${Number(originCosts).toLocaleString('pt-br', { minimumFractionDigits: 2 })} (${quote.pickup_min_currency})`;

      // ******************************************************************************************************************

      // LCL
      const lclWeight = quote.weight * quote.lcl_ton;
      const lclParcial = `${Math.max(lclWeight, quote.lcl_min)}`;
      // Na variável abaixo, somar todos os valores referente aos CUSTOS DE FRETE
      const shippingCosts = lclParcial;
      const shippingCostsFormatted = `${Number(shippingCosts).toLocaleString('pt-br', { minimumFractionDigits: 2 })} (${quote.lcl_min_currency})`;

      // ******************************************************************************************************************

      // Na variável abaixo, somar todos os valores referente aos CUSTOS DE DESTINO
      const destinationCosts = `${Number(quote.desconsol) + Number(quote.handling)}`;
      const destinationCostsFormatted = `${Number(destinationCosts).toLocaleString('pt-br', { minimumFractionDigits: 2 })} (${quote.desconsol_currency})`;

      // ******************************************************************************************************************

      // Na variável abaixo, somar todos os valores referente aos CUSTOS DE DESTINO
      const totalCosts = Number(originCosts) + Number(shippingCosts) + Number(destinationCosts);
      const totalCostsFormatted = Number(totalCosts).toLocaleString('pt-br', { minimumFractionDigits: 2 });

      return {
        pickupParcial, originCostsFormatted, lclParcial, shippingCostsFormatted, destinationCostsFormatted, totalCosts, totalCostsFormatted,
      };
    }), [bestPriceValue_OUT]);

  const convertTotals = useMemo(() => loadAllQuotes
    .map((total) => {
      const dollarTotal = (Number(total.totalCosts) * Number(dollar)).toLocaleString('en-US', { minimumFractionDigits: 2 });
      const euroTotal = (Number(total.totalCosts) * Number(euro)).toLocaleString('en-US', { minimumFractionDigits: 2 });


      return { dollarTotal, euroTotal };
    }), [dollar, euro, loadAllQuotes]);

  return (
    <>
      <Container>
        <Header>
          <Title onClick={() => history.push('/home')}>Detalhamento</Title>
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

          <ValuesList>
            {/* Seção 1 */}
            <SectionContainer>
              <TitleSection>Custos de origem</TitleSection>
            </SectionContainer>

            <HeaderTaxesContainer>
              <HeaderTaxTitle />
              {bestPriceValue_OUT.map((item) => (
                <HeaderTaxTitle>{item.name}</HeaderTaxTitle>
              ))}
            </HeaderTaxesContainer>

            <InputsTaxesContainer>
              <InputTaxTitle>Pickup</InputTaxTitle>
              {loadAllQuotes.map((item) => (
                <InputTaxTitle>{item.pickupParcial}</InputTaxTitle>
              ))}
            </InputsTaxesContainer>

            <InputsTaxesContainer>
              <HeaderTaxTitle>Subtotal</HeaderTaxTitle>
              {loadAllQuotes.map((item) => (
                <HeaderTaxTitle>{item.originCostsFormatted}</HeaderTaxTitle>
              ))}
            </InputsTaxesContainer>


            {/* Seção 2 */}
            <SectionContainer>
              <TitleSection>Custos de frete</TitleSection>
            </SectionContainer>

            <HeaderTaxesContainer>
              <HeaderTaxTitle />
              {bestPriceValue_OUT.map((item) => (
                <HeaderTaxTitle>{item.name}</HeaderTaxTitle>
              ))}
            </HeaderTaxesContainer>

            <InputsTaxesContainer>

              <InputTaxTitle>LCL</InputTaxTitle>
              {loadAllQuotes.map((item) => (
                <InputTaxTitle>{item.lclParcial}</InputTaxTitle>
              ))}


            </InputsTaxesContainer>

            <InputsTaxesContainer>
              <HeaderTaxTitle>Subtotal</HeaderTaxTitle>
              {loadAllQuotes.map((item) => (
                <HeaderTaxTitle>{item.shippingCostsFormatted}</HeaderTaxTitle>
              ))}
            </InputsTaxesContainer>


            {/* Seção 3 */}
            <SectionContainer>
              <TitleSection>Custos de destino</TitleSection>
            </SectionContainer>

            <HeaderTaxesContainer>
              <HeaderTaxTitle />
              {bestPriceValue_OUT.map((item) => (
                <HeaderTaxTitle>{item.name}</HeaderTaxTitle>
              ))}
            </HeaderTaxesContainer>

            <InputsTaxesContainer>
              <InputTaxTitle>Transit time</InputTaxTitle>
              {bestPriceValue_OUT.map((item) => (
                <InputTaxTitle>
                  {item.transit_time}
                  {' '}
                  dias
                </InputTaxTitle>
              ))}
            </InputsTaxesContainer>

            <InputsTaxesContainer>
              <InputTaxTitle>Desconsol</InputTaxTitle>
              {bestPriceValue_OUT.map((item) => (
                <InputTaxTitle>
                  {item.desconsol}
                  {/* {' '}
                  (
                  {item.desconsol_currency}
                  ) */}
                </InputTaxTitle>
              ))}
            </InputsTaxesContainer>

            <InputsTaxesContainer>
              <InputTaxTitle>Handling</InputTaxTitle>
              {bestPriceValue_OUT.map((item) => (
                <InputTaxTitle>
                  {item.handling}
                  {/* {' '}
                  (
                  {item.handling_currency}
                  ) */}
                </InputTaxTitle>
              ))}
            </InputsTaxesContainer>

            <InputsTaxesContainer>
              <HeaderTaxTitle>Subtotal</HeaderTaxTitle>
              {loadAllQuotes.map((item) => (
                <HeaderTaxTitle>{item.destinationCostsFormatted}</HeaderTaxTitle>
              ))}
            </InputsTaxesContainer>

            {/* Seção TOTAIS */}
            <SectionContainer>
              <TitleSection>Totais e ações</TitleSection>
            </SectionContainer>

            <HeaderTaxesContainer>
              <HeaderTaxTitle />
              {bestPriceValue_OUT.map((item) => (
                <HeaderTaxTitle>{item.name}</HeaderTaxTitle>
              ))}
            </HeaderTaxesContainer>

            <InputsTaxesContainer>
              <HeaderTaxTitle>BRL</HeaderTaxTitle>
              {loadAllQuotes.map((item) => (
                <HeaderTaxTitle>{item.totalCostsFormatted}</HeaderTaxTitle>
              ))}
            </InputsTaxesContainer>

            <InputsTaxesContainer>
              <HeaderTaxTitle>
                USD
                {' '}
                (
                {dollar}
                )
              </HeaderTaxTitle>
              {convertTotals.map((item) => (
                <HeaderTaxTitle>
                  {item.dollarTotal}
                </HeaderTaxTitle>
              ))}
            </InputsTaxesContainer>

            <InputsTaxesContainer>
              <HeaderTaxTitle>
                EUR
                {' '}
                (
                {euro}
                )
              </HeaderTaxTitle>
              {convertTotals.map((item) => (
                <HeaderTaxTitle>
                  {item.euroTotal}
                </HeaderTaxTitle>
              ))}
            </InputsTaxesContainer>


            {/* <Button type="submit">
              Editar valores
            </Button> */}
          </ValuesList>

        </Content>

      </Container>
    </>
  );
};


export default ProvidersSummaryPrice;
