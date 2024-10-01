/* eslint-disable react/prop-types */
import React from 'react';
import { IoMdHeart } from 'react-icons/io';
import { GiVanillaFlower } from 'react-icons/gi';

const Card = ({ icon, text, className }) => {
  return (
    <>
      <div className={`${className} relative`}>
        {icon === 'heart' ? (
          <div className='card_heart_top'>
            <IoMdHeart className='size-8 text-white' />
          </div>
        ) : (
          <div className='absolute right-4 -top-5  '>
            <GiVanillaFlower className='size-10 text-purple-500' />
          </div>
        )}
        <p className='card_text'>{text}</p>
        {icon === 'heart' ? (
          <div className='card_heart_bottom'>
            <IoMdHeart className='size-8 text-white' />
          </div>
        ) : (
          <div className='absolute left-6 -bottom-4  '>
            <GiVanillaFlower className='size-10 text-purple-500' />
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
