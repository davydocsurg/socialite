import { createContext, useReducer, useEffect } from "react";
// reducers
import UserReducer from "./reducers/UserReducer";
import * as ActionTypes from "../types/ActionTypes";
import HttpService from "../services/HttpServices";
import axios from "axios";
import { SignInUserService } from "../services/AuthServices";
import { useNavigate } from "react-router-dom";

export const initState = {
  credentials: {},
  // authUser: [],
  authenticated: false,
  loading: false,
  likes: [],
  notifications: [],
  loginErrorMsg: {
    login: "",
    password: "",
  },
  showErrMsg: false,
  tweet: {
    tweetText: "",
    tweetPhoto: "",
  },
};

export const IndexContext = createContext(initState);

export const IndexContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initState);

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
  }, [state.authenticated]);

  return (
    <IndexContext.Provider
      value={{
        state,
        dispatch,
        credentials: state.credentials,
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
