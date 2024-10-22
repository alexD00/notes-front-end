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
import SignUp from "./pages/SignUp";
import Profile from "./user/Profile";
import ProfileUpdate from "./user/ProfileUpdate";
import ProfilePasswordUpdate from "./user/ProfilePasswordUpdate";
import Settings from "./pages/Settings";
import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

function App() {
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!sessionStorage.getItem("jwtToken");

    return isAuthenticated ? children : <Navigate to="/" />;
  };

  const [theme, setTheme] = useState(
    () => sessionStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    sessionStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signUp" element={<SignUp />} />
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
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/update"
              element={
                <ProtectedRoute>
                  <ProfileUpdate />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/update/password"
              element={
                <ProtectedRoute>
                  <ProfilePasswordUpdate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings theme={theme} toggleTheme={toggleTheme} />
                </ProtectedRoute>
              }
            />
            /{/* Catch unsupported routes */}
            <Route path="/*" element={<Navigate to="/unsupported" />} />
            <Route path="/unsupported" element={<PageNotSupported />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
