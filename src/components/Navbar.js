import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import noteContext from '../context/notes/noteContext'





const Navbar = () => {
    let location = useLocation();
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { showAlert, toggleLogin, setToggleLogin } = context;

    const handleLogout = () => {
        localStorage.removeItem("token");
        showAlert({ type: "User", operation: "Logout" });
        navigate("/");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">

                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
                            </li>
                        </ul>
                        {
                            localStorage.getItem("token") ?
                                <button type="submit" className="btn btn-outline-light mx-1" onClick={handleLogout} >Log Out</button>
                                :
                                toggleLogin ?
                                    < Link className="btn btn-outline-light mx-1" type="submit" onClick={() => { setToggleLogin(false) }}>Sign Up</Link>
                                    :
                                    <Link className="btn btn-outline-light mx-1" type="submit" onClick={() => { setToggleLogin(true) }}>Login</Link>

                        }
                    </div>
                </div >
            </nav >
        </div >
    )
}

export default Navbar
