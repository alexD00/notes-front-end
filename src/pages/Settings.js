import axios from "axios";
import React from "react";
import { MdDelete } from "react-icons/md";

export default function Settings({ theme, toggleTheme }) {
  const deleteAccount = async () => {
    await axios.delete(`http://localhost:8080/api/users`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    });
    window.location.reload();
    sessionStorage.removeItem("jwtToken");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow target-container">
          <h2 className="text-center m-4">Settings</h2>
          <hr />
          <div style={{ marginTop: "40px" }}>
            <div className="d-flex justify-content-between">
              <h6 className="text-start">Theme</h6>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="themeToggle"
                  onChange={toggleTheme}
                  checked={theme === "dark"}
                />
                <label className="form-check-label" htmlFor="themeToggle">
                  {theme === "light" ? "Light Mode" : "Dark Mode"}
                </label>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "40px" }}>
            <div className="d-flex justify-content-between">
              <h6 className="text-start">Delete account</h6>

              <button
                type="button"
                class="btn btn-danger mx-2"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ width: "80px" }}
              >
                <MdDelete />
              </button>

              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header modal-cont">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        Delete Account
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body modal-cont">
                      Are you sure you want to delete your account?
                    </div>
                    <div class="modal-footer modal-cont">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        style={{ width: "100px" }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        style={{ width: "100px" }}
                        onClick={(e) => {
                          console.log("Clicked Confirm");
                          deleteAccount();
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
