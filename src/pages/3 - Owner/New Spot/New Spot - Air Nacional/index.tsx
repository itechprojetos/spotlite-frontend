import React, {
  useRef, useCallback, useState, ChangeEvent,
} from 'react';
import { useHistory } from 'react-router-dom';

import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiTrash2, FiXCircle } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { useToast } from '../../../../hooks/toast';
import { useAuth } from '../../../../hooks/auth';
import getValidationErrors from '../../../../utils/getValidationErrors';

import Select from '../../../../components/Select';
import Input from '../../../../components/InputCompose';
import InputLabel from '../../../../components/InputLabel';
import InputLabelCompose from '../../../../components/InputLabelCompose';
import InputLabelFull from '../../../../components/InputLabelFull';
import InputLabelDate from '../../../../components/InputLabelDate';
import InputFull from '../../../../components/InputFull';

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
  InputContainer,
  InputContainerTwo,
  TagInput,
  SelectContainer,
  SelectContainerDimensions,
  DivFlex,
  ButtonsContainer,
  ButtonSaveLikaATemplate,
  ButtonNextStep,
  InputLabelContainer,
  InputLabelContainerMargin,
  DinamicDataContainer,
  DinamicDataContent,
  DinamicDataItem,
  ButtonAddLoad,
} from './styles';

  interface SpotFormData {
      title: string;
      serviceLevel: string;
      insurance: string;
      pickupLocation: string;
      pickupAdress: string;
      pickupZip: string;
      pickupCityState: string;
      pickupCountry: string;
      airportOrigin: string;
      airportDestination: string;
      deliveryLocation: string;
      deliveryAdress: string;
      deliveryZip: string;
      deliveryCityState: string;
      deliveryCountry: string;
      weight: string;
      weight_scale: string;
      stackable: string;
      amount: string;
      pack: string;
      length: string;
      scale_dimensions: string;
      width: string;
      height: string;
      dgrClass: string;
      dgrUn: string;
      thermoMin: string;
      thermoMax: string;
      description: string;
      price: string;
      currency: string;
      obs: string;
      closureDateTime: Date;
  }

  interface DinamicInfo {
    weight: string;
    weight_scale: string;
    stackable: string;
    amount: string;
    pack: string;
    length: string;
    scale_dimensions: string;
    width: string;
    height: string;
    dgrClass: string;
    dgrUn: string;
    thermoMin: string;
    thermoMax: string;
    description: string;
    price: string;
    currency: string;
  }

const NewSpotAirNacional: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const formChargeRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [dinamicInformations, setDinamicInformations] = useState<any[]>([]);

  const optionsInsurance = [
    { label: 'Nenhum', value: 'Nenhum' },
    { label: 'Cliente', value: 'Cliente' },
    { label: 'Add valorem', value: 'Add valorem' },
  ];
  const optionsStackable = [
    { label: 'Empilhável', value: 'Empilhável' },
    { label: 'Não empilhável', value: 'Não empilhável' },
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
  const optionsCurrency = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'BRL', value: 'BRL' },
  ];

  // Submit do form (feito por meio de hooks do useState)
  const handleSubmit = useCallback(async (data: SpotFormData) => {
    try {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            title: Yup.string().required('Empresa obrigatório'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const {
            title,
            serviceLevel,
            insurance,
            pickupLocation,
            pickupAdress,
            pickupZip,
            pickupCityState,
            pickupCountry,
            airportOrigin,
            airportDestination,
            deliveryLocation,
            deliveryAdress,
            deliveryZip,
            deliveryCityState,
            deliveryCountry,
            weight,
            weight_scale,
            stackable,
            amount,
            pack,
            length,
            scale_dimensions,
            width,
            height,
            dgrClass,
            dgrUn,
            thermoMin,
            thermoMax,
            description,
            price,
            currency,
            obs,
            closureDateTime,
          } = data;

          const formData = {
            owner_company: user.company_id,
            owner_user: user.id,

            title,
            type: 'Nacional',
            modal: 'Aereo',
            flow: '',
            // load_type: loadType,
            // incoterm: incotermSave,

            load_description: description,
            insurance,

            pickup_location: pickupLocation,
            pickup_adress: pickupAdress,
            pickup_zip: pickupZip,
            pickup_city_state: pickupCityState,
            pickup_country: pickupCountry,

            place_origin: airportOrigin,
            place_destination: airportDestination,

            delivery_location: deliveryLocation,
            delivery_adress: deliveryAdress,
            delivery_zip: deliveryZip,
            delivery_city_state: deliveryCityState,
            delivery_country: deliveryCountry,

            weight,
            amount,
            package_load: pack,
            stackable,
            length,
            width,
            height,
            scale_weight: weight_scale,
            scale_dimensions,

            // dgr: dgrSave,
            class_dgr: dgrClass,
            un: dgrUn,

            // thermo: thermoSave,
            temp_min: thermoMin,
            temp_max: thermoMax,
            spot_value: price,
            spot_value_currency: currency,
            obs,
            closure_date: closureDateTime,
            closure_status: 'OPEN',
            // vehicle_type: vehicleType,
            // helper,
            // cruze_city: cruzeCity,
            // container_type: containerType,

            service_level: serviceLevel,

            status_description: 'Escolher provedores',
            template: '0',
          };
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
                  formRef.current?.setErrors(errors);

                  return;
      }
      addToast({
        type: 'error',
        title: 'Erro no prosseguimento!',
        description: 'Ocorreu um erro ao prosseguir com a sua solicitação. Revise os campos e tente novamente.',
      });
    }
  }, []);

  // Formatação instantânea no formato de MOEDA
  const handleCurrency = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    value = value.replace(/\D/g, '');

    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

    e.currentTarget.value = value;
  }, []);

  const handleAddInfo = async (data: DinamicInfo) => {
    try {
        formChargeRef.current?.setErrors({});

        const schema = Yup.object().shape({
          weight: Yup.string().required(),
          amount: Yup.string().required(),
          stackable: Yup.string().required(),
          length: Yup.string().required(),
          width: Yup.string().required(),
          height: Yup.string().required(),
          description: Yup.string().required(),
          price: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          weight,
          weight_scale,
          stackable,
          amount,
          pack,
          length,
          scale_dimensions,
          width,
          height,
          dgrClass,
          dgrUn,
          thermoMin,
          thermoMax,
          description,
          price,
          currency,
        } = data;

        const values = {
          id: uuid(), peso: weight, escala_peso: weight_scale, quantidade: amount, embalagem: pack, empilhavel: stackable, comprimento: length, escala_comprimento: scale_dimensions, largura: width, altura: height, classe: dgrClass, un: dgrUn, temp_min: thermoMin, temp_max: thermoMax, descricao: description, valor: price, moeda: currency,
        };

        setDinamicInformations([...dinamicInformations, values]);

        formChargeRef.current?.reset();

        formChargeRef.current?.getFieldRef('stackable').select.clearValue();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formChargeRef.current?.setErrors(errors);

        return;
      }
      addToast({
        type: 'error',
        title: 'Erro! tente novamente',
      });
    }
  };

  const handleRemoveInfo = (id: string): void => {
    const array = [...dinamicInformations];

    const index = array.map((item) => item.id).indexOf(id);

    array.splice(index, 1);

    setDinamicInformations(array);
  };

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
              <SpotTitle>Nacional</SpotTitle>
              <SpotPickup>Aéreo</SpotPickup>
              <SpotDelivery>--</SpotDelivery>
            </ItemsContainer>
          </ContainerHeaderSpecifications>


          <Form
            ref={formRef}
            onSubmit={handleSubmit}
          >

            <SectionContainer>
              <TitleSection>Título da cotação</TitleSection>
            </SectionContainer>

            <InputLabel autoComplete="off" id="1" name="title" label="Título" />

            <SectionContainer>
              <TitleSection>Serviço e seguro</TitleSection>
            </SectionContainer>

            <DivFlex>
              <InputContainerTwo>
                <TagInput>Nível de serviço</TagInput>
                <SelectContainer>
                  <Select
                    name="serviceLevel"
                    options={optionsServiceLevel}
                  />
                </SelectContainer>
              </InputContainerTwo>

              <InputContainerTwo>
                <TagInput>Seguro</TagInput>
                <SelectContainer>
                  <Select
                    name="insurance"
                    options={optionsInsurance}
                  />
                </SelectContainer>
              </InputContainerTwo>
            </DivFlex>

            <SectionContainer>
              <TitleSection>Coleta e entrega</TitleSection>
            </SectionContainer>

            <DivFlex
              style={{
                marginBottom: 10,
              }}
            >
              <InputLabel autoComplete="off" id="1" name="pickupLocation" label="Local coleta" />
              <InputLabel autoComplete="off" id="1" name="pickupAdress" label="Endereço coleta" />
              <InputLabel autoComplete="off" id="1" name="pickupZip" label="CEP" />
              <InputLabel autoComplete="off" id="1" name="pickupCityState" label="Cidade e estado" />
              <InputLabel autoComplete="off" id="1" name="pickupCountry" label="País" />
            </DivFlex>

            <DivFlex
              style={{
                marginBottom: 10,
              }}
            >
              <InputLabelContainerMargin>
                <InputLabel autoComplete="off" id="1" name="airportOrigin" label="Aeroporto origem" />
              </InputLabelContainerMargin>

              <InputLabelContainerMargin>
                <InputLabel autoComplete="off" id="1" name="airportDestination" label="Aeroporto destino" />
              </InputLabelContainerMargin>
            </DivFlex>

            <DivFlex>
              <InputLabel autoComplete="off" id="1" name="deliveryLocation" label="Local entrega" />
              <InputLabel autoComplete="off" id="1" name="deliveryAdress" label="Endereço entrega" />
              <InputLabel autoComplete="off" id="1" name="deliveryZip" label="CEP" />
              <InputLabel autoComplete="off" id="1" name="deliveryCityState" label="Cidade e estado" />
              <InputLabel autoComplete="off" id="1" name="deliveryCountry" label="País" />
            </DivFlex>

            <SectionContainer>
              <TitleSection>Outras informações</TitleSection>
            </SectionContainer>

            <DivFlex
              style={{
                marginBottom: 40,
              }}
            >
              <InputLabelContainer>
                <InputLabel autoComplete="off" id="1" name="obs" label="Observações" />
              </InputLabelContainer>

              <InputLabelContainer>
                <InputLabelDate autoComplete="off" id="1" name="closureDateTime" label="Encerramento" type="datetime-local" />
              </InputLabelContainer>


            </DivFlex>

          </Form>

          <Form
            ref={formChargeRef}
            onSubmit={handleAddInfo}
          >
            <SectionContainer>
              <TitleSection>Adicionar detalhes da carga</TitleSection>
            </SectionContainer>

            <DivFlex>
              <InputContainer>
                <SelectContainerDimensions>

                  <InputLabelCompose autoComplete="off" id="1" name="weight" label="Peso bruto" />

                  <Select
                    placeholder="..."
                    name="weight_scale"
                    options={optionsWeight}
                    defaultValue={optionsWeight[0]}
                  />

                </SelectContainerDimensions>
              </InputContainer>

              <InputContainer>
                <SelectContainerDimensions>
                  <InputLabelCompose autoComplete="off" id="1" name="amount" label="Quantidade" />

                  <Select
                    placeholder="..."
                    name="pack"
                    options={optionsPacking}
                    defaultValue={optionsPacking[0]}
                  />

                </SelectContainerDimensions>
              </InputContainer>

              <InputContainer>
                <SelectContainerDimensions>
                  <Select
                    name="stackable"
                    options={optionsStackable}
                  />
                </SelectContainerDimensions>
              </InputContainer>

            </DivFlex>

            <DivFlex>
              <InputContainer>
                <SelectContainerDimensions>

                  <InputLabelCompose autoComplete="off" id="1" name="length" label="Comprimento" />

                  <Select
                    placeholder="..."
                    name="scale_dimensions"
                    options={optionsMeasures}
                    defaultValue={optionsMeasures[0]}
                  />

                </SelectContainerDimensions>
              </InputContainer>

              <InputContainer>
                <SelectContainerDimensions>

                  <InputLabelFull autoComplete="off" id="1" name="width" label="Largura" />

                </SelectContainerDimensions>
              </InputContainer>

              <InputContainer>
                <SelectContainerDimensions>

                  <InputLabelFull autoComplete="off" id="1" name="height" label="Altura" />

                </SelectContainerDimensions>
              </InputContainer>
            </DivFlex>

            <DivFlex>
              <InputLabelContainerMargin>
                <InputLabel autoComplete="off" id="1" name="dgrClass" label="Classes" />
              </InputLabelContainerMargin>

              <InputLabelContainerMargin>
                <InputLabel autoComplete="off" id="1" name="dgrUn" label="UN#" />
              </InputLabelContainerMargin>
            </DivFlex>

            <DivFlex
              style={{
                marginTop: 20,
              }}
            >

              <InputLabelContainerMargin>
                <InputLabel autoComplete="off" id="1" name="thermoMin" label="Temperatura mínima (ºC)" />
              </InputLabelContainerMargin>

              <InputLabelContainerMargin>
                <InputLabel autoComplete="off" id="1" name="thermoMax" label="Temperatura máxima (ºC)" />
              </InputLabelContainerMargin>
            </DivFlex>

            <DivFlex>
              <InputLabelContainer>
                <InputLabel autoComplete="off" id="1" name="description" label="Descrição da mercadoria" />
              </InputLabelContainer>

              <InputContainerTwo style={{ marginTop: 16 }}>

                <SelectContainer>

                  <InputLabelCompose autoComplete="off" id="1" name="price" label="Valor" onKeyUp={handleCurrency} />

                  <Select
                    placeholder="Moeda"
                    name="currency"
                    options={optionsCurrency}
                    defaultValue={optionsCurrency[2]}
                  />

                </SelectContainer>
              </InputContainerTwo>

            </DivFlex>

            <ButtonAddLoad
            //   onClick={handleAddInfo}
              type="submit"
            >
              <FaPlus />
              Adicionar carga

            </ButtonAddLoad>

            <SectionContainer>
              <TitleSection>Cargas adicionadas</TitleSection>
            </SectionContainer>


            <DinamicDataContainer>
              {dinamicInformations.map((item) => (
                <DinamicDataContent
                  key={item.id}
                >

                  <FiTrash2
                    onClick={() => { handleRemoveInfo(item.id); }}
                  />

                  <DinamicDataItem>
                    <h1>Descrição:</h1>
                    <h2 style={{ color: '#5c677d', fontWeight: 900 }}>{item.descricao}</h2>
                  </DinamicDataItem>

                  <DinamicDataItem>
                    <h1>Valor:</h1>
                    <h2>
                      {item.valor}
                      {' '}
                      (
                      {item.moeda}
                      )
                    </h2>
                  </DinamicDataItem>

                  <DinamicDataItem>
                    <h1>Peso bruto:</h1>
                    <h2>
                      {item.peso}
                      {' '}
                      {item.escala_peso}
                    </h2>
                  </DinamicDataItem>

                  <DinamicDataItem>
                    <h1>Quantidade:</h1>
                    <h2>
                      {item.quantidade}
                      {' '}
                      {item.embalagem}
                    </h2>
                  </DinamicDataItem>

                  <DinamicDataItem>
                    <h1>Empilhável:</h1>
                    <h2>{item.empilhavel}</h2>
                  </DinamicDataItem>

                  <DinamicDataItem>
                    <h1>Dimensões:</h1>
                    <h2>
                      {item.comprimento}
                      {item.escala_comprimento}
                      {' '}
                      x
                      {' '}
                      {item.largura}
                      {item.escala_comprimento}
                      {' '}
                      x
                      {' '}
                      {item.altura}
                      {item.escala_comprimento}
                    </h2>
                  </DinamicDataItem>

                  {item.classe ? (
                    <DinamicDataItem>
                      <h1>DGR</h1>
                      <h2>
                        Classes:
                        {' '}
                        {item.classe}
                        {' '}
                        |
                        {' '}
                        UN#:
                        {' '}
                        {item.un}
                      </h2>
                    </DinamicDataItem>
                  ) : (
                    <></>
                  )}

                  {item.temp_min && (item.temp_max ? (
                    <DinamicDataItem>
                      <h1>Temperatura:</h1>
                      <h2>
                        min:
                        {' '}
                        {item.temp_min}
                        ºC
                        {' '}
                        |
                        {' '}
                        máx:
                        {' '}
                        {item.temp_max}
                        ºC
                      </h2>
                    </DinamicDataItem>
                  ) : (
                    <></>
                  ))}


                </DinamicDataContent>
              ))}

            </DinamicDataContainer>

            {/* <ButtonsContainer>
                <ButtonSaveLikaATemplate>
                  Salvar como template

                </ButtonSaveLikaATemplate>
                <ButtonNextStep
                  type="submit"
                >
                  Prosseguir
                </ButtonNextStep>
              </ButtonsContainer> */}

          </Form>

        </Content>

      </Container>
    </>
  );
};


export default NewSpotAirNacional;
