import React from "react";
import { Link, withRouter } from "react-router-dom";
import Signout from "../Helper/Signout";
import isAuthenticated from "../Helper/isAuthenticated";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#6CB4EE" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Header = ({ history }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-xl">
        <Link className="navbar-brand" to="/">
          eCommerce
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample07XL"
          aria-controls="navbarsExample07XL"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample07XL">
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li className="nav-item">
              <Link
                style={currentTab(history, "/user")}
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </li>

            {isAuthenticated() && isAuthenticated().role === 0 && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/user/Dashboard"
                >
                  User Dashboard
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().role === 1 && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/admin/dashboard"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}

            {!isAuthenticated() && (
              <React.Fragment>
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/signup")}
                    className="nav-link"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/signin")}
                    className="nav-link"
                    to="/signin"
                  >
                    Signin
                  </Link>
                </li>
              </React.Fragment>
            )}

            {isAuthenticated() && (
              <li className="nav-item">
                <div
                  style={currentTab(history, "/Signout")}
                  onClick={() => {
                    Signout(() => {
                      history.push("/");
                    });
                  }}
                  className="nav-link"
                >
                  Signout
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);