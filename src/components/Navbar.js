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

    const handleLogout = () => {
        localStorage.removeItem("token");
        showAlert({ type: "User", operation: "Logout" });
        navigate("/");
        setProfile(false);
    }

    const handleCreateNotes = () => {
        navigate("/");

        setTimeout(() => {
            const target = document.getElementById("title");
            console.log(target);

            if (target) {
                target.focus();
                setProfile(false);
            }
        }, 0);

    }


    const handleChangePassword = () => {
        navigate("/changePass")
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
                        </ul>

                        <div id="logo" className='mx-5 pointer'>
                            <i className="fa-sharp fa-regular fa-user fa-2xl" id='logo-image' />
                        </div>

                        <div className={`position-absolute top-100 end-0 ${profile ? 'd-block' : 'd-none'}`} id='userProfile'>
                            {localStorage.getItem("token")
                                ?
                                <>
                                    <div>
                                        Hello &nbsp;
                                        <b>
                                            <span>
                                                {localStorage.name}
                                            </span>
                                        </b>
                                    </div>

                                    <div className='pointer' onClick={() => { navigate("/notes") }}>
                                        Your Notes
                                    </div>

                                    <div className='pointer' onClick={handleCreateNotes}>
                                        Create Notes
                                    </div>

                                    <hr />

                                    <div onClick={handleChangePassword}>
                                        Change Password
                                    </div>

                                    <div className='pointer' onClick={handleLogout}>
                                        Log Out
                                    </div>
                                </>
                                :
                                <>
                                    <div onClick={() => { navigate("/") }}>Log In / Sign Up</div>
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