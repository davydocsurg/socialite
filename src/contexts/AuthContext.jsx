import { createContext, useReducer } from "react";
// reducers
import UserReducer from "./reducers/UserReducer";
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

  return (
    <AuthContext.Provider value={{ SignUpAction }}>
      {children}
    </AuthContext.Provider>
  );
};
