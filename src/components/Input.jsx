import React from 'react';

const Input = ({
  placeholder,
  label,
  onChange,
  name,
  value,
  type,
  className,
}) => {
  return (
    <>
      <div>
        {label && (
          <label htmlFor={label} className='text-sm mb-1'>
            {label}
          </label>
        )}
        <div className='border border-[#acacacb1] h-[54px] rounded-lg'>
          <input
            type={type}
            name={name}
            value={value}
            className={`${className} input`}
            placeholder={placeholder}
            id={label}
            onChange={onChange}
            required={false}
          />
        </div>
      </div>
    </>
  );
};

export default Input;
