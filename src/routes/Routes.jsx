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

const Routes = () => {
  let location = useLocation();
  let history = useHistory();
  const token = localStorage.getItem("user-token");
  // const isSignedIn = token !== null && token !== "";
  // if (token) {
  //   history.push("/home");
  // } else {
  //   history.push("/signin");
  // }

  // useEffect(() => {
  //   checkAuth();
  //   return () => {};
  // }, []);

  // const [isLoggedIn, setIsLoggedIn] = useState({
  //   isLoggedIn: false,
  // });

  // const checkAuth = () => {
  //   if (token !== null && token !== "") {
  //     setIsLoggedIn({
  //       ...isLoggedIn,
  //       isLoggedIn: true,
  //     });
  //   }
  // };

  let { path, url } = useRouteMatch();

  return (
    // <TransitionGroup>
    // <CSSTransition key={location.key} classNames="fade" timeout={300}>
    <Switch location={location}>
      {/* <Route
        exact
        path="/"
        render={(props) => <Redirect to={{ pathname: "/signin" }} />}
      /> */}
      <Redirect exact from="/" to="/signin" />

      <Route exact path="/">
        {token !== null && token !== "" ? (
          <Redirect exact to="/home" />
        ) : (
          <Redirect exact to={`${url}`} />
        )}
      </Route>

      {/* redirect if unauthenticated */}

      {/* <Route exact path="/home">
            {token == null && token === "" ? (
              <Redirect exact to="/" />
            ) : (
              // <Redirect exact to="/signin" />
              <Home></Home>
            )}
          </Route> */}

      <Route exact path="/signin" component={SignIn}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/home" component={Home}></Route>

      {/* <Guard
        path="/"
        token="user-token"
        routeRedirect="/home"
        component={PrivateRoute}
      /> */}
    </Switch>
    //   </CSSTransition>
    // </TransitionGroup>
  );
};

export default Routes;
