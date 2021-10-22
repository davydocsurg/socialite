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
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import TweetDetails from "../components/tweets/TweetDetails";
import Tweet from "../components/tweets/Tweet";

const Routes = () => {
  let location = useLocation();
  let history = useHistory();
  const token = localStorage.getItem("user-token");
  const dispatch = useDispatch();

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
    getHandle();
    fetchTweets();
    setTimeout(() => {
      getTweetSlugs();
    }, 3000);
    return () => {};
  }, []);

  const getHandle = () => {
    let token = localStorage.getItem("user-token");
    const http = new HttpService();
    const headers = {
      Authorization: `${token}`,
      "Content-type": "application/json",
    };
    axios
      .get(http.url + "/authUser", { headers: headers })
      .then((res) => {
        setTweepHandle(res.data.credentials.handle);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getTweet = (tweetSlug) => {
    let token = localStorage.getItem("user-token");
    const http = new HttpService();
    const headers = {
      Authorization: `${token}`,
      "Content-type": "application/json",
    };
    axios
      .get(http.url + `/tweets/${tweetSlug}/show`, { headers: headers })
      .then((res) => {
        setTweetDetails(res.data);
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchTweets = () => {
    const http = new HttpService();
    axios
      .get(http.url + `/tweets`)
      .then((res) => {
        setTweets(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getTweetSlugs = () => {
    let slugs = [];

    tweets.map((t) => (slugs = t.slug));
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
      <Route exact path={`/${tweepHandle}`} component={Profile}></Route>
      <Route
        exact
        path={`/tweet/${tweetSlugs}`}
        component={TweetDetails}
      ></Route>
      {/* <Route exact path={`/${allTweets.slug}`} component={TweetDetails}></Route> */}
    </Switch>
    //   </CSSTransition>
    // </TransitionGroup>
  );
};

export default Routes;
// Routes.propTypes = {
//   user: PropTypes.object.isRequired,
//   tweetReducer: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//     tweetReducer: state.tweetReducer,
//   };
// };

// export default connect(mapStateToProps)(Routes);
