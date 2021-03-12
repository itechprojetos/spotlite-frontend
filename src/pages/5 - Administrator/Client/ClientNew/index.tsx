import React, { useRef, useCallback, useState } from 'react';
import { FiType } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  Container, Content, Title, Subtitle, DivFlex, AssistantSection, OptionButton, CompanySection, UserMasterSection,
} from './styles';

import Input from '../../../../components/InputLabel';
import Button from '../../../../components/button';

import api from '../../../../services/api';

interface Company {
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
}

interface MasterUser {
    name: string;
    email: string;
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

const ClientNew: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const classes = useStyles();

  const { signIn, user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const [company, setCompany] = useState<Company>();
  const [users, setUsers] = useState<AllUsers[]>([]);
  const [selectedUser, setSelectedUser] = useState();

  const [sectionCompany, setSectionCompany] = useState(true);
  const [sectionAssistant, setSectionAssistant] = useState(false);
  const [sectionUserNew, setSectionUserNew] = useState(false);
  const [sectionUserExisting, setSectionUserExisting] = useState(false);

  const handleCompany = useCallback(async (data: Company) => {
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
        } = data;

        const formData = {
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

        //   Passo 1: Cria a empresa
        const response = await api.post('/company', formData);
        setCompany(response.data);

        addToast({
          type: 'sucess',
          title: 'Sucesso!',
          description: 'Agora você precisa cadastrar o usuário responsável...',
        });

        setSectionCompany(false);
        setSectionAssistant(true);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao cadastrar a empresa. Por favor, verifique as informações e tente novamente.',
      });
    }
  }, [addToast]);

  const handleUserNew = useCallback(async (data: MasterUser) => {
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
        company_name: company?.fantasy_name,
        company_id: company?.id,
        currency1: 'BRL',
        currency2: 'USD',
        currency3: 'EUR',
      };

      const response = await api.post('/users', formData);
      const usermaster = response.data;

      // Com o usuário devidamente cadastrado e seu retorno salvo na variável 'newUser', incluímos essa informação na empresa, como uma FK
      await api.patch(`/company/${company?.id}`, { user_id: usermaster.id });

      await api.post('/users/send-mail-new-user', { email, name });


      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'O cliente foi criado com sucesso!',
      });

      history.push('my-clients');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'É provável que esse usuário já esteja cadastrado em nossa base. Tente a outra opção.',
      });
    }
  }, [addToast, company, history]);

  const handleUserExisting = useCallback(async () => {
    try {
      await api.patch(`/company/${company?.id}`, { user_id: selectedUser });

      const formData = {
        permission: 'MASTER',
        approval_limit: 0,
        company_id: company?.id,
        company_name: company?.fantasy_name,
      };

      await api.put(`/users/upgrade-user/${selectedUser}`, formData);

      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'O cliente foi criado com sucesso!',
      });

      history.push('my-clients');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'É provável que esse usuário já esteja cadastrado em nossa base. Tente a outra opção.',
      });
    }
  }, [addToast, history, company, selectedUser]);

  const handleAssistant = useCallback(async (option: string) => {
    if (option === 'new') {
      setSectionUserNew(true);
      setSectionUserExisting(false);
    } else {
      setSectionUserNew(false);
      setSectionUserExisting(true);

      await api.get('/users/find-analysts-and-masters-users').then((response) => setUsers(response.data));
    }
  }, []);

  return (
    <Container>
      <Content>
        <Title>Novo Cliente</Title>
        {sectionCompany ? (
          <Subtitle>Cadastrar empresa</Subtitle>
        ) : (
          <Subtitle>Vincular usuário master</Subtitle>
        )}

        <Form ref={formRef} onSubmit={handleCompany}>

          {sectionCompany ? (
            <CompanySection>
              <DivFlex>
                <Input autoComplete="off" id="1" name="corporate_name" label="Razão social" />
                <Input autoComplete="off" id="2" name="fantasy_name" label="Nome fantasia" />
              </DivFlex>


              <DivFlex>
                <Input autoComplete="off" id="5" name="cnpj" label="CNPJ" />
              </DivFlex>

              <DivFlex>
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

              <Button type="submit">Prosseguir</Button>
            </CompanySection>
          ) : (
            <></>
          )}

        </Form>

        <Form ref={formRef} onSubmit={handleUserNew}>
          {sectionAssistant ? (
            <AssistantSection>
              <OptionButton
                selected={sectionUserNew}
                onClick={() => { handleAssistant('new'); }}
              >
                Novo usuário

              </OptionButton>
              <OptionButton
                selected={sectionUserExisting}
                onClick={() => { handleAssistant('existing'); }}
              >
                Usuário existente

              </OptionButton>
            </AssistantSection>
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
                  <InputLabel>Selecione um usuário</InputLabel>
                  <Select
                    value={selectedUser}
                    onChange={(value: any) => { setSelectedUser(value.target.value); }}
                    label="Selecione um usuário"
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

export default ClientNew;
