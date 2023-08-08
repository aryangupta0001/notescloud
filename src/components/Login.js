import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Login = () => {

    const [credentials, setCred] = useState({ email: "", password: "" });
    const context = useContext(noteContext);
    const { userLogin } = context;

    const onChange = (e) => {
        setCred({ ...credentials, [e.target.name]: e.target.value });
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        userLogin(credentials.email, credentials.password);
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