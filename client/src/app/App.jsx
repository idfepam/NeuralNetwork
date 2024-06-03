import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {About, Header, Home, SignIn, SignUp} from "../components/index.js";
import './App.css';


function App() {
    return (
        <Router>
            <div className="app">
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
