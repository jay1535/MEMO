import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();

  let navigate = useNavigate();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleLogout =()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Memo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`}
                to="/notes"
              >
                Notes
              </Link>
            </li>
          </ul>

          {/* Right-aligned buttons */}
         { !localStorage.getItem("token")?<div className="ms-auto">
            <Link className="btn btn-primary mx-1" to="/login" type="button">Login</Link>
            <Link className="btn btn-success mx-1" to="/signup" type="button">SignUp</Link>
          </div>: <Link onClick={handleLogout} className="btn btn-success mx-1 ms-auto" to="/signup" type="button">Logout</Link>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
