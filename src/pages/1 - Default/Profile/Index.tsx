import React, {
  useCallback,
  useRef,
  useState,
} from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import getValidationErrors from '../../../utils/getValidationErrors';


import {
  Container,
  Content,
  Header,
  Title,
  DivFlex,
  DivFlexCurrencyTwo,
  DivFlexPasswordTwo,
  ButtonSave,
} from './styles';

import Input from '../../../components/InputLabel';

import { useAuth } from '../../../hooks/auth';

interface ProfileFormData {
    name: string;
    email: string;
    old_password: string;
    password: string;
    password_confirmation: string;
}


const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUSer } = useAuth();

  const [currency1, setCurrency1] = useState(user.currency1);
  const [currency2, setCurrency2] = useState(user.currency2);
  const [currency3, setCurrency3] = useState(user.currency3);

  // Biblioteca com todos os códigos ISO das moedas
  const optionsCurrency = [
    { label: 'BRL', value: 'BRL' },
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'AED', value: 'AED' },
    { label: 'AFN', value: 'AFN' },
    { label: 'ALL', value: 'ALL' },
    { label: 'AMD', value: 'AMD' },
    { label: 'ANG', value: 'ANG' },
    { label: 'AOA', value: 'AOA' },
    { label: 'ARS', value: 'ARS' },
    { label: 'AUD', value: 'AUD' },
    { label: 'AWG', value: 'AWG' },
    { label: 'AZN', value: 'AZN' },
    { label: 'BAM', value: 'BAM' },
    { label: 'BBD', value: 'BBD' },
    { label: 'BDT', value: 'BDT' },
    { label: 'BGN', value: 'BGN' },
    { label: 'BHD', value: 'BHD' },
    { label: 'BIF', value: 'BIF' },
    { label: 'BMD', value: 'BMD' },
    { label: 'BND', value: 'BND' },
    { label: 'BOB', value: 'BOB' },
    { label: 'BSD', value: 'BSD' },
    { label: 'BTN', value: 'BTN' },
    { label: 'BWP', value: 'BWP' },
    { label: 'BYR', value: 'BYR' },
    { label: 'BZD', value: 'BZD' },
    { label: 'CAD', value: 'CAD' },
    { label: 'CDF', value: 'CDF' },
    { label: 'CHF', value: 'CHF' },
    { label: 'CLP', value: 'CLP' },
    { label: 'CNY', value: 'CNY' },
    { label: 'COP', value: 'COP' },
    { label: 'CRC', value: 'CRC' },
    { label: 'CUC', value: 'CUC' },
    { label: 'CUP', value: 'CUP' },
    { label: 'CVE', value: 'CVE' },
    { label: 'CZK', value: 'CZK' },
    { label: 'DJF', value: 'DJF' },
    { label: 'DKK', value: 'DKK' },
    { label: 'DOP', value: 'DOP' },
    { label: 'DZD', value: 'DZD' },
    { label: 'EGP', value: 'EGP' },
    { label: 'ERN', value: 'ERN' },
    { label: 'ETB', value: 'ETB' },
    { label: 'FJD', value: 'FJD' },
    { label: 'FKP', value: 'FKP' },
    { label: 'GBP', value: 'GBP' },
    { label: 'GEL', value: 'GEL' },
    { label: 'GGP[B]', value: 'GGP[B]' },
    { label: 'GHS', value: 'GHS' },
    { label: 'GIP', value: 'GIP' },
    { label: 'GMD', value: 'GMD' },
    { label: 'GNF', value: 'GNF' },
    { label: 'GTQ', value: 'GTQ' },
    { label: 'GYD', value: 'GYD' },
    { label: 'HKD', value: 'HKD' },
    { label: 'HNL', value: 'HNL' },
    { label: 'HRK', value: 'HRK' },
    { label: 'HTG', value: 'HTG' },
    { label: 'HUF', value: 'HUF' },
    { label: 'IDR', value: 'IDR' },
    { label: 'ILS', value: 'ILS' },
    { label: 'IMP[B]', value: 'IMP[B]' },
    { label: 'INR', value: 'INR' },
    { label: 'IQD', value: 'IQD' },
    { label: 'IRR', value: 'IRR' },
    { label: 'ISK', value: 'ISK' },
    { label: 'JEP[B]', value: 'JEP[B]' },
    { label: 'JMD', value: 'JMD' },
    { label: 'JOD', value: 'JOD' },
    { label: 'JPY', value: 'JPY' },
    { label: 'KES', value: 'KES' },
    { label: 'KGS', value: 'KGS' },
    { label: 'KHR', value: 'KHR' },
    { label: 'KMF', value: 'KMF' },
    { label: 'KRW', value: 'KRW' },
    { label: 'KWD', value: 'KWD' },
    { label: 'KYD', value: 'KYD' },
    { label: 'KZT', value: 'KZT' },
    { label: 'LAK', value: 'LAK' },
    { label: 'LBP', value: 'LBP' },
    { label: 'LKR', value: 'LKR' },
    { label: 'LRD', value: 'LRD' },
    { label: 'LSL', value: 'LSL' },
    { label: 'LYD', value: 'LYD' },
    { label: 'MAD', value: 'MAD' },
    { label: 'MDL', value: 'MDL' },
    { label: 'MGA', value: 'MGA' },
    { label: 'MKD', value: 'MKD' },
    { label: 'MMK', value: 'MMK' },
    { label: 'MNT', value: 'MNT' },
    { label: 'MOP', value: 'MOP' },
    { label: 'MRO', value: 'MRO' },
    { label: 'MUR', value: 'MUR' },
    { label: 'MVR', value: 'MVR' },
    { label: 'MWK', value: 'MWK' },
    { label: 'MXN', value: 'MXN' },
    { label: 'MYR', value: 'MYR' },
    { label: 'MZN', value: 'MZN' },
    { label: 'NAD', value: 'NAD' },
    { label: 'NGN', value: 'NGN' },
    { label: 'NIO', value: 'NIO' },
    { label: 'NOK', value: 'NOK' },
    { label: 'NPR', value: 'NPR' },
    { label: 'NZD', value: 'NZD' },
    { label: 'OMR', value: 'OMR' },
    { label: 'PAB', value: 'PAB' },
    { label: 'PEN', value: 'PEN' },
    { label: 'PGK', value: 'PGK' },
    { label: 'PHP', value: 'PHP' },
    { label: 'PKR', value: 'PKR' },
    { label: 'PLN', value: 'PLN' },
    { label: 'PNB[B]', value: 'PNB[B]' },
    { label: 'PYG', value: 'PYG' },
    { label: 'QAR', value: 'QAR' },
    { label: 'RON', value: 'RON' },
    { label: 'RSD', value: 'RSD' },
    { label: 'RUB', value: 'RUB' },
    { label: 'RWF', value: 'RWF' },
    { label: 'SAR', value: 'SAR' },
    { label: 'SBD', value: 'SBD' },
    { label: 'SCR', value: 'SCR' },
    { label: 'SDG', value: 'SDG' },
    { label: 'SEK', value: 'SEK' },
    { label: 'SGD', value: 'SGD' },
    { label: 'SHP', value: 'SHP' },
    { label: 'SLL', value: 'SLL' },
    { label: 'SOS', value: 'SOS' },
    { label: 'SRD', value: 'SRD' },
    { label: 'SSP', value: 'SSP' },
    { label: 'STD', value: 'STD' },
    { label: 'SYP', value: 'SYP' },
    { label: 'SZL', value: 'SZL' },
    { label: 'THB', value: 'THB' },
    { label: 'TJS', value: 'TJS' },
    { label: 'TMT', value: 'TMT' },
    { label: 'TND', value: 'TND' },
    { label: 'TOP', value: 'TOP' },
    { label: 'TRY', value: 'TRY' },
    { label: 'TTD', value: 'TTD' },
    { label: 'TWD', value: 'TWD' },
    { label: 'TZS', value: 'TZS' },
    { label: 'UAH', value: 'UAH' },
    { label: 'UGX', value: 'UGX' },
    { label: 'UYU', value: 'UYU' },
    { label: 'UZS', value: 'UZS' },
    { label: 'VES', value: 'VES' },
    { label: 'VND', value: 'VND' },
    { label: 'VUV', value: 'VUV' },
    { label: 'WST', value: 'WST' },
    { label: 'XAF', value: 'XAF' },
    { label: 'XCD', value: 'XCD' },
    { label: 'XOF', value: 'XOF' },
    { label: 'XPF', value: 'XPF' },
    { label: 'YER', value: 'YER' },
    { label: 'ZAR', value: 'ZAR' },
    { label: 'ZMK', value: 'ZMK' },
  ];

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }).oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name, email, old_password, password, password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          currency1,
          currency2,
          currency3,
          ...(old_password ? {
            old_password,
            password,
            password_confirmation,
          } : {}),
        };

        const response = await api.put('/profile', formData);

        updateUSer(response.data);

        history.push('/home');

        addToast({
          type: 'sucess',
          title: 'Perfil atualiado!',
          description: 'Suas informações do perfil foram atualizadas com sucesso.',
        });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'info',
        title: 'Erro na atualização do perfil',
        description: 'Ocorreu um erro ao atualizar o seu perfil. Tente novamente.',
      });
    }
  }, [addToast, history, updateUSer, currency1, currency2, currency3]);

  return (
    <Container>
      <Header>
        <Title>Meu perfil</Title>
      </Header>
      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >

          <DivFlex>

            <Input id="1" name="name" label="Nome" />
            <Input id="2" name="email" label="E-mail" />

          </DivFlex>

          <DivFlexCurrencyTwo>
            <div>
              <InputLabel shrink htmlFor="currency_1">
                Moeda 1
              </InputLabel>
              <NativeSelect
                value={currency1}
                onChange={(event) => setCurrency1(event.target.value)}
                inputProps={{
                  name: 'currency_1',
                  id: 'currency_1',
                }}
              >
                <option value="">Selecione...</option>
                {optionsCurrency.map((option) => (
                  <option key={option.value} value={option.label}>{option.label}</option>
                ))}
              </NativeSelect>
            </div>

            <div>
              <InputLabel shrink htmlFor="currency_2">
                Moeda 2
              </InputLabel>
              <NativeSelect
                value={currency2}
                onChange={(event) => setCurrency2(event.target.value)}
                inputProps={{
                  name: 'currency_2',
                  id: 'currency_2',
                }}
              >
                <option value="">Selecione...</option>
                {optionsCurrency.map((option) => (
                  <option key={option.value} value={option.label}>{option.label}</option>
                ))}
              </NativeSelect>
            </div>

            <div>
              <InputLabel shrink htmlFor="currency_3">
                Moeda 3
              </InputLabel>
              <NativeSelect
                value={currency3}
                onChange={(event) => setCurrency3(event.target.value)}
                inputProps={{
                  name: 'currency_3',
                  id: 'currency_3',
                }}
              >
                <option value="">Selecione...</option>
                {optionsCurrency.map((option) => (
                  <option key={option.value} value={option.label}>{option.label}</option>
                ))}
              </NativeSelect>
            </div>
          </DivFlexCurrencyTwo>

          <DivFlexPasswordTwo>
            <Input type="password" id="3" name="old_password" label="Senha antiga" />
            <Input type="password" id="4" name="password" label="Senha atual" />
            <Input type="password" id="5" name="password_confirmation" label="Repetir senha atual" />
          </DivFlexPasswordTwo>

          <ButtonSave type="submit">Salvar alterações</ButtonSave>


        </Form>
      </Content>
    </Container>
  );
};


export default Profile;
