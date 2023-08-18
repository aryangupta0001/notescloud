import React, { useContext, useEffect } from 'react'
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

    useEffect(() => {
        let height = document.getElementById("navbar").offsetHeight;
        let target = document.getElementById("logo");
        console.log(height);

        let image = document.createElement("img");
        image.src = require("./user.png");

        target.appendChild(image);

        image.style.maxHeight = height + "px";
    }, [])

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary" id='navbar' data-bs-theme="dark">

                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NotesCloud</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>

                        <div id="logo"> 
                        </div>
                        {/* {
                            localStorage.getItem("token") ?
                                <button type="submit" className="btn btn-outline-light mx-1" onClick={handleLogout} >Log Out</button>
                                :
                                toggleLogin ?
                                    <Link className="btn btn-outline-light mx-1" type="submit" onClick={() => { setToggleLogin(false) }}>Sign Up</Link>
                                    :
                                    <Link className="btn btn-outline-light mx-1" type="submit" onClick={() => { setToggleLogin(true) }}>Login</Link>
                        } */}
                    </div>
                </div >
            </nav >
        </div >
    )
}

export default Navbar
