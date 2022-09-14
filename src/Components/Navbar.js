import React from 'react'
import netflixLogo from '../Daco_4532423.png'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand">
                <img src={netflixLogo} width="40" height="40" className="d-inline-block align-top" alt="" />
                <span style={{ color: "white", fontSize: "2rem", fontWeight: "bold" }}>Netflix</span>
            </span>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <Link to='/'>
                        <li className="nav-item active">
                            <span className="nav-link" style={{ color: "white", fontSize: "2rem" }}>Home</span>
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className="nav-item">
                            <span className="nav-link" style={{ color: "white", fontSize: "2rem" }}>About Us</span>
                        </li>
                    </Link>
                    <Link to='/movies'>
                        <li className="nav-item">
                            <span className="nav-link" style={{ color: "white", fontSize: "2rem" }}>Movies</span>
                        </li>
                    </Link>

                </ul>

            </div>
        </nav>
    )
}

export default Navbar