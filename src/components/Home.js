import { useNavigate } from "react-router-dom";
import Login from "./Login";



const Home = () => {
  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    navigate("/notes");
  }

  return (
    <>
    <div style={{width: "auto"}}>
      <h1 className="mt-5"><center>Welcome To NotesCloud</center></h1>
      <Login />
    </div>
    </>
  )
}

export default Home