import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  Container, Content, Title,
} from './styles';

import Input from '../../../../components/InputLabel';
import Button from '../../../../components/button';

import api from '../../../../services/api';

interface UpdateAnalystFormData {
    name: string;
    email: string;
    approval_limit: number;
}

const AnalystsEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const [approvalLimit, setApprovalLimit] = useState<string>();

  const id_OUT = localStorage.getItem('id_IN');
  const name_OUT = localStorage.getItem('name_IN');
  const email_OUT = localStorage.getItem('email_IN');
  const approvalLimit_OUT = localStorage.getItem('approvalLimit_IN');

  const handleSubmit = useCallback(async (data: UpdateAnalystFormData) => {
    try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Obrigatório'),
          email: Yup.string().required('Obrigatório').email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name, email,
        } = data;

        const formData = {
          name,
          email,
          approval_limit: approvalLimit,
        };

        await api.put(`/users/analyst/${id_OUT}`, formData);

        addToast({
          type: 'sucess',
          title: 'Sucesso!',
          description: 'O analista foi atualizado com sucesso!',
        });

        history.push('/myAnalysts');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);

            return;
      }

      addToast({
        type: 'error',
        title: 'Erro na atualização',
        description: 'Ocorreu um erro ao atualizar esse analista. Por favor, verifique as informações e tente novamente.',
      });
    }
  }, [addToast, history, id_OUT, approvalLimit]);

  // Formatação instantânea no formato de MOEDA
  const handleCurrency = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    value = value.replace(/\D/g, '');

    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

    e.currentTarget.value = value;

    // Utilizando REGEX
    const formattedValue = value.replace(/\./g, '').replace(',', '.');

    setApprovalLimit(formattedValue);
  }, []);

  return (
    <Container>
      <Content>
        <Title>Atualizar analista</Title>
        <Form
          ref={formRef}
          initialData={{
            name: name_OUT,
            email: email_OUT,
            approval_limit: approvalLimit_OUT,
          }}
          onSubmit={handleSubmit}
        >

          <Input autoComplete="off" id="1" name="name" label="Nome do analista" />
          <Input autoComplete="off" id="2" name="email" label="E-mail do analista" />

          <Input autoComplete="off" id="3" name="approval_limit" label="Limite de aprovação (R$)" onKeyUp={handleCurrency} />

          <Button type="submit">Salvar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default AnalystsEdit;
