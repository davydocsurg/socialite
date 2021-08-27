import React from "react";
import { Route, Redirect } from "react-router-dom";

export const Guard = ({
  component: Component,
  access_token: Token,
  routeRedirect,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem(Token) ? (
        <Component {...props} /> && console.log(Token)
      ) : (
        <Redirect
          to={{ pathname: routeRedirect, state: { from: props.location } }}
        />
      )
    }
  />
);
