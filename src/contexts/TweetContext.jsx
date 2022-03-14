import { createContext, useReducer } from "react";
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

  return (
    <TweetContext.Provider value={{ HandleTweetText }}>
      {children}
    </TweetContext.Provider>
  );
};
