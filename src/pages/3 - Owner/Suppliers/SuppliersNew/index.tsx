import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  Container, Content, Title, DivFlex,
} from './styles';

import Input from '../../../../components/InputLabel';
import Button from '../../../../components/button';

import api from '../../../../services/api';

interface NewSupplierFormData {
    company: string;
    contact: string;
    email: string;
    phone1: string;
    phone2: string;
    obs: string;
}

const SuppliersNew: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: NewSupplierFormData) => {
    try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          company: Yup.string().required('Empresa obrigatório'),
          contact: Yup.string().required('Contato obrigatório'),
          email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
          phone1: Yup.string(),
          phone2: Yup.string(),
          obs: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          company, contact, email, phone1, phone2, obs,
        } = data;

        const formData = {
          company_name: company,
          name: contact,
          email,
          phone1,
          phone2,
          obs,
          password: '123456',
          permission: 'PROVIDER',
          active: '0',
          currency1: 'BRL',
          currency2: 'USD',
          currency3: 'EUR',
          company_id: user.company_id,
        };

        const response = await api.post('/users', formData);
        const provider = response.data;

        const formDataMyProvider = {
          name: contact,
          company_name: company,
          email,
          active: '0',
          phone1,
          phone2,
          obs,
          provider_id: provider.id,
          owner_company_id: user.company_id,
        };

        await api.post('/my-providers', formDataMyProvider);

        addToast({
          type: 'sucess',
          title: 'Sucesso!',
          description: 'O provedor foi criado com sucesso!',
        });

        history.push('/suppliers');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);

            return;
      }

      addToast({
        type: 'error',
        title: 'Erro cadastro',
        description: 'Ocorreu um erro ao cadastrar esse novo provedor. Por favor, verifique as informações e tente novamente.',
      });
    }
  }, [addToast, history, user.company_id]);

  return (
    <Container>
      <Content>
        <Title>Novo provedor</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>

          <DivFlex>
            <Input autoComplete="off" id="1" name="company" label="Nome da empresa" />
            <Input autoComplete="off" id="2" name="contact" label="Nome do contato" />
          </DivFlex>

          <DivFlex>
            <Input autoComplete="off" id="3" name="email" label="E-mail" />
            <Input autoComplete="off" id="6" name="obs" label="Observações" />
          </DivFlex>

          <DivFlex>
            <Input autoComplete="off" id="4" name="phone1" label="Telefone 1" />
            <Input autoComplete="off" id="5" name="phone2" label="Telefone 2" />
          </DivFlex>

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SuppliersNew;
