import {useState} from "react";
import {FileUploadBlock} from "../fileUploadBlock/FileUploadBlock.jsx";
import './Home.css';

export const Home = () => {
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
    };

    return (
        <div className="content-wrapper">
            <FileUploadBlock
                image={image}
                setImage={setImage}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
                result={result}
            />
        </div>
    );
}
