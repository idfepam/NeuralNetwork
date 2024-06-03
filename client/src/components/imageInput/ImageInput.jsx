import React from 'react';
import './ImageInput.css';

export const ImageInput = ({ image, setImage }) => {
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="upload">
      <input type="file" className="upload-button" onChange={handleImageChange} />
    </div>
  );
};
