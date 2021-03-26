import React, { useState } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import {
  Container, CloseModalButton, Tabs, Tab, InputTextField,
} from './style';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface MoreDetails {
  toggleHandler?: any;
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box py={1} px={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number): { [ key: string ]: string } {
  return {
    id: `vertical-tab-${index}`,
  };
}

const MoreDetails: React.FC<MoreDetails> = ({ toggleHandler = false }) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Container>
      {toggleHandler &&
        <CloseModalButton onClick={toggleHandler} />
      }
      <Grid container>
        <Grid item xs={3}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={currentTab}
            onChange={(e, newValue): void => setCurrentTab(newValue)}
          >
            <Tab label="Visão geral" {...a11yProps(0)} />
            <Tab label="Coleta e entrega" {...a11yProps(1)} />
            <Tab label="Peso e quantidade" {...a11yProps(2)} />
            <Tab label="Dimensões" {...a11yProps(3)} />
            <Tab label="DGR" {...a11yProps(4)} />
            <Tab label="Mercadoria" {...a11yProps(5)} />
            <Tab label="Outras informações" {...a11yProps(6)} />
          </Tabs>
        </Grid>
        <Grid item xs={9} style={{ borderLeft: '1px solid #e3e3e3', minHeight: '500px' }}>
          <TabPanel value={currentTab} index={0}>
            <Box component="p" mb={4}>
              Visão geral
            </Box>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={12}>
                <InputTextField
                  label="Título"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="Cotação de Israel"
                />
              </Grid>
            </Grid>
            <Box mb={2} />
            <Grid container xs={12} spacing={2}>
              <Grid item xs={6}>
                <InputTextField
                  label="Tipo"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="Nacional"
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextField
                  label="Modal"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="Aéreo"
                />
              </Grid>
            </Grid>
            <Box mb={2} />
            <Grid container xs={12} spacing={2}>
              <Grid item xs={6}>
                <InputTextField
                  label="Nível de serviço"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="Consol"
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextField
                  label="Seguro"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="Nenhum"
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <Box component="p" mb={4}>
              Coleta e entrega
            </Box>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={6}>
                <InputTextField
                  label="Aeroporto de origem"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="GRU Guarulhos"
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextField
                  label="Aeroporto de destino"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="REC Recife"
                />
              </Grid>
            </Grid>
            <Box component="p" mt={3} mb={1}>
              Local de coleta
            </Box>
            <Grid container xs={12} spacing={2}>
              <Grid item xs>
                <InputTextField
                  label="Local"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Endereço"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
            <Box mb={2} />
            <Grid container xs={12} spacing={2}>
              <Grid item xs>
                <InputTextField
                  label="CEP"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Cidade"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Estado"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
            <Box component="p" mt={3} mb={1}>
              Local de entrega
            </Box>
            <Grid container xs={12} spacing={2}>
              <Grid item xs>
                <InputTextField
                  label="Local"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Endereço"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
            <Box mb={2} />
            <Grid container xs={12} spacing={2}>
              <Grid item xs>
                <InputTextField
                  label="CEP"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Cidade"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Estado"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <Box component="p" mb={4}>
              Peso e quantidade
            </Box>
            <Grid container xs={12} spacing={2}>
              <Grid item xs>
                <InputTextField
                  label="Peso bruto total"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="20 KG"
                />
              </Grid>
              <Grid item xs={3}>
                <InputTextField
                  label="Quantidade"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="5"
                />
              </Grid>
              <Grid item xs={3}>
                <InputTextField
                  label="Empilhável"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="Sim"
                />
              </Grid>
            </Grid>
            <Box mb={2} />
            <Grid container xs={12} spacing={2}>
              <Grid item xs>
                <InputTextField
                  label="Peso bruto total"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="55 KG"
                />
              </Grid>
              <Grid item xs={3}>
                <InputTextField
                  label="Quantidade"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="3"
                />
              </Grid>
              <Grid item xs={3}>
                <InputTextField
                  label="Empilhável"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="Não"
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={3}>
            <Box component="p" mb={4}>
              Dimensões
            </Box>
            <Grid container xs={12} spacing={2}>
              <Grid item xs>
                <InputTextField
                  label="Comprimento"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="50 CM"
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Largura"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="39 CM"
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Altura"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="11 CM"
                />
              </Grid>
            </Grid>
            <Box mb={2} />
            <Grid container xs={12} spacing={2}>
              <Grid item xs>
                <InputTextField
                  label="Comprimento"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="23 CM"
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Largura"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="45 CM"
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Altura"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="20 CM"
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={4}>
            <Box component="p" mb={4}>
              DGR
            </Box>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={6}>
                <InputTextField
                  label="Classes"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextField
                  label="UN"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
            <Box mb={2} />
            <Grid container xs={12} spacing={2}>
              <Grid item xs={6}>
                <InputTextField
                  label="Temperatura mínima (°C)"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextField
                  label="Temperatura máxima (°C)"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={5}>
            <Box component="p" mb={4}>
              Mercadoria
            </Box>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={8}>
                <InputTextField
                  label="Descrição"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="Notebook HP i7 16GB 120GB SSD"
                />
              </Grid>
              <Grid item xs={4}>
                <InputTextField
                  label="Valor"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="R$ 5.490,55"
                />
              </Grid>
            </Grid>
            <Box mb={2} />
            <Grid container xs={12} spacing={2}>
              <Grid item xs={8}>
                <InputTextField
                  label="Descrição"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="Monitor LG Ultrawide 29'"
                />
              </Grid>
              <Grid item xs={4}>
                <InputTextField
                  label="Valor"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="R$ 1.155,00"
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={6}>
            <Box component="p" mb={4}>
              Outras informações
            </Box>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={12}>
                <InputTextField
                  label="Observações"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  rows={7}
                  multiline
                  defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                />
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MoreDetails;
