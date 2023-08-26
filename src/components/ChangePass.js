import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext'

const ChangePass = () => {
    const context = useContext(noteContext);

    const { showAlert, setToggleLogin, userAuth, changePass } = context;

    const [credentials, setCred] = useState({ password: "", newpassword: "", cnfpassword: "" });


    const onChange = (e) => {
        setCred({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const { password, newpassword, cnfpassword } = credentials;

        setCred({ password: "", newpassword: "", cnfpassword: "" });

        changePass(password, newpassword);

    }

    return (
        <div className="w-50 m-auto">
            <h1 className="mt-5 fw-bold fs-1 mb-0"><center>Welcome To NotesCloud</center></h1>
            <div className='container my-5 m-auto' >
                <form onSubmit={handleOnSubmit}>
                    <div className='py-5 m-auto' style={{ width: "50%", boxShadow: "0 10px 24px hsla(0,0%,0%,0.05), 0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1)" }}  >
                        <div className="m-auto" style={{ width: "83%" }}>
                            <label htmlFor="password" className="form-label d-block fw-semibold fs-5" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif' }}>Current Password</label>
                            <input type="password" className="form-control m-auto" id="password" name="password" value={credentials.password} onChange={onChange} />
                        </div>

                        <div className="m-auto mt-3 mb-3" style={{ width: "83%" }}>
                            <label htmlFor="newpassword" className="form-label fw-semibold fs-5 d-inline" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif' }}>New Password</label>
                            <span className={`${credentials.password.length >= 5 && 'd-none'} text-danger`}>&emsp;[Min. 5 characters]</span>
                            <input type="password" className="form-control m-auto" id="newpassword" name='newpassword' value={credentials.newpassword} onChange={onChange} autoComplete='on' />
                        </div>

                        <div className="m-auto mt-3 mb-3" style={{ width: "83%" }}>
                            <label htmlFor="password" className="form-label fw-semibold fs-5 d-inline" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif' }}>Re-Enter New Password</label>
                            <p className={`${credentials.cnfpassword.length >= 5 && 'd-none'} text-danger my-0`}>[Min. 5 characters]</p>
                            <span className={`${(credentials.cnfpassword.length > 0 && credentials.newpassword !== credentials.cnfpassword) ? "d-inline" : "d-none"} text-danger`}>[Password & Confirm Password do not match]</span>
                            <input type="password" className="form-control m-auto" id="cnfpassword" name='cnfpassword' value={credentials.cnfpassword} onChange={onChange} autoComplete='on' />
                        </div>

                        <button type="submit" className="btn btn-primary m-auto d-block mt-3" style={{ width: "83%" }}>Change Password</button>
                    </div>
                </form>

                <center className='mt-5'>
                    Don't have an account ?
                    <button className="navbar-brand text-primary" onClick={() => { setToggleLogin(false) }} style={{ border: "none", background: "none" }}>&nbsp; Sign Up</button>
                </center>

            </div >
        </div>
    )
}

export default ChangePass
