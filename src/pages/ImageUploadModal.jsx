import React, { useEffect, useState } from 'react';
import { Input, Button, UploadButton } from '../components';
import { IoMdClose, IoMdCloudUpload } from 'react-icons/io';
import Loader from '../components/Loader/Loader';

const ImageUploadModal = ({
  handleFileChange,
  handleUploadImage,
  handleFormClose,
  img,
  uploading,
}) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (img !== null) {
      const image = URL.createObjectURL(img);
      setFile(image);
      
    }
  }, [img]);

  const buttonText = uploading ? (
    <div className='flex justify-center items-center gap-2'>
      Uploading
      <Loader className='flex' size={30} type='dot' color='white' />
    </div>
  ) : (
    'Upload?'
  );

  return (
    <>
      <div className='absolute w-full h-auto'>
        <div className='upload_form h-auto -top-26 flex flex-col gap-10'>
          <div className='absolute -top-2 -right-2 border border-black bg-black rounded-full w-[30px] h-[30px] flex justify-center items-center'>
            <IoMdClose
              className='text-white hover:cursor-pointer active:text-[red]'
              onClick={handleFormClose}
            />
          </div>
          <div className='border-2 border-dotted border-black w-auto h-auto p-4 mt-5 min-h-[300px] rounded-xl flex items-center justify-center'>
            {!file ? (
              <>
                <label htmlFor='file-input'>
                  <div className=' flex justify-center items-center flex-col'>
                    <IoMdCloudUpload className='size-[120px] text-purple-500 hover:cursor-pointer' />
                    <p className='text-sm font-rubik hover:text-[var(--bg)] hover:cursor-pointer'>
                      Click to upload photos
                    </p>
                  </div>
                </label>
                <input
                  type='file'
                  onChange={handleFileChange}
                  className='file-input'
                  id='file-input'
                />
              </>
            ) : (
              <>
                {img?.type === 'image/jpeg' ? (
                  <img
                    src={file}
                    alt='file uploaded'
                    className='w-full h-full rounded-lg object-contain'
                  />
                ) : (
                  <video width='750' height='500' controls>
                    <source src={file} type='video/mp4' />
                  </video>
                )}
              </>
            )}
          </div>

          {file && (
            <div className='flex justify-center items-center'>
              <UploadButton
                className={`upload hover:bg-primary flex justify-center w-[50%] h-[40px] rounded-lg ${
                  uploading && 'text-white bg-primary'
                }`}
                onClick={handleUploadImage}
                text={buttonText}
              />
             </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUploadModal;
