import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useState } from "react";
import Signup from "./Signup";



const Home = () => {
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    navigate("/notes");
  }

  return (
    <>
      <div className="w-50 m-auto">
        <h1 className="mt-5 fw-bold fs-1 mb-10"><center>Welcome To NotesCloud</center></h1>


        <Login />
        <Signup />

        <center>
          Don't have an account ?
          <Link className="navbar-brand text-primary" to="/signup">&nbsp; Sign Up</Link>
        </center>
      </div>
    </>
  )
}

export default Home 