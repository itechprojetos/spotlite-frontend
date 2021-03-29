import React, { useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';

import { Container } from './styles';

const Select = ({ name, ...rest }: any): any => {
  const selectRef = useRef(null);

  const {
    fieldName, defaultValue, registerField, error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      setValue: (ref, value) => {
        ref.select.setValue(value || null);
      },
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: any) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <ReactSelect
        className={`select ${error && 'select-error'}`}
        defaultValue={defaultValue}
        placeholder="Selecione..."
        noOptionsMessage={() => 'Sem correspondência'}
        ref={selectRef}
        {...rest}
      />
    </Container>
  );
};

export default Select;
