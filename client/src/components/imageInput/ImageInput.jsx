import React from 'react';
import './ImageInput.css';

export const ImageInput = ({ image, setImage }) => {
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="upload">
      <label>
        <div className="upload-button">
          <div className="button">Select a file</div>
          <div className="">
            {image ? image.name.length >= 16 ? image.name.substring(0, 13) + '...' : image.name : 'No file selected'}
          </div>
        </div>
        <input type="file" onChange={handleImageChange} accept="image/*" hidden/>
      </label>

    </div>
  );
};
