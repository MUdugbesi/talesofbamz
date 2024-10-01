import React, { useEffect, useState } from 'react';
import { Input, Button, UploadButton } from '../components';
import { IoMdClose, IoMdCloudUpload } from 'react-icons/io';

const ImageUploadModal = ({
  handleFileChange,
  handleUploadImage,
  handleFormClose,
  img,
}) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (img !== null) {
      const image = URL.createObjectURL(img);
      setFile(image);
    }
  }, [img]);

  return (
    <>
      <div className='absolute mx-auto w-screen'>
        <div className='upload_form -top-14 flex flex-col gap-10'>
          <div className='absolute -top-2 -right-2 border border-black bg-black rounded-full w-[30px] h-[30px] flex justify-center items-center'>
            <IoMdClose
              className='text-white hover:cursor-pointer active:text-[red]'
              onClick={handleFormClose}
            />
          </div>
          <div className='border-2 border-dotted border-black w-full h-auto p-4 mt-5 min-h-[300px] rounded-xl flex items-center justify-center'>
            {!file ? (
              <>
                <label htmlFor='file-input'>
                  <div className=' flex justify-center items-center flex-col'>
                    <IoMdCloudUpload className='size-[120px] text-purple-500' />
                    <p className='text-sm font-rubik'>Click to upload photos</p>
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
                <div className=''>
                  <img
                    src={file}
                    alt=''
                    className='w-full h-full rounded-lg object-contain'
                  />
                </div>
              </>
            )}
          </div>
          {file && (
            <div className='flex justify-center items-center'>
              <UploadButton
                className='upload hover:bg-primary flex justify-center w-[50%] h-[40px] rounded-lg'
                onClick={handleUploadImage}
                text='Upload?'
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUploadModal;
