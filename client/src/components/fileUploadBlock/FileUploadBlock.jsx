import {ImageInput} from "../imageInput/ImageInput.jsx";
import "./FileUploadBlock.css"
import {useState} from "react";

export const FileUploadBlock = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const formData = new FormData();
            formData.append('file', image);
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setResult(data.predicted_class);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
        setImage(null);
    };

    return (
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
    )
}
