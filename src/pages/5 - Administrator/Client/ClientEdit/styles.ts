import styled from 'styled-components';

interface SelectedProp {
    selected: boolean;
  }

export const Container = styled.div`
  height: 100vh;

  display: flex;
  place-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 1250px;

  form {
      width: 60%;
  }
`;

export const Title = styled.text`
    font-size: 70px;
    font-weight: 700;
    color: #023E7D;
    font-family: 'Ubuntu'
`;

export const Subtitle = styled.text`
    font-size: 30px;
    font-weight: 700;
    color: #5C677D;
    font-family: 'Ubuntu';
`;

export const DivFlex = styled.div`
    display: flex;
    align-items: center;
    place-content: center;
    justify-content: space-between;

    width: 100%;

    > div {
        width: 100%;
        margin-top: 8px;
    }
`;

export const DivFlexUserExisting = styled.div`
    display: flex;
    align-items: center;
    place-content: center;
    justify-content: space-between;

    width: 100%;
`;

export const CompanySection = styled.div`
    margin-top: 40px;
    text-align: center;
`;

export const AssistantSection = styled.div`
    display: flex;
    margin-top: 40px;
    text-align: center;
    justify-content: space-between;
`;

export const UserMasterSection = styled.div`
    margin-top: 40px;
    text-align: center;
`;

export const OptionButton = styled.div<SelectedProp>`
    margin-top: 20px;
    width: 350px;
    height: 60px;
    border: 1px solid #33415C;
    border-radius: 3px;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
    color: ${(props) => (props.selected ? '#FFF' : '#33415C')};
    background: ${(props) => (props.selected ? '#33415C' : 'transparent')};
    font-weight: 700;
    font-size: 15px;
    margin-right: 5px;

    svg {
        color: #CC6200;
        margin-right: 25px;
        flex-shrink: 0;
        width: 30px;
        height: 30px;
    }

    :hover {
        cursor: pointer;
        border-color: #CC6200;
    }
`;

export const OptionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Option1 = styled.button`
    margin-top: 20px;
    width: 350px;
    height: 60px;
    border: 1px solid #33415C;
    border-radius: 3px;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
    color: #FFF;
    background: #33415C;
    font-weight: 700;
    font-size: 15px;
    margin-right: 5px;

    svg {
        color: #CC6200;
        margin-right: 25px;
        flex-shrink: 0;
        width: 20px;
        height: 20px;
    }

    :hover {
        cursor: pointer;
        background: transparent;
        color: #33415C;

        svg {
            color: #33415C;
        }
    }
`;

export const Option2 = styled.button`
    margin-top: 20px;
    width: 350px;
    height: 60px;
    border: 1px solid #33415C;
    border-radius: 3px;

    align-items: center;
    place-content: center;
    display: flex;
    margin-bottom: 8px;
    color: #FFF;
    background: #33415C;
    font-weight: 700;
    font-size: 15px;
    margin-right: 5px;

    svg {
        color: #CC6200;
        margin-right: 25px;
        flex-shrink: 0;
        width: 20px;
        height: 20px;
    }

    :hover {
        cursor: pointer;
        background: transparent;
        color: #33415C;

        svg {
            color: #33415C;
        }
    }
`;
