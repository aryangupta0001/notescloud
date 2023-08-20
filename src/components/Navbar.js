import React, { useState, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import noteContext from '../context/notes/noteContext';



const Navbar = () => {
    let location = useLocation();
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { showAlert } = context;
    const [logo, setLogo] = useState(false);
    const [profile, setProfile] = useState(false)


    const handleLogout = () => {
        localStorage.removeItem("token");
        showAlert({ type: "User", operation: "Logout" });
        navigate("/");
    }

    useEffect(() => {

        if (!logo) {
            let height = document.getElementById("navbar").offsetHeight;

            let target = document.getElementById("logo-image");
            target.style.maxHeight = height + "px";
            setLogo(true);
        }

        let target = document.getElementById("userProfile");
        target.style.display = "none";

    }, [])


    useEffect(() => {
        let target1 = document.getElementById("userProfile");
        let target2 = document.getElementById("logo");

        const handleOutsideClick = (event) => {
            if (profile) {
                if (!target1.contains(event.target)) {
                    setProfile(false);
                }
            }
            else {
                if (target2.contains(event.target)) {
                    setProfile(true);
                }
            }
        }

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };

    })

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

                        <div id="logo" className='mx-5 pointer'>
                            <img src={require("./user.png")} alt="" className={`${logo ? 'd-block' : 'd-none'}`} id='logo-image' />
                        </div>

                        <div className={`position-absolute top-100 end-0 ${profile ? 'd-block' : 'd-none'}`} id='userProfile'>
                            {localStorage.getItem("token")
                                ?
                                <>
                                    <div>
                                        Hello &nbsp;
                                        <span>
                                            {localStorage.name}
                                        </span>
                                    </div>

                                    <div onClick={() => { navigate("/notes") }}>
                                        Your Notes
                                    </div>

                                    <div>
                                        Create Notes
                                    </div>

                                    <div className='pointer' onClick={handleLogout}>
                                        Log Out
                                    </div>
                                </>
                                :
                                <>
                                    <div>Log In / Sign Up</div>
                                </>
                            }
                        </div>
                    </div>
                </div >
            </nav >
        </div >
    )
}

export default Navbar
