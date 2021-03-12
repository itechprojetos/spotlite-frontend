import React, {
  useRef, useCallback, useState, useEffect,
} from 'react';
import { FiType } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  Container, Content, Title, DivFlex, DivFlexAdress, Test, SuppliersList, Grid, Items,
} from './styles';

import Input from '../../../../components/input';
import Button from '../../../../components/button';

import api from '../../../../services/api';

interface NewCustomerFormData {
    corporate_name: string;
    fantasy_name: string;

    // Nome e e-mail do usuário master (salvar na tabela de usuários, diferentemente do restante do formulário)
    name: string;
    email: string;

    cnpj: string;
    ie: string;
    im: string;
    adress: string;
    financial_contact: string;
    comercial_contact: string;
    obs: string;
    payment_terms: string;
}

interface Company {
    id: string;
    corporate_name: string;
    fantasy_name: string;
}

const CustomersNew: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: NewCustomerFormData) => {
    try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          corporate_name: Yup.string().required('Obrigatório'),
          fantasy_name: Yup.string().required('Obrigatório'),
          cnpj: Yup.string().required('Obrigatório'),
          ie: Yup.string().required('Obrigatório'),
          im: Yup.string().required('Obrigatório'),
          adress: Yup.string().required('Obrigatório'),
          financial_contact: Yup.string().required('Obrigatório'),
          comercial_contact: Yup.string().required('Obrigatório'),
          payment_terms: Yup.string().required('Obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          corporate_name,
          fantasy_name,
          cnpj,
          ie,
          im,
          adress,
          financial_contact,
          comercial_contact,
          obs,
          payment_terms,

          name,
          email,
        } = data;

        const formCompanyData = {
          corporate_name,
          fantasy_name,
          cnpj,
          ie,
          im,
          adress,
          financial_contact,
          comercial_contact,
          obs,
          payment_terms,
          active: '0',
        };

        // Passo 1: Cria a empresa
        const responseCompany = await api.post('/company', formCompanyData);
        const company = responseCompany.data;

        const formUserData = {
          name,
          email,
          password: '123456',
          permission: 'MASTER',
          active: '0',
          company_name: company.fantasy_name,
          company_id: company.id,
          currency1: 'BRL',
          currency2: 'USD',
          currency3: 'EUR',
        };

        // Passo 2: Cria o usuário master dessa empresa
        const responseUser = await api.post('/users', formUserData);
        const newUser = responseUser.data;

        // Com o usuário devidamente cadastrado e seu retorno salvo na variável 'newUser', incluímos essa informação na empresa, como uma FK
        await api.patch(`/company/${company.id}`, { user_id: newUser.id });

        addToast({
          type: 'sucess',
          title: 'Sucesso!',
          description: 'O cliente foi criado com sucesso!',
        });

        history.push('/my-clients');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);

            return;
      }

      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao cadastrar esse novo cliente. Por favor, verifique as informações e tente novamente.',
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <Content>
        <Title>Novo cliente</Title>

        <Form ref={formRef} onSubmit={handleSubmit}>

          <DivFlex>
            <Input name="corporate_name" icon={FiType} placeholder="Razão social..." />
            <Input name="fantasy_name" icon={FiType} placeholder="Nome fantasia..." />
          </DivFlex>

          <DivFlex>
            <Input name="name" icon={FiType} placeholder="Nome do usuário master..." />
            <Input name="email" icon={FiType} placeholder="E-mail do usuário master..." />
          </DivFlex>

          <DivFlex>
            <Input name="cnpj" icon={FiType} placeholder="CNPJ..." />
            <Input name="ie" icon={FiType} placeholder="IE..." />
            <Input name="im" icon={FiType} placeholder="IM..." />
          </DivFlex>

          <DivFlexAdress>
            <Input name="adress" icon={FiType} placeholder="Endereço..." />
          </DivFlexAdress>

          <DivFlex>
            <Input name="financial_contact" icon={FiType} placeholder="Contato financeiro..." />
            <Input name="comercial_contact" icon={FiType} placeholder="Contato comercial..." />
          </DivFlex>

          <DivFlex>
            <Input name="obs" icon={FiType} placeholder="Observações..." />
            <Input name="payment_terms" icon={FiType} placeholder="Condição de pagamento..." />
          </DivFlex>

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CustomersNew;
