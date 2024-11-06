import React from 'react';

const Input = ({
  placeholder,
  label,
  onChange,
  name,
  value,
  type,
  className,
  disable,
  required,
  ...props
}) => {
  return (
    <>
      <div>
        {label && (
          <label htmlFor={label} className='text-[10px] md:text-sm mb-1'>
            {label}
          </label>
        )}
        <div className='border border-[#acacacb1] h-[40px] md:h-[54px] rounded-lg'>
          <input
            type={type}
            name={name}
            value={value}
            className={`${className} input`}
            placeholder={placeholder}
            id={label}
            onChange={onChange}
            required={required}
            disabled={disable}
            {...props}
          />
        </div>
      </div>
    </>
  );
};

export default Input;
