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
import { Navigate } from "react-router-dom";
import PageNotSupported from "./pages/PageNotSupported";

function App() {
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!sessionStorage.getItem("jwtToken");

    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />

          {/* <Route exact path="/home" element={<Home />} /> */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addNote"
            element={
              <ProtectedRoute>
                <AddNote />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editNote/:id"
            element={
              <ProtectedRoute>
                <EditNote />
              </ProtectedRoute>
            }
          />

          <Route
            path="/viewNote/:id"
            element={
              <ProtectedRoute>
                <ViewNote />
              </ProtectedRoute>
            }
          />

          {/* Catch unsupported routes */}
          <Route path="/*" element={<Navigate to="/unsupported" />} />
          <Route path="/unsupported" element={<PageNotSupported />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
