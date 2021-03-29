import React, {
  useRef, useCallback, useState, ChangeEvent,
} from 'react';

import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import getValidationErrors from '../../../../utils/getValidationErrors';

import { useToast } from '../../../../hooks/toast';

import Select from '../../../../components/Select';

import { Container, Content, ButtonNextStep } from './styles';

interface SpotFormData {
    select: string | null;
}

const NewSpotAirNacional: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

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

  // Submit do form (feito por meio de hooks do useState)
  const handleSubmit = useCallback(async (data: SpotFormData) => {
    try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          select: Yup.string().required('Empresa obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { select } = data;

        console.log(select);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
            addToast({
              type: 'error',
              title: 'Preenchimento incorreto',
              description: 'Revise o preenchimento dos campos e tente novamente',
            });
            return;
      }

      addToast({
        type: 'error',
        title: 'Erro no prosseguimento!',
        description: 'Ocorreu um erro ao prosseguir com a sua solicitação. Revise os campos e tente novamente.',
      });
    }
  }, [addToast]);


  return (
    <>
      <Container>

        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>

            <Select
              name="select"
              options={[
                { value: 'FEDERAL', label: 'FEDERAL' },
                { value: 'ESTADUAL', label: 'ESTADUAL' },
                { value: 'MUNICIPAL', label: 'MUNICIPAL' },
              ]}
            />

            <ButtonNextStep
              type="submit"
            >
              Prosseguir
            </ButtonNextStep>

          </Form>

        </Content>

      </Container>
    </>
  );
};


export default NewSpotAirNacional;
