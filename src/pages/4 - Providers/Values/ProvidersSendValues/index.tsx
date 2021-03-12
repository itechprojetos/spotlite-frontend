import React, {
  useRef, useEffect, useState, useCallback, useMemo,
} from 'react';

import axios from 'axios';

import { format } from 'date-fns';

import { v4 as uuid } from 'uuid';

import { useHistory, useLocation } from 'react-router-dom';
import {
  FaTelegramPlane,
  FaCalculator,
  FaRegTrashAlt,
} from 'react-icons/fa';

import * as Yup from 'yup';


import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Calculate } from '../../../../styles/Icons';
import InputLabel from '../../../../components/InputLabel';
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
  InputsTaxesContainerList,
  InputTaxTitle,
  InputTaxTitleList,
  InputTaxCurrency,
  InputTaxCurrencyPicker,
  InputTaxAmount,
  InputTaxAmountList,
  InputTaxAmount2,
  SendButton,
  ContainerButtons,
  Option1,
  TotalTaxTitle,
  TotalTaxCurrency,
  TotalTaxAmount,
  SubtotalTaxTitle,
  SubtotalTaxCurrency,
  SubtotalTaxAmount,
  SubtotalTaxAmountSecondary,
  SubtotalCalculator,
  InputSubtotalCurrencyPicker,
  InputTaxCurrencyPickerSecondaryValue,
  InputTaxAmountListSecondary,
} from './styles';

const useStyles = makeStyles({
  root: {
    width: 130,
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

const optionsCalculationLogic = [
  { label: 'Valor fixo', value: 'Valor fixo' },
  { label: 'Percentual mercadoria', value: 'Percentual mercadoria' },
  { label: 'Percentual mercadoria, com mínimo', value: 'Percentual mercadoria, com mínimo' },
  { label: 'Valor por kg', value: 'Valor por kg' },
  { label: 'Valor por kg, com mínimo', value: 'Valor por kg, com mínimo' },
  { label: 'Percentual do frete', value: 'Percentual do frete' },
  { label: 'Percentual do frete, com mínimo', value: 'Percentual do frete, com mínimo' },
];

const optionsCalculationCurrency = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'BRL', value: 'BRL' },
];

  interface SendTaxesFormData {
      air_ncn_freight_minimum: number;
      air_ncn_freight_weight: number;
      air_ncn_collect: number;
      air_ncn_dispatch: number;
      air_ncn_delivery: number;
      air_ncn_ad_valorem: number;
      air_ncn_gris_minimum: number;
      air_ncn_gris_percentual: number;
      transit_time: number;
  }

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
          spot_value: number;
      };
  }

  interface LocationState {
    name: string;
    email: string;
    spot_providers_id: string;
    title: string;
    pickup_city_state: string;
    delivery_city_state: string;
    modal: string;
    load_type: string;
    closure_days: string;
  }

  interface CurrencyLabel {
      label: string;
      value: number;
  }

  interface OriginCostFormData {
      air_ncn_freight_minimum: number;
      air_ncn_freight_weight: number;
      air_ncn_collect: number;
  }

  interface ShippingCostsFormData {
      air_ncn_dispatch: number;
  }

  interface DestinationCostsFormData {
      air_ncn_delivery: number;
      air_ncn_ad_valorem: number;
      air_ncn_gris_minimum: number;
      air_ncn_gris_percentual: number;
  }

  interface ExclusiveFeeFormData {
    exclusive_fee_description: string;
    // air_ncn_exclusive_fee: number;

    fixed_value: number;
    product_percentage: number;
    product_percentage_with_mininum: number;
    product_percentage_with_mininum_minimum: number;
    value_kilo: number;
    value_kilo_with_minimum: number;
    value_kilo_with_minimum_minimum: number;
    shipping_percentage: number;
    shipping_percentage_minimum: number;
    shipping_percentage_minimum_minimum: number;
  }

  interface TotalCostsFormData {
      air_ncn_exclusive_fee: number;
  }

  interface ExclusiveFees {
      id: string;
      tax_description: string;
      tax_logic: string | undefined;
      tax_currency: string | undefined;
      tax_amount: string | undefined;

      percentual: string | undefined;
      minimum_label: string | undefined;
      minimum: string | undefined;
  }

  interface ConvertExclusiveFees {
      spot_provider_id: string;
      description: string;
      logic: string;
      tax: string;
      amount: number;
  }

const ProvidersSendValues: React.FC = () => {
  const history = useHistory();
  const originFormRef = useRef<FormHandles>(null);
  const shippingFormRef = useRef<FormHandles>(null);
  const destinationFormRef = useRef<FormHandles>(null);
  const otherTaxesFormRef = useRef<FormHandles>(null);
  const totalFormRef = useRef<FormHandles>(null);
  const classes = useStyles();

  const { user } = useAuth();
  const location = useLocation<LocationState>();

  const { addToast } = useToast();

  // Todas as moedas, tipadas em 'label' e 'value'
  const [currencies, setCurrencies] = useState<CurrencyLabel[]>([]);
  const [currenciesOriginal, setCurrenciesOriginal] = useState<CurrencyLabel[]>([]);
  // Valor das cotações de DÓLAR e EURO
  const [currencyDollar, setCurrencyDollar] = useState(0);
  const [currencyEuro, setCurrencyEuro] = useState(0);

  const [spot, setSpot] = useState<SpotProvidersData>();

  // Faz o controle dos campos a serem mostrados ou ocultados de acordo com a lógica de cálculo das TAXAS DINÂMICAS
  const [typeExTaxFixedValue, setTypeExTaxFixedValue] = useState(false);
  const [typeExTaxProductPercentage, setTypeExTaxProductPercentage] = useState(false);
  const [typeExTaxProductPercentageWithMinimum, setTypeExTaxProductPercentageWithMinimum] = useState(false);
  const [typeExTaxValueKilo, setTypeExTaxValueKilo] = useState(false);
  const [typeExTaxValueKiloWithMinimum, setTypeExTaxValueKiloWithMinimum] = useState(false);
  const [typeExTaxShippingPercentage, setTypeExTaxShippingPercentage] = useState(false);
  const [typeExTaxShippingPercentageWithMinimum, setTypeExTaxShippingPercentageWithMinimum] = useState(false);

  // Custos de ORIGEM
  const [air_ncn_freight_minimum_value, set_air_ncn_freight_minimum_value] = useState<string>('0');
  const [air_ncn_freight_minimum_CALC, set_air_ncn_freight_minimum_CALC] = useState<string>('0');
  const [air_ncn_freight_weight_value, set_air_ncn_freight_weight_value] = useState<string>('0');
  const [air_ncn_freight_weight_CALC, set_air_ncn_freight_weight_CALC] = useState<string>('0');
  const [freightFinal, setFreightFinal] = useState(0);

  const [air_ncn_freight_currency, set_air_ncn_freight_currency] = useState('');

  const [air_ncn_collect_value, set_air_ncn_collect_value] = useState<string>('0');
  const [air_ncn_collect_CALC, set_air_ncn_collect_CALC] = useState<string>('0');
  const [air_ncn_collect_currency, set_air_ncn_collect_currency] = useState('');

  const [air_ncn_origin_costs, set_air_ncn_origin_costs] = useState<string>('0,00');
  const [air_ncn_origin_costs_CALC, set_air_ncn_origin_costs_CALC] = useState(0);
  const [originTotalUSD, setOriginTotalUSD] = useState<string>('0,00');
  const [originTotalEUR, setOriginTotalEUR] = useState<string>('0,00');

  const [viewCurrencyOriginDefault, setViewCurrencyOriginDefault] = useState('');
  const [viewCurrencyOriginUSD, setViewCurrencyOriginUSD] = useState(false);
  const [viewCurrencyOriginBRL, setViewCurrencyOriginBRL] = useState(false);
  const [viewCurrencyOriginEUR, setViewCurrencyOriginEUR] = useState(false);

  // Custos de FRETE
  const [air_ncn_dispatch_value, set_air_ncn_dispatch_value] = useState<string>();
  const [air_ncn_dispatch_CALC, set_air_ncn_dispatch_CALC] = useState<number>();
  const [air_ncn_dispatch_currency, set_air_ncn_dispatch_currency] = useState('');

  const [air_ncn_shipping_costs, set_air_ncn_shipping_costs] = useState<string>('0,00');
  const [air_ncn_shipping_costs_CALC, set_air_ncn_shipping_costs_CALC] = useState(0);
  const [shippingTotalUSD, setShippingTotalUSD] = useState<string>('0,00');
  const [shippingTotalEUR, setShippingTotalEUR] = useState<string>('0,00');

  const [viewCurrencyShippingDefault, setViewCurrencyShippingDefault] = useState('');
  const [viewCurrencyShippingUSD, setViewCurrencyShippingUSD] = useState(false);
  const [viewCurrencyShippingBRL, setViewCurrencyShippingBRL] = useState(false);
  const [viewCurrencyShippingEUR, setViewCurrencyShippingEUR] = useState(false);

  // Custos de DESTINO
  const [air_ncn_delivery_value, set_air_ncn_delivery_value] = useState<string>();
  const [air_ncn_delivery_CALC, set_air_ncn_delivery_CALC] = useState<string>();
  const [air_ncn_delivery_currency, set_air_ncn_delivery_currency] = useState('');

  const [air_ncn_advalorem_value, set_air_ncn_advalorem_value] = useState<string>();
  const [air_ncn_advalorem_CALC, set_air_ncn_advalorem_CALC] = useState<string>();

  const [air_ncn_gris_minimum_value, set_air_ncn_gris_minimum_value] = useState<string>();
  const [air_ncn_gris_minimum_CALC, set_air_ncn_gris_minimum_CALC] = useState<string>();
  const [air_ncn_gris_minimum_currency, set_air_ncn_gris_minimum_currency] = useState('');

  const [air_ncn_gris_percentual_value, set_air_ncn_gris_percentual_value] = useState<string>();
  const [air_ncn_gris_percentual_CALC, set_air_ncn_gris_percentual_CALC] = useState<string>();

  const [air_ncn_destination_costs, set_air_ncn_destination_costs] = useState<string>('0,00');
  const [air_ncn_destination_costs_CALC, set_air_ncn_destination_costs_CALC] = useState(0);
  const [destinationTotalUSD, setDestinationTotalUSD] = useState<string>('0,00');
  const [destinationTotalEUR, setDestinationTotalEUR] = useState<string>('0,00');

  const [viewCurrencyDestinationDefault, setViewCurrencyDestinationDefault] = useState('');
  const [viewCurrencyDestinationUSD, setViewCurrencyDestinationUSD] = useState(false);
  const [viewCurrencyDestinationBRL, setViewCurrencyDestinationBRL] = useState(false);
  const [viewCurrencyDestinationEUR, setViewCurrencyDestinationEUR] = useState(false);

  // Transit time
  const [transitTime, setTransitTime] = useState<string>('0');

  // Taxas EXCLUSIVAS
  const [air_ncn_exclusive_fee_value, set_air_ncn_exclusive_fee_value] = useState(0);

  // Lógica de cálculo para cada taxa exclusiva
  const [calculationLogic, setCalculationLogic] = useState<string>();

  const [exclusiveFees, setExclusiveFees] = useState<ExclusiveFees[]>([]);

  //   const [air_ncn_exclusive_fees, set_air_ncn_exclusive_fees] = useState(0);
  const [air_ncn_exclusive_fees, set_air_ncn_exclusive_fees] = useState<string>('0,00');
  const [air_ncn_exclusive_fees_CALC, set_air_ncn_exclusive_fees_CALC] = useState(0);
  const [air_ncn_exclusive_fee_currency, set_air_ncn_exclusive_fee_currency] = useState<string>('');
  const [exclusiveFeeUSD, setExclusiveFeeUSD] = useState<string>('0,00');
  const [exclusiveFeeEUR, setExclusiveFeeEUR] = useState<string>('0,00');

  const [viewCurrencyOtherTaxesDefault, setViewCurrencyOtherTaxesDefault] = useState('USD');
  const [viewCurrencyOtherTaxesUSD, setViewCurrencyOtherTaxesUSD] = useState(true);
  const [viewCurrencyOtherTaxesBRL, setViewCurrencyOtherTaxesBRL] = useState(false);
  const [viewCurrencyOtherTaxesEUR, setViewCurrencyOtherTaxesEUR] = useState(false);

  // Toais
  const [total, setTotal] = useState<string>('0,00');
  const [totalCALC, setTotalCALC] = useState(0);
  const [totalUSD, setTotalUSD] = useState<string>('0,00');
  const [totalEUR, setTotalEUR] = useState<string>('0,00');

  const [viewCurrencyTotalDefault, setViewCurrencyTotalDefault] = useState('');
  const [viewCurrencyTotalUSD, setViewCurrencyTotalUSD] = useState(false);
  const [viewCurrencyTotalBRL, setViewCurrencyTotalBRL] = useState(false);
  const [viewCurrencyTotalEUR, setViewCurrencyTotalEUR] = useState(false);

  const loadAPI = useCallback(async () => {
    // Faz a busca na API européia
    const response = await axios.get('https://api.exchangeratesapi.io/latest?base=BRL');

    // Isola exclusivamente o objeto (RATES) que contém a lista de moedas e valores
    const values = response.data.rates;
    // Array temporário que irá memorizar cada iteração no 'Object.entries' e, de uma vez só, salvar no estado
    const temp: CurrencyLabel[] = [];
    const tempOriginal: CurrencyLabel[] = [];

    // Função que transforma um objeto em um array de objetos
    Object.entries(values).map((item) => {
      const valueOriginal = Number(item[1]);
      // Formato o valor recebido em tipo númerico e divido por 1, para obter o valor em reais de cada moeda
      const value = 1 / Number(item[1]);
      // Tipagem e passagem em formato de objeto para cada item entrar no array corretamente
      const transfer: CurrencyLabel = { label: item[0], value };
      const transferOriginal: CurrencyLabel = { label: item[0], value: valueOriginal };
      temp.push(transfer);
      tempOriginal.push(transferOriginal);
    });

    // Pega, exclusivamente, o valor da cotação do DÓLAR
    tempOriginal
      .filter(({ label }) => label === 'USD')
      .map(({ value }) => setCurrencyDollar(value));

    // Pega, exclusivamente, o valor da cotação do EURO
    tempOriginal
      .filter(({ label }) => label === 'EUR')
      .map(({ value }) => setCurrencyEuro(value));


    setCurrenciesOriginal(tempOriginal);
    setCurrencies(temp);
  }, []);

  const loadSpot = useCallback(async () => {
    await api.get(`/spot-providers/find-one-spot-provider/${location.state.spot_providers_id}`).then((response) => setSpot(response.data));
  }, [location.state.spot_providers_id]);

  // Formata as cotações de moeda de forma a aparecerem somente 2 dígitos após o 'ponto'
  const formatCurrencies = useMemo(() => currencies
    .map((item) => {
      const { label } = item;
      //   const { value } = item;
      const value = item.value.toFixed(2);

      const merge = `${label} ${value}`;
      return {
        label, value, merge,
      };
    }), [currencies]);

  useEffect(() => {
    loadAPI();
    loadSpot();
  }, [loadAPI, loadSpot]);

  // Faz o controle de qual moeda da seção Custos de Origem o prestador deseja ver seus totais
  const handleChangeViewCurrencyOriginCosts = useCallback((currency) => {
    if (currency === 'USD') {
      setViewCurrencyOriginUSD(true);
      setViewCurrencyOriginEUR(false);
      setViewCurrencyOriginBRL(false);
    }
    if (currency === 'EUR') {
      setViewCurrencyOriginUSD(false);
      setViewCurrencyOriginEUR(true);
      setViewCurrencyOriginBRL(false);
    }
    if (currency === 'BRL') {
      setViewCurrencyOriginUSD(false);
      setViewCurrencyOriginEUR(false);
      setViewCurrencyOriginBRL(true);
    }
    if (currency === 'Nenhum') {
      setViewCurrencyOriginUSD(false);
      setViewCurrencyOriginEUR(false);
      setViewCurrencyOriginBRL(false);
    }
      originFormRef.current?.submitForm();
      setViewCurrencyOriginDefault(currency);
  }, []);

  // Faz o controle de qual moeda da seção Custos de Frete o prestador deseja ver seus totais
  const handleChangeViewCurrencyShippingCosts = useCallback((currency) => {
    if (currency === 'USD') {
      setViewCurrencyShippingUSD(true);
      setViewCurrencyShippingEUR(false);
      setViewCurrencyShippingBRL(false);
    }
    if (currency === 'EUR') {
      setViewCurrencyShippingUSD(false);
      setViewCurrencyShippingEUR(true);
      setViewCurrencyShippingBRL(false);
    }
    if (currency === 'BRL') {
      setViewCurrencyShippingUSD(false);
      setViewCurrencyShippingEUR(false);
      setViewCurrencyShippingBRL(true);
    }
    if (currency === 'Nenhum') {
      setViewCurrencyShippingUSD(false);
      setViewCurrencyShippingEUR(false);
      setViewCurrencyShippingBRL(false);
    }
      shippingFormRef.current?.submitForm();
      setViewCurrencyShippingDefault(currency);
  }, []);

  // Faz o controle de qual moeda da seção Custos de Destino o prestador deseja ver seus totais
  const handleChangeViewCurrencyDestinationCosts = useCallback((currency) => {
    if (currency === 'USD') {
      setViewCurrencyDestinationUSD(true);
      setViewCurrencyDestinationEUR(false);
      setViewCurrencyDestinationBRL(false);
    }
    if (currency === 'EUR') {
      setViewCurrencyDestinationUSD(false);
      setViewCurrencyDestinationEUR(true);
      setViewCurrencyDestinationBRL(false);
    }
    if (currency === 'BRL') {
      setViewCurrencyDestinationUSD(false);
      setViewCurrencyDestinationEUR(false);
      setViewCurrencyDestinationBRL(true);
    }
    if (currency === 'Nenhum') {
      setViewCurrencyDestinationUSD(false);
      setViewCurrencyDestinationEUR(false);
      setViewCurrencyDestinationBRL(false);
    }
      destinationFormRef.current?.submitForm();
      setViewCurrencyDestinationDefault(currency);
  }, []);

  // Faz o controle de qual moeda da seção Outras Taxas o prestador deseja ver seus totais
  const handleChangeViewCurrencyOtherTaxes = useCallback((currency) => {
    if (currency === 'USD') {
      setViewCurrencyOtherTaxesUSD(true);
      setViewCurrencyOtherTaxesEUR(false);
      setViewCurrencyOtherTaxesBRL(false);
    }
    if (currency === 'EUR') {
      setViewCurrencyOtherTaxesUSD(false);
      setViewCurrencyOtherTaxesEUR(true);
      setViewCurrencyOtherTaxesBRL(false);
    }
    if (currency === 'BRL') {
      setViewCurrencyOtherTaxesUSD(false);
      setViewCurrencyOtherTaxesEUR(false);
      setViewCurrencyOtherTaxesBRL(true);
    }
    if (currency === 'Nenhum') {
      setViewCurrencyOtherTaxesUSD(false);
      setViewCurrencyOtherTaxesEUR(false);
      setViewCurrencyOtherTaxesBRL(false);
    }
    // otherTaxesFormRef.current?.submitForm();
    setViewCurrencyOtherTaxesDefault(currency);
  }, []);

  // Faz o controle de qual moeda da seção Totais o prestador deseja ver seus totais
  const handleChangeViewCurrencyTotal = useCallback((currency) => {
    if (currency === 'USD') {
      setViewCurrencyTotalUSD(true);
      setViewCurrencyTotalEUR(false);
      setViewCurrencyTotalBRL(false);
    }
    if (currency === 'EUR') {
      setViewCurrencyTotalUSD(false);
      setViewCurrencyTotalEUR(true);
      setViewCurrencyTotalBRL(false);
    }
    if (currency === 'BRL') {
      setViewCurrencyTotalUSD(false);
      setViewCurrencyTotalEUR(false);
      setViewCurrencyTotalBRL(true);
    }
    if (currency === 'Nenhum') {
      setViewCurrencyTotalUSD(false);
      setViewCurrencyTotalEUR(false);
      setViewCurrencyTotalBRL(false);
    }
      totalFormRef.current?.submitForm();
      setViewCurrencyTotalDefault(currency);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      //   formRef.current?.setErrors({});

      const formData = {
        air_ncn_freight_minimum: air_ncn_freight_minimum_CALC,
        air_ncn_freight_weight: air_ncn_freight_weight_CALC,
        air_ncn_freight_currency,

        air_ncn_collect: air_ncn_collect_CALC,
        air_ncn_collect_currency,

        air_ncn_origin_costs_CALC,

        // *************************************

        air_ncn_dispatch: air_ncn_dispatch_CALC,
        air_ncn_dispatch_currency,

        air_ncn_shipping_costs_CALC,

        // *************************************

        air_ncn_delivery: air_ncn_delivery_CALC,
        air_ncn_delivery_currency,

        air_ncn_ad_valorem: air_ncn_advalorem_CALC,

        air_ncn_gris_minimum: air_ncn_gris_minimum_CALC,
        air_ncn_gris_minimum_currency,
        air_ncn_gris_percentual: air_ncn_gris_percentual_CALC,

        air_ncn_destination_costs_CALC,

        // *************************************

        transit_time: transitTime,

        // *************************************

        amount_final: totalCALC,

        quoted: '0',

        // *************************************
      };

      await api.put(`/spot-providers/send-taxes/${location.state.spot_providers_id}`, formData);

      // Faz o tratamento do array de QUANTIDADE para salvar no banco
      const transformData: ConvertExclusiveFees[] = [];
      exclusiveFees.map((item) => {
        const values = {
          spot_provider_id: location.state.spot_providers_id, description: item.tax_description, logic: String(item.tax_logic), tax: String(item.tax_currency), amount: Number(String(item.tax_amount).replace(/\./g, '').replace(',', '.')),
        };

        transformData.push(values);
      });

      await api.post('/spot-providers/exclusive-taxes', transformData);

      await api.post('/spot/mail-new-cotation', { name: location.state.name, email: location.state.email });

      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'Acabamos de enviar a sua cotação para esse cliente. Agora é só aguardar.',
      });

      history.push('/spot-open');
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao enviar a sua cotação. Por favor, tente novamente.',
      });
    }
  }, [history, addToast, exclusiveFees, location.state.spot_providers_id, totalCALC, transitTime, air_ncn_freight_minimum_CALC, air_ncn_freight_weight_CALC, air_ncn_freight_currency, air_ncn_collect_CALC, air_ncn_collect_currency, air_ncn_origin_costs_CALC, air_ncn_dispatch_CALC, air_ncn_dispatch_currency, air_ncn_shipping_costs_CALC, air_ncn_delivery_CALC, air_ncn_delivery_currency, air_ncn_advalorem_CALC, air_ncn_gris_minimum_CALC, air_ncn_gris_minimum_currency, air_ncn_gris_percentual_CALC, air_ncn_destination_costs_CALC]);

  // Formatação instantânea no formato de MOEDA
  const handleCurrency = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    value = value.replace(/\D/g, '');

    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

    e.currentTarget.value = value;
  }, []);
    // Formatação instantânea no formato de PERCENTUAL
  const handlePercentual = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    value = value.replace(/\D/g, '');

    value = value.replace(/(\d)(\d{1})$/, '$1.$2');
    // value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

    e.currentTarget.value = value;

    // Utilizando REGEX para colocar no estado o valor no formato correto a ser salvo no banco de dados
    const formattedValue = value.replace(/\./g, '').replace(',', '.');
  }, []);

  const handleOriginCosts = useCallback((data: OriginCostFormData) => {
    // Capturo o valor digitado nos inputs do Form CUSTOS DE ORIGEM
    const {
      air_ncn_freight_minimum,
      air_ncn_freight_weight,
      air_ncn_collect,
    } = data;

    // Procura qual o valor da moeda selecionada
    const freightCurrency = air_ncn_freight_currency.split(' ')[1];
    const collectCurrency = air_ncn_collect_currency.split(' ')[1];

    // Universalizo o valor para o formato americano
    const freightMinimum = String(air_ncn_freight_minimum).replace(/\./g, '').replace(',', '.');
    // Aplico a taxa referente a moeda escolhida
    const freightMinimumWithCurrency = String(Number(freightMinimum) * Number(freightCurrency));

    // Universalizo o valor para o formato americano
    const freightWeight = String(air_ncn_freight_weight).replace(/\./g, '').replace(',', '.');
    // Aplico a taxa referente a moeda escolhida
    const freightWeightWithCurrency = String(Number(freightWeight) * Number(freightCurrency));

    // Universalizo o valor para o formato americano
    const collect = String(air_ncn_collect).replace(/\./g, '').replace(',', '.');
    // Aplico a taxa referente a moeda escolhida
    const collectWithCurrency = String(Number(collect) * Number(collectCurrency));


    // Freight
    const calcFreightWeight = Number(spot?.spot.weight) * Number(freightWeightWithCurrency);
    const finalFreight = Math.max(calcFreightWeight, Number(freightMinimumWithCurrency));
    setFreightFinal(finalFreight);

    const value = (Number(finalFreight) + Number(collectWithCurrency)).toLocaleString('pt-br', { minimumFractionDigits: 2 });
    const value_CALC = Number(finalFreight) + Number(collectWithCurrency);
    const usd = (value_CALC * currencyDollar).toLocaleString('pt-br', { minimumFractionDigits: 2 });
    const euro = (value_CALC * currencyEuro).toLocaleString('pt-br', { minimumFractionDigits: 2 });

    set_air_ncn_freight_minimum_value(freightMinimumWithCurrency);
    set_air_ncn_freight_minimum_CALC(freightMinimum);

    set_air_ncn_freight_weight_value(freightWeightWithCurrency);
    set_air_ncn_freight_weight_CALC(freightWeight);

    set_air_ncn_collect_value(collectWithCurrency);
    set_air_ncn_collect_CALC(collect);

    set_air_ncn_origin_costs(value);
    set_air_ncn_origin_costs_CALC(value_CALC);

    setOriginTotalUSD(usd);
    setOriginTotalEUR(euro);
  }, [currencyDollar, currencyEuro, spot, air_ncn_freight_currency, air_ncn_collect_currency]);

  const handleShippingCosts = useCallback((data: ShippingCostsFormData) => {
    // Capturo o valor digitado nos inputs do Form CUSTOS DE ORIGEM
    const {
      air_ncn_dispatch,
    } = data;

    // Procura qual o valor da moeda selecionada
    const dispatchCurrency = air_ncn_dispatch_currency.split(' ')[1];

    // 1. Universalizo o valor para o formato americano e 2. Aplico a taxa referente a moeda escolhida
    const dispatch = Number(String(air_ncn_dispatch).replace(/\./g, '').replace(',', '.'));
    const dispatchWithCurrency = Number(dispatch) * Number(dispatchCurrency);
    const dispatchWithCurrencyFormatted = dispatchWithCurrency.toLocaleString('pt-br', { minimumFractionDigits: 2 });

    // const dispatch_CALC = Number(String(air_ncn_dispatch).replace(/\./g, '').replace(',', '.')) * Number(dispatchCurrency);
    const usd = (dispatchWithCurrency * currencyDollar).toLocaleString('pt-br', { minimumFractionDigits: 2 });
    const euro = (dispatchWithCurrency * currencyEuro).toLocaleString('pt-br', { minimumFractionDigits: 2 });

    set_air_ncn_dispatch_value(String(dispatch));
    set_air_ncn_dispatch_CALC(dispatch);

    set_air_ncn_shipping_costs(String(dispatchWithCurrencyFormatted));
    set_air_ncn_shipping_costs_CALC(dispatchWithCurrency);

    setShippingTotalUSD(usd);
    setShippingTotalEUR(euro);
  }, [currencyDollar, currencyEuro, air_ncn_dispatch_currency]);

  const handleDestinationCosts = useCallback((data: DestinationCostsFormData) => {
    // Capturo o valor digitado nos inputs do Form CUSTOS DE ORIGEM
    const {
      air_ncn_delivery,
      air_ncn_ad_valorem,
      air_ncn_gris_minimum,
      air_ncn_gris_percentual,
    } = data;

    // Procura qual o valor da moeda selecionada
    const deliveryCurrency = air_ncn_delivery_currency.split(' ')[1];
    const grisCurrency = air_ncn_gris_minimum_currency.split(' ')[1];

    const deliveryCalc = String(Number(String(air_ncn_delivery).replace(/\./g, '').replace(',', '.')));
    const delivery = String(Number(String(air_ncn_delivery).replace(/\./g, '').replace(',', '.')) * Number(deliveryCurrency));

    const advalorem = String(parseFloat(String(air_ncn_ad_valorem / 100)) * Number(spot?.spot.spot_value));

    // const grisPercentual = String(parseFloat(String(air_ncn_gris_percentual / 100)));
    const grisPercentualCalc = parseFloat(String(air_ncn_gris_percentual / 100));
    const grisPercentual = parseFloat(String(air_ncn_gris_percentual / 100)) * Number(spot?.spot.spot_value);
    const grisMinimumCalc = String(air_ncn_gris_minimum).replace(/\./g, '').replace(',', '.');
    const grisMinimum = Number(String(air_ncn_gris_minimum).replace(/\./g, '').replace(',', '.')) * Number(grisCurrency);
    const grisMax = Math.max(grisPercentual, grisMinimum);

    const value = (Number(delivery) + Number(advalorem) + Number(grisMax)).toLocaleString('pt-br', { minimumFractionDigits: 2 });
    const value_CALC = Number(delivery) + Number(advalorem) + Number(grisMax);
    const usd = (value_CALC * currencyDollar).toLocaleString('pt-br', { minimumFractionDigits: 2 });
    const euro = (value_CALC * currencyEuro).toLocaleString('pt-br', { minimumFractionDigits: 2 });

    set_air_ncn_delivery_value(delivery);
    set_air_ncn_delivery_CALC(deliveryCalc);

    set_air_ncn_advalorem_value(advalorem);
    set_air_ncn_advalorem_CALC(String(air_ncn_ad_valorem));

    set_air_ncn_gris_minimum_value(String(grisMinimum));
    set_air_ncn_gris_minimum_CALC(String(grisMinimumCalc));

    set_air_ncn_gris_percentual_value(String(grisPercentual));
    set_air_ncn_gris_percentual_CALC(String(air_ncn_gris_percentual));

    set_air_ncn_destination_costs(value);
    set_air_ncn_destination_costs_CALC(value_CALC);

    setDestinationTotalUSD(usd);
    setDestinationTotalEUR(euro);
  }, [air_ncn_delivery_currency, air_ncn_gris_minimum_currency, spot, currencyDollar, currencyEuro]);

  const handleTotalCosts = useCallback((data: TotalCostsFormData) => {
    // const exclusiveFee = String(Number(String(air_ncn_exclusive_fee).replace(/\./g, '').replace(',', '.')) * Number(air_ncn_exclusive_fee_currency));

    const value = (Number(air_ncn_exclusive_fees_CALC) + Number(air_ncn_origin_costs_CALC) + Number(air_ncn_shipping_costs_CALC) + Number(air_ncn_destination_costs_CALC)).toLocaleString('pt-br', { minimumFractionDigits: 2 });
    setTotal(value);

    const value_CALC = Number(air_ncn_exclusive_fees_CALC) + Number(air_ncn_origin_costs_CALC) + Number(air_ncn_shipping_costs_CALC) + Number(air_ncn_destination_costs_CALC);
    setTotalCALC(value_CALC);

    const usd = (value_CALC * currencyDollar).toLocaleString('pt-br', { minimumFractionDigits: 2 });
    const euro = (value_CALC * currencyEuro).toLocaleString('pt-br', { minimumFractionDigits: 2 });

    setTotalUSD(usd);
    setTotalEUR(euro);
  }, [currencyDollar, currencyEuro, air_ncn_exclusive_fees_CALC, air_ncn_origin_costs_CALC, air_ncn_shipping_costs_CALC, air_ncn_destination_costs_CALC]);

  const handleTypeExclusiveTaxes = useCallback((option: string) => {
    if (option === 'Valor fixo') {
      setTypeExTaxFixedValue(true);
      setTypeExTaxProductPercentage(false);
      setTypeExTaxProductPercentageWithMinimum(false);
      setTypeExTaxValueKilo(false);
      setTypeExTaxValueKiloWithMinimum(false);
      setTypeExTaxShippingPercentage(false);
      setTypeExTaxShippingPercentageWithMinimum(false);
    } else if (option === 'Percentual mercadoria') {
      setTypeExTaxFixedValue(false);
      setTypeExTaxProductPercentage(true);
      setTypeExTaxProductPercentageWithMinimum(false);
      setTypeExTaxValueKilo(false);
      setTypeExTaxValueKiloWithMinimum(false);
      setTypeExTaxShippingPercentage(false);
      setTypeExTaxShippingPercentageWithMinimum(false);
    } else if (option === 'Percentual mercadoria, com mínimo') {
      setTypeExTaxFixedValue(false);
      setTypeExTaxProductPercentage(false);
      setTypeExTaxProductPercentageWithMinimum(true);
      setTypeExTaxValueKilo(false);
      setTypeExTaxValueKiloWithMinimum(false);
      setTypeExTaxShippingPercentage(false);
      setTypeExTaxShippingPercentageWithMinimum(false);
    } else if (option === 'Valor por kg') {
      setTypeExTaxFixedValue(false);
      setTypeExTaxProductPercentage(false);
      setTypeExTaxProductPercentageWithMinimum(false);
      setTypeExTaxValueKilo(true);
      setTypeExTaxValueKiloWithMinimum(false);
      setTypeExTaxShippingPercentage(false);
      setTypeExTaxShippingPercentageWithMinimum(false);
    } else if (option === 'Valor por kg, com mínimo') {
      setTypeExTaxFixedValue(false);
      setTypeExTaxProductPercentage(false);
      setTypeExTaxProductPercentageWithMinimum(false);
      setTypeExTaxValueKilo(false);
      setTypeExTaxValueKiloWithMinimum(true);
      setTypeExTaxShippingPercentage(false);
      setTypeExTaxShippingPercentageWithMinimum(false);
    } else if (option === 'Percentual do frete') {
      setTypeExTaxFixedValue(false);
      setTypeExTaxProductPercentage(false);
      setTypeExTaxProductPercentageWithMinimum(false);
      setTypeExTaxValueKilo(false);
      setTypeExTaxValueKiloWithMinimum(false);
      setTypeExTaxShippingPercentage(true);
      setTypeExTaxShippingPercentageWithMinimum(false);
    } else if (option === 'Percentual do frete, com mínimo') {
      setTypeExTaxFixedValue(false);
      setTypeExTaxProductPercentage(false);
      setTypeExTaxProductPercentageWithMinimum(false);
      setTypeExTaxValueKilo(false);
      setTypeExTaxValueKiloWithMinimum(false);
      setTypeExTaxShippingPercentage(false);
      setTypeExTaxShippingPercentageWithMinimum(true);
    }

    setCalculationLogic(option);
  }, []);

  // Adicionar múltiplas TAXAS
  const handleAddTax = useCallback((data: ExclusiveFeeFormData) => {
    const {
      exclusive_fee_description,
      fixed_value,
      product_percentage,
      product_percentage_with_mininum,
      product_percentage_with_mininum_minimum,
      value_kilo,
      value_kilo_with_minimum,
      value_kilo_with_minimum_minimum,
      shipping_percentage,
      shipping_percentage_minimum,
      shipping_percentage_minimum_minimum,
    } = data;

    // Procura qual o valor da moeda selecionada
    const exclusiveFeeCurrency = air_ncn_exclusive_fee_currency.split(' ')[1];

    let calculation: string | undefined;

    if (calculationLogic === 'Valor fixo') {
      if (!air_ncn_exclusive_fee_currency) {
        return;
      }
      const fixedValue = String((fixed_value)).replace(/\./g, '').replace(',', '.');
      calculation = (Number(fixedValue) * Number(exclusiveFeeCurrency)).toLocaleString('pt-br', { minimumFractionDigits: 2 });

      const value = calculation;

      const values = {
        id: uuid(), tax_description: exclusive_fee_description, tax_logic: calculationLogic, tax_currency: air_ncn_exclusive_fee_currency, tax_amount: value, percentual: '', minimum_label: '', minimum: '',
      };

      setExclusiveFees([...exclusiveFees, values]);
    }

    if (calculationLogic === 'Percentual mercadoria') {
      calculation = (parseFloat(String(product_percentage / 100)) * Number(spot?.spot.spot_value)).toLocaleString('pt-br', { minimumFractionDigits: 2 });

      const value = calculation;

      const values = {
        id: uuid(), tax_description: exclusive_fee_description, tax_logic: calculationLogic, tax_currency: air_ncn_exclusive_fee_currency, tax_amount: value, percentual: '', minimum_label: '', minimum: '',
      };

      setExclusiveFees([...exclusiveFees, values]);
    }

    if (calculationLogic === 'Percentual mercadoria, com mínimo') {
      if (!exclusiveFeeCurrency) {
        return;
      }
      const percentual = (parseFloat(String(product_percentage_with_mininum / 100)) * Number(spot?.spot.spot_value));
      const minimum = String((product_percentage_with_mininum_minimum)).replace(/\./g, '').replace(',', '.');
      const minimumCurrency = Number(minimum) * Number(exclusiveFeeCurrency);
      const minimumCurrencyToShow = (Number(minimum) * Number(exclusiveFeeCurrency)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

      calculation = (Math.max(percentual, Number(minimumCurrency))).toLocaleString('pt-br', { minimumFractionDigits: 2 });

      const value = calculation;

      const values = {
        id: uuid(), tax_description: exclusive_fee_description, tax_logic: calculationLogic, tax_currency: air_ncn_exclusive_fee_currency, tax_amount: value, percentual: '(%)', minimum_label: 'mínimo: ', minimum: minimumCurrencyToShow,
      };

      setExclusiveFees([...exclusiveFees, values]);
    }

    if (calculationLogic === 'Valor por kg') {
      const weight = String(value_kilo).replace(/\./g, '').replace(',', '.');
      calculation = (Number(spot?.spot.weight) * Number(Number(weight) * Number(exclusiveFeeCurrency))).toLocaleString('pt-br', { minimumFractionDigits: 2 });

      const value = calculation;

      const values = {
        id: uuid(), tax_description: exclusive_fee_description, tax_logic: calculationLogic, tax_currency: air_ncn_exclusive_fee_currency, tax_amount: value, percentual: '', minimum_label: '', minimum: '',
      };

      setExclusiveFees([...exclusiveFees, values]);
    }

    if (calculationLogic === 'Valor por kg, com mínimo') {
      const weight = String(value_kilo_with_minimum).replace(/\./g, '').replace(',', '.');
      const minimum = String(value_kilo_with_minimum_minimum).replace(/\./g, '').replace(',', '.');
      const minimumWithCurrency = (Number(minimum) * Number(exclusiveFeeCurrency)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      const perWeight = Number(spot?.spot.weight) * Number(Number(weight) * Number(exclusiveFeeCurrency));

      calculation = (Math.max(perWeight, Number(Number(minimum) * Number(exclusiveFeeCurrency)))).toLocaleString('pt-br', { minimumFractionDigits: 2 });

      const value = calculation;

      const values = {
        id: uuid(), tax_description: exclusive_fee_description, tax_logic: calculationLogic, tax_currency: air_ncn_exclusive_fee_currency, tax_amount: value, percentual: '(%)', minimum_label: 'mínimo: ', minimum: minimumWithCurrency,
      };

      setExclusiveFees([...exclusiveFees, values]);
    }

    if (calculationLogic === 'Percentual do frete') {
      calculation = (parseFloat(String(shipping_percentage / 100)) * Number(freightFinal)).toLocaleString('pt-br', { minimumFractionDigits: 2 });

      const value = calculation;

      const values = {
        id: uuid(), tax_description: exclusive_fee_description, tax_logic: calculationLogic, tax_currency: air_ncn_exclusive_fee_currency, tax_amount: value, percentual: '', minimum_label: '', minimum: '',
      };

      setExclusiveFees([...exclusiveFees, values]);
    }

    if (calculationLogic === 'Percentual do frete, com mínimo') {
      const percentual = (parseFloat(String(shipping_percentage_minimum / 100)) * Number(freightFinal));
      const minimum = String(shipping_percentage_minimum_minimum).replace(/\./g, '').replace(',', '.');
      const minimumWithCurrency = (Number(minimum) * Number(exclusiveFeeCurrency)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

      calculation = (Math.max(percentual, Number(Number(minimum) * Number(exclusiveFeeCurrency)))).toLocaleString('pt-br', { minimumFractionDigits: 2 });

      const value = calculation;

      const values = {
        id: uuid(), tax_description: exclusive_fee_description, tax_logic: calculationLogic, tax_currency: air_ncn_exclusive_fee_currency, tax_amount: value, percentual: '(%)', minimum_label: 'mínimo: ', minimum: minimumWithCurrency,
      };

      setExclusiveFees([...exclusiveFees, values]);
    }

      otherTaxesFormRef.current?.clearField('fixed_value');
      otherTaxesFormRef.current?.clearField('exclusive_fee_description');
      otherTaxesFormRef.current?.clearField('product_percentage');
      otherTaxesFormRef.current?.clearField('product_percentage_with_mininum');
      otherTaxesFormRef.current?.clearField('product_percentage_with_mininum_minimum');
      otherTaxesFormRef.current?.clearField('value_kilo');
      otherTaxesFormRef.current?.clearField('value_kilo_with_minimum');
      otherTaxesFormRef.current?.clearField('value_kilo_with_minimum_minimum');
      otherTaxesFormRef.current?.clearField('shipping_percentage');
      otherTaxesFormRef.current?.clearField('shipping_percentage_minimum');
      otherTaxesFormRef.current?.clearField('shipping_percentage_minimum_minimum');
  }, [calculationLogic, air_ncn_exclusive_fee_currency, exclusiveFees, spot, freightFinal]);

  useMemo(() => {
    if (exclusiveFees.length === 0) {
      set_air_ncn_exclusive_fees('0,00');
      set_air_ncn_exclusive_fees_CALC(0);
      setExclusiveFeeUSD('0,00');
      setExclusiveFeeEUR('0,00');
      return;
    }

    const sum = (exclusiveFees.map((a) => Number(String(a.tax_amount).replace(/\./g, '').replace(',', '.'))).reduce((a, b) => Number(a) + Number(b))).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    const sum_CALC = (exclusiveFees.map((a) => Number(String(a.tax_amount).replace(/\./g, '').replace(',', '.'))).reduce((a, b) => Number(a) + Number(b)));

    const usd = (sum_CALC * currencyDollar).toLocaleString('pt-br', { minimumFractionDigits: 2 });
    const euro = (sum_CALC * currencyEuro).toLocaleString('pt-br', { minimumFractionDigits: 2 });

    set_air_ncn_exclusive_fees(sum);
    set_air_ncn_exclusive_fees_CALC(sum_CALC);

    setExclusiveFeeUSD(usd);
    setExclusiveFeeEUR(euro);
  }, [exclusiveFees, currencyDollar, currencyEuro]);

  const handleRemoveTax = useCallback((id) => {
    // Para que o estado atualize, eu copio os dados para um array de manipulação antes de fazer a exclusão
    const array = [...exclusiveFees];

    // Aqui eu indico que quero fazer uma busca baseada no parâmetro 'ID', e informo, ao final, qual o ID que quero buscar
    const index = array.map((item) => item.id).indexOf(id);

    // Com o item localizado, eu informo o seu index e que quero remover apenas 1 posição a partir dele
    array.splice(index, 1);

    setExclusiveFees(array);

    // Se o array de medidas adicionadas estiver vazio, ele esconde toda a seção
    //   if (array.length === 0) {
    //     setSectionDimensions(false);
    //   }
  }, [exclusiveFees]);

  return (
    <>
      <Container>
        <Header>
          <Title>Proposta</Title>

        </Header>

        <Content>

          {/* CABEÇALHO */}
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
                  <SpotTitle>{location.state.title}</SpotTitle>
                  <SpotPickup>{location.state.pickup_city_state}</SpotPickup>
                  <SpotDelivery>{location.state.delivery_city_state}</SpotDelivery>
                  <SpotModal>{location.state.modal}</SpotModal>
                  <SpotLoadType>{location.state.load_type}</SpotLoadType>
                  <SpotClosureDays>{`${location.state.closure_days} dias`}</SpotClosureDays>
                </ItemsContainer>

              </Grid>
            </SuppliersList>
          </ContainerHeaderSpecifications>

          {/* CUSTOS DE ORIGEM */}
          <Form ref={originFormRef} onSubmit={handleOriginCosts}>

            <SectionContainer>
              <TitleSection>Custos de origem</TitleSection>
            </SectionContainer>

            <HeaderTaxesContainer>
              <HeaderTaxTitle>Descrição da taxa</HeaderTaxTitle>
              <HeaderTaxCurrency>Moeda</HeaderTaxCurrency>
              <HeaderTaxAmount>Valor</HeaderTaxAmount>
            </HeaderTaxesContainer>

            {/* Frete mínimo */}
            <InputsTaxesContainer>
              <InputTaxTitle>Frete mínimo</InputTaxTitle>
              <InputTaxCurrencyPicker>
                <FormControl className={classes.root}>
                  <Select
                    value={air_ncn_freight_currency}
                      // displayEmpty
                    onChange={(value: any) => { set_air_ncn_freight_currency(value.target.value); }}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {formatCurrencies.map((item) => (
                      <MenuItem key={item.label} value={item.merge}>
                        {item.merge}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputTaxCurrencyPicker>

              <InputTaxAmount>
                <InputLabel autoComplete="off" id="1" name="air_ncn_freight_minimum" label="Valor fixo" onKeyUp={handleCurrency} />
              </InputTaxAmount>
            </InputsTaxesContainer>

            {/* Frete por kg */}
            <InputsTaxesContainer>
              <InputTaxTitle>Frete por kg</InputTaxTitle>
              <InputTaxCurrencyPicker />

              <InputTaxAmount>
                <InputLabel autoComplete="off" id="2" name="air_ncn_freight_weight" label="Valor por kg" onKeyUp={handleCurrency} />
              </InputTaxAmount>
            </InputsTaxesContainer>

            {/* Coleta */}
            <InputsTaxesContainer>
              <InputTaxTitle>Coleta</InputTaxTitle>
              <InputTaxCurrencyPicker>
                <FormControl className={classes.root}>
                  <Select
                    value={air_ncn_collect_currency}
                    onChange={(value: any) => { set_air_ncn_collect_currency(value.target.value); }}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {formatCurrencies.map((item) => (
                      <MenuItem key={item.label} value={item.merge}>
                        {item.merge}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputTaxCurrencyPicker>

              <InputTaxAmount>
                <InputLabel autoComplete="off" id="3" name="air_ncn_collect" label="Valor fixo" onKeyUp={handleCurrency} />
              </InputTaxAmount>
            </InputsTaxesContainer>
            <HeaderTaxesContainer>
              <SubtotalTaxTitle>Subtotal</SubtotalTaxTitle>
              <InputSubtotalCurrencyPicker>
                <FormControl className={classes.root}>
                  <Select
                    value={viewCurrencyOriginDefault}
                      // displayEmpty
                    onChange={(value: any) => { handleChangeViewCurrencyOriginCosts(value.target.value); }}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {optionsCalculationCurrency.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputSubtotalCurrencyPicker>

              <div>

                {viewCurrencyOriginUSD ? (
                  <SubtotalTaxAmount>{originTotalUSD}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}

                {viewCurrencyOriginEUR ? (
                  <SubtotalTaxAmount>{originTotalEUR}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}

                {viewCurrencyOriginBRL ? (
                  <SubtotalTaxAmount>{air_ncn_origin_costs}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}
              </div>


            </HeaderTaxesContainer>

          </Form>

          {/* CUSTOS DE FRETE */}
          <Form ref={shippingFormRef} onSubmit={handleShippingCosts}>

            <SectionContainer>
              <TitleSection>Custos de frete</TitleSection>
            </SectionContainer>

            <HeaderTaxesContainer>
              <HeaderTaxTitle>Descrição da taxa</HeaderTaxTitle>
              <HeaderTaxCurrency>Moeda</HeaderTaxCurrency>
              <HeaderTaxAmount>Valor</HeaderTaxAmount>
            </HeaderTaxesContainer>

            {/* Despacho */}
            <InputsTaxesContainer>
              <InputTaxTitle>Despacho</InputTaxTitle>
              <InputTaxCurrencyPicker>
                <FormControl className={classes.root}>
                  <Select
                    value={air_ncn_dispatch_currency}
                    onChange={(value: any) => { set_air_ncn_dispatch_currency(value.target.value); }}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {formatCurrencies.map((item) => (
                      <MenuItem key={item.label} value={item.merge}>
                        {item.merge}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputTaxCurrencyPicker>

              <InputTaxAmount>
                <InputLabel autoComplete="off" id="4" name="air_ncn_dispatch" label="Valor fixo" onKeyUp={handleCurrency} />
              </InputTaxAmount>
            </InputsTaxesContainer>

            <HeaderTaxesContainer>
              <SubtotalTaxTitle>Subtotal</SubtotalTaxTitle>
              <InputSubtotalCurrencyPicker>
                <FormControl className={classes.root}>
                  <Select
                    value={viewCurrencyShippingDefault}
                      // displayEmpty
                    onChange={(value: any) => { handleChangeViewCurrencyShippingCosts(value.target.value); }}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {optionsCalculationCurrency.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputSubtotalCurrencyPicker>

              <div>

                {viewCurrencyShippingUSD ? (
                  <SubtotalTaxAmount>{shippingTotalUSD}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}

                {viewCurrencyShippingEUR ? (
                  <SubtotalTaxAmount>{shippingTotalEUR}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}

                {viewCurrencyShippingBRL ? (
                  <SubtotalTaxAmount>{air_ncn_shipping_costs}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}
              </div>


            </HeaderTaxesContainer>
          </Form>

          {/* CUSTOS DE DESTINO */}
          <Form ref={destinationFormRef} onSubmit={handleDestinationCosts}>

            <SectionContainer>
              <TitleSection>Custos de destino</TitleSection>
            </SectionContainer>

            <HeaderTaxesContainer>
              <HeaderTaxTitle>Descrição da taxa</HeaderTaxTitle>
              <HeaderTaxCurrency>Moeda</HeaderTaxCurrency>
              <HeaderTaxAmount>Valor</HeaderTaxAmount>
            </HeaderTaxesContainer>

            {/* Entrega */}
            <InputsTaxesContainer>
              <InputTaxTitle>Entrega</InputTaxTitle>
              <InputTaxCurrencyPicker>
                <FormControl className={classes.root}>
                  <Select
                    value={air_ncn_delivery_currency}
                    onChange={(value: any) => { set_air_ncn_delivery_currency(value.target.value); }}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {formatCurrencies.map((item) => (
                      <MenuItem key={item.label} value={item.merge}>
                        {item.merge}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputTaxCurrencyPicker>

              <InputTaxAmount>
                <InputLabel autoComplete="off" id="5" name="air_ncn_delivery" label="Valor fixo" onKeyUp={handleCurrency} />
              </InputTaxAmount>
            </InputsTaxesContainer>

            {/* Ad Valorem */}
            <InputsTaxesContainer>
              <InputTaxTitle>Ad Valorem</InputTaxTitle>
              <InputTaxCurrencyPicker />

              <InputTaxAmount>
                <InputLabel autoComplete="off" id="6" name="air_ncn_ad_valorem" label="% mercadoria" onKeyUp={handlePercentual} />
              </InputTaxAmount>
            </InputsTaxesContainer>

            {/* GRIS mínimo */}
            <InputsTaxesContainer>
              <InputTaxTitle>GRIS mínimo</InputTaxTitle>
              <InputTaxCurrencyPicker>
                <FormControl className={classes.root}>
                  <Select
                    value={air_ncn_gris_minimum_currency}
                    onChange={(value: any) => { set_air_ncn_gris_minimum_currency(value.target.value); }}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {formatCurrencies.map((item) => (
                      <MenuItem key={item.label} value={item.merge}>
                        {item.merge}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputTaxCurrencyPicker>

              <InputTaxAmount>
                <InputLabel autoComplete="off" id="7" name="air_ncn_gris_minimum" label="Valor fixo" onKeyUp={handleCurrency} />
              </InputTaxAmount>
            </InputsTaxesContainer>

            {/* GRIS (%) */}
            <InputsTaxesContainer>
              <InputTaxTitle>GRIS (%)</InputTaxTitle>
              <InputTaxCurrencyPicker />

              <InputTaxAmount>
                <InputLabel autoComplete="off" id="8" name="air_ncn_gris_percentual" label="% mercadoria" onKeyUp={handlePercentual} />
              </InputTaxAmount>
            </InputsTaxesContainer>

            <HeaderTaxesContainer>
              <SubtotalTaxTitle>Subtotal</SubtotalTaxTitle>
              <InputSubtotalCurrencyPicker>
                <FormControl className={classes.root}>
                  <Select
                    value={viewCurrencyDestinationDefault}
                      // displayEmpty
                    onChange={(value: any) => { handleChangeViewCurrencyDestinationCosts(value.target.value); }}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {optionsCalculationCurrency.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputSubtotalCurrencyPicker>

              <div>

                {viewCurrencyDestinationUSD ? (
                  <SubtotalTaxAmount>{destinationTotalUSD}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}

                {viewCurrencyDestinationEUR ? (
                  <SubtotalTaxAmount>{destinationTotalEUR}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}

                {viewCurrencyDestinationBRL ? (
                  <SubtotalTaxAmount>{air_ncn_destination_costs}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}
              </div>


            </HeaderTaxesContainer>
          </Form>

          {/* TRANSIT TIME E OUTRAS TAXAS */}
          <Form ref={otherTaxesFormRef} onSubmit={handleAddTax}>

            <SectionContainer>
              <TitleSection>Transit time</TitleSection>
            </SectionContainer>

            <HeaderTaxesContainer>
              <HeaderTaxTitle>Descrição</HeaderTaxTitle>
              <HeaderTaxCurrency />
              <HeaderTaxAmount>Tempo</HeaderTaxAmount>
            </HeaderTaxesContainer>

            {/* Transit time */}
            <InputsTaxesContainer>
              <InputTaxTitle>Tempo de transporte</InputTaxTitle>
              <InputTaxCurrencyPicker />

              <InputTaxAmount>
                <InputLabel autoComplete="off" id="9" name="transit_time" label="Dias" onKeyUp={(event: any) => setTransitTime(event.target.value)} type="number" />
              </InputTaxAmount>
            </InputsTaxesContainer>


            {/* SEÇÃO 5 */}
            <SectionContainer>
              <TitleSection>Outras taxas</TitleSection>
            </SectionContainer>

            <HeaderTaxesContainer>
              <HeaderTaxTitle>Descrição</HeaderTaxTitle>
              <HeaderTaxCurrency>Lógica</HeaderTaxCurrency>
              <HeaderTaxCurrency>Moeda</HeaderTaxCurrency>
              <HeaderTaxAmount>Valor</HeaderTaxAmount>
            </HeaderTaxesContainer>

            {/* Taxas exclusivas */}
            <InputsTaxesContainer>
              <InputTaxTitle>
                <InputLabel autoComplete="off" id="10" name="exclusive_fee_description" label="Dê um título para essa taxa" />

              </InputTaxTitle>
              <InputTaxCurrencyPicker>
                <FormControl className={classes.root}>
                  <Select
                    value={calculationLogic}
                    onChange={(value: any) => { handleTypeExclusiveTaxes(value.target.value); }}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {optionsCalculationLogic.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputTaxCurrencyPicker>

              <InputTaxCurrencyPicker>
                <FormControl className={classes.root}>
                  <Select
                    value={air_ncn_exclusive_fee_currency}
                    onChange={(value: any) => { set_air_ncn_exclusive_fee_currency(value.target.value); }}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {formatCurrencies.map((item) => (
                      <MenuItem key={item.label} value={item.merge}>
                        {item.merge}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputTaxCurrencyPicker>

              <InputTaxAmount>
                {/* <InputLabel autoComplete="off" id="11" name="air_ncn_exclusive_fee" label="Valor fixo" onKeyUp={handleCurrency} /> */}
                {typeExTaxFixedValue ? (
                  <>
                    <InputLabel autoComplete="off" id="11" name="fixed_value" label="Valor fixo" onKeyUp={handleCurrency} />

                  </>
                ) : (
                  <>
                  </>
                )}
                {typeExTaxProductPercentage ? (
                  <>
                    <InputLabel autoComplete="off" id="12" name="product_percentage" label="% mercadoria" onKeyUp={handlePercentual} />

                  </>
                ) : (
                  <>
                  </>
                )}
                {typeExTaxProductPercentageWithMinimum ? (
                  <>
                    <InputLabel autoComplete="off" id="13" name="product_percentage_with_mininum" label="% mercadoria" onKeyUp={handlePercentual} />
                    <InputLabel autoComplete="off" id="14" name="product_percentage_with_mininum_minimum" label="Valor mínimo" onKeyUp={handleCurrency} />
                  </>
                ) : (
                  <>
                  </>
                )}
                {typeExTaxValueKilo ? (
                  <>
                    <InputLabel autoComplete="off" id="15" name="value_kilo" label="Valor por kg" onKeyUp={handleCurrency} />

                  </>
                ) : (
                  <>
                  </>
                )}
                {typeExTaxValueKiloWithMinimum ? (
                  <>
                    <InputLabel autoComplete="off" id="16" name="value_kilo_with_minimum" label="Valor por kg" onKeyUp={handleCurrency} />
                    <InputLabel autoComplete="off" id="17" name="value_kilo_with_minimum_minimum" label="Valor mínimo" onKeyUp={handleCurrency} />
                  </>
                ) : (
                  <>
                  </>
                )}
                {typeExTaxShippingPercentage ? (
                  <>
                    <InputLabel autoComplete="off" id="19" name="shipping_percentage" label="% frete" onKeyUp={handlePercentual} />

                  </>
                ) : (
                  <>
                  </>
                )}
                {typeExTaxShippingPercentageWithMinimum ? (
                  <>
                    <InputLabel autoComplete="off" id="20" name="shipping_percentage_minimum" label="% frete" onKeyUp={handlePercentual} />
                    <InputLabel autoComplete="off" id="21" name="shipping_percentage_minimum_minimum" label="Valor mínimo" onKeyUp={handleCurrency} />
                  </>
                ) : (
                  <>
                  </>
                )}


              </InputTaxAmount>

            </InputsTaxesContainer>

            {exclusiveFees.map((item) => (
              <InputsTaxesContainerList
                key={item.id}
              >
                <FaRegTrashAlt
                  onClick={() => { handleRemoveTax(item.id); }}
                  style={{
                    color: '#CC6200',
                  }}
                />

                <InputTaxTitleList>{item.tax_description}</InputTaxTitleList>
                <InputTaxCurrencyPicker>{item.tax_logic}</InputTaxCurrencyPicker>
                <div>
                  <InputTaxCurrencyPicker>
                    {item.tax_currency}
                    {' '}
                    {item.percentual}
                  </InputTaxCurrencyPicker>
                  <InputTaxCurrencyPickerSecondaryValue>
                    {item.minimum_label}
                  </InputTaxCurrencyPickerSecondaryValue>
                </div>
                <div>
                  <InputTaxAmountList>
                    R$
                    {' '}
                    {item.tax_amount}
                  </InputTaxAmountList>
                  <InputTaxAmountListSecondary>
                    {item.minimum}
                  </InputTaxAmountListSecondary>
                </div>


              </InputsTaxesContainerList>
            ))}


            <HeaderTaxesContainer>
              <SubtotalTaxTitle>Subtotal</SubtotalTaxTitle>
              <InputSubtotalCurrencyPicker>
                <FormControl className={classes.root}>
                  <Select
                    value={viewCurrencyOtherTaxesDefault}
                      // displayEmpty
                    onChange={(value: any) => { handleChangeViewCurrencyOtherTaxes(value.target.value); }}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {optionsCalculationCurrency.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputSubtotalCurrencyPicker>

              <div>

                {viewCurrencyOtherTaxesUSD ? (
                  <SubtotalTaxAmount>{exclusiveFeeUSD}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}

                {viewCurrencyOtherTaxesEUR ? (
                  <SubtotalTaxAmount>{exclusiveFeeEUR}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}

                {viewCurrencyOtherTaxesBRL ? (
                  <SubtotalTaxAmount>{air_ncn_exclusive_fees}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}
              </div>
            </HeaderTaxesContainer>

            {/* Esse botão é o responsável pelo funcionamento da função submit ao apertar o enter */}
            <button
              type="submit"
              style={{
                visibility: 'hidden',
              }}
            />

          </Form>

          {/* SOMA TOTAL */}
          <Form ref={totalFormRef} onSubmit={handleTotalCosts}>


            {/* SEÇÃO 6 */}
            <SectionContainer>
              <TitleSection>Valor total</TitleSection>
            </SectionContainer>

            <HeaderTaxesContainer>
              <SubtotalTaxTitle>TOTAL</SubtotalTaxTitle>
              <InputSubtotalCurrencyPicker>
                <FormControl className={classes.root}>
                  <Select
                    value={viewCurrencyTotalDefault}
                    displayEmpty
                    onChange={(value: any) => { handleChangeViewCurrencyTotal(value.target.value); }}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {optionsCalculationCurrency.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputSubtotalCurrencyPicker>

              <div>

                {viewCurrencyTotalUSD ? (
                  <SubtotalTaxAmount>{totalUSD}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}

                {viewCurrencyTotalEUR ? (
                  <SubtotalTaxAmount>{totalEUR}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}

                {viewCurrencyTotalBRL ? (
                  <SubtotalTaxAmount>{total}</SubtotalTaxAmount>
                ) : (
                  <SubtotalTaxAmountSecondary />
                )}
              </div>


            </HeaderTaxesContainer>

            {/* Botões */}
            <ContainerButtons>
              {/* <Option1 type="submit">
                  <FaCalculator />
                  Calcular totais
                </Option1> */}

              <Option1
                onClick={handleSubmit}
              >
                <FaTelegramPlane />
                Enviar cotação
              </Option1>
            </ContainerButtons>


          </Form>

        </Content>

      </Container>
    </>
  );
};


export default ProvidersSendValues;
