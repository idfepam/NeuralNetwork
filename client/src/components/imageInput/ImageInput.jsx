import React, {useState} from 'react';
import "./ImageInput.css"

export const ImageInput = ({image, setImage}) => {
    return (
        <div className="upload">
            <label>
                <input name="image" type="file" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])}/>
                <div>
                    {
                        image && <div className="upload_filename">{image.name}</div>
                    }
                    <div className="button">Upload image</div>
                </div>
            </label>
        </div>
    );
};
