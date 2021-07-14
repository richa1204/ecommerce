import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";

const Signin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    errormessage: "",
    loading: false,
    redirect: false,
    error: false,
  });

  const { email, password, errormessage, loading, redirect, error } = data;

  const handleChange = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setData({ loading: true });
    if (!email || !password) {
      setData({ error: true, errormessage: "Please enter all details..." });
    } else {
      await axios({
        url: `${process.env.REACT_APP_API_URL}/api/user/signin`,
        method: "post",

        data: data,
      })
        .then((res) => {
          console.log(res);
          if (window !== undefined) {
            window.localStorage.setItem("jwt", JSON.stringify(res.data));
          }
          setData({ loading: false, error: false, redirect: true });
        })
        .catch((error) => {
          setData({
            loading: false,
            error: true,
            errormessage: error.response.data.err,
          });
        });
    }
  };

  return (
    <div className="container-fluid p-5 w-75 mt-5">
      {loading ? (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <React.Fragment>
          <div className="text-center mb-5">
            <h1>Sign In</h1>
          </div>
          {error ? (
            <div class="alert alert-danger" role="alert">
              {errormessage}
            </div>
          ) : (
            ""
          )}

          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12">
              <label for="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="col-12">
              <label for="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <div>
              Don't have an account?
              <Link className="navbar-brand" to="/signup">
                Create One
              </Link>{" "}
            </div>
            <div className="col-12 ">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
          </form>
        </React.Fragment>
      )}
      {redirect ? <Redirect to="/" /> : ""}
    </div>
  );
};

export default Signin;