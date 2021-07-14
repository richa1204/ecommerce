import React from "react";
import { Link, withRouter } from "react-router-dom";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#6CB4EE" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const AdminHeader = ({ history }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-xl">
        {/* <Link className="navbar-brand" to="/">
          eCommerce
        </Link> */}

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
          <ul className="navbar-nav mb-2 mb-lg-0 center">
            <li className="nav-item">
              <Link
                style={currentTab(history, "/admin/product")}
                className="nav-link"
                to="/admin/product"
              >
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/user")}
                className="nav-link"
                to="/"
              >
                Category
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/user")}
                className="nav-link"
                to="/"
              >
                User
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(AdminHeader);