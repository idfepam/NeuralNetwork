import { useState } from 'react'
import './App.css'
import {ImageInput} from "../components/imageInput/ImageInput.jsx";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const formData = new FormData();
            formData.append('file', image);
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data)
            setResult(data.predicted_class);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    if(isLoading) {
        return (
            <div className="app">
                <div className="loader">
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app">
                <div className="error">
                    {error}
                </div>
            </div>
        );
    }

    if (result !== null) {
        return (
            <div className="app">
                <div className="result">
                    {result}
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <div className="">
            <ImageInput image={image} setImage={setImage}/>
                <button className="button" disabled={!image} onClick={handleSubmit}>Go</button>
            </div>
    </div>
  )
}

export default App
