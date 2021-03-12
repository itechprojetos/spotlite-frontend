import React, { useRef, useCallback, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { FiType, FiChevronsRight } from 'react-icons/fi';

import TextField from '@material-ui/core/TextField';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useToast } from '../../../../hooks/toast';
import { useAuth } from '../../../../hooks/auth';

// Picker
import Select from '../../../../components/Select';

import 'react-day-picker/lib/style.css';

import Input from '../../../../components/input';
import Button from '../../../../components/button';

import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  Container,
  Content,
  TitleContainer,
  Title,
  SectionContainer,
  TitleSection,
  Subtitle,
  ContainerHeaderSpecifications,
  ContainerHeaderGrid,
  HeaderGrid,
  ItemsContainerHeader,
  ItemsContainer,
  HeaderSpotTitle,
  HeaderSpotPickup,
  HeaderSpotDelivery,
  ContainerInformations,
  Grid,
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
  TypeButton,
  ModalButton,
  FlowButton,
  AddIcon,
  RemoveButton,
  DeleteIcon,
  TwoInputsTextField,
  ButtonsContainer,
  ButtonSaveLikaATemplate,
  TemplateIcon,
  ButtonNextStep,
  NextIcon,
  AirIcon,
  SeaIcon,
  RoadIcon,
  ImportIcon,
  ExportIcon,
  NacionalIcon,
  InternacionalIcon,
  NextContainer,
  NextContent,
} from './styles';

const NewSpotAssistant: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const { addToast } = useToast();

  const [sectionModal, setSectionModal] = useState(false);
  const [sectionFlow, setSectionFlow] = useState(false);
  const [sectionNext, setSectionNext] = useState(false);

  // *** FORMATAÇÃO DOS BOTOÕES ***
  const [internacional, setInternacional] = useState(false);
  const [nacional, setNacional] = useState(false);
  const [air, setAir] = useState(false);
  const [sea, setSea] = useState(false);
  const [road, setRoad] = useState(false);
  const [exportation, setExportation] = useState(false);
  const [importation, setImportation] = useState(false);

  // Faz o roteamento dos formulários de cotação
  const handleRouter = useCallback(() => {
    if (air && internacional && importation) {
      history.push('/new-spot-air-internacional-importation');
    }

    if (air && internacional && exportation) {
      history.push('/new-spot-air-internacional-exportation');
    }

    if (air && nacional) {
      history.push('/new-spot-air-nacional');
    }

    if (road && internacional && importation) {
      history.push('/new-spot-road-internacional-importation');
    }

    if (road && internacional && exportation) {
      history.push('/new-spot-road-internacional-exportation');
    }

    if (road && nacional) {
      history.push('/new-spot-road-nacional');
    }

    if (sea && internacional && importation) {
      history.push('/new-spot-sea-importation');
    }

    if (sea && internacional && exportation) {
      history.push('/new-spot-sea-exportation');
    }
  }, [history, air, road, sea, internacional, nacional, importation, exportation]);

  const handleType = useCallback((type: string) => {
    // Altera a propriedade de seleção para alterar a cor
    if (type === 'internacional') {
      setInternacional(true);
      setNacional(false);
    } else {
      setInternacional(false);
      setNacional(true);
    }

    setSectionModal(true);
  }, []);

  const handleModal = useCallback((modal: string) => {
    // Altera a propriedade de seleção para alterar a cor
    if (modal === 'aereo') {
      setAir(true);
      setSea(false);
      setRoad(false);
    } else if (modal === 'maritimo') {
      setAir(false);
      setSea(true);
      setRoad(false);
    } else {
      setAir(false);
      setSea(false);
      setRoad(true);
    }

    // Se o TIPO for NACIONAL ele não mostra o FLUXO
    if (internacional) {
      setSectionFlow(true);
    } else {
      setSectionFlow(false);
    }

    setSectionNext(true);
  }, [internacional]);

  const handleFlow = useCallback((flow: string) => {
    // Altera a propriedade de seleção para alterar a cor
    if (flow === 'exportacao') {
      setExportation(true);
      setImportation(false);
    } else {
      setExportation(false);
      setImportation(true);
    }
  }, []);

  return (
    <>
      <Container>

        <Content>

          <TitleContainer>
            <Title>Nova cotação</Title>
            <Subtitle>Assistente</Subtitle>
          </TitleContainer>

          <SectionContainer>
            <TitleSection>Selecione o tipo</TitleSection>
          </SectionContainer>

          <DivFlex>
            <TypeButton
              selected={internacional}
              onClick={() => { handleType('internacional'); }}
            >
              <InternacionalIcon />
              Internacional
            </TypeButton>

            <TypeButton
              selected={nacional}
              onClick={() => { handleType('nacional'); }}
            >
              <NacionalIcon />
              Nacional
            </TypeButton>
          </DivFlex>

          {sectionModal ? (
            <>
              <SectionContainer>
                <TitleSection>Selecione o modal</TitleSection>
              </SectionContainer>

              <DivFlex>
                <ModalButton
                  selected={air}
                  onClick={() => { handleModal('aereo'); }}
                >
                  <AirIcon />
                  Aéreo
                </ModalButton>

                {internacional ? (
                  <ModalButton
                    selected={sea}
                    onClick={() => { handleModal('maritimo'); }}
                  >
                    <SeaIcon />
                    Marítimo
                  </ModalButton>
                ) : (
                  <></>
                )}


                <ModalButton
                  selected={road}
                  onClick={() => { handleModal('rodoviario'); }}
                >
                  <RoadIcon />
                  Rodoviário
                </ModalButton>
              </DivFlex>
            </>
          ) : (
            <></>
          )}

          {sectionFlow && (internacional ? (
            <>
              <SectionContainer>
                <TitleSection>Selecione o fluxo</TitleSection>
              </SectionContainer>

              <DivFlex>
                <FlowButton
                  selected={exportation}
                  onClick={() => { handleFlow('exportacao'); }}
                >
                  <ExportIcon />
                  Exportação
                </FlowButton>

                <FlowButton
                  selected={importation}
                  onClick={() => { handleFlow('importacao'); }}
                >
                  <ImportIcon />
                  Importação
                </FlowButton>
              </DivFlex>
            </>
          ) : (
            <></>
          ))}

          {sectionNext ? (
            <NextContainer>
              <NextContent>
                <FiChevronsRight
                  onClick={handleRouter}
                />
              </NextContent>

            </NextContainer>
          ) : (
            <></>
          )}


        </Content>

      </Container>
    </>
  );
};


export default NewSpotAssistant;
