import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileUpdate() {
  let navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = userInfo;

  const [error, setError] = useState(null);

  const onInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8080/api/users/profile/update",
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        }
      );

      navigate("/profile?successInfo=true");
    } catch (error) {
      console.error("Update failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorMessage
      ) {
        setError(error.response.data.errorMessage); // Set error message from response
      } else {
        // Default error message for any other error
        setError("Update failed. Please try again later.");
      }
    }
  };

  const loadUserProfile = async () => {
    const result = await axios.get(`http://localhost:8080/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    });
    setUserInfo(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Update info</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <div>
                <label htmlFor="Name" className="form-label">
                  Username
                </label>
                <input
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={(e) => onInputChange(e)}
                />
                <label
                  htmlFor="Name"
                  className="form-label"
                  style={{ marginTop: "20px" }}
                >
                  Email
                </label>
                <div>
                  <input
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <label
                  htmlFor="Name"
                  className="form-label"
                  style={{ marginTop: "20px" }}
                >
                  Current Password
                </label>
                <div>
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="Enter current password"
                    value={password}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div style={{ marginTop: "40px" }}>
                  <Link className="btn btn-outline-danger mx-2" to={"/profile"}>
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-outline-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}