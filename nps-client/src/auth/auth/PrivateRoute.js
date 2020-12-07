import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  signUp,
  logout,
  authenticated,
  user,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        authenticated ? (
          <Component {...props} user={user} signUp={signUp} logout={logout} />
        ) : (
          <Redirect to="/" />
        )
      }
      {...rest}
    />
  );
};
export default PrivateRoute;
