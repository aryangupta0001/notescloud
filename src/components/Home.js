import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { useContext } from "react";
import Signup from "./Signup";

import noteContext from '../context/notes/noteContext'
import Notes from "./Notes";




const Home = () => {

  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { toggleLogin } = context;

  return (
    <>
      {localStorage.getItem("token") ? <Notes /> : (toggleLogin ? <Login /> : <Signup />)}
      {/* {toggleLogin ? <Login /> : <Signup />} */}
    </>
  )
}

export default Home 