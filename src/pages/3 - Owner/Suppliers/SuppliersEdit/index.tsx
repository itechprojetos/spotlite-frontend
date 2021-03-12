import React, { useRef, useCallback } from 'react';
import { FiType } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

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

const SuppliersEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn, user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const id_OUT = localStorage.getItem('id_IN');
  const company_name_OUT = localStorage.getItem('company_name_IN');
  const email_OUT = localStorage.getItem('email_IN');
  const name_OUT = localStorage.getItem('name_IN');
  const obs_OUT = localStorage.getItem('obs_IN');
  const phone1_OUT = localStorage.getItem('phone1_IN');
  const phone2_OUT = localStorage.getItem('phone2_IN');

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
          phone1,
          phone2,
          obs,
          email,
        };

        await api.put(`/my-providers/${id_OUT}`, formData);

        addToast({
          type: 'sucess',
          title: 'Sucesso!',
          description: 'O provedor foi atualizado com sucesso!',
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
        title: 'Erro na atualização',
        description: 'Ocorreu um erro ao atualizar esse novo provedor. Por favor, verifique as informações e tente novamente.',
      });
    }
  }, [addToast, history, id_OUT]);

  return (
    <Container>
      <Content>
        <Title>Atualizar provedor</Title>
        <Form
          ref={formRef}
          initialData={{
            company: company_name_OUT,
            contact: name_OUT,
            email: email_OUT,
            phone1: phone1_OUT,
            phone2: phone2_OUT,
            obs: obs_OUT,
          }}
          onSubmit={handleSubmit}
        >

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


          <Button type="submit">Salvar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SuppliersEdit;
