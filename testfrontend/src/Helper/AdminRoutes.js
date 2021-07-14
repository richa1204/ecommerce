import React from "react";
import { Route, Redirect } from "react-router-dom";
import isAuthenticated from "./isAuthenticated";

function AdminRoutes({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() && isAuthenticated().role === 1 ? (
          <Component {...location} />
        ) : (
          <Redirect
            to={{
              pathname: "/Signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default AdminRoutes;