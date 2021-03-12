import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  Container, Content, Title,
} from './styles';

import Input from '../../../../components/InputLabel';
import Button from '../../../../components/button';

import api from '../../../../services/api';

interface NewAnalystFormData {
    name: string;
    email: string;
    approval_limit: string;
}

const AnalystsNew: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const [approvalLimit, setApprovalLimit] = useState<string>();

  const handleSubmit = useCallback(async (data: NewAnalystFormData) => {
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
          password: '123456',
          permission: 'ANALYST',
          active: '0',
          currency1: 'BRL',
          currency2: 'USD',
          currency3: 'EUR',
          company_id: user.company_id,
        };

        await api.post('/users', formData);

        await api.post('/users/send-mail-new-user', { email, name });

        addToast({
          type: 'sucess',
          title: 'Sucesso!',
          description: 'O analista foi criado com sucesso!',
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
        title: 'Erro cadastro',
        description: 'Ocorreu um erro ao cadastrar esse novo analista. Por favor, verifique as informações e tente novamente.',
      });
    }
  }, [addToast, history, user.company_id, approvalLimit]);

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
        <Title>Novo analista</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>


          <Input autoComplete="off" id="1" name="name" label="Nome do analista" />
          <Input autoComplete="off" id="2" name="email" label="E-mail do analista" />

          <Input autoComplete="off" id="3" name="approval_limit" label="Limite de aprovação (R$)" onKeyUp={handleCurrency} />


          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default AnalystsNew;
