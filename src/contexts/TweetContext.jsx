import { createContext, useReducer, useState } from "react";
// reducers
import UserReducer from "./reducers/UserReducer";
import UIReducer from "./reducers/UIReducer";
import * as ActionTypes from "../types/ActionTypes";
import HttpService from "../services/HttpServices";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TweetReducer from "./reducers/TweetReducer";
import { HandleTweetText } from "./actions/TweetActions";

export const TweetContext = createContext();

export const TweetContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, TweetReducer);

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

  return (
    <TweetContext.Provider
      value={{ tweet, setTweet, tweetErr, setTweetErr, HandleTweetText }}
    >
      {children}
    </TweetContext.Provider>
  );
};
