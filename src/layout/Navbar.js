import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { MdNoteAlt } from "react-icons/md";

export default function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRootPath = location.pathname === "/";
  const isUnsupported = location.pathname === "/unsupported";
  const isSignUpPage = location.pathname === "/signUp";

  // Don't render Navbar on Login page or root path
  if (isLoginPage || isRootPath || isUnsupported || isSignUpPage) {
    return null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("jwtToken");
  };

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
            <MdNoteAlt /> Add Note
          </Link>
          <div className="nav-item dropdown">
            <button
              className="btn btn-outline-light dropdown-toggle"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <IoIosMenu />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="userDropdown"
            >
              <li>
                <Link className="dropdown-item" to="/home">
                  <AiFillHome /> Home
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/profile">
                  <FaUser /> Profile
                </Link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/"
                  style={{ color: "red" }}
                  onClick={handleLogout}
                >
                  <TbLogout /> Log out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
