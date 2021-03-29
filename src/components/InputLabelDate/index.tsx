import React, {
  InputHTMLAttributes, useEffect, useRef, useState, useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label?: string;
    id: string;
    containerStyle?: object;
    icon?: React.ComponentType<IconBaseProps>;
}

const InputLabel: React.FC<InputProps> = ({
  name, containerStyle = {}, icon: Icon, label, id, ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name);
  const [isActive, setIsActive] = useState(true);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  // Toda vez que o texto mudar, ele verifica se o input está ou não vazio, para descer ou subir o label
  const handleTextChange = useCallback((text: string) => {
    if (text !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, []);

  // Assim que a página for carregada, ele verifica se o input está ou não vazio, para descer ou subir o label
  const handleStart = useCallback(() => {
    const data = (document.getElementById(id) as HTMLInputElement).value;

    if (data !== '') {
      setIsActive(true);
    }
  }, [id]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });

    handleStart();
  }, [fieldName, registerField, handleStart]);

  return (
    <Container id="float-label" style={containerStyle} isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onChange={(e) => handleTextChange(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        id={id}
        ref={inputRef}
        {...rest}
      />

      <label className={isActive ? 'Active' : ''}>
        {label}
      </label>

      {error
      && (
      <Error title={error}>
        {/* <FiAlertCircle color="C53030" size={20} /> */}
      </Error>
      )}
    </Container>
  );
};

export default InputLabel;
