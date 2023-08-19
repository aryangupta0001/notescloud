import React, { useState, useContext, useEffect } from 'react'
import { Link, Route, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import noteContext from '../context/notes/noteContext';



const Navbar = () => {
    let loadLogo = false;
    let location = useLocation();
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { showAlert, toggleLogin, setToggleLogin, user } = context;
    const [logo, setLogo] = useState(false);


    const handleLogout = () => {
        localStorage.removeItem("token");
        showAlert({ type: "User", operation: "Logout" });
        navigate("/");
    }

    useEffect(() => {

        if (!logo) {
            let height = document.getElementById("navbar").offsetHeight;

            let target = document.getElementById("logo-image");
            console.log(height);
            target.style.maxHeight = height + "px";
            setLogo(true);
        }
    }, [])

    const toggleProfile = () => {
        let target = document.getElementById("userProfile");
        let display = window.getComputedStyle(target).display;

        target.style.display = (display === "none") ? "block" : "none";
    }

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

                        <div id="logo" className='mx-5' style={{ cursor: "pointer" }} onClick={toggleProfile}>
                            <img src={require("./user.png")} alt="" className={`${logo ? 'd-block' : 'd-none'}`} id='logo-image' />
                        </div>

                        <div className='position-absolute top-100 end-0' id='userProfile' style={{ height: "100px", width: "250px", border: "2px solid black", display: "none" }}>
                            {localStorage.getItem("token")
                                ?
                                <>
                                    <div>Hello {user.name}</div>
                                    <div onClick={handleLogout} style={{ border: "2px solid red" }}>Log Out</div>
                                </>
                                :
                                <>
                                    <div>Log In / Sign Up</div>
                                </>
                            }
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
