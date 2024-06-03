import {ImageInput} from "../imageInput/ImageInput.jsx";
import "./FileUploadBlock.css"

export const FileUploadBlock = ({image, setImage, handleSubmit, isLoading, error, result}) => (
    <div className="file-upload-block">
        <h1>EthnoVisionAI</h1>
        <p>Ethnicity Recognition on Images</p>
        <ImageInput image={image} setImage={setImage}/>
        <button className="button" disabled={!image} onClick={handleSubmit}>
            Recognize
        </button>
        {isLoading && <div className="loader"></div>}
        {error && <div className="error">{error}</div>}
        {result && (
            <div className="result">
                <h3>Recognition Result</h3>
                <p>Ethnicity: {result}</p>
            </div>
        )}
    </div>
);
