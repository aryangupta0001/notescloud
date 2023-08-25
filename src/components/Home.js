import { useContext } from "react";
import noteContext from '../context/notes/noteContext'
import Login from "./Login";
import Signup from "./Signup";
import Notes from "./Notes";


const Home = () => {
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