import React, { useRef, useCallback, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { FiType, FiTrash2, FiX } from 'react-icons/fi';


import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useToast } from '../../../hooks/toast';


// Picker
import Select from '../../../components/Select';
import SelectINCOTERM from '../../../components/Select';

import 'react-day-picker/lib/style.css';

import Input from '../../../components/input';
import Button from '../../../components/button';


import {
  Container, Content, TitleContainer, Title, SectionContainer, TitleSection, ButtonsContainer, ButtonSaveLikaATemplate, ButtonNextStep, ConditionalContainer, ConditionalContainerTwoFields, ConditionalContainerThreeFields, DivFlex, DivFlexTwo, DivRetiradaEntrega, DivPesoQuantidade, DivDimensoes, DivDescription,
} from './styles';

interface Weight {
  weight: string;
  scale: string;
}


const NewSpot: React.FC = () => {
  const history = useHistory();

  // Controle de ABERTURA de componentes, na sua maioria Picker's
  const [modalOpened, setModalOpened] = useState(false);
  const [flowOpened, setFlowOpened] = useState(false);
  const [loadOpened, setLoadOpened] = useState(false);
  const [typeContainerOpened, setTypeContainerOpened] = useState(false);
  const [detailsContainerOpened, setDetailsContainerOpened] = useState(false);
  const [dgrOpened, setDgrOpened] = useState(false);
  const [dgrInfoOpened, setDgrInfoOpened] = useState(false);
  const [serviceLevelOpened, setServiceLevelOpened] = useState(false);
  const [thermoOpened, setThermoOpened] = useState(false);
  const [thermoInfoOpened, setThermoInfoOpened] = useState(false);
  const [incotermOpened, setIncotermOpened] = useState(false);
  const [incotermInfoOpened, setIncotermInfoOpened] = useState(false);
  const [weightQuantityOpened, setWeightQuantityOpened] = useState(false);
  const [dimensionsOpened, setDimensionsOpened] = useState(false);

  // Controle de SELEÇÃO DE ITENS dos componentes, na sua maioria Picker's
  const [type, setType] = useState(true);
  const [modal, setModal] = useState(true);
  const [typeLoad, setTypeLoad] = useState(true);
  const [typeContainer, setTypeContainer] = useState(true);
  const [dgr, setDgr] = useState(true);
  const [thermo, setThermo] = useState(true);
  const [incoterm, setIncoterm] = useState(true);

  // Adicionar mais de uma propriedade a uma mesma cotação
  const [tempWeights, setTempWeights] = useState('');
  const [weights, setWeights] = useState<Weight[]>([]);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  // Opções dos diferentes Picker's
  const optionsType = [
    { label: 'Nacional', value: 'Nacional' },
    { label: 'Internacional', value: 'Internacional' },
  ];
  const optionsModalInternacional = [
    { label: 'Aéreo', value: 'Aéreo' },
    { label: 'Marítimo', value: 'Marítimo' },
    { label: 'Rodoviário', value: 'Rodoviário' },
  ];
  const optionsModalNacional = [
    { label: 'Aéreo', value: 'Aéreo' },
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

  // Função, em processo de criação, para salvar cotação como template
  const handleSaveLikeTemplate = useCallback(() => {
    addToast({
      type: 'sucess',
      title: 'Template salvo',
      description: 'Já salvamos essa cotação como um template, ok?',
    });
  }, [addToast]);

  // Manipula a alteração do TIPO
  const handleType = useCallback((data) => {
    // Abre o próximo item
    setModalOpened(true);

    // Carrega as opções desse item que será aberto de forma condicional, de acordo com a opção selecionada na anterior
    if (data.label === 'Nacional') {
      setType(true);
    } else if (data.label === 'Internacional') {
      setType(false);
    } else {
      addToast({
        type: 'error',
        title: 'Falha',
        description: 'Não consegui ler o tipo que você selecionou. Tenta de novo, por favor.',
      });
    }
  }, [addToast]);

  // Manipula a alteração do FLUXO
  const handleFlow = useCallback(() => {
    // Abre o próximo item
    setLoadOpened(true);
  }, []);

  // Manipula a alteração do MODAL
  const handleModal = useCallback((data) => {
    // Abre o próximo item
    setFlowOpened(true);
    // setDetailsContainerOpened(false);

    if (data.label === 'Aéreo') {
      setModal(true);
      setServiceLevelOpened(true);
      setThermoOpened(true);
      setLoadOpened(true);
      //   if (loadOpened === true) {
      //     setDgrInfoOpened(true);
      //   }
      setDetailsContainerOpened(false);
      setTypeContainerOpened(false);
      // setDgrInfoOpened(false);
    } else if (data.label === 'Rodoviário') {
      setModal(true);
      setLoadOpened(false);
      setDetailsContainerOpened(false);
      setTypeContainerOpened(false);
      setDgrInfoOpened(false);
    } else if (data.label === 'Marítimo') {
      setModal(false);
      setThermoOpened(false);
      setServiceLevelOpened(false);
      setDimensionsOpened(false);
      if (flowOpened === true) {
        setLoadOpened(true);
      }
    } else {
      addToast({
        type: 'error',
        title: 'Falha',
        description: 'Não consegui ler o modal que você selecionou. Tenta de novo, por favor.',
      });
    }
  }, [addToast, flowOpened]);

  // Manipula o TIPO DE CARGA
  const handleTypeLoad = useCallback((data) => {
    // Abre o próximo item
    setTypeContainerOpened(true);
    setDetailsContainerOpened(false);
    // Carrega as opções desse item que será aberto de forma condicional, de acordo com a opção selecionada na anterior
    if (data.label === 'FCL') {
      setTypeLoad(true);
      setDimensionsOpened(false);
    } else if (data.label === 'LCL') {
      setTypeLoad(false);
      setDimensionsOpened(true);
      setIncotermOpened(true);
    } else {
      addToast({
        type: 'error',
        title: 'Falha',
        description: 'Não consegui ler a opção que você selecionou. Tenta de novo, por favor.',
      });
    }
  }, [addToast]);

  // Manipula a alteração do TIPO DE CONTAINER
  const handleTypeContainer = useCallback((data) => {
    // Abre o próximo item
    setDetailsContainerOpened(true);

    if (data.label === '20\' Reefer' || data.label === '40\' Reefer') {
      setTypeContainer(true);
      setIncotermOpened(true);
    } else if (data.label === '20\' Flat Rack' || data.label === '40\' Flat Rack' || data.label === '20\' Open Top' || data.label === '40\' Open Top' || data.label === 'Plataforma' || data.label === 'Maffi') {
      setTypeContainer(false);
      setIncotermOpened(true);
    } else {
      setDetailsContainerOpened(false);
    }
  }, []);

  // Manipula a alteração do DGR
  const handleDgr = useCallback((data) => {
    // Abre o próximo item
    setDgrOpened(true);
    setDgrInfoOpened(true);

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
  }, [addToast]);

  // Manipula a alteração do NÍVEL DE SERIÇO (aéreo)
  const handleServiceLevel = useCallback((data) => {
    // Abre o próximo item
    setLoadOpened(true);
    setIncotermOpened(true);

    // Carrega as opções desse item que será aberto de forma condicional, de acordo com a opção selecionada na anterior
  }, []);

  const handleThermo = useCallback((data) => {
    // Abre o próximo item
    setThermoInfoOpened(true);

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
  }, [addToast]);

  const handleIncoterm = useCallback((data) => {
    // Abre o próximo item
    setIncotermInfoOpened(true);
    setWeightQuantityOpened(true);
    setDimensionsOpened(true);

    // Carrega as opções desse item que será aberto de forma condicional, de acordo com a opção selecionada na anterior
    if (data.label === 'EXW' || data.label === 'FCA' || data.label === 'FAS') {
      setIncoterm(true);
    } else if (data.label === 'FOB' || data.label === 'CRB' || data.label === 'CIF' || data.label === 'CPT' || data.label === 'CIP' || data.label === 'DAP' || data.label === 'DPU' || data.label === 'DDP') {
      setIncoterm(false);
    } else {
      addToast({
        type: 'error',
        title: 'Falha',
        description: 'Não consegui ler a opção que você selecionou. Tenta de novo, por favor.',
      });
    }
  }, [addToast]);

  const handleWeight = useCallback((data) => {
    const transportData = { weight: tempWeights, scale: data.value };

    console.log(weights);

    setWeights([...weights, transportData]);
  }, [weights, tempWeights]);
  return (
    <>
      <Container>

        <Content>

          <TitleContainer>
            <Title onClick={() => history.push('/home')}>Criando nova cotação</Title>
          </TitleContainer>


          <Form ref={formRef} onSubmit={() => {}}>

            <SectionContainer>
              <TitleSection>Detalhes da carga</TitleSection>
            </SectionContainer>

            <DivDescription>
              <Input name="title" icon={FiType} placeholder="Título da cotação..." />
            </DivDescription>
            <div>
              <ConditionalContainerTwoFields>
                <Select
                  OnChange={handleType}
                  placeholder="Selecione o tipo..."
                  options={optionsType}
                />

                {/* ******* CONTAINER CONDICIONAL: modal ******* */}
                {modalOpened && (type ? <Select OnChange={handleModal} placeholder="Selecione o modal..." options={optionsModalNacional} /> : <Select OnChange={handleModal} placeholder="Selecione o modal..." options={optionsModalInternacional} />)}
              </ConditionalContainerTwoFields>

            </div>

            {/* ******* CONTAINER CONDICIONAL: fluxo ******* */}
            {flowOpened ? (
              <ConditionalContainerTwoFields>
                <Select OnChange={handleFlow} placeholder="Selecione o fluxo..." options={optionsFlow} />
                <Input name="load" icon={FiType} placeholder="Descreva a mercadoria..." />
              </ConditionalContainerTwoFields>
            ) : <></>}


            {/* ******* CONTAINER CONDICIONAL: DGR ******* */}
            {loadOpened ? (
              <DivFlex>
                <Select OnChange={handleDgr} placeholder="DGR..." options={optionsDgr} />
                {dgrInfoOpened && (dgr ? (
                  <>
                    <Select OnChange={() => {}} isMulti placeholder="Classe..." options={optionsDgrClass} />
                    <Select OnChange={() => {}} isMulti placeholder="UN#..." options={optionsDgrUn} />
                  </>
                )
                  : <></>
                )}
              </DivFlex>
            ) : <></>}

            {/* ******* CONTAINER CONDICIONAL: mercadoria térmica ******* */}
            {thermoOpened ? (
              <DivFlex>
                <Select OnChange={handleThermo} placeholder="Térmico..." options={optionsThermo} />
                {thermoInfoOpened && (thermo ? (
                  <>
                    <Input name="tempMinThermo" icon={FiType} placeholder="Temperatura mínima (ºC)..." />
                    <Input name="tempMaxThermo" icon={FiType} placeholder="Temperatura máxima (ºC)..." />
                  </>
                )
                  : <></>
                )}
              </DivFlex>
            ) : <></>}

            {/* ******* CONTAINER CONDICIONAL: nível de serviço (aéreo) ******* */}
            <ConditionalContainerTwoFields>
              {serviceLevelOpened ? <Select OnChange={handleServiceLevel} placeholder="Nível de serviço..." options={optionsServiceLevel} /> : <></>}
            </ConditionalContainerTwoFields>

            {/* ******* CONTAINER CONDICIONAL: incoterm ******* */}
            <ConditionalContainer>
              {incotermOpened ? (
                <>
                  <SectionContainer>
                    <TitleSection>Incoterm</TitleSection>
                  </SectionContainer>
                  <ConditionalContainerTwoFields>
                    <Select OnChange={handleIncoterm} placeholder="Selecione o Incoterm..." options={optionsIncoterm} />
                  </ConditionalContainerTwoFields>
                </>
              ) : <></>}
              {incotermInfoOpened && (incoterm ? (
                <>
                  <SectionContainer>
                    <TitleSection>Coleta e entrega</TitleSection>
                  </SectionContainer>
                  <DivRetiradaEntrega>
                    <Input name="shipper" icon={FiType} placeholder="Local de coleta..." />
                    <Input name="collectionAddress" icon={FiType} placeholder="Endereço coleta..." />
                    <Input name="collectionCEP" icon={FiType} placeholder="CEP..." />
                    <Input name="cityAndState" icon={FiType} placeholder="Cidade e estado..." />
                    <Input name="country" icon={FiType} placeholder="País..." />
                  </DivRetiradaEntrega>

                  <DivRetiradaEntrega>
                    <Input name="airportOrigin" icon={FiType} placeholder="Aeroporto origem..." />
                    <Input name="airportDestination" icon={FiType} placeholder="Aeroporto destino..." />
                  </DivRetiradaEntrega>
                  <DivRetiradaEntrega>
                    <Input name="shipper" icon={FiType} placeholder="Local de entrega..." />
                    <Input name="collectionAddress" icon={FiType} placeholder="Endereço entrega..." />
                    <Input name="collectionCEP" icon={FiType} placeholder="CEP..." />
                    <Input name="cityAndState" icon={FiType} placeholder="Cidade e estado..." />
                    <Input name="country" icon={FiType} placeholder="País..." />
                  </DivRetiradaEntrega>
                </>
              ) : (
                <>
                  <SectionContainer>
                    <TitleSection>Coleta e entrega</TitleSection>
                  </SectionContainer>
                  <DivRetiradaEntrega>
                    <Input name="airportOrigin" icon={FiType} placeholder="Aeroporto origem..." />
                    <Input name="airportDestination" icon={FiType} placeholder="Aeroporto destino..." />
                  </DivRetiradaEntrega>
                  <DivRetiradaEntrega>
                    <Input name="shipper" icon={FiType} placeholder="Local de entrega..." />
                    <Input name="collectionAddress" icon={FiType} placeholder="Endereço entrega..." />
                    <Input name="collectionCEP" icon={FiType} placeholder="CEP..." />
                    <Input name="cityAndState" icon={FiType} placeholder="Cidade e estado..." />
                    <Input name="country" icon={FiType} placeholder="País..." />
                  </DivRetiradaEntrega>
                </>
              ))}
            </ConditionalContainer>

            {/* ******* CONTAINER CONDICIONAL: peso e quantidade ******* */}
            <ConditionalContainer>
              {weightQuantityOpened ? (
                <>
                  <SectionContainer>
                    <TitleSection>Peso e quantidade</TitleSection>
                  </SectionContainer>
                  <DivPesoQuantidade>
                    <Input
                      name="weightDinamic"
                      icon={FiType}
                      placeholder="Peso..."
                      onChange={(event) => setTempWeights(event.target.value)}
                    />
                    <Select
                      name="scaleInput"
                      OnChange={handleWeight}
                      placeholder="Escala..."
                      options={optionsWeight}
                    />

                  </DivPesoQuantidade>
                  <ConditionalContainerTwoFields>
                    <ul>
                      {weights.map((weight) => (
                        <li>
                          {weight.weight}
                          {' '}
                          {weight.scale}
                          {' '}
                          <FiX style={{ color: '#820404' }} />
                        </li>
                      ))}
                    </ul>
                  </ConditionalContainerTwoFields>

                  <DivPesoQuantidade>
                    <Input name="country" icon={FiType} placeholder="Quantidade..." />
                    <Select OnChange={() => {}} placeholder="Embalagem..." options={optionsPacking} />
                  </DivPesoQuantidade>
                  <DivPesoQuantidade>
                    <Select OnChange={() => {}} placeholder="Empilhável..." options={optionsConfirmation} />
                  </DivPesoQuantidade>
                </>
              ) : <></>}
            </ConditionalContainer>

            {/* ******* CONTAINER CONDICIONAL: dimensões da carga ******* */}
            <ConditionalContainer>
              {dimensionsOpened ? (
                <>
                  <SectionContainer>
                    <TitleSection>Dimensões</TitleSection>
                  </SectionContainer>
                  <DivDimensoes>
                    <Input name="length2" icon={FiType} placeholder="Comprimento..." />
                    <Input name="width2" icon={FiType} placeholder="Largura..." />
                    <Input name="height2" icon={FiType} placeholder="Altura..." />
                    <div>
                      <Select OnChange={() => {}} placeholder="..." options={optionsMeasures} />
                    </div>
                  </DivDimensoes>
                </>
              ) : <></>}
            </ConditionalContainer>

            {/* ******* CONTAINER CONDICIONAL: tipo de carga ******* */}
            {dgrOpened && (modal ? <></> : (
              <>
                <SectionContainer>
                  <TitleSection>Tipo de carga</TitleSection>
                </SectionContainer>
                <ConditionalContainerTwoFields>
                  <Select OnChange={handleTypeLoad} placeholder="Selecione o tipo de carga..." options={optionsLoad} />
                  {typeContainerOpened && (typeLoad ? <Select OnChange={handleTypeContainer} placeholder="Selecione o tipo do container..." options={optionsContainerFcl} /> : (
                    // Os campos abaixo estão temporariamente desativados, porque esses dados estão sendo informados acima
                    // <div>
                    //   <Input name="weight" icon={FiType} placeholder="Peso..." />
                    //   <Input name="length" icon={FiType} placeholder="Comprimento..." />
                    //   <Input name="width" icon={FiType} placeholder="Largura..." />
                    //   <Input name="height" icon={FiType} placeholder="Altura..." />
                    //   <Input name="quantity" icon={FiType} placeholder="Quantidade..." />
                    // </div>
                    <></>
                  ))}
                </ConditionalContainerTwoFields>
              </>
            ))}

            {/* ******* CONTAINER CONDICIONAL: tipo de carga: REEFER ou COM DIMENSÕES ALTERADAS ******* */}
            {detailsContainerOpened && (typeContainer ? (
              <ConditionalContainerThreeFields>
                <Input name="tempMin" icon={FiType} placeholder="Temperatura mínima (ºC)..." />
                <Input name="tempMax" icon={FiType} placeholder="Temperatura máxima (ºC)..." />
                <Input name="quantity" icon={FiType} placeholder="Quantidade..." />
              </ConditionalContainerThreeFields>
            ) : (
              <DivDimensoes>
                <Input name="length2" icon={FiType} placeholder="Comprimento..." />
                <Input name="width2" icon={FiType} placeholder="Largura..." />
                <Input name="height2" icon={FiType} placeholder="Altura..." />
                <div>
                  <Select OnChange={() => {}} placeholder="..." options={optionsMeasures} />
                </div>
              </DivDimensoes>
            ))}


            {/* <SectionContainer>
              <TitleSection>Seção</TitleSection>
            </SectionContainer>


            <Input name="title" icon={FiType} placeholder="Digite o item..." />


            <SectionContainer>
              <TitleSection>Outras informações</TitleSection>
            </SectionContainer>


            <Input name="title" icon={FiType} placeholder="Observações gerais..." />


            <ButtonsContainer>
              <ButtonSaveLikaATemplate onClick={handleSaveLikeTemplate}>Salvar como template</ButtonSaveLikaATemplate>
              <ButtonNextStep type="submit">Prosseguir</ButtonNextStep>
            </ButtonsContainer> */}

          </Form>

        </Content>

      </Container>
    </>
  );
};


export default NewSpot;
