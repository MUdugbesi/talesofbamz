/* eslint-disable react/prop-types */
import React from 'react';

const ImageCard = ({ imgUrl, key, user, timestamp }) => {
  console.log(timestamp);
  return (
    <>
      <div key={key}>
        <img src={imgUrl} alt={imgUrl} className='image-card' />
        <p className='text-sm text-center pt-2'>Uploaded by {user}</p>
      </div>
    </>
  );
};

export default ImageCard;
