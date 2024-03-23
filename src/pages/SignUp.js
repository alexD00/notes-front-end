import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// rfc

export default function SignUp() {
  let navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null); // State to store error message

  const { username, email, password } = userInfo;

  const onInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        userInfo
      );

      navigate("/?success=true"); // Redirect to home page upon successful login
    } catch (error) {
      console.error("Sign up failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorMessage
      ) {
        setError(error.response.data.errorMessage); // Set error message from response
      } else {
        // Default error message for any other error
        setError("Sign up failed. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Sign up</h2>
          <hr />
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <div className="text-start">
                <label htmlFor="Name" className="form-label">
                  Username
                </label>
                <input
                  onChange={(e) => onInputChange(e)}
                  value={username}
                  className="form-control"
                  placeholder="Type username"
                  name="username"
                />
                <div>
                  <label
                    htmlFor="Name"
                    className="form-label"
                    style={{ marginTop: "20px" }}
                  >
                    Email
                  </label>
                  <input
                    onChange={(e) => onInputChange(e)}
                    value={email}
                    type="email"
                    className="form-control"
                    placeholder="Type email"
                    name="email"
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
                    onChange={(e) => onInputChange(e)}
                    value={password}
                    type="password"
                    className="form-control"
                    placeholder="Type password"
                    name="password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary mx-2"
                style={{ marginTop: "40px", width: "100px" }}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        Have an account? <Link to="/">Log in</Link>
      </div>
    </div>
  );
}
