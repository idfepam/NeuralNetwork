import {Link} from "react-router-dom";
import './Header.css';

export const Header = () => (
    <header className="header">
        <div className="logo">EthnoVisionAI</div>
        <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/about">About/Pricing</Link>
            <Link to="/signin">Sign In</Link>
        </nav>
    </header>
);
