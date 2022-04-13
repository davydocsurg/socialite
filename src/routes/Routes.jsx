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
import AuthRoutes from "../utils/AuthRoutes";
import jwtDecode from "jwt-decode";

// redux
import HttpService from "../services/HttpServices";
import { store } from "../redux/store";
// import * as ActionTypes from './redux/ActionTypes'
import { SignOutAction, getUserData } from "../redux/actions/AuthActions";
import { SET_AUTHENTICATED } from "../redux/ActionTypes";
import { useDispatch } from "react-redux";
import axios from "axios";
import Notifications from "../components/nests/Notifications";
import Explore from "../components/nests/Explore";
import Profile from "../components/Profile";
import { useSelector } from "react-redux";
import TweetDetails from "../components/tweets/TweetDetails";
import Tweet from "../components/tweets/Tweet";

const Routes = () => {
  let location = useLocation();
  let history = useHistory();
  const token = localStorage.getItem("user-token");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.credentials);
  const allTweets = useSelector((state) => state.tweetReducer.allTweets);

  const [tweepHandle, setTweepHandle] = useState("");
  const [tweetDetails, setTweetDetails] = useState("");
  const [tweets, setTweets] = useState([]);
  const [tweetSlugs, setTweetSlugs] = useState([]);

  // decode token
  if (token) {
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken);

    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(SignOutAction());
      history.push("/signin");
    } else {
      // authenticated = true;
      store.dispatch({
        type: SET_AUTHENTICATED,
      });
      axios.defaults.headers.common["Authorization"] = token;
      // store.dispatch(getUserData());
    }
  }

  let { path, url } = useRouteMatch();

  useEffect(() => {
    // getHandle();
    // fetchTweets();
    console.log(tweetSlugs);
    setTimeout(() => {
      getTweetSlugs();
    }, 3000);
    return () => {};
  }, []);

  const getTweetSlugs = () => {
    let slugs = [];
    // setTweetSlugs()
    allTweets.forEach((element) => {
      slugs.push(element.slug);
    });
    //console.log(slugs, " test");
    setTweetSlugs(slugs);
  };

  return (
    // <TransitionGroup>
    // <CSSTransition key={location.key} classNames="fade" timeout={300}>
    <Switch location={location}>
      <Redirect exact from="/" to="/signin" />

      <AuthRoutes
        // authenticated={authenticated}
        exact
        path="/signin"
        component={SignIn}
      ></AuthRoutes>
      <AuthRoutes
        // authenticated={authenticated}
        exact
        path="/signup"
        component={SignUp}
      ></AuthRoutes>
      <Route exact path="/home" component={Home}></Route>
      <Route exact path="/notifications" component={Notifications}></Route>
      <Route exact path="/explore" component={Explore}></Route>
      <Route exact path={`/${user.handle}`} component={Profile}></Route>
      <Route exact path={`/tweet/:slug`} component={TweetDetails}></Route>
      {/* <Route exact path={`/${allTweets.slug}`} component={TweetDetails}></Route> */}
    </Switch>
    //   </CSSTransition>
    // </TransitionGroup>
  );
};

export default Routes;