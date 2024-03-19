import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRootPath = location.pathname === "/";
  const isUnsupported = location.pathname === "/unsupported";

  // Don't render Navbar on Login page or root path
  if (isLoginPage || isRootPath || isUnsupported) {
    return null;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/home"}>
            My Notes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="btn btn-outline-light" to="/addNote">
            Add Note
          </Link>
        </div>
      </nav>
    </div>
  );
}
