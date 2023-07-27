// import { useState, createContext } from "react";
// const UserContext = createContext();


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

function App() {
  // const [user, setUser] = useState("Jesse Hall");

  return (
    <NoteState>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </NoteState>
      
  );
}

export default App;
