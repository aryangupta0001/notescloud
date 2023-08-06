import { useContext } from "react";
import noteContext from './context/notes/noteContext'



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
  // const [user, setUser] = useState("Jesse Hall");
  const context = useContext(noteContext);
  const { showAlert } = context;



  return (
    <NoteState>

      <Router>
        <Alert alert={showAlert} />

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
