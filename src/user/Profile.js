import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });

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
                <Link className="btn btn-outline-primary me-2" to={"/home"}>
                  Return Home
                </Link>
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
  );
}
