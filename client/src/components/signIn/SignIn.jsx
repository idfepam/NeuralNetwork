import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './SignIn.css';

export const SignIn = ({isAuth, setIsAuth, setUser}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(isAuth) {
            navigate("/");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({email, password});
        setIsAuth(true);
        navigate("/");
    };


    return (
        <div className="signin-container">
            <div className="signin-box">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="button">Sign In</button>
                </form>
                <p>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};
