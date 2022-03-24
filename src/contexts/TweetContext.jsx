import { createContext, useReducer, useEffect, useState } from "react";
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
};

const TweetContext = createContext(tweetState);
export const useTweetContext = () => useContext(TweetContext);

export const TweetProvider = ({ children }) => {
  const [tstate, dispatch] = useReducer(TweetReducer, tweetState);

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
    <TweetContext.Provider
      value={{
        tstate,
        dispatch,
        tweets: tstate.tweets,
        tweet,
        setTweet,
        tweetErr,
        setTweetErr,
        tweetImageRemover,
        setTweetImageRemover,
        removeImg,
        sendTweet,
        openTweetSuccessMessage,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
