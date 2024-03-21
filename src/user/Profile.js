import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });

  const queryParams = new URLSearchParams(window.location.search);
  const isSuccess = queryParams.get("successInfo") === "true";
  const [showAlert, setShowAlert] = useState(isSuccess);

  const isSuccessPass = queryParams.get("successPass") === "true";
  const [showAlertPass, setShowAlertPass] = useState(isSuccessPass);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlertPass(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const { username, email } = userInfo;

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    const result = await axios.get(`http://localhost:8080/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    });
    setUserInfo(result.data);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Profile</h2>
            {/* <form> */}
            <div className="mb-3">
              <div>
                <label htmlFor="Name" className="form-label">
                  Username
                </label>
                <input
                  className="form-control"
                  name="username"
                  value={username}
                  readOnly
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
                    readOnly
                  />
                </div>
                <div style={{ marginTop: "40px" }}>
                  {/* <Link className="btn btn-outline-primary me-2" to={"/home"}>
                    Return Home
                  </Link> */}
                  <Link className="btn btn-primary my-2" to={"/profile/update"}>
                    Update info
                  </Link>
                </div>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
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
            User info updated successfully
          </div>
        </div>
      )}
      {showAlertPass && (
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
            Password updated successfully
          </div>
        </div>
      )}
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Password</h2>
            <Link
              className="btn btn-primary my-2"
              to={"/profile/update/password"}
              style={{ marginTop: "20px" }}
            >
              Update password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
