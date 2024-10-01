import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const Button = ({ className, onClick, text, type }) => {
  return (
    <button className={className} onClick={onClick}>
      {type === 'google' ? <FcGoogle /> : ''}
      {text}
    </button>
  );
};

export default Button;
