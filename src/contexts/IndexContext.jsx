import React, { createContext, useEffect, useReducer, useState } from "react";
import auth from "./reducers/auth";
import authInitState from "./initStates/authInitState";
import tweets from "./reducers/tweets";
import tweetsInitState from "./initStates/tweetsInitState";

export const IndexContext = createContext({});

export const IndexContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(auth, authInitState);
  const [tweetsState, tweetsDispatch] = useReducer(tweets, tweetsInitState);
  const [tweet, setTweet] = useState({
    tweetText: "",
    tweetPhoto: "",
  });

  useEffect(() => {}, []);

  const [tweetErr, setTweetErr] = useState({
    tweetErr: {
      tweet_text: "",
      tweet_photo: "",
    },
  });

  const [tweetImageRemover, setTweetImageRemover] = useState(false);
  const [openTweetSuccessMessage, setOpenTweetSuccessMessage] = useState(false);

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
        authState,
        authDispatch,
        tweetsState,
        tweetsDispatch,
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
      }}
    >
      {children}
    </IndexContext.Provider>
  );
};
