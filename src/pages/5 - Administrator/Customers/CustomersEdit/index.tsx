import React, {
  useRef, useCallback, useState, useEffect,
} from 'react';
import { FiType } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  Container, Content, Title, DivFlex, DivFlexAdress, Test, SuppliersList, Grid, Items,
} from './styles';

import Input from '../../../../components/input';
import Button from '../../../../components/button';

import api from '../../../../services/api';

interface UpdateCustomer {
    id: string;
    corporate_name: string;
    fantasy_name: string;
    cnpj: string;
    ie: string;
    im: string;
    adress: string;
    financial_contact: string;
    comercial_contact: string;
    obs: string;
    payment_terms: string;
    inactivity_date: string;
    reason_inactivation: string;

    // Nome e e-mail do usuário master (salvar na tabela de usuários, diferentemente do restante do formulário)
    name: string;
    email: string;
}

const CustomersEdit: React.FC = () => {
  const [corporateName, setCorporateName] = useState<string | null>('');
  const [fantasyName, setFantasyName] = useState<string | null>('');
  const [cnpjState, setCnpjState] = useState<string | null>('');
  const [ieState, setIeState] = useState<string | null>('');
  const [imState, setImState] = useState<string | null>('');
  const [adressState, setAdressState] = useState<string | null>('');
  const [financialContact, setFinancialContact] = useState<string | null>('');
  const [comercialContact, setComercialContact] = useState<string | null>('');
  const [obsState, setObsState] = useState<string | null>('');
  const [paymentTerms, setPaymentTerms] = useState<string | null>('');
  const [inactivityDate, setInactivityDate] = useState<string | null>('');
  const [reasonInactivation, setReasonInactivation] = useState<string | null>('');
  const [nameState, setNameState] = useState<string | null>('');
  const [emailState, setEmailState] = useState<string | null>('');

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const id_OUT = localStorage.getItem('idCompany_IN');
  const corporate_name_OUT = localStorage.getItem('corporate_name_IN');
  const fantasy_name_OUT = localStorage.getItem('fantasy_name_IN');
  const cnpj_OUT = localStorage.getItem('cnpj_IN');
  const ie_OUT = localStorage.getItem('ie_IN');
  const im_OUT = localStorage.getItem('im_IN');
  const adress_OUT = localStorage.getItem('adress_IN');
  const financial_contact_OUT = localStorage.getItem('financial_contact_IN');
  const comercial_contact_OUT = localStorage.getItem('comercial_contact_IN');
  const obs_OUT = localStorage.getItem('obs_IN');
  const payment_terms_OUT = localStorage.getItem('payment_terms_IN');
  const inactivity_date_OUT = localStorage.getItem('inactivity_date_IN');
  const reason_inactivation_OUT = localStorage.getItem('reason_inactivation_IN');
  const name_OUT = localStorage.getItem('name_IN');
  const email_OUT = localStorage.getItem('email_IN');

  useEffect(() => {
    setCorporateName(corporate_name_OUT);
    setFantasyName(fantasy_name_OUT);
    setCnpjState(cnpj_OUT);
    setIeState(ie_OUT);
    setImState(im_OUT);
    setAdressState(adress_OUT);
    setFinancialContact(financial_contact_OUT);
    setComercialContact(comercial_contact_OUT);
    setObsState(obs_OUT);
    setPaymentTerms(payment_terms_OUT);
    setInactivityDate(inactivity_date_OUT);
    setReasonInactivation(reason_inactivation_OUT);
    setNameState(name_OUT);
    setEmailState(email_OUT);

    setNameState(name_OUT);
    setEmailState(email_OUT);
  }, [id_OUT, corporate_name_OUT, fantasy_name_OUT, cnpj_OUT, ie_OUT, im_OUT, adress_OUT, financial_contact_OUT, comercial_contact_OUT, obs_OUT, payment_terms_OUT, inactivity_date_OUT, reason_inactivation_OUT, name_OUT, email_OUT]);

  const handleSubmit = useCallback(async () => {
    try {
              formRef.current?.setErrors({});

              //   const schema = Yup.object().shape({
              //     corporate_name: Yup.string().required('Obrigatório'),
              //     fantasy_name: Yup.string().required('Obrigatório'),
              //     cnpj: Yup.string().required('Obrigatório'),
              //     ie: Yup.string().required('Obrigatório'),
              //     im: Yup.string().required('Obrigatório'),
              //     adress: Yup.string().required('Obrigatório'),
              //     financial_contact: Yup.string().required('Obrigatório'),
              //     comercial_contact: Yup.string().required('Obrigatório'),
              //     payment_terms: Yup.string().required('Obrigatório'),
              //   });

              //   await schema.validate(data, {
              //     abortEarly: false,
              //   });

              //   const {
              //     corporate_name,
              //     fantasy_name,
              //     cnpj,
              //     ie,
              //     im,
              //     adress,
              //     financial_contact,
              //     comercial_contact,
              //     obs,
              //     payment_terms,
              //     inactivity_date,
              //     reason_inactivation,

              //     name,
              //     email,
              //   } = data;

              const formCompanyData = {
                corporate_name: corporateName,
                fantasy_name: fantasyName,
                cnpj: cnpjState,
                ie: ieState,
                im: imState,
                adress: adressState,
                financial_contact: financialContact,
                comercial_contact: comercialContact,
                obs: obsState,
                payment_terms: paymentTerms,
                inactivity_date: inactivityDate,
                reason_inactivation: reasonInactivation,
              };

              // Passo 1: Atualiza a empresa
              const response = await api.put(`/company/${id_OUT}`, formCompanyData);
              const company = response.data;

              //   const formUserData = {
              //     name,
              //     email,
              //     password: '123456',
              //     permission: 'MASTER',
              //     active: '0',
              //     company_name: company.fantasy_name,
              //     company_id: company.id,
              //     currency1: 'BRL',
              //     currency2: 'USD',
              //     currency3: 'EUR',
              //   };

              //   // Passo 2: Vincula o master da empresa a outro usuário. Se não existir esse usuário, ele cria.
              //   const responseUser = await api.post('/users/update-master', formUserData);
              //   const newUser = responseUser.data;

              //   // Com o usuário devidamente cadastrado e seu retorno salvo na variável 'newUser', incluímos essa informação na empresa, como uma FK
              //   await api.patch(`/company/${company.id}`, { user_id: newUser.id });

              addToast({
                type: 'sucess',
                title: 'Sucesso!',
                description: `O cliente ${fantasyName} foi atualizado com sucesso!`,
              });

              history.push('/my-customers');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
                  formRef.current?.setErrors(errors);

                  return;
      }

      addToast({
        type: 'error',
        title: 'Erro na atualização',
        description: 'Ocorreu um erro ao atualizar esse novo cliente. Por favor, verifique as informações e tente novamente.',
      });
    }
  }, [addToast, id_OUT, history, corporateName, fantasyName, cnpjState, ieState, imState, adressState, financialContact, comercialContact, obsState, paymentTerms, inactivityDate, reasonInactivation]);

  return (
    <Container>
      <Content>
        <Title>Atualizar cliente</Title>
        <Test>{id_OUT}</Test>

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            corporate_name: corporate_name_OUT,
            fantasy_name: fantasy_name_OUT,
            cnpj: cnpj_OUT,
            ie: ie_OUT,
            im: im_OUT,
            adress: adress_OUT,
            financial_contact: financial_contact_OUT,
            comercial_contact: comercial_contact_OUT,
            obs: obs_OUT,
            payment_terms: payment_terms_OUT,
            inactivity_date: inactivity_date_OUT,
            reason_inactivation: reason_inactivation_OUT,

            name: name_OUT,
            email: email_OUT,
          }}
        >
          <DivFlex>

            <Input name="corporate_name" onChange={(event) => setCorporateName(event.target.value)} icon={FiType} placeholder="Razão social..." />
            <Input name="fantasy_name" onChange={(event) => setFantasyName(event.target.value)} icon={FiType} placeholder="Nome fantasia..." />
          </DivFlex>

          <DivFlex>
            <Input name="name" onChange={(event) => setNameState(event.target.value)} icon={FiType} placeholder="Nome do usuário master..." />
            <Input name="email" onChange={(event) => setEmailState(event.target.value)} icon={FiType} placeholder="E-mail do usuário master..." />
          </DivFlex>

          <DivFlex>
            <Input name="cnpj" onChange={(event) => setCnpjState(event.target.value)} icon={FiType} placeholder="CNPJ..." />
            <Input name="ie" onChange={(event) => setIeState(event.target.value)} icon={FiType} placeholder="IE..." />
            <Input name="im" onChange={(event) => setImState(event.target.value)} icon={FiType} placeholder="IM..." />
          </DivFlex>

          <DivFlexAdress>
            <Input name="adress" onChange={(event) => setAdressState(event.target.value)} icon={FiType} placeholder="Endereço..." />
          </DivFlexAdress>

          <DivFlex>
            <Input name="financial_contact" onChange={(event) => setFinancialContact(event.target.value)} icon={FiType} placeholder="Contato financeiro..." />
            <Input name="comercial_contact" onChange={(event) => setComercialContact(event.target.value)} icon={FiType} placeholder="Contato comercial..." />
          </DivFlex>

          <DivFlex>
            <Input name="obs" icon={FiType} onChange={(event) => setObsState(event.target.value)} placeholder="Observações..." />
            <Input name="payment_terms" onChange={(event) => setPaymentTerms(event.target.value)} icon={FiType} placeholder="Condição de pagamento..." />
          </DivFlex>

          <DivFlex>
            <Input name="inactivity_date" onChange={(event) => setInactivityDate(event.target.value)} icon={FiType} placeholder="Data da inativação..." />
            <Input name="reason_inactivation" onChange={(event) => setReasonInactivation(event.target.value)} icon={FiType} placeholder="Motivo da inativação..." />
          </DivFlex>

          <Button type="submit">Atualizar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CustomersEdit;
