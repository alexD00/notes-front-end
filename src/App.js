import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AddNote from "./notes/AddNote";
import EditNote from "./notes/EditNote";
import ViewNote from "./notes/ViewNote";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/addNote" element={<AddNote />} />
          <Route exact path="/editNote/:id" element={<EditNote />} />
          <Route exact path="/viewNote/:id" element={<ViewNote />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
