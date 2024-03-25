import React from "react";
import { Link } from "react-router-dom";

export default function PageNotSupported() {
  return (
    <div className="pns">
      <div>
        <h1>Page Not Supported</h1>
        <p>The page you are trying to access is not supported.</p>
      </div>
      <div></div>
      <div style={{ marginTop: "60px" }}>
        Have an account? <Link to="/">Log in</Link>
      </div>
      <div style={{ marginTop: "20px" }}>
        Don't have an account? <Link to="/signUp">Sign up</Link>
      </div>
    </div>
  );
}
