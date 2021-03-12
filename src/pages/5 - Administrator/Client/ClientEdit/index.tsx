import React, {
  useRef, useEffect, useCallback, useState, useMemo,
} from 'react';
import {
  FaSave,
  FaUser,
  FaUserPlus,
  FaUserEdit,
} from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory, useLocation } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import { format } from 'date-fns';
import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';


import {
  Container, Content, Title, Subtitle, DivFlex, AssistantSection, OptionButton, UserMasterSection, OptionsContainer, Option1, Option2,
} from './styles';

import Input from '../../../../components/InputLabel';
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

interface LocationState {
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
    active: string;
    inactivity_date: Date;
    reason_inactivation: string;
    user_id: string;
    user_name: string;
    user_email: string;
    edit: string;
}

  interface AllUsers {
    id: string;
    name: string;
    email: string;
    password: string;
    permission: string;
    active: string;
    approval_limit: string;
    company_id: string;
    company_name: string;
}

const useStyles = makeStyles({
  root: {
    width: 200,
    '& .MuiOutlinedInput-input': {
      color: 'gray',
    },
    '& .MuiInputLabel-root': {
      color: 'gray',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'gray',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: '#33415C',
    },
    '&:hover .MuiInputLabel-root': {
      color: '#33415C',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#33415C',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: '#33415C',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#33415C',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#33415C',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid #33415C',
      //   color: '#33415C',
    },
  },
});

const ClientEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const classes = useStyles();

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation<LocationState>();

  const [status, setStatus] = useState<boolean>();
  const [editMode, setEditMode] = useState<boolean>();
  const [inactivity_date, setInactivity_date] = useState(new Date(location.state.inactivity_date));

  const [users, setUsers] = useState<AllUsers[]>([]);
  const [selectedUser, setSelectedUser] = useState(location.state.user_id);

  const [sectionCompany, setSectionCompany] = useState(true);
  const [sectionAssistant, setSectionAssistant] = useState(false);
  const [sectionUserNew, setSectionUserNew] = useState(false);
  const [sectionUserExisting, setSectionUserExisting] = useState(false);

  // Essa variável e o método abaixo fazem o controle se o usuário quer apenas salvar os dados da empresa ou também deseja alterar o usuário master
  let mode: string;
  const handleUpdateMode = useCallback(async () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    mode = 'uptade_client';
  }, []);

  useEffect(() => {
    // Se a empresa estiver INATIVA (status 1), ele mostra o campo de MOTIVO DA INATIVAÇÃO
    if (location.state.active === '1') {
      setStatus(true);
    } else {
      setStatus(false);
    }

    // Faz a leitura se o cliente está editando o registro ou inativando um usuário (0: sim | 1: não)
    if (location.state.edit === '0') {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [location.state.active, location.state.edit]);

  const handleJustSaveCompany = useCallback(async (data: UpdateCustomer) => {
    try {
        formRef.current?.setErrors({});

        // Se o administrator desejar inativar a empresa, ele terá clicado no botão de INATIVAR e será movido para a tela de edição do cadastro. Nesse caso, a opção do motivo é OBRIGATÓRIA
        if (location.state.active === '1') {
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
            reason_inactivation: Yup.string().required('Obrigatório'),
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
            reason_inactivation,

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
            inactivity_date: new Date(),
            reason_inactivation,
            active: '1',
          };

          // Passo 1: Atualiza a empresa
          await api.put(`/company/${location.state.id}`, formCompanyData);
          await api.patch(`/users/inativated-all-users-company/${location.state.id}`, { active: '1' });
        }
        // Essa seção se aplica a uma edição que não envolve inativação
        else {
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
            //   inactivity_date,
            reason_inactivation,

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
            reason_inactivation,
          };

          // Passo 1: Atualiza a empresa
          const response = await api.put(`/company/${location.state.id}`, formCompanyData);
          const company = response.data;
        }

        if (mode === 'uptade_client') {
          // Fecha a seção da empresa e a abre a de usuários
          setSectionCompany(false);
          setSectionAssistant(true);
        } else {
          addToast({
            type: 'info',
            title: 'Sucesso',
            description: 'Já atualizei essa empresa pra você.',
          });

          history.push('/my-clients');
        }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);

            return;
      }

      addToast({
        type: 'error',
        title: 'Erro na atualização',
        description: 'Ocorreu um erro ao atualizar esse cliente. Por favor, verifique as informações e tente novamente.',
      });
    }
  }, [addToast, history, location.state.active, location.state.id]);

  const handleSectionAssistant = useCallback(async (option: string) => {
    if (option === 'new') {
      setSectionUserNew(true);
      setSectionUserExisting(false);
    } else {
      setSectionUserNew(false);
      setSectionUserExisting(true);

      await api.get('/users/find-analysts-and-masters-users').then((response) => setUsers(response.data));
    }
  }, []);

  const handleUserNew = useCallback(async (data: UpdateCustomer) => {
    try {
      const {
        name,
        email,
      } = data;

      const formData = {
        name,
        email,
        password: '123456',
        permission: 'MASTER',
        active: '0',
        company_name: location.state.fantasy_name,
        company_id: location.state.id,
        currency1: 'BRL',
        currency2: 'USD',
        currency3: 'EUR',
      };

      const response = await api.post('/users', formData);
      const usermaster = response.data;

      // Com o usuário devidamente cadastrado e seu retorno salvo na variável 'newUser', incluímos essa informação na empresa, como uma FK
      await api.patch(`/company/${location.state.id}`, { user_id: usermaster.id });

      const formOldData = {
        permission: 'ANALYST',
        approval_limit: 0,
        company_id: location.state.id,
        company_name: location.state.fantasy_name,
      };

      await api.put(`/users/upgrade-user/${location.state.user_id}`, formOldData);

      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'O cliente foi atualizado com sucesso e o atual usuário master tornou-se analista.',
      });

      history.push('my-clients');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'É provável que esse usuário já esteja cadastrado em nossa base. Tente a outra opção.',
      });
    }
  }, [addToast, history, location.state.fantasy_name, location.state.id, location.state.user_id]);

  const handleUserExisting = useCallback(async () => {
    try {
      await api.patch(`/company/${location.state.id}`, { user_id: selectedUser });

      const formNewData = {
        permission: 'MASTER',
        approval_limit: 0,
        company_id: location.state.id,
        company_name: location.state.fantasy_name,
      };

      await api.put(`/users/upgrade-user/${selectedUser}`, formNewData);

      const formOldData = {
        permission: 'ANALYST',
        approval_limit: 0,
        company_id: location.state.id,
        company_name: location.state.fantasy_name,
      };

      await api.put(`/users/upgrade-user/${location.state.user_id}`, formOldData);

      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'O cliente foi atualizado com sucesso e o atual usuário master tornou-se analista.',
      });

      history.push('my-clients');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Revise os campos e tente novamente, por favor.',
      });
    }
  }, [addToast, history, selectedUser, location.state.id, location.state.fantasy_name, location.state.user_id]);

  return (
    <Container>
      <Content>
        <Title>Atualizar cliente</Title>
        {sectionCompany ? (
          <Subtitle>Dados da empresa</Subtitle>
        ) : (
          <Subtitle>Dados do usuário master</Subtitle>
        )}

        <Form
          ref={formRef}
          initialData={{
            corporate_name: location.state.corporate_name,
            fantasy_name: location.state.fantasy_name,
            cnpj: location.state.cnpj,
            ie: location.state.ie,
            im: location.state.im,
            adress: location.state.adress,
            financial_contact: location.state.financial_contact,
            comercial_contact: location.state.comercial_contact,
            obs: location.state.obs,
            payment_terms: location.state.payment_terms,
            inactivity_date: format(inactivity_date, "dd'/'MM'/'yyyy"),
            reason_inactivation: location.state.reason_inactivation,

            name: location.state.user_name,
            email: location.state.user_email,
          }}
          onSubmit={handleJustSaveCompany}
        >

          {sectionCompany ? (
            <>
              <DivFlex>
                <Input autoComplete="off" id="1" name="corporate_name" label="Razão social" />
                <Input autoComplete="off" id="2" name="fantasy_name" label="Nome fantasia" />
              </DivFlex>

              <DivFlex>
                <Input autoComplete="off" id="3" name="name" label="Nome usuário master" />
                <Input autoComplete="off" id="4" name="email" label="E-mail usuário master" />
              </DivFlex>

              <DivFlex>
                <Input autoComplete="off" id="5" name="cnpj" label="CNPJ" />
                <Input autoComplete="off" id="6" name="ie" label="IE" />
                <Input autoComplete="off" id="7" name="im" label="IM" />
              </DivFlex>

              <DivFlex>
                <Input autoComplete="off" id="8" name="adress" label="Endereço" />
              </DivFlex>

              <DivFlex>
                <Input autoComplete="off" id="9" name="financial_contact" label="Contato financeiro" />
                <Input autoComplete="off" id="10" name="comercial_contact" label="Contato comercial" />
              </DivFlex>

              <DivFlex>
                <Input autoComplete="off" id="11" name="obs" label="Observações" />
                <Input autoComplete="off" id="12" name="payment_terms" label="Condição de pagamento" />
              </DivFlex>

              {status ? (
                <DivFlex>
                  <Input autoComplete="off" id="14" name="reason_inactivation" label="Motivo da inativação" />

                  {editMode ? (
                    <Input disabled autoComplete="off" id="13" name="inactivity_date" label="Data de inativação" />
                  ) : (
                    <></>
                  )}


                </DivFlex>
              ) : (
                <></>
              )}

              <OptionsContainer>

                <Option1
                  type="submit"
                >
                  <FaSave />
                  Salvar
                </Option1>

                <Option2
                  onClick={handleUpdateMode}
                >
                  <FaUser />
                  Alterar usuário master
                </Option2>

              </OptionsContainer>
            </>
          ) : (
            <></>
          )}

        </Form>

        <Form ref={formRef} onSubmit={handleUserNew}>
          {sectionAssistant ? (
            <>
              <AssistantSection>
                <OptionButton
                  selected={sectionUserNew}
                  onClick={() => { handleSectionAssistant('new'); }}
                >
                  <FaUserPlus />
                  Novo usuário

                </OptionButton>
                <OptionButton
                  selected={sectionUserExisting}
                  onClick={() => { handleSectionAssistant('existing'); }}
                >
                  <FaUserEdit />
                  Usuário existente

                </OptionButton>
              </AssistantSection>
            </>
          ) : (
            <></>
          )}

          {sectionUserNew ? (
            <UserMasterSection>
              <DivFlex>
                <Input autoComplete="off" id="3" name="name" label="Nome usuário master" />
                <Input autoComplete="off" id="4" name="email" label="E-mail usuário master" />
              </DivFlex>

              <Button type="submit">Finalizar</Button>
            </UserMasterSection>
          ) : (
            <></>
          )}

          {sectionUserExisting ? (
            <UserMasterSection>
              <DivFlex>
                <FormControl variant="outlined" className={classes.root}>
                  <InputLabel>Selecione o novo usuário</InputLabel>
                  <Select
                    value={selectedUser}
                    displayEmpty
                    onChange={(value: any) => { setSelectedUser(value.target.value); }}
                    label="Selecione o novo usuário"
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {users.map((item) => (
                      <MenuItem value={item.id}>
                        {item.name}
                        {' '}
                        (
                        {item.email}
                        )
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </DivFlex>

              <Button
                onClick={handleUserExisting}
              >
                Finalizar

              </Button>
            </UserMasterSection>
          ) : (
            <></>
          )}

        </Form>

      </Content>
    </Container>
  );
};

export default ClientEdit;
