/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IoExpand } from 'react-icons/io5';

const ImageCard = ({ imgUrl, num, user, handleExpandImage }) => {
  num = num + 1;
  const [mouseOver, setMouseOver] = useState(false);
  const handleMouseOver = () => {
    setMouseOver((prev) => !prev);
  };
  return (
    <>
      <div>
        <div
          className='relative cursor-pointer items-center justify-center flex'
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOver}
        >
          {mouseOver && (
            <IoExpand
              onClick={(e) => handleExpandImage(e, num)}
              className='absolute text-primary size-10 hover:cursor-pointer hover:scale-[1.05] transition ease-in-out delay-0 duration-500 bottom-2 right-14 md:right-2 lg:right-4 '
            />
          )}

          <img src={imgUrl} alt={imgUrl} className='image-card' />
        </div>
        <p className='text-sm text-center pt-2'>
          Uploaded by: <span className='italic font-[500]'>{user}</span>
        </p>
      </div>
    </>
  );
};

export default ImageCard;
