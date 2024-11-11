/* eslint-disable react/prop-types */

const ImageCard = ({ imgUrl, user, type }) => {
  return (
    <>
      <div>
        <div className='relative cursor-pointer items-center justify-center flex'>
          {type !== 'video/quicktime' ? (
            <img src={imgUrl} alt={imgUrl} className='image-card' />
          ) : (
            <video width='750' height='500' controls className="image-card">
              <source src={imgUrl} type='video/mp4' />
            </video>
          )}
        </div>
        <p className='text-sm text-center pt-2'>
          Uploaded by: <span className='italic font-[500]'>{user}</span>
        </p>
      </div>
    </>
  );
};

export default ImageCard;
