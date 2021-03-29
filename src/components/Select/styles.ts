import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;

    // Regula as propriedades do container principal do Select
    .select {
      width: 100%;
      /* border: 1px solid #585858; */

        // Coloca uma borda no container quando o Select apresenta erro (não preenchimento)
        &-error {
          border: 2px solid #c53030;
        }

        // Tira a borda interna do Select
        .css-yk16xz-control {
          border: none;
        }

        // Tira a borda azul do Select, quando ele é selecionado
        .css-1pahdxg-control {
            border: none;
            box-shadow: none;
        }

        // Não permite que nada sobreponha a lista de opções aberta
        .css-26l3qy-menu {
            z-index: 11;
        }
    }
`;
