import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function () {
  let navigate = useNavigate();

  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const { oldPassword, newPassword, newPasswordConfirm } = passwordInfo;

  const [error, setError] = useState(null);

  const onInputChange = (e) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8080/api/users/profile/update/password",
        passwordInfo,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        }
      );

      navigate("/profile?successPass=true");
    } catch (error) {
      console.error("Update password failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorMessage
      ) {
        setError(error.response.data.errorMessage); // Set error message from response
      } else {
        // Default error message for any other error
        setError("Update password failed. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Update Password</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={(e) => onSubmit(e)}>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="Name" className="form-label">
                Old password
              </label>
              <input
                className="form-control"
                value={oldPassword}
                placeholder="Type old password"
                name="oldPassword"
                type="password"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="Name" className="form-label">
                New password
              </label>
              <input
                className="form-control"
                value={newPassword}
                placeholder="Type new password"
                name="newPassword"
                type="password"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div>
              <label htmlFor="Name" className="form-label">
                Confirm new password
              </label>
              <input
                className="form-control"
                value={newPasswordConfirm}
                placeholder="Re-enter new password"
                name="newPasswordConfirm"
                type="password"
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
          </form>
        </div>
      </div>
    </div>
  );
}
