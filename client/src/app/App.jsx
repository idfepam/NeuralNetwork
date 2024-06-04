import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {About, Header, Home, SignIn, SignUp} from "../components/index.js";
import './App.css';
import {useState} from "react";


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <Router>
            <div className="app">
                <Header isAuth={isAuth} user={user}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signin" element={<SignIn isAuth={isAuth} setIsAuth={setIsAuth} setUser={setUser}/>}/>
                    <Route path="/signup" element={<SignUp isAuth={isAuth} setIsAuth={setIsAuth} setUser={setUser}/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
