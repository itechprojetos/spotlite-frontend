import React, {
  useRef, useCallback, useState, ChangeEvent,
} from 'react';
import { useHistory } from 'react-router-dom';

import { v4 as uuid } from 'uuid';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import ptBR from 'date-fns/locale/pt';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { useToast } from '../../../../hooks/toast';
import { useAuth } from '../../../../hooks/auth';
import 'react-day-picker/lib/style.css';

import Input from '../../../../components/input';

import api from '../../../../services/api';

import {
  Container,
  Content,
  TitleContainer,
  Title,
  SectionContainer,
  TitleSection,
  Subtitle,
  ContainerHeaderSpecifications,
  ItemsContainerHeader,
  ItemsContainer,
  HeaderSpotTitle,
  HeaderSpotPickup,
  HeaderSpotDelivery,
  SpotTitle,
  SpotPickup,
  SpotDelivery,
  InputTextField,
  InputContainer,
  TagInput,
  SelectContainer,
  SelectContainerMeasures,
  SelectContainerDimensions,
  DivFlex,
  AddButton,
  AddIcon,
  RemoveButton,
  DeleteIcon,
  TwoInputsTextField,
  ButtonsContainer,
  ButtonSaveLikaATemplate,
  ButtonNextStep,
  AmountAdd,
  KeyboardTimePickerInput,
  SelectContainerPrice,
  SelectContainerClosureDate,
} from './styles';

// Para adicionar mais de uma medida de peso
interface Weight {
  weight: string;
  scale: string;
}
// Para adicionar mais de uma medida de QUANTIDADE
interface Amount {
    id: string;
    amount: string;
    scale: string;
}
// Essa interface é responsável por tipar os dados no formato que será enviado à API
interface ConvertAmounts {
    spot_id: string;
    number: string;
    scale: string;
}
// Para adicionar mais de uma medida de DIMENSÕES
interface Dimensions {
    id: string;
    length: string;
    width: string;
    height: string;
    scale: string;
}
// Essa interface é responsável por tipar os dados no formato que será enviado à API
interface ConvertDimensions {
    spot_id: string;
    length: string;
    width: string;
    height: string;
    scale: string;
}

interface SpotFormData {
    titleInputWOL: string | null;
    incotermInputWOL: string | null;
    email: string;
}

const NewSpotAirInternacionalExportation: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  // Controla a abertura dos campos de QUANTIDADE, DIMENSÕES e INCOTERM (ocultas por default) //
  const [sectionAmount, setSectionAmount] = useState(false);
  const [sectionDimensions, setSectionDimensions] = useState(false);
  const [incotermOpened, setIncotermOpened] = useState(false);

  const [typeContainerOpened, setTypeContainerOpened] = useState(false);

  // Incoterms (abertura de seção quando a opção EXPORTAÇÃO for selecionada) //
  const [nnn, setNnn] = useState(false);
  const [ynn, setYnn] = useState(false);
  const [yyn, setYyn] = useState(false);
  const [yyy, setYyy] = useState(false); // Esse hook também se aplica à IMPORTAÇÃO
  // Incoterms (abertura de seção quando a opção IMPORTAÇÃO for selecionada)
  //   const [nyy, setNyy] = useState(false);

  const [typeLoad, setTypeLoad] = useState(true);
  const [thermo, setThermo] = useState(false);
  //   const [incoterm, setIncoterm] = useState(true);
  //   const [dgr, setDgr] = useState(true);
  //   const [roadLoadTypeSelectData, setRoadLoadTypeSelectData] = useState('');

  // ** DOMÍNIO 3: Adicionar mais de uma propriedade a uma mesma cotação ** //
  //   const [tempWeights, setTempWeights] = useState('');
  //   const [weights, setWeights] = useState<Weight[]>([]);

  const [tempAmount, setTempAmount] = useState('');
  const [tempScaleAmount, setTempScaleAmount] = useState('');
  const [amounts, setAmounts] = useState<Amount[]>([]);

  const [tempLength, setTempLength] = useState('');
  const [tempWidth, setTempWidth] = useState('');
  const [tempHeight, setTempHeight] = useState('');
  const [tempScaleDimensions, setTempScaleDimensions] = useState('');
  const [dimensions, setDimensions] = useState<Dimensions[]>([]);

  // Valor da mercadoria, que será formatado de acordo com a moeda
  const [commodityValue, setCommodityValue] = useState<string>();

  // Opções dos Picker's //

  const optionsIncoterm = [
    { label: 'EXW', value: 'EXW' },
    { label: 'FCA', value: 'FCA' },
    { label: 'FAS', value: 'FAS' },
    { label: 'FOB', value: 'FOB' },
    { label: 'CFR', value: 'CFR' },
    { label: 'CIF', value: 'CIF' },
    { label: 'CPT', value: 'CPT' },
    { label: 'CIP', value: 'CIP' },
    { label: 'DAP', value: 'DAP' },
    { label: 'DPU', value: 'DPU' },
    { label: 'DDP', value: 'DDP' },
  ];
  const optionsYesOrNot = [
    { label: 'Sim', value: 'Sim' },
    { label: 'Não', value: 'Não' },
  ];
  const optionsServiceLevel = [
    { label: 'Consol', value: 'Consol' },
    { label: 'Expedite', value: 'Expedite' },
    { label: 'Next Flight', value: 'Next Flight' },
  ];
  const optionsWeight = [
    { label: 'kg', value: 'kg' },
    { label: 'ton', value: 'ton' },
  ];
  const optionsMeasures = [
    { label: 'cm', value: 'cm' },
    { label: 'm', value: 'm' },
    { label: '"', value: '"' },
  ];
  const optionsPacking = [
    { label: 'caixa', value: 'caixa' },
    { label: 'container', value: 'container' },
    { label: 'pallet', value: 'pallet' },
  ];

  // Salvamento do Spot baseado nas alterações de ESTADO //
  const [isTemplate, setIsTemplate] = useState(false);

  const [title, setTitle] = useState('');
  const [loadType, setLoadType] = useState('');
  const [loadDescription, setLoadDescription] = useState('');
  const [pickupCityState, setPickupCityState] = useState('');
  const [deliveryCityState, setDeliveryCityState] = useState('');
  const [containerType, setContainerType] = useState('');
  const [cruzeCity, setCruzeCity] = useState('');
  const [weight, setWeight] = useState('0');
  const [scaleWeight, setScaleWeight] = useState('');
  const [amount, setAmount] = useState('0');
  const [packageLoad, setPackageLoad] = useState('');
  const [length, setLength] = useState('0');
  const [width, setWidth] = useState('0');
  const [height, setHeight] = useState('0');
  const [scaleDimensions, setScaleDimensions] = useState('');
  const [dgrSave, setDgrSave] = useState('');
  const [dgrClassSave, setDgrClassSave] = useState('');
  const [dgrUnSave, setDgrUnSave] = useState('');
  const [thermoSave, setThermoSave] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [obs, setObs] = useState('');
  const [stackable, setStackable] = useState('');
  const [incotermSave, setIncotermSave] = useState<string | null>('');

  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupAdress, setPickupAdress] = useState('');
  const [pickupZip, setPickupZip] = useState('');
  const [pickupCountry, setPickupCountry] = useState('');

  const [placeOrigin, setPlaceOrigin] = useState('');
  const [placeDestination, setPlaceDestination] = useState('');

  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [deliveryAdress, setDeliveryAdress] = useState('');
  const [deliveryZip, setDeliveryZip] = useState('');
  const [deliveryCountry, setDeliveryCountry] = useState('');

  const [serviceLevel, setServiceLevel] = useState<string | null>('');
  const [insurance, setInsurance] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [helper, setHelper] = useState('');
  const [closureDate, setClosureDate] = useState<Date | null>(new Date());

  const handleDateChange = (selectedDate: Date | null) => {
    setClosureDate(selectedDate);
  };

  // Submit do form (feito por meio de hooks do useState)
  const handleSubmit = useCallback(async (data: SpotFormData) => {
    try {
        formRef.current?.setErrors({});

        let formData = {};

        if (isTemplate) {
          formData = {
            owner_company: user.company_id,
            owner_user: user.id,

            title,
            type: 'Internacional',
            modal: 'Aereo',
            flow: 'Exportação',
            load_type: loadType,
            incoterm: incotermSave,

            load_description: loadDescription,
            insurance,

            pickup_location: pickupLocation,
            pickup_adress: pickupAdress,
            pickup_zip: pickupZip,
            pickup_city_state: pickupCityState,
            pickup_country: pickupCountry,

            place_origin: placeOrigin,
            place_destination: placeDestination,

            delivery_location: deliveryLocation,
            delivery_adress: deliveryAdress,
            delivery_zip: deliveryZip,
            delivery_city_state: deliveryCityState,
            delivery_country: deliveryCountry,

            weight,
            amount,
            package_load: packageLoad,
            stackable,
            length,
            width,
            height,
            scale_weight: scaleWeight,
            scale_dimensions: scaleDimensions,

            dgr: dgrSave,
            class_dgr: dgrClassSave,
            un: dgrUnSave,

            thermo: thermoSave,
            temp_min: tempMin,
            temp_max: tempMax,
            spot_value: commodityValue,
            obs,
            closure_date: closureDate,
            closure_status: 'OPEN',
            vehicle_type: vehicleType,
            helper,
            cruze_city: cruzeCity,
            container_type: containerType,

            service_level: serviceLevel,

            status_description: 'Escolher provedores',
            template: '1',
          };
        } else {
          formData = {
            owner_company: user.company_id,
            owner_user: user.id,

            title,
            type: 'Internacional',
            modal: 'Aereo',
            flow: 'Exportação',
            load_type: loadType,
            incoterm: incotermSave,

            load_description: loadDescription,
            insurance,

            pickup_location: pickupLocation,
            pickup_adress: pickupAdress,
            pickup_zip: pickupZip,
            pickup_city_state: pickupCityState,
            pickup_country: pickupCountry,

            place_origin: placeOrigin,
            place_destination: placeDestination,

            delivery_location: deliveryLocation,
            delivery_adress: deliveryAdress,
            delivery_zip: deliveryZip,
            delivery_city_state: deliveryCityState,
            delivery_country: deliveryCountry,

            weight,
            amount,
            package_load: packageLoad,
            stackable,
            length,
            width,
            height,
            scale_weight: scaleWeight,
            scale_dimensions: scaleDimensions,

            dgr: dgrSave,
            class_dgr: dgrClassSave,
            un: dgrUnSave,

            thermo: thermoSave,
            temp_min: tempMin,
            temp_max: tempMax,
            spot_value: commodityValue,
            obs,
            closure_date: closureDate,
            closure_status: 'OPEN',
            vehicle_type: vehicleType,
            helper,
            cruze_city: cruzeCity,
            container_type: containerType,

            service_level: serviceLevel,

            status_description: 'Escolher provedores',
            template: '0',
          };
        }

        // Captura o ID do Spot recém criado para poder inserir como referência na tabela de QUANTIDADE (amount)
        const response = await api.post('/spot', formData);
        const spot = response.data;

        // Faz o tratamento do array de QUANTIDADE para salvar no banco
        const transformAmounts: ConvertAmounts[] = [];
        amounts.map((item) => {
          const values = { spot_id: spot.id, number: item.amount, scale: item.scale };

          transformAmounts.push(values);
        });

        await api.post('/spot/add-amount', transformAmounts);

        // Faz o tratamento do array de DIMENSÕES para salvar no banco
        const transformDimensions: ConvertDimensions[] = [];
        dimensions.map((item) => {
          const values = {
            spot_id: spot.id, length: item.length, width: item.width, height: item.height, scale: item.scale,
          };

          transformDimensions.push(values);
        });

        await api.post('/spot/add-dimensions', transformDimensions);

        if (isTemplate) {
          addToast({
            type: 'sucess',
            title: 'Template salvo',
            description: 'Já salvamos essa cotação como um template, ok?',
          });

          setIsTemplate(false);
        } else {
          addToast({
            type: 'sucess',
            title: 'Cotação salva!',
            description: 'Agora você precisa selecionar os provedores dessa cotação.',
          });

          // PASSAGEM DE PARÂMETROS - PASSO 1: Envia o ID do Spot pelo parâmetro
          history.push({ pathname: '/newSpotProvisionalProviders', state: { spot_id: spot.id } });
        }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no prosseguimento!',
        description: 'Ocorreu um erro ao prosseguir com a sua solicitação. Revise os campos e tente novamente.',
      });
    }
  }, [addToast, amounts, dimensions, commodityValue, history, isTemplate, title, user.company_id, user.id, loadType, incotermSave, loadDescription, insurance, pickupLocation, pickupAdress, pickupZip, pickupCityState, pickupCountry, placeOrigin, placeDestination, deliveryLocation, deliveryAdress, deliveryZip, deliveryCityState, deliveryCountry, weight, amount, packageLoad, stackable, length, width, height, scaleWeight, scaleDimensions, dgrSave, dgrClassSave, dgrUnSave, thermoSave, tempMin, tempMax, obs, closureDate, vehicleType, helper, cruzeCity, containerType, serviceLevel]);

  const handleTypeLoad = useCallback((data) => {
    // Abre o próximo item

    // Carrega as opções desse item que será aberto de forma condicional, de acordo com a opção selecionada na anterior
    if (data.label === 'FCL') {
      setTypeLoad(true);
      //   setDimensionsOpened(false);
      //   setWeightQuantityOpened(false);
      setTypeContainerOpened(true);
    } else if (data.label === 'LCL') {
      setTypeLoad(false);
      setTypeContainerOpened(false);
    //   setDimensionsOpened(true);
    //   setWeightQuantityOpened(true);
    } else {
      addToast({
        type: 'error',
        title: 'Falha',
        description: 'Não consegui ler a opção que você selecionou. Tenta de novo, por favor.',
      });
    }
    // Armazena no estado, para posterior salvamento
    setLoadType(data.label);
  }, [addToast]);

  const handleTypeContainer = useCallback((data) => {
    if (data.label === '20\' Reefer' || data.label === '40\' Reefer') {
    //   setTypeContainer(true);
    //   setIncotermOpened(true);
      setThermo(true);
    //   setDimensionsOpened(false);
    } else if (data.label === '20\' Flat Rack' || data.label === '40\' Flat Rack' || data.label === '20\' Open Top' || data.label === '40\' Open Top' || data.label === 'Plataforma' || data.label === 'Maffi') {
    //   setTypeContainer(false);
    //   setIncotermOpened(true);
      setThermo(false);
    //   setDimensionsOpened(true);
    } else {
    //   setDimensionsOpened(false);
      setThermo(false);
    }

    setContainerType(data.label);
  }, []);

  const handleServiceLevel = useCallback(async (event: ChangeEvent<HTMLSelectElement>) => {
    const data = event.target.children[event.target.selectedIndex].textContent;

    setServiceLevel(data);
  }, []);

  const handleThermo = useCallback((data) => {
    // Abre o próximo item

    // Carrega as opções desse item que será aberto de forma condicional, de acordo com a opção selecionada na anterior
    if (data.label === 'Térmico: Sim') {
      setThermo(true);
    } else if (data.label === 'Térmico: Não') {
      setThermo(false);
    } else {
      addToast({
        type: 'error',
        title: 'Falha',
        description: 'Não consegui ler a opção que você selecionou. Tenta de novo, por favor.',
      });
    }

    setThermoSave(data.label);
  }, [addToast]);

  const handleIncoterm = useCallback(async (event: ChangeEvent<HTMLSelectElement>) => {
    // Captura o texto que foi digitado pelo usuário
    const data = event.target.children[event.target.selectedIndex].textContent;

    // Abre o próximo item
    setIncotermOpened(true);

    // else if (exportation) {
    if (data === 'EXW') {
      setNnn(true);

      setYnn(false);
      setYyn(false);
      setYyy(false);
    } else if (data === 'FCA' || data === 'FAS' || data === 'FOB') {
      setYnn(true);

      setNnn(false);
      setYyn(false);
      setYyy(false);
    } else if (data === 'CFR' || data === 'CIF') {
      setYyn(true);

      setYnn(false);
      setNnn(false);
      setYyy(false);
    } else if (data === 'CPT' || data === 'CIP' || data === 'DAP' || data === 'DPU' || data === 'DDP') {
      setYyy(true);

      setYyn(false);
      setYnn(false);
      setNnn(false);
    } else {
      addToast({
        type: 'error',
        title: 'Falha',
        description: 'Não consegui ler a opção que você selecionou. Tenta de novo, por favor.',
      });
    }
    // }

    setIncotermSave(data);
  }, [addToast]);

  // Adicionar múltiplas QUANTIDADES
  const handleAmount = useCallback(() => {
    const values = { id: uuid(), amount: tempAmount, scale: tempScaleAmount };

    setAmounts([...amounts, values]);

    setSectionAmount(true);
  }, [amounts, tempAmount, tempScaleAmount]);
  const handleRemoveAmount = useCallback((id_amount) => {
    // Para que o estado atualize, eu copio os dados para um array de manipulação antes de fazer a exclusão
    const array = [...amounts];

    // Aqui eu indico que quero fazer uma busca baseada no parâmetro 'ID', e informo, ao final, qual o ID que quero buscar
    const index = array.map((item) => item.id).indexOf(id_amount);

    // Com o item localizado, eu informo o seu index e que quero remover apenas 1 posição a partir dele
    array.splice(index, 1);

    setAmounts(array);

    // Se o array de medidas adicionadas estiver vazio, ele esconde toda a seção
    if (array.length === 0) {
      setSectionAmount(false);
    }
  }, [amounts]);

  // Adicionar múltiplas DIMENSÕES
  const handleDimensions = useCallback(() => {
    const values = {
      id: uuid(), length: tempLength, width: tempWidth, height: tempHeight, scale: tempScaleDimensions,
    };

    setDimensions([...dimensions, values]);

    setSectionDimensions(true);
  }, [dimensions, tempLength, tempWidth, tempHeight, tempScaleDimensions]);

  const handleRemoveDimensions = useCallback((id) => {
    // Para que o estado atualize, eu copio os dados para um array de manipulação antes de fazer a exclusão
    const array = [...dimensions];

    // Aqui eu indico que quero fazer uma busca baseada no parâmetro 'ID', e informo, ao final, qual o ID que quero buscar
    const index = array.map((item) => item.id).indexOf(id);

    // Com o item localizado, eu informo o seu index e que quero remover apenas 1 posição a partir dele
    array.splice(index, 1);

    setDimensions(array);

    // Se o array de medidas adicionadas estiver vazio, ele esconde toda a seção
    if (array.length === 0) {
      setSectionDimensions(false);
    }
  }, [dimensions]);

  // Formatação instantânea no formato de MOEDA
  const handleCurrency = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    value = value.replace(/\D/g, '');

    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

    e.currentTarget.value = value;

    // Utilizando REGEX
    const formattedValue = value.replace(/\./g, '').replace(',', '.');

    setCommodityValue(formattedValue);
  }, []);

  return (
    <>
      <Container>

        <Content>

          <TitleContainer>
            <Title>Nova cotação</Title>
            <Subtitle>Detalhes</Subtitle>
          </TitleContainer>

          <ContainerHeaderSpecifications>
            <ItemsContainerHeader>
              <HeaderSpotTitle>Tipo</HeaderSpotTitle>
              <HeaderSpotPickup>Modal</HeaderSpotPickup>
              <HeaderSpotDelivery>Fluxo</HeaderSpotDelivery>
            </ItemsContainerHeader>

            <ItemsContainer>
              <SpotTitle>Internacional</SpotTitle>
              <SpotPickup>Aéreo</SpotPickup>
              <SpotDelivery>Exportação</SpotDelivery>
            </ItemsContainer>
          </ContainerHeaderSpecifications>


          <Form ref={formRef} onSubmit={handleSubmit}>

            <SectionContainer>
              <TitleSection>Título da cotação</TitleSection>
            </SectionContainer>

            <InputTextField label="Título" variant="outlined" size="small" onChange={(event) => setTitle(event.target.value)} />

            <SectionContainer>
              <TitleSection>Incoterm e serviço</TitleSection>
            </SectionContainer>

            <DivFlex>
              <InputContainer>
                <TagInput>Incoterm</TagInput>
                <SelectContainer>
                  <select name="incotermInputWOL" id="incotermInputWOL" onChange={handleIncoterm}>
                    <option value="0">Selecione...</option>
                    {optionsIncoterm.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </SelectContainer>
              </InputContainer>

              <InputContainer>
                <TagInput>Nível de serviço</TagInput>
                <SelectContainer>
                  <select name="service_level" id="service_level" onChange={handleServiceLevel}>
                    <option value="0">Selecione...</option>
                    {optionsServiceLevel.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </SelectContainer>
              </InputContainer>
            </DivFlex>


            {/* INCOTERM: início */}

            {incotermOpened && (nnn ? (
              <></>
            ) : (
              <></>
            ))}

            {incotermOpened && (ynn ? (
              <>
                <SectionContainer>
                  <TitleSection>Coleta e entrega</TitleSection>
                </SectionContainer>

                <DivFlex
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <TwoInputsTextField label="Local coleta" variant="outlined" size="small" onChange={(event) => setPickupLocation(event.target.value)} />
                  <TwoInputsTextField label="Endereço coleta" variant="outlined" size="small" onChange={(event) => setPickupAdress(event.target.value)} />
                  <TwoInputsTextField label="CEP" variant="outlined" size="small" onChange={(event) => setPickupZip(event.target.value)} />
                  <TwoInputsTextField label="Cidade e estado" variant="outlined" size="small" onChange={(event) => setPickupCityState(event.target.value)} />
                  <TwoInputsTextField label="País" variant="outlined" size="small" onChange={(event) => setPickupCountry(event.target.value)} />
                </DivFlex>
              </>
            ) : (
              <></>
            ))}

            {incotermOpened && (yyn ? (
              <>
                <SectionContainer>
                  <TitleSection>Coleta e entrega</TitleSection>
                </SectionContainer>

                <DivFlex
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <TwoInputsTextField label="Local coleta" variant="outlined" size="small" onChange={(event) => setPickupLocation(event.target.value)} />
                  <TwoInputsTextField label="Endereço coleta" variant="outlined" size="small" onChange={(event) => setPickupAdress(event.target.value)} />
                  <TwoInputsTextField label="CEP" variant="outlined" size="small" onChange={(event) => setPickupZip(event.target.value)} />
                  <TwoInputsTextField label="Cidade e estado" variant="outlined" size="small" onChange={(event) => setPickupCityState(event.target.value)} />
                  <TwoInputsTextField label="País" variant="outlined" size="small" onChange={(event) => setPickupCountry(event.target.value)} />
                </DivFlex>

                <DivFlex
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <TwoInputsTextField label="Aeroporto origem" variant="outlined" size="small" onChange={(event) => setPlaceOrigin(event.target.value)} />
                  <TwoInputsTextField label="Aeroporto destino" variant="outlined" size="small" onChange={(event) => setPlaceDestination(event.target.value)} />
                </DivFlex>
              </>
            ) : (
              <></>
            ))}

            {incotermOpened && (yyy ? (
              <>
                <SectionContainer>
                  <TitleSection>Coleta e entrega</TitleSection>
                </SectionContainer>

                <DivFlex
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <TwoInputsTextField label="Local coleta" variant="outlined" size="small" onChange={(event) => setPickupLocation(event.target.value)} />
                  <TwoInputsTextField label="Endereço coleta" variant="outlined" size="small" onChange={(event) => setPickupAdress(event.target.value)} />
                  <TwoInputsTextField label="CEP" variant="outlined" size="small" onChange={(event) => setPickupZip(event.target.value)} />
                  <TwoInputsTextField label="Cidade e estado" variant="outlined" size="small" onChange={(event) => setPickupCityState(event.target.value)} />
                  <TwoInputsTextField label="País" variant="outlined" size="small" onChange={(event) => setPickupCountry(event.target.value)} />
                </DivFlex>

                <DivFlex
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <TwoInputsTextField label="Aeroporto origem" variant="outlined" size="small" onChange={(event) => setPlaceOrigin(event.target.value)} />
                  <TwoInputsTextField label="Aeroporto destino" variant="outlined" size="small" onChange={(event) => setPlaceDestination(event.target.value)} />
                </DivFlex>

                <DivFlex>
                  <TwoInputsTextField label="Local entrega" variant="outlined" size="small" onChange={(event) => setDeliveryLocation(event.target.value)} />
                  <TwoInputsTextField label="Endereço entrega" variant="outlined" size="small" onChange={(event) => setDeliveryAdress(event.target.value)} />
                  <TwoInputsTextField label="CEP" variant="outlined" size="small" onChange={(event) => setDeliveryZip(event.target.value)} />
                  <TwoInputsTextField label="Cidade e estado" variant="outlined" size="small" onChange={(event) => setDeliveryCityState(event.target.value)} />
                  <TwoInputsTextField label="País" variant="outlined" size="small" onChange={(event) => setDeliveryCountry(event.target.value)} />
                </DivFlex>
              </>
            ) : (
              <></>
            ))}

            {/* INCOTERM: fim */}


            <SectionContainer>
              <TitleSection>Peso e quantidade</TitleSection>
            </SectionContainer>

            <DivFlex>
              <InputContainer>
                <TagInput>Peso bruto total</TagInput>
                <SelectContainerMeasures>
                  <Input name="weight" onChange={(event) => setWeight(event.target.value)} placeholder="Digite aqui..." />

                  <select
                    name="weight_scale"
                    id="weight_scale"
                    onChange={(event) => setScaleWeight(event.target.value)}
                  >
                    <option value="0">Selecione...</option>
                    {optionsWeight.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </SelectContainerMeasures>
              </InputContainer>

              <InputContainer>
                <TagInput>Empilhável</TagInput>
                <SelectContainer>
                  <select
                    name="stackable"
                    id="stackable"
                    onChange={(event) => setStackable(event.target.value)}
                  >
                    <option value="0">Selecione...</option>
                    {optionsYesOrNot.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </SelectContainer>
              </InputContainer>
            </DivFlex>

            <DivFlex>
              <InputContainer>
                <TagInput>Quantidade</TagInput>
                <SelectContainerMeasures>
                  <Input name="amount" onChange={(event) => setTempAmount(event.target.value)} placeholder="Digite aqui..." />

                  <select
                    name="pack"
                    id="modality"
                    onChange={(event) => setTempScaleAmount(event.target.value)}
                  >
                    <option value="0">Selecione...</option>
                    {optionsPacking.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </SelectContainerMeasures>
              </InputContainer>

              <InputContainer>
                <AddButton
                  onClick={handleAmount}
                >
                  <AddIcon />
                  Adicionar
                </AddButton>
              </InputContainer>
            </DivFlex>

            {sectionAmount ? (
              <>
                {/* Separador das medidas de peso adicionadas pelo usuário */}
                <SectionContainer
                  style={{
                    borderBottom: '#B1B1B1 solid 1px',
                  }}
                />

                <>
                  {amounts.map((item) => (
                    <DivFlex
                      key={item.id}
                    >
                      <InputContainer>
                        <TagInput>Quantidade</TagInput>
                        <SelectContainerMeasures>
                          <AmountAdd>{item.amount}</AmountAdd>
                          <AmountAdd
                            style={{
                              marginRight: 35,
                            }}
                          >
                            {item.scale}

                          </AmountAdd>
                        </SelectContainerMeasures>
                      </InputContainer>

                      <InputContainer>
                        <RemoveButton
                          onClick={() => { handleRemoveAmount(item.id); }}
                        >
                          <DeleteIcon />
                          Remover
                        </RemoveButton>
                      </InputContainer>
                    </DivFlex>
                  ))}

                </>
              </>
            ) : (
              <></>
            )}


            <SectionContainer>
              <TitleSection>Dimensões</TitleSection>
            </SectionContainer>

            <DivFlex>
              <InputContainer>
                <TagInput>Comprimento</TagInput>
                <SelectContainerDimensions>
                  <Input name="length" onChange={(event) => setTempLength(event.target.value)} placeholder="..." />

                  <select name="scale_dimensions" id="scale_dimensions" onChange={(event) => setTempScaleDimensions(event.target.value)}>
                    <option value="0">Selecione...</option>
                    {optionsMeasures.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </SelectContainerDimensions>
              </InputContainer>

              <InputContainer>
                <TagInput>Largura</TagInput>
                <SelectContainerDimensions>
                  <Input name="width" onChange={(event) => setTempWidth(event.target.value)} placeholder="..." />

                </SelectContainerDimensions>
              </InputContainer>

              <InputContainer>
                <TagInput>Altura</TagInput>
                <SelectContainerDimensions>
                  <Input name="height" onChange={(event) => setTempHeight(event.target.value)} placeholder="..." />
                </SelectContainerDimensions>
              </InputContainer>

              <InputContainer>
                <AddButton
                  onClick={handleDimensions}
                >
                  <AddIcon />
                  Adicionar

                </AddButton>
              </InputContainer>
            </DivFlex>

            {sectionDimensions ? (
              <>
                {/* Separador das medidas de dimensões adicionadas pelo usuário */}
                <SectionContainer
                  style={{
                    borderBottom: '#B1B1B1 solid 1px',
                  }}
                />

                <>
                  {dimensions.map((item) => (
                    <DivFlex
                      key={item.id}
                    >
                      <InputContainer>
                        <TagInput>Comprimento</TagInput>
                        <SelectContainerDimensions>
                          <AmountAdd>{item.length}</AmountAdd>
                          <AmountAdd
                            style={{
                              marginRight: 35,
                            }}
                          >
                            {item.scale}
                          </AmountAdd>
                        </SelectContainerDimensions>
                      </InputContainer>

                      <InputContainer>
                        <TagInput>Largura</TagInput>
                        <SelectContainerDimensions>
                          <AmountAdd>{item.width}</AmountAdd>
                          <AmountAdd
                            style={{
                              marginRight: 35,
                            }}
                          >
                            {item.scale}

                          </AmountAdd>
                        </SelectContainerDimensions>
                      </InputContainer>

                      <InputContainer>
                        <TagInput>Altura</TagInput>
                        <SelectContainerDimensions>
                          <AmountAdd>{item.height}</AmountAdd>
                          <AmountAdd
                            style={{
                              marginRight: 35,
                            }}
                          >
                            {item.scale}

                          </AmountAdd>
                        </SelectContainerDimensions>
                      </InputContainer>

                      <InputContainer>
                        <RemoveButton
                          onClick={() => { handleRemoveDimensions(item.id); }}
                        >
                          <DeleteIcon />
                          Remover
                        </RemoveButton>
                      </InputContainer>
                    </DivFlex>
                  ))}

                </>
              </>
            ) : (
              <></>
            )}

            <SectionContainer>
              <TitleSection>DGR</TitleSection>
            </SectionContainer>

            <DivFlex>
              <TwoInputsTextField label="Classes" variant="outlined" size="small" onChange={(event) => setDgrClassSave(event.target.value)} />
              <TwoInputsTextField label="UN#" variant="outlined" size="small" onChange={(event) => setDgrUnSave(event.target.value)} />
            </DivFlex>

            <SectionContainer>
              <TitleSection>Mercadoria</TitleSection>
            </SectionContainer>

            <DivFlex>
              <TwoInputsTextField
                style={{
                  marginTop: 18.5,
                }}
                label="Descrição da mercadoria"
                variant="outlined"
                size="small"
                onChange={(event) => setLoadDescription(event.target.value)}
              />

              <InputContainer>
                <TagInput>Valor</TagInput>
                <SelectContainerPrice>
                  <Input
                    name="price"
                    onChange={handleCurrency}
                    placeholder="Digite..."
                  />

                </SelectContainerPrice>
              </InputContainer>

            </DivFlex>

            <SectionContainer>
              <TitleSection>Outras informações</TitleSection>
            </SectionContainer>

            <DivFlex
              style={{
                marginBottom: 40,
              }}
            >
              <TwoInputsTextField
                style={{
                  marginTop: 20,
                }}
                label="Observações"
                variant="outlined"
                size="small"
                onChange={(event) => setObs(event.target.value)}
              />

              <InputContainer>
                <TagInput>Encerramento</TagInput>
                <SelectContainerClosureDate>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                    <KeyboardTimePickerInput
                      margin="normal"
                      ampm={false}
                      cancelLabel="Cancelar"
                      format="dd/MM/yyyy HH:mm:ss"
                      value={closureDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>

                </SelectContainerClosureDate>
              </InputContainer>


            </DivFlex>

            <ButtonsContainer>
              <ButtonSaveLikaATemplate
                onClick={() => { setIsTemplate(true); }}
              >
                Salvar como template

              </ButtonSaveLikaATemplate>
              <ButtonNextStep
                type="submit"
              >
                Prosseguir
              </ButtonNextStep>
            </ButtonsContainer>

          </Form>

        </Content>

      </Container>
    </>
  );
};


export default NewSpotAirInternacionalExportation;
