import { createContext, useReducer } from "react";
// reducers
import UserReducer from "./reducers/UserReducer";
import UIReducer from "./reducers/UIReducer";
import * as ActionTypes from "../types/ActionTypes";
import HttpService from "../services/HttpServices";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer);

  const SignUpAction = (credentials) => {
    return (dispatch) => {
      const navigate = useNavigate();
      const http = new HttpService();
      console.log("signup");
      dispatch({ type: ActionTypes.LOADING_UI });

      axios
        .post(http.url + "/signup", credentials)
        .then((res) => {
          if (
            res.data.hasOwnProperty("success") &&
            res.data.success === false
          ) {
            dispatch({
              type: ActionTypes.SET_ERRORS,
              payload: res.data.message,
            });
          } else if (
            res.data.hasOwnProperty("success") &&
            res.data.success === true
          ) {
            dispatch({
              type: ActionTypes.CLEAR_ERRORS,
            });
            navigate("/signin");
            // window.location.href='/signin'
          }
        })
        .catch((err) => {
          dispatch({
            type: ActionTypes.SET_ERRORS,
            payload: err,
          });
        });
    };
  };

  const SignInAction = () => {
    dispatch({
      type: ActionTypes.SET_AUTHENTICATED,
    });
  };

  // const SignInAction = (fields) => {
  //   return (dispatch) => {
  //     const http = new HttpService();
  //     const navigate = useNavigate();

  //     axios
  //       .post(http.url + "/signin", fields)
  //       .then((res) => {
  //         if (
  //           res.data.hasOwnProperty("success") &&
  //           res.data.success === false
  //         ) {
  //           dispatch({
  //             type: ActionTypes.DISPLAY_ERROR_MSG,
  //           });
  //           dispatch({
  //             type: ActionTypes.SET_LOGIN_ERRORS,
  //             payload: res.data.message,
  //           });
  //         } else if (
  //           res.data.hasOwnProperty("success") &&
  //           res.data.success === true
  //         ) {
  //           setAuthToken(res.data.access_token);
  //           dispatch({
  //             type: ActionTypes.SET_AUTHENTICATED,
  //           });

  //           navigate("/home");
  //         }
  //       })
  //       .catch((err) => {
  //         setOpen(true);
  //         if (err.errors > 1) {
  //           dispatch({
  //             type: ActionTypes.SET_LOGIN_ERRORS,
  //             payload: err.errors,
  //           });
  //         }
  //       });
  //   };
  // };

  const setAuthToken = (token) => {
    const authToken = `Bearer ${token}`;
    localStorage.setItem("user-token", authToken);
    axios.defaults.headers.common["Authorization"] = authToken;
  };

  return (
    <AuthContext.Provider value={{ SignUpAction, SignInAction }}>
      {children}
    </AuthContext.Provider>
  );
};
