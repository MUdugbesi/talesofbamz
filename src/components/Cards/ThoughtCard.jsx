import React from 'react';

const ThoughtCard = ({ thought }) => {
  return (
    <div className='glass_container flex flex-col justify-center hover:cursor-pointer'>
      <p className='p-4 text-sm'>{thought.thought}</p>
      <p className='text-end italic text-[12px] pr-10'>- {thought.name}</p>
    </div>
  );
};

export default ThoughtCard;
