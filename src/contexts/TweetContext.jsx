import { createContext, useReducer, useEffect, useState, useMemo } from "react";
import * as ActionTypes from "../types/ActionTypes";
import HttpService from "../services/HttpServices";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import TweetReducer from "./reducers/TweetReducer";
import { Tweet } from "../components/tweets/Tweet";
import { useContext } from "react";

export const tweetState = {
  tweets: [],
  likes: [],
  loading: false,
  openTSM: false,
  openTEM: false,
  // closeTweetSM: false,
};

const TweetContext = createContext(tweetState);
export const useTweetContext = () => useContext(TweetContext);

export const TweetProvider = ({ children }) => {
  const [tstate, dispatch] = useReducer(TweetReducer, tweetState);
  const http = new HttpService();

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

  const [closeTSM, setCloseTSM] = useState(false);
  const [tweetImageRemover, setTweetImageRemover] = useState(false);

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
            tweet_text: res.data.message.tweet_text,
            tweet_photo: res.data.message.tweet_photo,
          });

          console.log(tweetErr);
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          // setTSM(true);
          dispatch({
            type: ActionTypes.SEND_TWEET_SUCCESS,
          });

          setTweet({
            tweetText: "",
            tweetPhoto: "",
          });
          dispatch({
            type: ActionTypes.SET_TWEET_DATA,
            payload: res.data,
          });
          setTweetImageRemover(false);
          UpdateTweets();
        }
      })
      .catch((err) => {
        console.error(err);
        setTweetErr({
          ...tweetErr,
          tweetErr: err,
        });
      });
  };

  const FetchTweets = () => {
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

  const UpdateTweets = () => {
    axios
      .get(http.url + "/tweets")
      .then((res) => {
        dispatch({
          type: ActionTypes.SET_TWEET_DATA,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const tweetsVal = useMemo(() => [tstate.tweets], [tstate.tweets]);
  console.log(tweetsVal[0]);

  return (
    <TweetContext.Provider
      value={{
        tstate,
        dispatch,
        loading: tstate.loading,
        tweets: tweetsVal[0],
        // tweets: tstate.tweets,
        tweet,
        tweetsVal,
        setTweet,
        tweetErr,
        setTweetErr,
        tweetImageRemover,
        setTweetImageRemover,
        openTSM: tstate.openTSM,
        closeTSM,
        setCloseTSM,
        // setTSM,
        removeImg,
        sendTweet,
        FetchTweets,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
