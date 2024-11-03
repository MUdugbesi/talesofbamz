import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const Button = ({
  className,
  onClick,
  text,
  type,
  disable,
  ...props
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      {...props}
      disabled={disable}
    >
      {type === 'google' ? <FcGoogle /> : ''}
      {text}
    </button>
  );
};

export default Button;
