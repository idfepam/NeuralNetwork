import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { ImageInput } from '../components/imageInput/ImageInput.jsx';
import SignIn from './signIn/SignIn.jsx';
import SignUp from './signUp/SignUp.jsx';

const Header = () => (
  <header className="header">
    <div className="logo">EthnoVisionAI</div>
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/pricing">Pricing</Link>
      <Link to="/signin">Sign In</Link>
    </nav>
  </header>
);

const FileUploadBlock = ({ image, setImage, handleSubmit, isLoading, error, result }) => (
  <div className="file-upload-block">
    <h1>EthnoVisionAI</h1>
    <p>Ethnicity Recognition on Images</p>
    <ImageInput image={image} setImage={setImage} />
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

function Home() {
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

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
