import React, { useRef, useCallback, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { FiType } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useToast } from '../../../../hooks/toast';
import { useAuth } from '../../../../hooks/auth';

// Picker
import Select from '../../../../components/Select';

import 'react-day-picker/lib/style.css';

import Input from '../../../../components/input';

import {
  Container,
  Content,
  TitleContainer,
  Title,
  SectionContainer,
  TitleSection,
  ButtonsContainer,
  ButtonSaveLikaATemplate,
  ButtonNextStep,
  ConditionalContainerTwoFields,
  ConditionalContainerThreeFields,
  DivFlex,
  DivRetiradaEntrega,
  DivPesoQuantidade,
  DivDimensoes,
  DivDescription,
  DivClosure,
} from './styles';

import api from '../../../../services/api';

// Para adicionar mais de uma medida de peso (implementação futura)
interface Weight {
  weight: string;
  scale: string;
}

interface SpotFormData {
    owner_company: string;
    owner_user: string;
    titleInput: string;
    type: string;
    modal: string;
    flow?: string;
    load_type?: string;
    container_type?: string;
    cruze_city?: string;
    weight?: number;
    scale_weight?: string;
    // Quantidade
    amount?: number;
    package_load?: string;
    length?: number;
    width?: number;
    height?: number;
    scale_dimensions?: string;
    dgr?: string;
    class_dgr?: string;
    un?: string;
    thermo?: string;
    temp_min?: string;
    temp_max?: string;
    loadDescriptionInput: string;
    spot_value?: number;
    obs?: string;
    stackable?: string;
    incoterm?: string;
    pickup_location?: string;
    pickup_adress?: string;
    pickup_zip?: string;
    pickupCityStateInput?: string;
    pickup_country?: string;
    place_origin?: string;
    place_destination?: string;
    delivery_location?: string;
    delivery_adress?: string;
    delivery_zip?: string;
    deliveryCityStateInput?: string;
    delivery_country?: string;
    service_level?: string;
    insurance?: string;
    vehicle_type?: string;
    helper?: string;
    closure?: Date;
    template: string;
}

const NewSpotProvisional: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  // ** DOMÍNIO 1: Controle de ABERTURA de componentes ** //

  // Abertura dos modais (Global)
  const [airOpened, setAirOpened] = useState(false);
  const [roadOpened, setRoadOpened] = useState(false);
  const [maritimeOpened, setMaritimeOpened] = useState(false);
  // Se o modal for RODOVIÁRIO
  const [roadTypeLoadOpened, setRoadTypeLoadOpened] = useState(false);

  const [incotermOpened, setIncotermOpened] = useState(false);
  const [weightQuantityOpened, setWeightQuantityOpened] = useState(false);
  const [dimensionsOpened, setDimensionsOpened] = useState(false);
  const [typeContainerOpened, setTypeContainerOpened] = useState(false);

  // ** DOMÍNIO 2: Controle de SELEÇÃO DE ITENS ** //

  // Tipos
  const [nacional, setNacional] = useState(false);
  const [internacional, setInternacional] = useState(false);
  // Modal
  const [air, setAir] = useState(false);
  const [maritime, setMaritime] = useState(false);
  const [road, setRoad] = useState(false);
  // Fluxo
  const [importation, setImportation] = useState(false);
  const [exportation, setExportation] = useState(false);
  // Tipo de carga rodoviária
  const [roadFull, setRoadFull] = useState(false);
  const [roadLess, setRoadLess] = useState(false);
  // Incoterms (abertura de seção quando a opção EXPORTAÇÃO for selecionada)
  const [nnn, setNnn] = useState(false);
  const [ynn, setYnn] = useState(false);
  const [yyn, setYyn] = useState(false);
  // O hook abaixo também se aplica à IMPORTAÇÃO
  const [yyy, setYyy] = useState(false);
  // Incoterms (abertura de seção quando a opção IMPORTAÇÃO for selecionada)
  const [nyy, setNyy] = useState(false);

  const [typeLoad, setTypeLoad] = useState(true);
  const [thermo, setThermo] = useState(false);
  const [incoterm, setIncoterm] = useState(true);
  const [dgr, setDgr] = useState(true);
  const [roadLoadTypeSelectData, setRoadLoadTypeSelectData] = useState('');

  // ** DOMÍNIO 3: Adicionar mais de uma propriedade a uma mesma cotação ** //
  const [tempWeights, setTempWeights] = useState('');
  const [weights, setWeights] = useState<Weight[]>([]);

  // ** DOMÍNIO 4: Adicionar mais de uma propriedade a uma mesma cotação ** //
  // const [tempWeights, setTempWeights] = useState('');
  // const [weights, setWeights] = useState<Weight[]>([]);

  // ** DOMÍNIO 5: Opções dos Picker's ** //

  const optionsType = [
    { label: 'Nacional', value: 'Nacional' },
    { label: 'Internacional', value: 'Internacional' },
  ];
  const optionsModalInternacional = [
    { label: 'Aéreo', value: 'Aéreo' },
    { label: 'Marítimo', value: 'Marítimo' },
    { label: 'Rodoviário', value: 'Rodoviário' },
  ];
  const optionsFlow = [
    { label: 'Importação', value: 'Importação' },
    { label: 'Exportação', value: 'Exportação' },
  ];
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
  const optionsLoad = [
    { label: 'FCL', value: 'FCL' },
    { label: 'LCL', value: 'LCL' },
  ];
  const optionsContainerFcl = [
    { label: '20\' DRY', value: '20\' DRY' },
    { label: '40\' DRY', value: '40\' DRY' },
    { label: '40\' HC', value: '40\' HC' },
    { label: '20\' Reefer', value: '20\' Reefer' },
    { label: '40\' Reefer', value: '40\' Reefer' },
    { label: '20\' Flat Rack', value: '20\' Flat Rack' },
    { label: '40\' Flat Rack', value: '40\' Flat Rack' },
    { label: '20\' Open Top', value: '20\' Open Top' },
    { label: '40\' Open Top', value: '40\' Open Top' },
    { label: 'Plataforma', value: 'Plataforma' },
    { label: 'Tanque', value: 'Tanque' },
    { label: 'Ventilado', value: 'Ventilado' },
    { label: 'Maffi', value: 'Maffi' },
    { label: 'Graneleiro', value: 'Graneleiro' },
  ];
  const optionsDgr = [
    { label: 'DGR: Sim', value: 'DGR: Sim' },
    { label: 'DGR: Não', value: 'DGR: Não' },
  ];
  const optionsThermo = [
    { label: 'Térmico: Sim', value: 'Térmico: Sim' },
    { label: 'Térmico: Não', value: 'Térmico: Não' },
  ];
  const optionsDgrClass = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
  ];
  const optionsDgrUn = [
    { label: '1.1', value: '1.1' },
    { label: '1.2', value: '1.2' },
    { label: '1.3', value: '1.3' },
    { label: '1.4', value: '1.4' },
    { label: '1.5', value: '1.5' },
    { label: '1.6', value: '1.6' },
    { label: '1.7', value: '1.7' },
    { label: '1.8', value: '1.8' },
    { label: '1.9', value: '1.9' },
    { label: '2.1', value: '2.1' },
    { label: '2.2', value: '2.2' },
    { label: '2.3', value: '2.3' },
    { label: '2.4', value: '2.4' },
    { label: '2.5', value: '2.5' },
    { label: '2.6', value: '2.6' },
    { label: '2.7', value: '2.7' },
    { label: '2.8', value: '2.8' },
    { label: '2.9', value: '2.9' },
    { label: '3.1', value: '3.1' },
    { label: '3.2', value: '3.2' },
    { label: '3.3', value: '3.3' },
    { label: '3.4', value: '3.4' },
    { label: '3.5', value: '3.5' },
    { label: '3.6', value: '3.6' },
    { label: '3.7', value: '3.7' },
    { label: '3.8', value: '3.8' },
    { label: '3.9', value: '3.9' },
    { label: '4.1', value: '4.1' },
    { label: '4.2', value: '4.2' },
    { label: '4.3', value: '4.3' },
    { label: '4.4', value: '4.4' },
    { label: '4.5', value: '4.5' },
    { label: '4.6', value: '4.6' },
    { label: '4.7', value: '4.7' },
    { label: '4.8', value: '4.8' },
    { label: '4.9', value: '4.9' },
    { label: '5.1', value: '5.1' },
    { label: '5.2', value: '5.2' },
    { label: '5.3', value: '5.3' },
    { label: '5.4', value: '5.4' },
    { label: '5.5', value: '5.5' },
    { label: '5.6', value: '5.6' },
    { label: '5.7', value: '5.7' },
    { label: '5.8', value: '5.8' },
    { label: '5.9', value: '5.9' },
    { label: '6.1', value: '6.1' },
    { label: '6.2', value: '6.2' },
    { label: '6.3', value: '6.3' },
    { label: '6.4', value: '6.4' },
    { label: '6.5', value: '6.5' },
    { label: '6.6', value: '6.6' },
    { label: '6.7', value: '6.7' },
    { label: '6.8', value: '6.8' },
    { label: '6.9', value: '6.9' },
    { label: '7.1', value: '7.1' },
    { label: '7.2', value: '7.2' },
    { label: '7.3', value: '7.3' },
    { label: '7.4', value: '7.4' },
    { label: '7.5', value: '7.5' },
    { label: '7.6', value: '7.6' },
    { label: '7.7', value: '7.7' },
    { label: '7.8', value: '7.8' },
    { label: '7.9', value: '7.9' },
    { label: '8.1', value: '8.1' },
    { label: '8.2', value: '8.2' },
    { label: '8.3', value: '8.3' },
    { label: '8.4', value: '8.4' },
    { label: '8.5', value: '8.5' },
    { label: '8.6', value: '8.6' },
    { label: '8.7', value: '8.7' },
    { label: '8.8', value: '8.8' },
    { label: '8.9', value: '8.9' },
    { label: '9.1', value: '9.1' },
    { label: '9.2', value: '9.2' },
    { label: '9.3', value: '9.3' },
    { label: '9.4', value: '9.4' },
    { label: '9.5', value: '9.5' },
    { label: '9.6', value: '9.6' },
    { label: '9.7', value: '9.7' },
    { label: '9.8', value: '9.8' },
    { label: '9.9', value: '9.9' },
  ];
  const optionsServiceLevel = [
    { label: 'Consol', value: 'Consol' },
    { label: 'Expedite', value: 'Expedite' },
    { label: 'Next Flight', value: 'Next Flight' },
  ];
  const optionsServiceLevelAereoNacional = [
    { label: 'Convencional (72h)', value: 'Convencional (72h)' },
    { label: 'Expresso (48h)', value: 'Expresso (48h)' },
    { label: 'Emergencial (24h)', value: 'Emergencial (24h)' },
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
  const optionsConfirmation = [
    { label: 'Empilhavél: Sim', value: 'Empilhavél: Sim' },
    { label: 'Empilhavél: Não', value: 'Empilhavél: Não' },
  ];
  const optionsPacking = [
    { label: 'Caixa', value: 'Caixa' },
    { label: 'Container', value: 'Container' },
    { label: 'Pallet', value: 'Pallet' },
  ];
  const optionsInsurance = [
    { label: 'Nenhum', value: 'Nenhum' },
    { label: 'Cliente', value: 'Cliente' },
    { label: 'Add valorem', value: 'Add valorem' },
  ];
  const optionsHelper = [
    { label: 'Ajudante: Sim', value: 'Ajudante: Sim' },
    { label: 'Ajudante: Não', value: 'Ajudante: Não' },
  ];
  const optionsRoadLoadType = [
    { label: 'Lotação', value: 'Lotação' },
    { label: 'Fracionado', value: 'Fracionado' },
  ];

  // ** DOMÍNIO 6: Salvamento do Spot baseado nas alterações de ESTADO ** //
  const [isTemplate, setIsTemplate] = useState(false);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [modal, setModal] = useState('');

  const [loadType, setLoadType] = useState('');
  const [loadDescription, setLoadDescription] = useState('');
  const [pickupCityState, setPickupCityState] = useState('');
  const [deliveryCityState, setDeliveryCityState] = useState('');

  const [flow, setFlow] = useState('');
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
  const [spot_value, setSpot_value] = useState('0');
  const [obs, setObs] = useState('');
  const [stackable, setStackable] = useState('');
  const [incotermSave, setIncotermSave] = useState('');
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

  const [serviceLevel, setServiceLevel] = useState('');
  const [insurance, setInsurance] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [helper, setHelper] = useState('');
  const [closureDate, setClosureDate] = useState('');
  // const [closureStatus, setClosureStatus] = useState(''); // Input manual nessa fase?
  // const [statusDescription, setStatusDescription] = useState(''); // Input manual nessa fase?


  // Submit do form (feito por meio de hooks do useState)
  const handleSubmit = useCallback(async (data: SpotFormData) => {
    try {
        formRef.current?.setErrors({});

        // const schema = Yup.object().shape({
        //   titleInput: Yup.string().required('Obrigatório'),
        //   loadDescriptionInput: Yup.string().required('Obrigatório'),
        // });

        // await schema.validate(data, {
        //   abortEarly: false,
        // });

        const { titleInput } = data;

        let formData = {};

        if (isTemplate) {
          formData = {
            owner_company: user.company_id,
            owner_user: user.id,
            title,
            type,
            modal,
            load_type: loadType,
            load_description: loadDescription,
            pickup_city_state: pickupCityState,
            delivery_city_state: deliveryCityState,
            template: '1',
          };
        } else {
          formData = {
            owner_company: user.company_id,
            owner_user: user.id,

            title: titleInput,
            type,
            modal,
            flow,
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
            spot_value,
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

        await api.post('/spot', formData);

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
          history.push('/newSpotProvisionalProviders');
        }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no prosseguimento!',
        description: 'Ocorreu um erro ao prosseguir com a sua solicitação. Revise os campos e tente novamente.',
      });
    }
  }, [addToast, history, isTemplate, title, user.company_id, user.id, type, modal, flow, loadType, incotermSave, loadDescription, insurance, pickupLocation, pickupAdress, pickupZip, pickupCityState, pickupCountry, placeOrigin, placeDestination, deliveryLocation, deliveryAdress, deliveryZip, deliveryCityState, deliveryCountry, weight, amount, packageLoad, stackable, length, width, height, scaleWeight, scaleDimensions, dgrSave, dgrClassSave, dgrUnSave, thermoSave, tempMin, tempMax, spot_value, obs, closureDate, vehicleType, helper, cruzeCity, containerType, serviceLevel]);

  // Manipula a alteração do TIPO
  const handleType = useCallback((data) => {
    // Abre o próximo item

    // Carrega as opções desse item que será aberto de forma condicional, de acordo com a opção selecionada na anterior
    if (data.label === 'Nacional') {
      setInternacional(false);
      setNacional(true);
    } else if (data.label === 'Internacional') {
      setNacional(false);
      setInternacional(true);
    } else {
      addToast({
        type: 'error',
        title: 'Falha',
        description: 'Não consegui ler a opção que você selecionou. Tenta de novo, por favor.',
      });
    }

    // Armazena no estado, para posterior salvamento
    setType(data.label);
  }, [addToast]);

  // Manipula a alteração do MODAL
  const handleModal = useCallback((data) => {
    // Abre o próximo item

    if (data.label === 'Aéreo') {
      setRoad(false);
      setMaritime(false);
      setAir(true);

      setAirOpened(true);
      setRoadTypeLoadOpened(false);

    //   setAirInternacionalOpened(true);
    //   setAirNacionalOpened(true);
    } else if (data.label === 'Rodoviário') {
      setMaritime(false);
      setAir(false);
      setRoad(true);

      setRoadTypeLoadOpened(true);

      setRoadOpened(true);
    } else if (data.label === 'Marítimo') {
      setAir(false);
      setRoad(false);
      setMaritime(true);

      setRoadTypeLoadOpened(false);
      setMaritimeOpened(true);
    } else {
      addToast({
        type: 'error',
        title: 'Falha',
        description: 'Não consegui ler a opção que você selecionou. Tenta de novo, por favor.',
      });
    }
    // Armazena no estado, para posterior salvamento
    setModal(data.label);
  }, [addToast]);

  // Manipula a alteração do FLUXO
  const handleFlow = useCallback((data) => {
    // Abre o próximo item

    // Carrega as opções desse item que será aberto de forma condicional, de acordo com a opção selecionada na anterior
    if (data.label === 'Importação') {
      setExportation(false);
      setImportation(true);
    } else if (data.label === 'Exportação') {
      setImportation(false);
      setExportation(true);
    } else {
      addToast({
        type: 'error',
        title: 'Falha',
        description: 'Não consegui ler a opção que você selecionou. Tenta de novo, por favor.',
      });
    }

    setFlow(data.label);
  }, [addToast]);

  // Manipula o TIPO DE CARGA 'Rodoviária' que foi selecionada
  const handleRoadLoadType = useCallback((data) => {
    // Abre o próximo item

    // Carrega as opções desse item que será aberto de forma condicional, de acordo com a opção selecionada na anterior
    if (data.label === 'Lotação') {
      setRoadLess(false);
      setRoadFull(true);

      setRoadLoadTypeSelectData(data.label);
    } else if (data.label === 'Fracionado') {
      setRoadFull(false);
      setRoadLess(true);

      setRoadLoadTypeSelectData(data.label);
    } else {
      addToast({
        type: 'error',
        title: 'Falha',
        description: 'Não consegui ler a opção que você selecionou. Tenta de novo, por favor.',
      });
    }

    setLoadType(data.label);
  }, [addToast]);

  // Manipula o TIPO DE CARGA 'Marítima' que foi selecionada
  const handleTypeLoad = useCallback((data) => {
    // Abre o próximo item

    // Carrega as opções desse item que será aberto de forma condicional, de acordo com a opção selecionada na anterior
    if (data.label === 'FCL') {
      setTypeLoad(true);
      setDimensionsOpened(false);
      setWeightQuantityOpened(false);
      setTypeContainerOpened(true);
    } else if (data.label === 'LCL') {
      setTypeLoad(false);
      setTypeContainerOpened(false);
      setDimensionsOpened(true);
      setWeightQuantityOpened(true);
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

  // Manipula a alteração do TIPO DE CONTAINER
  const handleTypeContainer = useCallback((data) => {
    if (data.label === '20\' Reefer' || data.label === '40\' Reefer') {
    //   setTypeContainer(true);
    //   setIncotermOpened(true);
      setThermo(true);
      setDimensionsOpened(false);
    } else if (data.label === '20\' Flat Rack' || data.label === '40\' Flat Rack' || data.label === '20\' Open Top' || data.label === '40\' Open Top' || data.label === 'Plataforma' || data.label === 'Maffi') {
    //   setTypeContainer(false);
    //   setIncotermOpened(true);
      setThermo(false);
      setDimensionsOpened(true);
    } else {
      setDimensionsOpened(false);
      setThermo(false);
    }

    setContainerType(data.label);
  }, []);

  // Manipula a alteração do DGR
  const handleDgr = useCallback((data) => {
    // Abre o próximo item

    // Carrega as opções desse item que será aberto de forma condicional, de acordo com a opção selecionada na anterior
    if (data.label === 'DGR: Sim') {
      setDgr(true);
    } else if (data.label === 'DGR: Não') {
      setDgr(false);
    } else {
      addToast({
        type: 'error',
        title: 'Falha',
        description: 'Não consegui ler a opção que você selecionou. Tenta de novo, por favor.',
      });
    }

    setDgrSave(data.label);
  }, [addToast]);

  // Manipula a alteração do NÍVEL DE SERIÇO (aéreo)
  const handleServiceLevel = useCallback((data) => {
    // Abre o próximo item
    setIncotermOpened(true);
    setServiceLevel(data.label);
  }, []);

  // Manipula a alteração do TÉRMICO
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

  // Manipula a alteração do INCOTERM
  const handleIncoterm = useCallback((data) => {
    // Abre o próximo item
    setIncotermOpened(true);

    if (importation) {
      if (data.label === 'EXW' || data.label === 'FCA' || data.label === 'FAS') {
        setIncoterm(true);
        setYyy(true);

        setNyy(false);
      } else if (data.label === 'FOB' || data.label === 'CFR' || data.label === 'CIF' || data.label === 'CPT' || data.label === 'CIP' || data.label === 'DAP' || data.label === 'DPU' || data.label === 'DDP') {
        setIncoterm(true);
        setNyy(true);

        setYyy(false);
      } else {
        addToast({
          type: 'error',
          title: 'Falha',
          description: 'Não consegui ler a opção que você selecionou. Tenta de novo, por favor.',
        });
      }
    } else if (exportation) {
      if (data.label === 'EXW') {
        setNnn(true);

        setYnn(false);
        setYyn(false);
        setYyy(false);
      } else if (data.label === 'FCA' || data.label === 'FAS' || data.label === 'FOB') {
        setYnn(true);

        setNnn(false);
        setYyn(false);
        setYyy(false);
      } else if (data.label === 'CFR' || data.label === 'CIF') {
        setYyn(true);

        setYnn(false);
        setNnn(false);
        setYyy(false);
      } else if (data.label === 'CPT' || data.label === 'CIP' || data.label === 'DAP' || data.label === 'DPU' || data.label === 'DDP') {
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
    }
    setIncotermSave(data.label);
  }, [importation, exportation, addToast]);

  // Para o salvamento de múltiplos inputs de peso para a mesma cotação
  const handleWeight = useCallback((data) => {
    // Para medidas múltiplas
    // const transportData = { weight: tempWeights, scale: data.value };

    // setWeights([...weights, transportData]);

    setScaleWeight(data.label);
  }, [weights, tempWeights]);
  return (
    <>
      <Container>

        <Content>

          <TitleContainer>
            <Title
              onClick={() => { history.push('/newSpotAssistant'); }}
            >
              NOVA COTAÇÃO

            </Title>
          </TitleContainer>


          <Form ref={formRef} onSubmit={handleSubmit}>

            {/* Cabeçalho de definições */}
            <>
              <SectionContainer>
                <TitleSection>Definições</TitleSection>
              </SectionContainer>
              <DivDescription>
                <Input name="titleInput" icon={FiType} onChange={(event) => setTitle(event.target.value)} placeholder="Título da cotação..." />
              </DivDescription>
              <div>
                <DivFlex>
                  <Select
                    name="type"
                    OnChange={handleType}
                    placeholder="Tipo..."
                    options={optionsType}
                  />

                  <Select
                    name="modal"
                    OnChange={handleModal}
                    placeholder="Modal..."
                    options={optionsModalInternacional}
                  />

                  {internacional ? (
                    <Select
                      name="flow"
                      OnChange={handleFlow}
                      placeholder="Fluxo..."
                      options={optionsFlow}
                    />
                  )
                    : (
                      <> </>
                    )}


                  {roadTypeLoadOpened ? (
                    <Select
                      name="roadLoadTypeSelect"
                      OnChange={handleRoadLoadType}
                      placeholder="Tipo de carga..."
                      options={optionsRoadLoadType}
                    />
                  )
                    : (
                      <> </>
                    )}
                  {maritime ? (
                    <Select
                      name="incoterm"
                      OnChange={handleIncoterm}
                      placeholder="Incoterm..."
                      options={optionsIncoterm}
                    />
                  )
                    : (
                      <> </>
                    )}
                </DivFlex>
              </div>
            </>

            {/* AÉREO NACIONAL */}
            {airOpened && (nacional && air ? (
              <>
                <SectionContainer>
                  <TitleSection>Coleta e entrega</TitleSection>
                </SectionContainer>
                <ConditionalContainerTwoFields>
                  <Select OnChange={handleServiceLevel} placeholder="Nível de serviço..." options={optionsServiceLevelAereoNacional} />
                </ConditionalContainerTwoFields>
                <DivRetiradaEntrega>
                  <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                  <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                  <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                  {/* Corrigir esse estado de salvamento abaixo */}
                  <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                  <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                </DivRetiradaEntrega>

                <ConditionalContainerThreeFields>
                  <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Aeroporto origem..." />
                  <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Aeroporto destino..." />
                </ConditionalContainerThreeFields>
                <DivRetiradaEntrega>
                  <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                  <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                  <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                  {/* Corrigir esse estado de salvamento abaixo */}
                  <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                  <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                </DivRetiradaEntrega>

                <SectionContainer>
                  <TitleSection>Peso e quantidade</TitleSection>
                </SectionContainer>
                <DivPesoQuantidade>
                  <Input
                    name="weightDinamic"
                    icon={FiType}
                    placeholder="Peso..."
                    onChange={(event) => setWeight(event.target.value)}
                    // onChange={(event) => setTempWeights(event.target.value)}
                  />
                  <Select
                    name="scaleInput"
                    OnChange={handleWeight}
                    placeholder="Escala..."
                    options={optionsWeight}
                  />
                </DivPesoQuantidade>

                <DivPesoQuantidade>
                  <Input name="country" onChange={(event) => setAmount(event.target.value)} icon={FiType} placeholder="Quantidade..." />
                  <Select OnChange={(data: any): void => setPackageLoad(data.label)} placeholder="Embalagem..." options={optionsPacking} />
                </DivPesoQuantidade>
                {/* <DivPesoQuantidade>
                  <Select OnChange={() => {}} placeholder="Empilhável..." options={optionsConfirmation} />
                </DivPesoQuantidade> */}

                <SectionContainer>
                  <TitleSection>Dimensões</TitleSection>
                </SectionContainer>
                <DivDimensoes>
                  <Input name="length2" onChange={(event) => setStackable(event.target.value)} icon={FiType} placeholder="É empilhável?" />
                  <Input name="length2" onChange={(event) => setLength(event.target.value)} icon={FiType} placeholder="Comprimento..." />
                  <Input name="width2" onChange={(event) => setWidth(event.target.value)} icon={FiType} placeholder="Largura..." />
                  <Input name="height2" onChange={(event) => setHeight(event.target.value)} icon={FiType} placeholder="Altura..." />
                  <div>
                    <Select OnChange={(data: any): void => setScaleDimensions(data.label)} placeholder="..." options={optionsMeasures} />
                  </div>
                </DivDimensoes>

                <SectionContainer>
                  <TitleSection>DGR e temperatura</TitleSection>
                </SectionContainer>
                <DivFlex>
                  <Select OnChange={handleDgr} placeholder="DGR..." options={optionsDgr} />
                  <Select OnChange={(data: any): void => setDgrClassSave(data.label)} placeholder="Classe..." options={optionsDgrClass} />
                  <Select OnChange={(data: any): void => setDgrUnSave(data.label)} placeholder="UN#..." options={optionsDgrUn} />
                </DivFlex>

                <DivFlex>
                  <Select OnChange={handleThermo} placeholder="Térmico..." options={optionsThermo} />
                  <Input name="tempMinThermo" onChange={(event) => setTempMin(event.target.value)} icon={FiType} placeholder="Temperatura mínima (ºC)..." />
                  <Input name="tempMaxThermo" onChange={(event) => setTempMax(event.target.value)} icon={FiType} placeholder="Temperatura máxima (ºC)..." />
                </DivFlex>

                <SectionContainer>
                  <TitleSection>Mercadoria e seguro</TitleSection>
                </SectionContainer>
                <DivFlex>
                  <Input name="tempMinThermo" onChange={(event) => setLoadDescription(event.target.value)} icon={FiType} placeholder="Descrição da mercadoria..." />
                  <Input name="tempMaxThermo" onChange={(event) => setSpot_value(event.target.value)} icon={FiType} placeholder="Valor..." />
                  <Select OnChange={(data: any): void => setInsurance(data.label)} placeholder="Seguro..." options={optionsInsurance} />
                </DivFlex>

                <SectionContainer>
                  <TitleSection>Outras informações</TitleSection>
                </SectionContainer>


                <Input name="title" onChange={(event) => setObs(event.target.value)} icon={FiType} placeholder="Observações gerais..." />

                <DivClosure>
                  <Input name="closureDate" onChange={(event) => setClosureDate(event.target.value)} icon={FiType} placeholder="Encerra em..." />
                </DivClosure>


                <ButtonsContainer>
                  <ButtonSaveLikaATemplate onClick={() => { setIsTemplate(true); }}>Salvar como template</ButtonSaveLikaATemplate>
                  <ButtonNextStep type="submit">Prosseguir</ButtonNextStep>
                </ButtonsContainer>
              </>
            )
              : (<></>)
            )}

            {/* AÉREO INTERNACIONAL */}
            {airOpened && (internacional && air ? (
              <>
                <SectionContainer>
                  <TitleSection>Incoterm e serviço</TitleSection>
                </SectionContainer>
                <ConditionalContainerTwoFields>
                  <Select OnChange={handleIncoterm} placeholder="Selecione o Incoterm..." options={optionsIncoterm} />
                  <Select OnChange={handleServiceLevel} placeholder="Nível de serviço..." options={optionsServiceLevel} />
                </ConditionalContainerTwoFields>

                {incotermOpened && (incoterm && importation && yyy ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>

                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Aeroporto origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Aeroporto destino..." />
                    </ConditionalContainerThreeFields>
                    <DivRetiradaEntrega>
                      <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                      <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                      <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (incoterm && importation && nyy ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Aeroporto origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Aeroporto destino..." />
                    </ConditionalContainerThreeFields>
                    <DivRetiradaEntrega>
                      <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                      <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                      <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>

                    </>
                  )
                )}

                {incotermOpened && (exportation && nnn ? (
                  <>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (exportation && ynn ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (exportation && yyn ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>

                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Aeroporto origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Aeroporto destino..." />
                    </ConditionalContainerThreeFields>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (exportation && yyy ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>

                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Aeroporto origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Aeroporto destino..." />
                    </ConditionalContainerThreeFields>
                    <DivRetiradaEntrega>
                      <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                      <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                      <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                <SectionContainer>
                  <TitleSection>Peso e quantidade</TitleSection>
                </SectionContainer>
                <DivPesoQuantidade>
                  <Input
                    name="weightDinamic"
                    icon={FiType}
                    placeholder="Peso..."
                    onChange={(event) => setWeight(event.target.value)}
                    // onChange={(event) => setTempWeights(event.target.value)}
                  />
                  <Select
                    name="scaleInput"
                    OnChange={handleWeight}
                    placeholder="Escala..."
                    options={optionsWeight}
                  />
                </DivPesoQuantidade>

                <DivPesoQuantidade>
                  <Input name="country" onChange={(event) => setAmount(event.target.value)} icon={FiType} placeholder="Quantidade..." />
                  <Select OnChange={(data: any): void => setPackageLoad(data.label)} placeholder="Embalagem..." options={optionsPacking} />
                </DivPesoQuantidade>
                {/* <DivPesoQuantidade>
                  <Select OnChange={() => {}} placeholder="Empilhável..." options={optionsConfirmation} />
                </DivPesoQuantidade> */}

                <SectionContainer>
                  <TitleSection>Dimensões</TitleSection>
                </SectionContainer>
                <DivDimensoes>
                  <Input name="length2" onChange={(event) => setStackable(event.target.value)} icon={FiType} placeholder="É empilhável?" />
                  <Input name="length2" onChange={(event) => setLength(event.target.value)} icon={FiType} placeholder="Comprimento..." />
                  <Input name="width2" onChange={(event) => setWidth(event.target.value)} icon={FiType} placeholder="Largura..." />
                  <Input name="height2" onChange={(event) => setHeight(event.target.value)} icon={FiType} placeholder="Altura..." />
                  <div>
                    <Select OnChange={(data: any): void => setScaleDimensions(data.label)} placeholder="..." options={optionsMeasures} />
                  </div>
                </DivDimensoes>

                <SectionContainer>
                  <TitleSection>DGR e temperatura</TitleSection>
                </SectionContainer>
                <DivFlex>
                  <Select OnChange={handleDgr} placeholder="DGR..." options={optionsDgr} />
                  <Select OnChange={(data: any): void => setDgrClassSave(data.label)} placeholder="Classe..." options={optionsDgrClass} />
                  <Select OnChange={(data: any): void => setDgrUnSave(data.label)} placeholder="UN#..." options={optionsDgrUn} />
                </DivFlex>

                <DivFlex>
                  <Select OnChange={handleThermo} placeholder="Térmico..." options={optionsThermo} />
                  <Input name="tempMinThermo" onChange={(event) => setTempMin(event.target.value)} icon={FiType} placeholder="Temperatura mínima (ºC)..." />
                  <Input name="tempMaxThermo" onChange={(event) => setTempMax(event.target.value)} icon={FiType} placeholder="Temperatura máxima (ºC)..." />
                </DivFlex>

                <SectionContainer>
                  <TitleSection>Mercadoria e seguro</TitleSection>
                </SectionContainer>
                <ConditionalContainerThreeFields>
                  <Input name="tempMinThermo" onChange={(event) => setLoadDescription(event.target.value)} icon={FiType} placeholder="Descrição da mercadoria..." />
                  <Input name="tempMaxThermo" onChange={(event) => setSpot_value(event.target.value)} icon={FiType} placeholder="Valor..." />
                </ConditionalContainerThreeFields>

                <SectionContainer>
                  <TitleSection>Outras informações</TitleSection>
                </SectionContainer>


                <Input name="title" onChange={(event) => setObs(event.target.value)} icon={FiType} placeholder="Observações gerais..." />

                <DivClosure>
                  <Input name="closureDate" onChange={(event) => setClosureDate(event.target.value)} icon={FiType} placeholder="Encerra em..." />
                </DivClosure>


                <ButtonsContainer>
                  <ButtonSaveLikaATemplate onClick={() => { setIsTemplate(true); }}>Salvar como template</ButtonSaveLikaATemplate>
                  <ButtonNextStep type="submit">Prosseguir</ButtonNextStep>
                </ButtonsContainer>
              </>
            )
              : (<></>)
            )}
            {/* RODOVIÁRIO NACIONAL LOTAÇÃO */}
            {roadOpened && (nacional && road && roadFull ? (
              <>
                <SectionContainer>
                  <TitleSection>Coleta e entrega</TitleSection>
                </SectionContainer>

                <DivRetiradaEntrega>
                  <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                  <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                  <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                  {/* Corrigir esse estado de salvamento abaixo */}
                  <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                  <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                </DivRetiradaEntrega>
                <DivRetiradaEntrega>
                  <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                  <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                  <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                  {/* Corrigir esse estado de salvamento abaixo */}
                  <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                  <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                </DivRetiradaEntrega>

                <SectionContainer>
                  <TitleSection>Peso e quantidade</TitleSection>
                </SectionContainer>
                <DivPesoQuantidade>
                  <Input
                    name="weightDinamic"
                    icon={FiType}
                    placeholder="Peso..."
                    onChange={(event) => setWeight(event.target.value)}
                  />
                  <Select
                    name="scaleInput"
                    OnChange={handleWeight}
                    placeholder="Escala..."
                    options={optionsWeight}
                  />
                </DivPesoQuantidade>

                <DivPesoQuantidade>
                  <Input name="country" onChange={(event) => setAmount(event.target.value)} icon={FiType} placeholder="Quantidade..." />
                  <Select OnChange={(data: any): void => setPackageLoad(data.label)} placeholder="Embalagem..." options={optionsPacking} />
                </DivPesoQuantidade>

                <SectionContainer>
                  <TitleSection>Dimensões e outros</TitleSection>
                </SectionContainer>
                <DivDimensoes>
                  <Input name="length2" onChange={(event) => setStackable(event.target.value)} icon={FiType} placeholder="É empilhável?" />
                  <Input name="length2" onChange={(event) => setLength(event.target.value)} icon={FiType} placeholder="Comprimento..." />
                  <Input name="width2" onChange={(event) => setWidth(event.target.value)} icon={FiType} placeholder="Largura..." />
                  <Input name="height2" onChange={(event) => setHeight(event.target.value)} icon={FiType} placeholder="Altura..." />
                  <div>
                    <Select OnChange={(data: any): void => setScaleDimensions(data.label)} placeholder="..." options={optionsMeasures} />
                  </div>
                </DivDimensoes>

                <ConditionalContainerThreeFields>
                  <Input name="tempMinThermo" onChange={(event) => setVehicleType(event.target.value)} icon={FiType} placeholder="Tipo de veículo..." />
                  <Select OnChange={(data: any): void => setHelper(data.label)} placeholder="Ajudante..." options={optionsHelper} />
                </ConditionalContainerThreeFields>

                <SectionContainer>
                  <TitleSection>DGR e temperatura</TitleSection>
                </SectionContainer>
                <DivFlex>
                  <Select OnChange={handleDgr} placeholder="DGR..." options={optionsDgr} />
                  <Select OnChange={(data: any): void => setDgrClassSave(data.label)} placeholder="Classe..." options={optionsDgrClass} />
                  <Select OnChange={(data: any): void => setDgrUnSave(data.label)} placeholder="UN#..." options={optionsDgrUn} />
                </DivFlex>

                <DivFlex>
                  <Select OnChange={handleThermo} placeholder="Térmico..." options={optionsThermo} />
                  <Input name="tempMinThermo" onChange={(event) => setTempMin(event.target.value)} icon={FiType} placeholder="Temperatura mínima (ºC)..." />
                  <Input name="tempMaxThermo" onChange={(event) => setTempMax(event.target.value)} icon={FiType} placeholder="Temperatura máxima (ºC)..." />
                </DivFlex>

                <SectionContainer>
                  <TitleSection>Mercadoria e valor</TitleSection>
                </SectionContainer>
                <ConditionalContainerThreeFields>
                  <Input name="tempMinThermo" onChange={(event) => setLoadDescription(event.target.value)} icon={FiType} placeholder="Descrição da mercadoria..." />
                  <Input name="tempMaxThermo" onChange={(event) => setSpot_value(event.target.value)} icon={FiType} placeholder="Valor..." />
                </ConditionalContainerThreeFields>

                <SectionContainer>
                  <TitleSection>Outras informações</TitleSection>
                </SectionContainer>


                <Input name="title" onChange={(event) => setObs(event.target.value)} icon={FiType} placeholder="Observações gerais..." />

                <DivClosure>
                  <Input name="closureDate" onChange={(event) => setClosureDate(event.target.value)} icon={FiType} placeholder="Encerra em..." />
                </DivClosure>


                <ButtonsContainer>
                  <ButtonSaveLikaATemplate onClick={() => { setIsTemplate(true); }}>Salvar como template</ButtonSaveLikaATemplate>
                  <ButtonNextStep type="submit">Prosseguir</ButtonNextStep>
                </ButtonsContainer>

              </>
            )
              : (<></>)
            )}

            {/* RODOVIÁRIO NACIONAL FRACIONADO */}
            {roadOpened && (nacional && road && roadLess ? (
              <>
                <SectionContainer>
                  <TitleSection>Coleta e entrega</TitleSection>
                </SectionContainer>

                <DivRetiradaEntrega>
                  <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                  <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                  <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                  {/* Corrigir esse estado de salvamento abaixo */}
                  <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                  <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                </DivRetiradaEntrega>
                <DivRetiradaEntrega>
                  <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                  <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                  <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                  {/* Corrigir esse estado de salvamento abaixo */}
                  <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                  <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                </DivRetiradaEntrega>

                <SectionContainer>
                  <TitleSection>Peso e quantidade</TitleSection>
                </SectionContainer>
                <DivPesoQuantidade>
                  <Input
                    name="weightDinamic"
                    icon={FiType}
                    placeholder="Peso..."
                    onChange={(event) => setWeight(event.target.value)}
                  />
                  <Select
                    name="scaleInput"
                    OnChange={handleWeight}
                    placeholder="Escala..."
                    options={optionsWeight}
                  />
                </DivPesoQuantidade>

                <DivPesoQuantidade>
                  <Input name="country" onChange={(event) => setAmount(event.target.value)} icon={FiType} placeholder="Quantidade..." />
                  <Select OnChange={(data: any): void => setPackageLoad(data.label)} placeholder="Embalagem..." options={optionsPacking} />
                </DivPesoQuantidade>

                <SectionContainer>
                  <TitleSection>Dimensões e outros</TitleSection>
                </SectionContainer>
                <DivDimensoes>
                  <Input name="length2" onChange={(event) => setStackable(event.target.value)} icon={FiType} placeholder="É empilhável?" />
                  <Input name="length2" onChange={(event) => setLength(event.target.value)} icon={FiType} placeholder="Comprimento..." />
                  <Input name="width2" onChange={(event) => setWidth(event.target.value)} icon={FiType} placeholder="Largura..." />
                  <Input name="height2" onChange={(event) => setHeight(event.target.value)} icon={FiType} placeholder="Altura..." />
                  <div>
                    <Select OnChange={(data: any): void => setScaleDimensions(data.label)} placeholder="..." options={optionsMeasures} />
                  </div>
                </DivDimensoes>

                <SectionContainer>
                  <TitleSection>DGR e temperatura</TitleSection>
                </SectionContainer>
                <DivFlex>
                  <Select OnChange={handleDgr} placeholder="DGR..." options={optionsDgr} />
                  <Select OnChange={(data: any): void => setDgrClassSave(data.label)} placeholder="Classe..." options={optionsDgrClass} />
                  <Select OnChange={(data: any): void => setDgrUnSave(data.label)} placeholder="UN#..." options={optionsDgrUn} />
                </DivFlex>

                <DivFlex>
                  <Select OnChange={handleThermo} placeholder="Térmico..." options={optionsThermo} />
                  <Input name="tempMinThermo" onChange={(event) => setTempMin(event.target.value)} icon={FiType} placeholder="Temperatura mínima (ºC)..." />
                  <Input name="tempMaxThermo" onChange={(event) => setTempMax(event.target.value)} icon={FiType} placeholder="Temperatura máxima (ºC)..." />
                </DivFlex>

                <SectionContainer>
                  <TitleSection>Mercadoria e valor</TitleSection>
                </SectionContainer>
                <ConditionalContainerThreeFields>
                  <Input name="tempMinThermo" onChange={(event) => setLoadDescription(event.target.value)} icon={FiType} placeholder="Descrição da mercadoria..." />
                  <Input name="tempMaxThermo" onChange={(event) => setSpot_value(event.target.value)} icon={FiType} placeholder="Valor..." />
                </ConditionalContainerThreeFields>

                <SectionContainer>
                  <TitleSection>Outras informações</TitleSection>
                </SectionContainer>


                <Input name="title" onChange={(event) => setObs(event.target.value)} icon={FiType} placeholder="Observações gerais..." />

                <DivClosure>
                  <Input name="closureDate" onChange={(event) => setClosureDate(event.target.value)} icon={FiType} placeholder="Encerra em..." />
                </DivClosure>


                <ButtonsContainer>
                  <ButtonSaveLikaATemplate onClick={() => { setIsTemplate(true); }}>Salvar como template</ButtonSaveLikaATemplate>
                  <ButtonNextStep type="submit">Prosseguir</ButtonNextStep>
                </ButtonsContainer>

              </>
            )
              : (<></>)
            )}

            {/* RODOVIÁRIO INTERNACIONAL LOTAÇÃO */}
            {roadOpened && (internacional && road && roadFull ? (
              <>
                <SectionContainer>
                  <TitleSection>Incoterm e cidade de cruzamento</TitleSection>
                </SectionContainer>
                <ConditionalContainerTwoFields>
                  <Select OnChange={handleIncoterm} placeholder="Selecione o Incoterm..." options={optionsIncoterm} />
                  <Input name="tempMaxThermo" onChange={(event) => setCruzeCity(event.target.value)} icon={FiType} placeholder="Cidade de cruzamento..." />
                </ConditionalContainerTwoFields>

                {incotermOpened && (incoterm && importation && yyy ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>

                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Estação origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Estação destino..." />
                    </ConditionalContainerThreeFields>
                    <DivRetiradaEntrega>
                      <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                      <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                      <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (incoterm && importation && nyy ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Estação origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Estação destino..." />
                    </ConditionalContainerThreeFields>
                    <DivRetiradaEntrega>
                      <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                      <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                      <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>

                    </>
                  )
                )}

                {incotermOpened && (exportation && nnn ? (
                  <>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (exportation && ynn ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (exportation && yyn ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Estação origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Estação destino..." />
                    </ConditionalContainerThreeFields>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (exportation && yyy ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>

                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Estação origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Estação destino..." />
                    </ConditionalContainerThreeFields>
                    <DivRetiradaEntrega>
                      <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                      <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                      <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                <SectionContainer>
                  <TitleSection>Peso e quantidade</TitleSection>
                </SectionContainer>
                <DivPesoQuantidade>
                  <Input
                    name="weightDinamic"
                    icon={FiType}
                    placeholder="Peso..."
                    onChange={(event) => setWeight(event.target.value)}
                  />
                  <Select
                    name="scaleInput"
                    OnChange={handleWeight}
                    placeholder="Escala..."
                    options={optionsWeight}
                  />
                </DivPesoQuantidade>

                <DivPesoQuantidade>
                  <Input name="country" onChange={(event) => setAmount(event.target.value)} icon={FiType} placeholder="Quantidade..." />
                  <Select OnChange={(data: any): void => setPackageLoad(data.label)} placeholder="Embalagem..." options={optionsPacking} />
                </DivPesoQuantidade>

                <SectionContainer>
                  <TitleSection>Dimensões e outros</TitleSection>
                </SectionContainer>
                <DivDimensoes>
                  <Input name="length2" onChange={(event) => setStackable(event.target.value)} icon={FiType} placeholder="É empilhável?" />
                  <Input name="length2" onChange={(event) => setLength(event.target.value)} icon={FiType} placeholder="Comprimento..." />
                  <Input name="width2" onChange={(event) => setWidth(event.target.value)} icon={FiType} placeholder="Largura..." />
                  <Input name="height2" onChange={(event) => setHeight(event.target.value)} icon={FiType} placeholder="Altura..." />
                  <div>
                    <Select OnChange={(data: any): void => setScaleDimensions(data.label)} placeholder="..." options={optionsMeasures} />
                  </div>
                </DivDimensoes>

                <SectionContainer>
                  <TitleSection>DGR e temperatura</TitleSection>
                </SectionContainer>
                <DivFlex>
                  <Select OnChange={handleDgr} placeholder="DGR..." options={optionsDgr} />
                  <Select OnChange={(data: any): void => setDgrClassSave(data.label)} placeholder="Classe..." options={optionsDgrClass} />
                  <Select OnChange={(data: any): void => setDgrUnSave(data.label)} placeholder="UN#..." options={optionsDgrUn} />
                </DivFlex>

                <DivFlex>
                  <Select OnChange={handleThermo} placeholder="Térmico..." options={optionsThermo} />
                  <Input name="tempMinThermo" onChange={(event) => setTempMin(event.target.value)} icon={FiType} placeholder="Temperatura mínima (ºC)..." />
                  <Input name="tempMaxThermo" onChange={(event) => setTempMax(event.target.value)} icon={FiType} placeholder="Temperatura máxima (ºC)..." />
                </DivFlex>

                <SectionContainer>
                  <TitleSection>Mercadoria e valor</TitleSection>
                </SectionContainer>
                <ConditionalContainerThreeFields>
                  <Input name="tempMinThermo" onChange={(event) => setLoadDescription(event.target.value)} icon={FiType} placeholder="Descrição da mercadoria..." />
                  <Input name="tempMaxThermo" onChange={(event) => setSpot_value(event.target.value)} icon={FiType} placeholder="Valor..." />
                </ConditionalContainerThreeFields>

                <SectionContainer>
                  <TitleSection>Outras informações</TitleSection>
                </SectionContainer>

                <Input name="title" onChange={(event) => setObs(event.target.value)} icon={FiType} placeholder="Observações gerais..." />

                <DivClosure>
                  <Input name="closureDate" onChange={(event) => setClosureDate(event.target.value)} icon={FiType} placeholder="Encerra em..." />
                </DivClosure>


                <ButtonsContainer>
                  <ButtonSaveLikaATemplate onClick={() => { setIsTemplate(true); }}>Salvar como template</ButtonSaveLikaATemplate>
                  <ButtonNextStep type="submit">Prosseguir</ButtonNextStep>
                </ButtonsContainer>

              </>
            )
              : (<></>)
            )}

            {/* RODOVIÁRIO INTERNACIONAL FRANCIONADO */}
            {roadOpened && (internacional && road && roadLess ? (
              <>
                <SectionContainer>
                  <TitleSection>Incoterm</TitleSection>
                </SectionContainer>

                <ConditionalContainerTwoFields>
                  <Select OnChange={handleIncoterm} placeholder="Selecione o Incoterm..." options={optionsIncoterm} />
                </ConditionalContainerTwoFields>

                {incotermOpened && (incoterm && importation && yyy ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>

                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Estação origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Estação destino..." />
                    </ConditionalContainerThreeFields>
                    <DivRetiradaEntrega>
                      <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                      <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                      <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (incoterm && importation && nyy ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Estação origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Estação destino..." />
                    </ConditionalContainerThreeFields>
                    <DivRetiradaEntrega>
                      <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                      <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                      <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>

                    </>
                  )
                )}

                {incotermOpened && (exportation && nnn ? (
                  <>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (exportation && ynn ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (exportation && yyn ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>

                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Estação origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Estação destino..." />
                    </ConditionalContainerThreeFields>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (exportation && yyy ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>

                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Estação origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Estação destino..." />
                    </ConditionalContainerThreeFields>
                    <DivRetiradaEntrega>
                      <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                      <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                      <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                <SectionContainer>
                  <TitleSection>Peso e quantidade</TitleSection>
                </SectionContainer>
                <DivPesoQuantidade>
                  <Input
                    name="weightDinamic"
                    icon={FiType}
                    placeholder="Peso..."
                    onChange={(event) => setWeight(event.target.value)}
                  />
                  <Select
                    name="scaleInput"
                    OnChange={handleWeight}
                    placeholder="Escala..."
                    options={optionsWeight}
                  />
                </DivPesoQuantidade>

                <DivPesoQuantidade>
                  <Input name="country" onChange={(event) => setAmount(event.target.value)} icon={FiType} placeholder="Quantidade..." />
                  <Select OnChange={(data: any): void => setPackageLoad(data.label)} placeholder="Embalagem..." options={optionsPacking} />
                </DivPesoQuantidade>
                {/* <DivPesoQuantidade>
                  <Select OnChange={() => {}} placeholder="Empilhável..." options={optionsConfirmation} />
                </DivPesoQuantidade> */}

                <SectionContainer>
                  <TitleSection>Dimensões e outros</TitleSection>
                </SectionContainer>
                <DivDimensoes>
                  <Input name="length2" onChange={(event) => setStackable(event.target.value)} icon={FiType} placeholder="É empilhável?" />
                  <Input name="length2" onChange={(event) => setLength(event.target.value)} icon={FiType} placeholder="Comprimento..." />
                  <Input name="width2" onChange={(event) => setWidth(event.target.value)} icon={FiType} placeholder="Largura..." />
                  <Input name="height2" onChange={(event) => setHeight(event.target.value)} icon={FiType} placeholder="Altura..." />
                  <div>
                    <Select OnChange={(data: any): void => setScaleDimensions(data.label)} placeholder="..." options={optionsMeasures} />
                  </div>
                </DivDimensoes>

                <SectionContainer>
                  <TitleSection>DGR e temperatura</TitleSection>
                </SectionContainer>
                <DivFlex>
                  <Select OnChange={handleDgr} placeholder="DGR..." options={optionsDgr} />
                  <Select OnChange={(data: any): void => setDgrClassSave(data.label)} placeholder="Classe..." options={optionsDgrClass} />
                  <Select OnChange={(data: any): void => setDgrUnSave(data.label)} placeholder="UN#..." options={optionsDgrUn} />
                </DivFlex>

                <DivFlex>
                  <Select OnChange={handleThermo} placeholder="Térmico..." options={optionsThermo} />
                  <Input name="tempMinThermo" onChange={(event) => setTempMin(event.target.value)} icon={FiType} placeholder="Temperatura mínima (ºC)..." />
                  <Input name="tempMaxThermo" onChange={(event) => setTempMax(event.target.value)} icon={FiType} placeholder="Temperatura máxima (ºC)..." />
                </DivFlex>

                <SectionContainer>
                  <TitleSection>Mercadoria e valor</TitleSection>
                </SectionContainer>
                <ConditionalContainerThreeFields>
                  <Input name="tempMinThermo" onChange={(event) => setLoadDescription(event.target.value)} icon={FiType} placeholder="Descrição da mercadoria..." />
                  <Input name="tempMaxThermo" onChange={(event) => setSpot_value(event.target.value)} icon={FiType} placeholder="Valor..." />
                </ConditionalContainerThreeFields>

                <SectionContainer>
                  <TitleSection>Outras informações</TitleSection>
                </SectionContainer>


                <Input name="title" onChange={(event) => setObs(event.target.value)} icon={FiType} placeholder="Observações gerais..." />

                <DivClosure>
                  <Input name="closureDate" onChange={(event) => setClosureDate(event.target.value)} icon={FiType} placeholder="Encerra em..." />
                </DivClosure>


                <ButtonsContainer>
                  <ButtonSaveLikaATemplate onClick={() => { setIsTemplate(true); }}>Salvar como template</ButtonSaveLikaATemplate>
                  <ButtonNextStep type="submit">Prosseguir</ButtonNextStep>
                </ButtonsContainer>

              </>
            )
              : (<></>)
            )}

            {/* MARÍTIMO INTERNACIONAL */}
            {maritimeOpened && (internacional && maritime ? (
              <>

                {incotermOpened && (incoterm && importation && yyy ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>

                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Porto origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Porto destino..." />
                    </ConditionalContainerThreeFields>
                    <DivRetiradaEntrega>
                      <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                      <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                      <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (incoterm && importation && nyy ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Porto origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Porto destino..." />
                    </ConditionalContainerThreeFields>
                    <DivRetiradaEntrega>
                      <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                      <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                      <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>

                    </>
                  )
                )}

                {incotermOpened && (exportation && nnn ? (
                  <>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (exportation && ynn ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (exportation && yyn ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>

                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Porto origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Porto destino..." />
                    </ConditionalContainerThreeFields>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}

                {incotermOpened && (exportation && yyy ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Coleta e entrega (t)</TitleSection>
                    </SectionContainer>
                    <DivRetiradaEntrega>
                      <Input name="collectionShipper" onChange={(event) => setPickupLocation(event.target.value)} icon={FiType} placeholder="Local de coleta..." />
                      <Input name="collectionAddress" onChange={(event) => setPickupAdress(event.target.value)} icon={FiType} placeholder="Endereço coleta..." />
                      <Input name="collectionCEP" onChange={(event) => setPickupZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="collectionCityAndState" onChange={(event) => setPickupCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="collectionCountry" onChange={(event) => setPickupCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>

                    <ConditionalContainerThreeFields>
                      <Input name="airportOrigin" onChange={(event) => setPlaceOrigin(event.target.value)} icon={FiType} placeholder="Porto origem..." />
                      <Input name="airportDestination" onChange={(event) => setPlaceDestination(event.target.value)} icon={FiType} placeholder="Porto destino..." />
                    </ConditionalContainerThreeFields>
                    <DivRetiradaEntrega>
                      <Input name="deliveryShipper" onChange={(event) => setDeliveryLocation(event.target.value)} icon={FiType} placeholder="Local de entrega..." />
                      <Input name="deliveryAddress" onChange={(event) => setDeliveryAdress(event.target.value)} icon={FiType} placeholder="Endereço entrega..." />
                      <Input name="deliveryCEP" onChange={(event) => setDeliveryZip(event.target.value)} icon={FiType} placeholder="CEP..." />
                      {/* Corrigir esse estado de salvamento abaixo */}
                      <Input name="deliveryCityAndState" onChange={(event) => setDeliveryCityState(event.target.value)} icon={FiType} placeholder="Cidade e estado..." />
                      <Input name="deliveryCountry" onChange={(event) => setDeliveryCountry(event.target.value)} icon={FiType} placeholder="País..." />
                    </DivRetiradaEntrega>
                  </>
                )
                  : (
                    <>
                    </>
                  )
                )}


                <SectionContainer>
                  <TitleSection>DGR</TitleSection>
                </SectionContainer>
                <DivFlex>
                  <Select OnChange={handleDgr} placeholder="DGR..." options={optionsDgr} />
                  <Select OnChange={(data: any): void => setDgrClassSave(data.label)} placeholder="Classe..." options={optionsDgrClass} />
                  <Select OnChange={(data: any): void => setDgrUnSave(data.label)} placeholder="UN#..." options={optionsDgrUn} />
                </DivFlex>

                <SectionContainer>
                  <TitleSection>Mercadoria e valor</TitleSection>
                </SectionContainer>
                <ConditionalContainerThreeFields>
                  <Input name="tempMinThermo" onChange={(event) => setLoadDescription(event.target.value)} icon={FiType} placeholder="Descrição da mercadoria..." />
                  <Input name="tempMaxThermo" onChange={(event) => setSpot_value(event.target.value)} icon={FiType} placeholder="Valor..." />
                </ConditionalContainerThreeFields>

                <SectionContainer>
                  <TitleSection>Tipo de carga</TitleSection>
                </SectionContainer>
                <ConditionalContainerTwoFields>
                  <Select
                    OnChange={handleTypeLoad}
                    placeholder="Selecione o tipo de carga..."
                    options={optionsLoad}
                  />
                  {typeContainerOpened && (typeLoad ? (
                    <Select
                      OnChange={handleTypeContainer}
                      placeholder="Selecione o tipo do container..."
                      options={optionsContainerFcl}
                    />
                  )
                    : (
                      <>
                      </>
                    )
                  )}
                </ConditionalContainerTwoFields>

                {dimensionsOpened && (weightQuantityOpened ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Peso e quantidade</TitleSection>
                    </SectionContainer>
                    <DivPesoQuantidade>
                      <Input
                        name="weightDinamic"
                        icon={FiType}
                        placeholder="Peso..."
                        onChange={(event) => setWeight(event.target.value)}
                      />
                      <Select
                        name="scaleInput"
                        OnChange={handleWeight}
                        placeholder="Escala..."
                        options={optionsWeight}
                      />
                    </DivPesoQuantidade>

                    <DivPesoQuantidade>
                      <Input name="country" onChange={(event) => setAmount(event.target.value)} icon={FiType} placeholder="Quantidade..." />
                      <Select OnChange={(data: any): void => setPackageLoad(data.label)} placeholder="Embalagem..." options={optionsPacking} />
                    </DivPesoQuantidade>
                    {/* <DivPesoQuantidade>
                      <Select OnChange={() => {}} placeholder="Empilhável..." options={optionsConfirmation} />
                    </DivPesoQuantidade> */}
                  </>
                )
                  : (
                    <>
                    </>
                  ))}

                {dimensionsOpened ? (
                  <>
                    <SectionContainer>
                      <TitleSection>Dimensões</TitleSection>
                    </SectionContainer>
                    <DivDimensoes>
                      <Input name="length2" onChange={(event) => setStackable(event.target.value)} icon={FiType} placeholder="É empilhável?" />
                      <Input name="length2" onChange={(event) => setLength(event.target.value)} icon={FiType} placeholder="Comprimento..." />
                      <Input name="width2" onChange={(event) => setWidth(event.target.value)} icon={FiType} placeholder="Largura..." />
                      <Input name="height2" onChange={(event) => setHeight(event.target.value)} icon={FiType} placeholder="Altura..." />
                      <div>
                        <Select OnChange={(data: any): void => setScaleDimensions(data.label)} placeholder="..." options={optionsMeasures} />
                      </div>
                    </DivDimensoes>
                  </>
                )
                  : (
                    <>
                    </>
                  )}

                {thermo ? (
                  <ConditionalContainerThreeFields>
                    <Input name="tempMinThermo" onChange={(event) => setTempMin(event.target.value)} icon={FiType} placeholder="Temperatura mínima (ºC)..." />
                    <Input name="tempMaxThermo" onChange={(event) => setTempMax(event.target.value)} icon={FiType} placeholder="Temperatura máxima (ºC)..." />
                    <Input name="quantity" onChange={(event) => setAmount(event.target.value)} icon={FiType} placeholder="Quantidade..." />
                  </ConditionalContainerThreeFields>
                )
                  : (
                    <>
                    </>
                  )}

                <SectionContainer>
                  <TitleSection>Outras informações</TitleSection>
                </SectionContainer>


                <Input name="title" onChange={(event) => setObs(event.target.value)} icon={FiType} placeholder="Observações gerais..." />

                <DivClosure>
                  <Input name="closureDate" onChange={(event) => setClosureDate(event.target.value)} icon={FiType} placeholder="Encerra em..." />
                </DivClosure>

                <ButtonsContainer>
                  <ButtonSaveLikaATemplate onClick={() => { setIsTemplate(true); }}>Salvar como template</ButtonSaveLikaATemplate>
                  <ButtonNextStep type="submit">Prosseguir</ButtonNextStep>
                </ButtonsContainer>


              </>
            )
              : (<></>)
            )}


          </Form>

        </Content>

      </Container>
    </>
  );
};


export default NewSpotProvisional;
