import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoutes = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? (
        <Redirect to="/home"></Redirect>
      ) : (
        <Component {...props} />
      )
    }
  ></Route>
);

export default AuthRoutes;
