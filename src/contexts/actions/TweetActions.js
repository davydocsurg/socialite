import * as ActionTypes from "../../types/ActionTypes";

import HttpService from "../../services/HttpServices";
import axios from "axios";

export const HandleTweetText = (value) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_TWEET_TEXT, payload: value });
  };
};

export const HandleTweetPhoto = (value) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_TWEET_PHOTO, payload: value });
  };
};

const setAuthToken = (token) => {
  const authToken = `Bearer ${token}`;
  localStorage.setItem("user-token", authToken);
  axios.defaults.headers.common["Authorization"] = authToken;
};
