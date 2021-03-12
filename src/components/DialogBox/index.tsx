import React, { ButtonHTMLAttributes } from 'react';
import {
  FiXCircle,
} from 'react-icons/fi';
import { Container, Overlay } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    open?: boolean;
    onClose?(): void;
}

const DialogBox: React.FC<ButtonProps> = ({
  children, open, onClose, ...rest
}) => {
  if (!open) return null;
  return (
    <>
      <Overlay />
      <Container {...rest}>

        <FiXCircle
          onClick={onClose}
        />

        <div>{children}</div>
      </Container>
    </>
  );
};

export default DialogBox;
