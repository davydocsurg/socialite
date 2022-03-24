import { createContext, useReducer, useEffect, useState } from "react";
// reducers
// import UserReducer from "./reducers/UserReducer";

import * as ActionTypes from "../types/ActionTypes";
import HttpService from "../services/HttpServices";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import CombineReducers from "./reducers/CombineReducers";

export const initState = {
  likes: [],
  notifications: [],
  loginErrorMsg: {
    login: "",
    password: "",
  },
  showErrMsg: false,
  tweets: [],
  // tweet: {
  //   tweetText: "",
  //   tweetPhoto: "",
  // },
  // tweetErrorMsgs: {},
};

export const IndexContext = createContext(initState);

export const IndexContextProvider = ({ children }) => {
  const [state = initState, dispatch] = useReducer(CombineReducers, initState);

  const [tweet, setTweet] = useState({
    tweetText: "",
    tweetPhoto: "",
  });

  const [tweetErr, setTweetErr] = useState({
    tweetErr: {
      tweet_text: "",
      tweet_photo: "",
    },
  });

  const [tweetImageRemover, setTweetImageRemover] = useState(false);
  const [openTweetSuccessMessage, setOpenTweetSuccessMessage] = useState(false);

  // const CheckAuthMode = () => {
  // };
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("user-token");
    if (token) {
      dispatch({
        type: ActionTypes.SET_AUTHENTICATED,
      });
      navigate("/home");
    }

    // GetAuthUserData();

    FetchTweets();
    console.log("====================================");
    console.log(state.tweets);
    console.log("====================================");
  }, [state.authenticated]);

  const GetAuthUserData = () => {
    dispatch({ type: ActionTypes.LOADING_UI });

    let token = localStorage.getItem("user-token");
    const http = new HttpService();
    const headers = {
      Authorization: `${token}`,
      "Content-type": "application/json",
    };
    axios
      .get(http.url + "/authUser", { headers: headers })
      .then((res) => {
        console.log(res.data.credentials.profile_picture);

        dispatch({
          type: ActionTypes.SET_USER,
          payload: res.data.credentials,
        });

        dispatch({ type: ActionTypes.STOP_LOADING_UI });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const FetchTweets = () => {
    const http = new HttpService();
    dispatch({ type: ActionTypes.LOADING_UI });

    axios
      .get(http.url + "/tweets")
      .then((res) => {
        dispatch({
          type: ActionTypes.SET_TWEET_DATA,
          payload: res.data,
        });

        dispatch({
          type: ActionTypes.STOP_LOADING_UI,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeImg = () => {
    setTweet({
      ...tweet,
      tweetPhoto: "",
    });
    setTweetImageRemover(false);
  };

  const sendTweet = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("user-token");
    const http = new HttpService();

    const headers = {
      Authorization: `${token}`,
      "Content-type": "application/json",
    };
    axios
      .post(
        http.url + "/tweet/create",
        { tweet_text: tweet.tweetText, tweet_photo: tweet.tweetPhoto },
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
          setTweetErr({
            ...tweetErr,
            tweetErrg: res.data.message,
          });
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          // setTweetImage("");
          setTweet({
            tweetText: "",
            tweetPhoto: "",
          });

          setTweetImageRemover(false);
          setOpenTweetSuccessMessage(true);
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
        setTweetErr({
          ...tweetErr,
          tweetErr: err,
        });
      });
  };

  const closeTweetSM = () => {
    setOpenTweetSuccessMessage(false);
  };

  return (
    <IndexContext.Provider
      value={{
        state,
        dispatch,
        // credentials: state.credentials,
        // loading: state.loading,
        tweets: state.tweets,
        tweet,
        setTweet,
        tweetErr,
        setTweetErr,
        tweetImageRemover,
        setTweetImageRemover,
        removeImg,
        sendTweet,
        openTweetSuccessMessage,
        closeTweetSM,
        // authenticated: state.authenticated,
        // loginErrorMsg: state.loginErrorMsg,
        // showErrMsg: state.showErrMsg,
        // // CheckAuthMode,
        // authUser: state.authUser,
      }}
    >
      {children}
    </IndexContext.Provider>
  );
};
