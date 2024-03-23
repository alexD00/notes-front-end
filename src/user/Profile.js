import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });

  const [numNotes, setNumNotes] = useState(null);

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
    loadNumNotes();
  }, []);

  const loadUserProfile = async () => {
    const result = await axios.get(`http://localhost:8080/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    });
    setUserInfo(result.data);
  };

  const loadNumNotes = async () => {
    const result = await axios.get(`http://localhost:8080/api/users/numNotes`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    });
    setNumNotes(result.data);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Profile</h2>
            <hr />
            <div className="mb-3">
              <div className="text-start">
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
                <label
                  htmlFor="Name"
                  className="form-label"
                  style={{ marginTop: "20px" }}
                >
                  Number of notes
                </label>
                <div>
                  <input
                    className="form-control"
                    name="number"
                    value={numNotes}
                    readOnly
                  />
                </div>
              </div>
              <div style={{ marginTop: "40px" }}>
                <Link
                  className="btn btn-primary my-2"
                  style={{ width: "100px" }}
                  to={"/profile/update"}
                >
                  Update
                </Link>
              </div>
            </div>
            <hr style={{ marginTop: "40px", marginBottom: "20px" }} />

            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="text-start">
                <label>Password</label>
              </div>
              <div>
                <Link
                  className="btn btn-primary my-2"
                  to={"/profile/update/password"}
                  style={{ width: "100px", marginLeft: "140px" }}
                >
                  Update
                </Link>
              </div>
            </div>
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
    </div>
  );
}
