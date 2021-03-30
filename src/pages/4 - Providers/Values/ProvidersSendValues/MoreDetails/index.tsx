import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import {
  Container, CloseModalButton, Tabs, Tab, InputTextField,
} from './style';
import api from '../../../../../services/api';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface MoreDetails {
  spotId: string;
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

const MoreDetails: React.FC<MoreDetails> = ({ spotId, toggleHandler = false }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [spot, setSpot] = useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
    api.get(`/spot/find/${spotId}`).then(({ data }) => {
      setSpot(data);
    });
  }, [spotId, setSpot]);

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
                  InputLabelProps={{ shrink: !!spot?.title }}
                  value={spot?.title}
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
                  InputLabelProps={{ shrink: !!spot?.type }}
                  value={spot?.type}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextField
                  label="Modal"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: !!spot?.modal }}
                  value={spot?.modal}
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
                  InputLabelProps={{ shrink: !!spot?.service_level }}
                  value={spot?.service_level}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextField
                  label="Seguro"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: !!spot?.insurance }}
                  value={spot?.insurance}
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
                  InputLabelProps={{ shrink: !!spot?.place_origin }}
                  value={spot?.place_origin}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextField
                  label="Aeroporto de destino"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: !!spot?.place_destination }}
                  value={spot?.place_destination}
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
                  InputLabelProps={{ shrink: !!spot?.pickup_location }}
                  value={spot?.pickup_location}
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Endereço"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: !!spot?.pickup_adress }}
                  value={spot?.pickup_adress}
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
                  InputLabelProps={{ shrink: !!spot?.pickup_zip }}
                  value={spot?.pickup_zip}
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Cidade/UF"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: !!spot?.pickup_city_state }}
                  value={spot?.pickup_city_state}
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
                  InputLabelProps={{ shrink: !!spot?.delivery_location }}
                  value={spot?.delivery_location}
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Endereço"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: !!spot?.delivery_adress }}
                  value={spot?.delivery_adress}
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
                  InputLabelProps={{ shrink: !!spot?.delivery_zip }}
                  value={spot?.delivery_zip}
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Cidade/UF"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: !!spot?.delivery_city_state }}
                  value={spot?.delivery_city_state}
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
                  InputLabelProps={{ shrink: !!spot?.weight }}
                  value={`${spot?.weight} ${spot?.scale_weight?.toUpperCase()}`}
                />
              </Grid>
              <Grid item xs={3}>
                <InputTextField
                  label="Quantidade"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: !!spot?.amount }}
                  value={spot?.amount}
                />
              </Grid>
              <Grid item xs={3}>
                <InputTextField
                  label="Empilhável"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: !!spot?.stackable }}
                  value={spot?.stackable}
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
                  InputLabelProps={{ shrink: !!spot?.length }}
                  value={`${spot?.length} ${spot?.scale_dimensions?.toUpperCase()}`}
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Largura"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: !!spot?.width }}
                  value={`${spot?.width} ${spot?.scale_dimensions?.toUpperCase()}`}
                />
              </Grid>
              <Grid item xs>
                <InputTextField
                  label="Altura"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: !!spot?.height }}
                  value={`${spot?.height} ${spot?.scale_dimensions?.toUpperCase()}`}
                />
              </Grid>
            </Grid>
            <Box mb={2} />
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
                  InputLabelProps={{ shrink: !!spot?.class_dgr }}
                  value={spot?.class_dgr}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextField
                  label="UN"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: !!spot?.un }}
                  value={spot?.un}
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
                  InputLabelProps={{ shrink: !!spot?.temp_min }}
                  value={spot?.temp_min}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextField
                  label="Temperatura máxima (°C)"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: !!spot?.temp_max }}
                  value={spot?.temp_max}
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
                  InputLabelProps={{ shrink: !!spot?.obs }}
                  value={spot?.obs}
                  rows={7}
                  multiline
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
