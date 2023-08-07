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

function App() {
  return (
    <NoteState>
      <Router>
        <div className="d-flex flex-column sticky-top">
          <Navbar />
          <Alert />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </NoteState>

  );
}

export default App;