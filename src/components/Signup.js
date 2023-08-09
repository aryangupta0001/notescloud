import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const HOST = "http://127.0.0.1:5000";

  const [credentials, setCred] = useState({ username: "", email: "", password: "", cnfpassword: "" });

  const navigate = useNavigate();

  const onChange = (e) => {
    setCred({ ...credentials, [e.target.name]: e.target.value });
  }




  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = credentials;

    const response = await fetch(`${HOST}/api/auth/createuser`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ name: username, email, password })
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
    }
    else {
      alert(json.error);
      navigate("/signup");
    }
    console.log(json);
  }


  return (
    <div className='container my-5'>
      <form onSubmit={handleOnSubmit}>
        <div className='p-5'>
          <div className="mb-3 d-flex">
            <label htmlFor="name" className="form-label" style={{ width: "11%" }}>User Name</label>
            <input type="text" className="form-control w-25 mx-3" id="username" name="username" aria-describedby="username" value={credentials.username} onChange={onChange} />
            <span className={`${credentials.username.length >= 5 && 'd-none'} text-danger`}>[Min. 5 characters]</span>

          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="email" className="form-label" style={{ width: "11%" }}>Email address</label>
            <input type="email" className="form-control w-25 mx-3" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="password" className="form-label" style={{ width: "11%" }}>Password</label>
            <input type="password" className="form-control w-25 mx-3" id="password" name='password' value={credentials.password} onChange={onChange} autoComplete='on' />
            <span className={`${credentials.password.length >= 5 && 'd-none'} text-danger`}>[Min. 5 characters]</span>

          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="password" className="form-label" style={{ width: "11%" }}>Confirm Password</label>
            <input type="password" className="form-control w-25 mx-3" id="cnfpassword" name='cnfpassword' value={credentials.cnfpassword} onChange={onChange} />
            <span className={`${credentials.cnfpassword.length >= 5 && 'd-none'} text-danger`}>[Min. 5 characters]</span>
            <span className={`${(credentials.cnfpassword.length>0 && credentials.password !== credentials.cnfpassword) ? "d-block" : "d-none"} text-danger`}>&emsp;[Password & Confirm Password do not match]</span>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div >
  )
}

export default Signup