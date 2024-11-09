import React from 'react';
import { Button } from '../components';
import { Link } from 'react-router-dom';

const Footer = ({ handleContactPopOver }) => {
  return (
    <div className='w-[90%] mx-auto flex flex-col md:flex-row justify-center items-center mb-10 md:gap-3 mt-5'>
      <p className='text-white text-[12px] md:text-[16px] text-center'>
        Developed and designed by @Sparkle - content support by @Teemah
      </p>
      <span
        className='hover:cursor-pointer text-[var(--bg2)] font-[500] max-sm:text-[14px] md:font-bold hover:scale-[1.05] contact'
        onClick={handleContactPopOver}
      >
        Get in Touch?
      </span>
    </div>
  );
};

export default Footer;
