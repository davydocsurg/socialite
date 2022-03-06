import { createContext, useReducer, useEffect } from "react";
// reducers
import UserReducer from "./reducers/UserReducer";
import * as ActionTypes from "../types/ActionTypes";
import HttpService from "../services/HttpServices";
import axios from "axios";
import { SignInUserService } from "../services/AuthServices";
import { useNavigate } from "react-router-dom";

const initState = {
  credentials: {},
  authenticated: false,
  loading: false,
  likes: [],
  notifications: [],
  loginErrorMsg: {
    login: "",
    password: "",
  },
  showErrMsg: false,
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

  const getUserData = () => (dispatch) => {
    dispatch({
      type: ActionTypes.SET_AUTHENTICATED,
    });
    // dispatch({ type: ActionTypes.LOADING_UI });
    // let token = localStorage.getItem("user-token");
    // const http = new HttpService();
    // const headers = {
    //   Authorization: `${token}`,
    //   "Content-type": "application/json",
    // };
    // console.log("====================================");
    // console.log("get");
    // console.log("====================================");
    // axios
    //   .get(http.url + "/authUser", { headers: headers })
    //   .then((res) => {
    //     dispatch({
    //       type: ActionTypes.SET_USER,
    //       payload: res.data,
    //     });
    //     dispatch({ type: ActionTypes.STOP_LOADING_UI });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  return (
    <IndexContext.Provider
      value={{
        authenticated: state.authenticated,
        loginErrorMsg: state.loginErrorMsg,
        showErrMsg: state.showErrMsg,
        // CheckAuthMode,
        getUserData,
      }}
    >
      {children}
    </IndexContext.Provider>
  );
};
