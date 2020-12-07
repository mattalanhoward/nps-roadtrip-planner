import React from "react";
import { Route, Redirect } from "react-router-dom";
import NPS from "../../components/NPS/NPS";

const AnonRoute = ({
  component: Component,
  authenticated,
  authenticate,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        authenticated === false ? (
          ((<NPS />), (<Component {...props} authenticate={authenticate} />))
        ) : (
          <Redirect to="/" />
        )
      }
      {...rest}
    />
  );
};

export default AnonRoute;
