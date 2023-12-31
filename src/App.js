import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Notes from "./components/Notes";
import ChangePass from "./components/ChangePass";

function App() {
  // localStorage.removeItem("token");
  return (
    <NoteState>
      <Router>
        <div className="d-flex flex-column sticky-top">
          <Navbar />
          <Alert />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path='/about' element={<About />} />
          <Route path='/changePass' element={<ChangePass />} />
          {/* <Route path='/login' element={<Login />} /> */}
          {/* <Route path='/signup' element={<Signup />} /> */}
        </Routes>
      </Router>
    </NoteState>

  );
}

export default App;