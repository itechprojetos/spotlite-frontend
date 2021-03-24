import React, { useState } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import {
  Container, CloseModalButton, Tabs, Tab,
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
            <Tab label="Peso e quantidade" {...a11yProps(1)} />
            <Tab label="Dimensões" {...a11yProps(2)} />
            <Tab label="DGR" {...a11yProps(3)} />
            <Tab label="Mercadoria" {...a11yProps(4)} />
            <Tab label="Outras informações" {...a11yProps(5)} />
          </Tabs>
        </Grid>
        <Grid item xs={9}>
          <TabPanel value={currentTab} index={0}>
            Visão geral
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            Peso e quantidade
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            Dimensões
          </TabPanel>
          <TabPanel value={currentTab} index={3}>
            DGR
          </TabPanel>
          <TabPanel value={currentTab} index={4}>
            Mercadoria
          </TabPanel>
          <TabPanel value={currentTab} index={5}>
            Outras informações
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MoreDetails;
