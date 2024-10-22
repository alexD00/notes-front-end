import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const isSuccess = queryParams.get("success") === "true";
  const [showAlert, setShowAlert] = useState(isSuccess);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

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
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorMessage
      ) {
        setError(error.response.data.errorMessage); // Set error message from response
      } else {
        // Default error message for any other error
        setError("Log in failed. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow target-container">
          <h2 className="text-center m-4">Log in</h2>
          <hr />
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <div className="text-start">
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
              <div className="text-start">
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
                className="btn btn-primary mx-2"
                style={{ marginTop: "40px", width: "100px" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="label-color" style={{ marginTop: "20px" }}>
        Don't have an account? <Link to="/signUp">Sign up</Link>
      </div>
      {showAlert && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <div
            className="alert alert-success"
            role="alert"
            style={{ display: "inline-block", minWidth: "fit-content" }}
          >
            Account created successfully. Please log in.
          </div>
        </div>
      )}
    </div>
  );
}
