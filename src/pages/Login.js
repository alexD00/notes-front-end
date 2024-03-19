import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null); // State to store error message

  const { username, password } = loginInfo;

  const onInputChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        loginInfo
      );
      const jwtToken = response.data.token;
      sessionStorage.setItem("jwtToken", jwtToken);

      navigate("/home"); // Redirect to home page upon successful login
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (e.g., display error message to user)
      setError("Invalid username or password"); // Set error message
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Log in</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <div>
                <label htmlFor="Name" className="form-label">
                  Username
                </label>
                <input
                  value={username}
                  className="form-control"
                  placeholder="Type username"
                  name="username"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div>
                <label
                  htmlFor="Name"
                  className="form-label"
                  style={{ marginTop: "20px" }}
                >
                  Password
                </label>
                <input
                  value={password}
                  type="password"
                  className="form-control"
                  placeholder="Type password"
                  name="password"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary"
                style={{ marginTop: "20px" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        Don't have an account? <Link to="/signUp">Sign up</Link>
      </div>
    </div>
  );
}
