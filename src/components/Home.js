import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { useContext } from "react";
import Signup from "./Signup";

import noteContext from '../context/notes/noteContext'




const Home = () => {

  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { toggleLogin } = context;

  if (localStorage.getItem("token")) {
    navigate("/notes");
  }

  return (
    <>
      {/* <div className="w-50 m-auto">
        <h1 className="mt-5 fw-bold fs-1 mb-0"><center>Welcome To NotesCloud</center></h1> */}

        {toggleLogin ? <Login /> : <Signup />}
      {/* </div> */}
    </>
  )
}

export default Home 