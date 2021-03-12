import React from 'react';
import MaterialTable from 'material-table';

import { Container } from './styles';

interface Props {
    data?: any;
    title?: any;
    loader?: any;
    columns?: any;
    actions?: any;
    selection?: any;
    buttonExport?: any;
    selectionChange?: any;
}

const Table: React.FC<Props> = ({
  data, title, loader, columns, actions, selection, buttonExport, selectionChange,
}) => (
  <Container>
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      isLoading={loader || false}
      actions={actions}
      localization={{
        header: {
          actions: 'Ações',
        },
        body: {
          emptyDataSourceMessage: 'Não há registros a serem exibidos',
        },
        toolbar: {
          searchPlaceholder: 'Buscar',
          searchTooltip: 'Buscar',
          nRowsSelected: '{0} linha(s) selecionadas',
        },
        pagination: {
          labelRowsSelect: 'linhas',
          labelDisplayedRows: '{from}-{to} de {count}',
          previousTooltip: 'Anterior',
          nextTooltip: 'Próxima',
          firstTooltip: 'Primeira página',
          lastTooltip: 'Última página',
        },
      }}
      options={{
        actionsColumnIndex: -1,
        selection: selection || false,
        searchFieldAlignment: selection === true ? 'right' : 'left',
        exportButton: buttonExport || false,
        headerStyle: {
          color: '#FFF',
          fontWeight: 'bold',
          background: '#33415C',
        },
        showTitle: !!title,
        pageSize: 6,
        pageSizeOptions: [6, 12, 18],
      }}
      onSelectionChange={selectionChange || false}
    />
  </Container>
);

export default Table;
