import { createContext, useReducer } from "react";
// reducers
import UserReducer from "./reducers/UserReducer";
import * as ActionTypes from "../types/ActionTypes";
import HttpService from "../services/HttpServices";
import axios from "axios";
import { SignInUserService } from "../services/AuthServices";

const initState = {
  credentials: {},
  authenticated: false,
  loading: false,
  likes: [],
  notifications: [],
};

export const IndexContext = createContext(initState);

export const IndexProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initState);

  const getUserData = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_UI });
    let token = localStorage.getItem("user-token");
    const http = new HttpService();
    const headers = {
      Authorization: `${token}`,
      "Content-type": "application/json",
    };
    console.log("====================================");
    console.log("get");
    console.log("====================================");
    axios
      .get(http.url + "/authUser", { headers: headers })
      .then((res) => {
        dispatch({
          type: ActionTypes.SET_USER,
          payload: res.data,
        });
        dispatch({ type: ActionTypes.STOP_LOADING_UI });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <IndexContext.Provider
      value={{ authenticated: state.authenticated, getUserData }}
    >
      {children}
    </IndexContext.Provider>
  );
};
