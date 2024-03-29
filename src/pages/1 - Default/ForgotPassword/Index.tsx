import React, { useRef, useCallback, useState } from 'react';
import { FiChevronLeft, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';

import logoImg from '../../../assets/logo3.png';

import {
  Container, Content, Background, AnimationContainer,
} from './styles';

import Input from '../../../components/input';
import Button from '../../../components/button';
import api from '../../../services/api';

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'sucess',
          title: 'E-mail de recuperação enviado',
          description: 'Nós acabamos de enviar um e-mail pra você com as instruções de recuperação da sua senha.',
        });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);

            return;
      }

      addToast({
        type: 'info',
        title: 'Erro na recuperação de senha',
        description: 'Ocorreu um erro na recuperação da sua senha :( Tente novamente!',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/">
            <FiChevronLeft />
            Voltar à tela de Login
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ForgotPassword;
