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
      {toggleLogin ? <Login /> : <Signup />}
    </>
  )
}

export default Home 