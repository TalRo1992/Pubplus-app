import React from 'react';
import { ActionButtonProps } from '../../types/base';

const Button: React.FC<ActionButtonProps> = ({ title, handleClick }) => {
  return (
    <button className='button-ui' onClick={handleClick}>{title}</button>
  );
};

export default Button;
