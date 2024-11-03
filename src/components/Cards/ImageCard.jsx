/* eslint-disable react/prop-types */

const ImageCard = ({ imgUrl, user }) => {
  return (
    <>
      <div>
        <div className='relative cursor-pointer items-center justify-center flex'>
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
