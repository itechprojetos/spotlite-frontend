import React, { InputHTMLAttributes, useCallback } from 'react';

import { cep, currency, cpf } from './masks';

import { Container, Label, InputText } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: 'cep' | 'currency' | 'cpf';
  prefix?: string;
}

const Input: React.FC<InputProps> = ({ mask, prefix, ...props }) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === 'cep') {
        cep(e);
      }
      if (mask === 'currency') {
        currency(e);
      }
      if (mask === 'cpf') {
        cpf(e);
      }
    },
    [mask],
  );

  return (
    <Container className="input-group prefix">
      {/* <Label className="prefix-span">{prefix}</Label> */}
      <InputText autoComplete="off" {...props} onKeyUp={handleKeyUp} />
    </Container>
  );
};

export default Input;
