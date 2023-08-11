import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext'


const Login = () => {

    const [credentials, setCred] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const context = useContext(noteContext);
    
    const HOST = "http://127.0.0.1:5000";
    const { showAlert } = context;

    const onChange = (e) => {
        setCred({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${HOST}/api/auth/userlogin`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();

        if (json.success) {
            localStorage.setItem("token", json.jwtToken);
            navigate("/");
            showAlert({type: "User", operation: "Login"});
        }
        else {
            alert("Invalid Credentials")
        }
        console.log(json);
    }

    return (
        <div className='container my-5'>
            <form onSubmit={handleOnSubmit}>
                <div className='w-50 p-5'>
                    <div className="mb-3 d-flex justify-content-between">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control w-50" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-3 d-flex justify-content-between">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control w-50" id="password" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div >
    )
}

export default Login