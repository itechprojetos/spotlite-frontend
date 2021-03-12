import React from 'react';
import { Switch } from 'react-router-dom';

// *************************************************************************
import Route from './Route';
import ProviderRoute from './ProviderRoute';
import MasterRoute from './MasterRoute';
import AnalystAndMasterRoute from './AnalystAndMasterRoute';
import AdmRoute from './AdmRoute';
// *************************************************************************

import SignIn from '../pages/1 - Default/SignIn/Index';
import ForgotPassword from '../pages/1 - Default/ForgotPassword/Index';
import ResetPassword from '../pages/1 - Default/ResetPassword/Index';

import Welcome from '../pages/2 - Menus/Welcome/index';

import Profile from '../pages/1 - Default/Profile/Index';

import Home from '../pages/2 - Menus/Home';
import Dashboards from '../pages/2 - Menus/Dashboards';

import DashboardCustumerListSpotsOpen from '../pages/3 - Owner/Dashboards/Spots/DashboardCustumerListSpotsOpen';
import DashboardCustumerListSpotsClose from '../pages/3 - Owner/Dashboards/Spots/DashboardCustumerListSpotsClose';

import NewSpotAssistant from '../pages/3 - Owner/New Spot/NewSpotAssistant';

import NewSpotAirInternacionalImportation from '../pages/3 - Owner/New Spot/New Spot - Air Internacional Importation';
import NewSpotAirInternacionalExportation from '../pages/3 - Owner/New Spot/New Spot - Air Internacional Exportation/index';
import NewSpotAirNacional from '../pages/3 - Owner/New Spot/New Spot - Air Nacional';

import NewSpotRoadInternacionalImportation from '../pages/3 - Owner/New Spot/New Spot - Road Internacional Importation/index';
import NewSpotRoadInternacionalExportation from '../pages/3 - Owner/New Spot/New Spot - Road Internacional Exportation';
import NewSpotRoadNacional from '../pages/3 - Owner/New Spot/New Spot - Road Nacional';

import NewSpotSeaImportation from '../pages/3 - Owner/New Spot/New Spot - Sea Importation';
import NewSpotSeaExportation from '../pages/3 - Owner/New Spot/New Spot - Sea Exportation';

import NewSpotProvisional from '../pages/3 - Owner/New Spot/NewSpotProvisional';
import NewSpotProvisionalProviders from '../pages/3 - Owner/New Spot/NewSpotProvisionalProviders';
import NewSpotProvisionalProvidersSecoundRound from '../pages/3 - Owner/New Spot/NewSpotProvisionalProvidersSecoundRound';
import TemplatesMain from '../pages/3 - Owner/Templates/TemplatesMain';

import Providers from '../pages/10 - Others pages/ProvidersMain';
import ProvidersOption1 from '../pages/10 - Others pages/ProvidersOption1';
import ProvidersOption2 from '../pages/10 - Others pages/ProvidersOption2';

import Suppliers from '../pages/3 - Owner/Suppliers/SuppliersMain';
import SuppliersNew from '../pages/3 - Owner/Suppliers/SuppliersNew';
import SuppliersEdit from '../pages/3 - Owner/Suppliers/SuppliersEdit';

import AnalystsMain from '../pages/3 - Owner/Analysts/AnalystsMain';
import AnalystsNew from '../pages/3 - Owner/Analysts/AnalystsNew';
import AnalystsEdit from '../pages/3 - Owner/Analysts/AnalystsEdit';

import CustomersMain from '../pages/5 - Administrator/Customers/CustomersMain';
import CustomersNew from '../pages/5 - Administrator/Customers/CustomersNew';
import CustomersEdit from '../pages/5 - Administrator/Customers/CustomersEdit';

import ClientMain from '../pages/5 - Administrator/Client/ClientMain';
import ClientNew from '../pages/5 - Administrator/Client/ClientNew';
import ClientEdit from '../pages/5 - Administrator/Client/ClientEdit';

import ProviderSpotOpen from '../pages/4 - Providers/Dashboard cotations/ProviderSpotOpen';
import ProviderSpotChosen from '../pages/4 - Providers/Dashboard cotations/ProviderSpotChosen';
import ProviderSpotNotChosen from '../pages/4 - Providers/Dashboard cotations/ProviderSpotNotChosen';

import ProvidersSendValues from '../pages/4 - Providers/Values/ProvidersSendValues';
import ProvidersSummaryPrice from '../pages/4 - Providers/Values/ProvidersSummaryPrice';

import ClientSummaryValuesSpots from '../pages/3 - Owner/Values/ClientSummaryValuesSpots';
import ClientSummaryValuesSpotsClose from '../pages/3 - Owner/Values/ClientSummaryValuesSpotsClose';
import CompareAllValues from '../pages/3 - Owner/Values/CompareAllValues';

const Routes: React.FC = () => (

  <Switch>
    {/* GERAL: ok */}
    <Route path="/" exact component={SignIn} />
    {/* GERAL: ok */}
    <Route path="/forgot-password" component={ForgotPassword} />
    {/* GERAL: ok */}
    <Route path="/reset_password" component={ResetPassword} />
    {/* GERAL: ok */}
    <Route path="/profile" component={Profile} isPrivate />
    {/* GERAL: ok */}
    <Route path="/home" component={Home} isPrivate />

    {/* ANALISTA e MASTER: ok */}
    <AnalystAndMasterRoute path="/dashboards" component={Dashboards} isPrivate />
    {/* ANALISTA e MASTER: ok */}
    <AnalystAndMasterRoute path="/dash-client-spots-open" component={DashboardCustumerListSpotsOpen} isPrivate />
    <AnalystAndMasterRoute path="/dash-client-spots-close" component={DashboardCustumerListSpotsClose} isPrivate />
    {/* ANALISTA e MASTER: ok */}
    <AnalystAndMasterRoute path="/newSpotAssistant" component={NewSpotAssistant} isPrivate />
    {/* ANALISTA e MASTER: ok */}
    <AnalystAndMasterRoute path="/new-spot-air-internacional-importation" component={NewSpotAirInternacionalImportation} isPrivate />
    <AnalystAndMasterRoute path="/new-spot-air-internacional-exportation" component={NewSpotAirInternacionalExportation} isPrivate />
    <AnalystAndMasterRoute path="/new-spot-air-nacional" component={NewSpotAirNacional} isPrivate />

    <AnalystAndMasterRoute path="/new-spot-road-internacional-importation" component={NewSpotRoadInternacionalImportation} isPrivate />
    <AnalystAndMasterRoute path="/new-spot-road-internacional-exportation" component={NewSpotRoadInternacionalExportation} isPrivate />
    <AnalystAndMasterRoute path="/new-spot-road-nacional" component={NewSpotRoadNacional} isPrivate />

    <AnalystAndMasterRoute path="/new-spot-sea-importation" component={NewSpotSeaImportation} isPrivate />
    <AnalystAndMasterRoute path="/new-spot-sea-exportation" component={NewSpotSeaExportation} isPrivate />

    <AnalystAndMasterRoute path="/newSpotProvisional" component={NewSpotProvisional} isPrivate />
    <AnalystAndMasterRoute path="/newSpotProvisionalProviders" component={NewSpotProvisionalProviders} isPrivate />
    <AnalystAndMasterRoute path="/new-spot-secound-round" component={NewSpotProvisionalProvidersSecoundRound} isPrivate />
    <AnalystAndMasterRoute path="/templates" component={TemplatesMain} isPrivate />

    {/* ANALISTA e MASTER: ok */}
    <AnalystAndMasterRoute path="/suppliers" component={Suppliers} isPrivate />
    <AnalystAndMasterRoute path="/suppliersNew" component={SuppliersNew} isPrivate />
    <AnalystAndMasterRoute path="/suppliersEdit" component={SuppliersEdit} isPrivate />

    {/* MASTER: ok */}
    <MasterRoute path="/myAnalysts" component={AnalystsMain} isPrivate />
    <MasterRoute path="/analysts-new" component={AnalystsNew} isPrivate />
    <MasterRoute path="/analysts-edit" component={AnalystsEdit} isPrivate />

    {/* ADM: ok */}
    <AdmRoute path="/my-clients" component={ClientMain} isPrivate />
    <AdmRoute path="/client-new" component={ClientNew} isPrivate />
    <AdmRoute path="/client-edit" component={ClientEdit} isPrivate />

    {/* PROVEDOR: ok */}
    <ProviderRoute path="/spot-open" component={ProviderSpotOpen} isPrivate />
    <ProviderRoute path="/spot-chosen" component={ProviderSpotChosen} isPrivate />
    <ProviderRoute path="/spot-not-chosen" component={ProviderSpotNotChosen} isPrivate />
    <ProviderRoute path="/send-values" component={ProvidersSendValues} isPrivate />

    {/* ANALISTA e MASTER: ok */}
    <AnalystAndMasterRoute path="/client-summary-values" component={ClientSummaryValuesSpots} isPrivate />
    <AnalystAndMasterRoute path="/client-summary-values-close" component={ClientSummaryValuesSpotsClose} isPrivate />
    <AnalystAndMasterRoute path="/providers-summary-price" component={ProvidersSummaryPrice} isPrivate />
    <AnalystAndMasterRoute path="/compare-all-values" component={CompareAllValues} isPrivate />

  </Switch>
);

export default Routes;
