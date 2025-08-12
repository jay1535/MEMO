import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#000",
        padding: "12px 20px",
        borderBottom: "3px solid yellow",
        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
      }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <Link
          className="navbar-brand"
          to="/"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "yellow",
            letterSpacing: "1px",
          }}
        >
          Memo
        </Link>

        {/* Mobile toggle button */}
        <button
          className="navbar-toggler bg-warning"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {["/", "/about", "/notes"].map((path, idx) => {
              const labels = ["Home", "About", "Notes"];
              return (
                <li className="nav-item" key={idx}>
                  <Link
                    className={`nav-link ${
                      location.pathname === path ? "active" : ""
                    }`}
                    to={path}
                    style={{
                      color:
                        location.pathname === path ? "yellow" : "white",
                      fontWeight:
                        location.pathname === path ? "bold" : "normal",
                      marginRight: "12px",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "yellow")}
                    onMouseLeave={(e) =>
                      (e.target.style.color =
                        location.pathname === path ? "yellow" : "white")
                    }
                  >
                    {labels[idx]}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Auth buttons */}
          {!localStorage.getItem("token") ? (
            <div className="ms-auto">
              <Link
                className="btn btn-warning mx-1"
                to="/login"
                style={{
                  borderRadius: "20px",
                  fontWeight: "bold",
                  padding: "6px 16px",
                }}
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-warning mx-1"
                to="/signup"
                style={{
                  borderRadius: "20px",
                  fontWeight: "bold",
                  padding: "6px 16px",
                  borderWidth: "2px",
                }}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="btn btn-danger ms-auto"
              style={{
                borderRadius: "20px",
                fontWeight: "bold",
                padding: "6px 16px",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
