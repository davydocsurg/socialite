import * as ActionTypes from "../ActionTypes";
import {
  SignUpUserService,
  SignInUserService,
  SignOutUserService,
} from "../../services/AuthServices";
import HttpService from "../../services/HttpServices";
import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { RouteHistory } from "./RouteActions";
// import { Route } from "react-router-dom";

export const SignUpAction = (credentials, history) => {
  return (dispatch) => {
    const http = new HttpService();
    dispatch({ type: ActionTypes.LOADING_UI });

    axios
      .post(http.url + "/signup", credentials)
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
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
          history.push("/signin");
        }
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.SET_ERRORS,
          payload: err,
        });
      });

    // dispatch({ type: ActionTypes.RESTART_AUTH_RESPONSE });
    // dispatch({ type: ActionTypes.LOADING });

    // SignUpUserService(credentials).then(
    //   (res) => {
    //     if (res.hasOwnProperty("success") && res.success === true) {
    //       dispatch({ type: ActionTypes.SIGNUP_SUCCESS, res });
    //     } else if (res.hasOwnProperty("success") && res.success === false) {
    //       dispatch({ type: ActionTypes.SIGNUP_ERROR, res });
    //     }
    //   },
    //   (error) => {
    //     dispatch({ type: ActionTypes.CODE_ERROR, error });
    //   }
    // );
  };
};

// export const SignInAction = (credentials) => {
export const SignInAction = (fields, history) => {
  return (dispatch) => {
    const http = new HttpService();
    dispatch({ type: ActionTypes.LOADING_UI });
    axios
      .post(http.url + "/signin", fields)
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
          dispatch({
            type: ActionTypes.SET_ERRORS,
            payload: res.data.message,
          });
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          // console.log(res.data);
          setAuthToken(res.data.access_token);

          dispatch(getUserData());
          dispatch({
            type: ActionTypes.CLEAR_ERRORS,
          });
          history.push("/home");
        }
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.SET_ERRORS,
          payload: err,
        });
      });

    //   // dispatch({ type: ActionTypes.RESTART_AUTH_RESPONSE });
    //   dispatch({ type: ActionTypes.LOADING_UI });

    //   SignInUserService(credentials).then(
    //     (res) => {
    //       if (res.hasOwnProperty("success") && res.success === true) {
    //         localStorage.setItem("user-token", res.user-token);

    //         // dispatch({ type: ActionTypes.SIGNIN_SUCCESS });
    //         // history.push("/home");
    //         // window.location.replace("/home");
    //       } else if (res.hasOwnProperty("success") && res.success === false) {
    //         dispatch({ type: ActionTypes.SIGNIN_ERROR, res });
    //         console.log(res);
    //       }
    //     },
    //     (error) => {
    //       console.log(error);
    //       // let ActionTypes.SIGNIN_ERROR=error
    //       dispatch({ type: ActionTypes.SIGNIN_ERROR, error });
    //     }
    //   );
  };
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_USER });
  const http = new HttpService();

  axios
    .get(http.url + "/authUser")
    .then((res) => {
      dispatch({
        type: ActionTypes.SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const SignOutAction = (history) => {
  return (dispatch) => {
    // return (dispatch) => {
    let token = localStorage.getItem("user-token");
    const http = new HttpService();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    };
    axios
      .post(http.url + "/signout", {
        headers: headers,
      })
      .then(() => {
        localStorage.removeItem("user-token");
        history.push("/signin");
        delete axios.defaults.headers.common["Authorization"];
        dispatch({ type: ActionTypes.SET_UNAUTHENTICATED });
        // location.href='/signin'
        dispatch({
          type: ActionTypes.CLEAR_ERRORS,
        });
        // if (res.data.hasOwnProperty("success") && res.data.success === false) {
        //   dispatch({
        //     type: ActionTypes.SET_ERRORS,
        //     payload: res.data.message,
        //   });
        // } else if (
        //   res.data.hasOwnProperty("success") &&
        //   res.data.success === true
        // ) {
        // localStorage.removeItem("user-token");
        // delete axios.defaults.headers.common["Authorization"];
        // dispatch({ type: ActionTypes.SET_UNAUTHENTICATED });
        // dispatch({
        //   type: ActionTypes.CLEAR_ERRORS,
        // });
        // history.push("/signin");
        // }
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.SET_ERRORS,
          payload: err,
        });
      });
  };

  // dispatch({ type: ActionTypes.RESTART_AUTH_RESPONSE });

  // SignOutUserService().then(
  //   (res) => {
  //     if (res.hasOwnProperty("success") && res.success === true) {
  //       localStorage.removeItem("user_token");
  //       // window.location.replace("/");

  //       dispatch({ type: ActionTypes.SIGNOUT_SUCCESS, res });
  //     } else if (res.hasOwnProperty("success") && res.success === false) {
  //       dispatch({ type: ActionTypes.SIGNOUT_SUCCESS, res });
  //     }
  //   },
  //   (error) => {
  //     dispatch({ type: ActionTypes.CODE_ERROR, error });
  //   }
  // );
  // };
};

const setAuthToken = (token) => {
  const authToken = `Bearer ${token}`;
  localStorage.setItem("user-token", authToken);
  axios.defaults.headers.common["Authorization"] = authToken;
};
