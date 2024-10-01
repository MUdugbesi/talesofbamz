/* eslint-disable react/prop-types */
import React from 'react';
import { IoMdCloudUpload } from 'react-icons/io';

const UploadButton = ({ className, onClick, text }) => {
  return (
    <div className={className} onClick={onClick}>
      <IoMdCloudUpload />
      <button>{text}</button>
    </div>
  );
};

export default UploadButton;
