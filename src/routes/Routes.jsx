import React, { useEffect, useState } from "react";
import {
  useLocation,
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import Home from "../pages/home";
// import "../css/anime.css";
import PrivateRoute from "../PrivateRoute";
import { Guard } from "../Guard";
import AuthRoutes from "../utils/AuthRoutes";
import jwtDecode from "jwt-decode";

const Routes = () => {
  let location = useLocation();
  let history = useHistory();
  const token = localStorage.getItem("user-token");
  let authenticated;

  // decode token
  // const token = localStorage.user_token
  if (token) {
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken);

    if (decodedToken.exp * 1000 < Date.now()) {
      window.location.href = "/signin";
      authenticated = false;
    } else {
      authenticated = true;
    }
  }

  let { path, url } = useRouteMatch();

  return (
    // <TransitionGroup>
    // <CSSTransition key={location.key} classNames="fade" timeout={300}>
    <Switch location={location}>
      <Redirect exact from="/" to="/signin" />

      <AuthRoutes
        authenticated={authenticated}
        exact
        path="/signin"
        component={SignIn}
      ></AuthRoutes>
      <AuthRoutes
        authenticated={authenticated}
        exact
        path="/signup"
        component={SignUp}
      ></AuthRoutes>
      <Route exact path="/home" component={Home}></Route>
    </Switch>
    //   </CSSTransition>
    // </TransitionGroup>
  );
};

export default Routes;
