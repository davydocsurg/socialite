import * as ActionTypes from "../../types/ActionTypes";
import {
  SignUpUserService,
  SignInUserService,
  SignOutUserService,
} from "../../services/AuthServices";
import HttpService from "../../services/HttpServices";
import axios from "axios";
// import { FetchTweetsAction } from "./TweetActions";

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
  };
};

export const SignInAction = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_AUTHENTICATED,
    });
  };
};

// export const SignInAction = (fields, history) => {
//   return (dispatch) => {
//     const http = new HttpService();
//     dispatch({ type: ActionTypes.LOADING_UI });
//     axios
//       .post(http.url + "/signin", fields)
//       .then((res) => {
//         if (res.data.hasOwnProperty("success") && res.data.success === false) {
//           dispatch({
//             type: ActionTypes.SET_ERRORS,
//             payload: res.data.message,
//           });
//         } else if (
//           res.data.hasOwnProperty("success") &&
//           res.data.success === true
//         ) {
//           // console.log(res.data);
//           setAuthToken(res.data.access_token);

//           dispatch(getUserData());
//           dispatch({
//             type: ActionTypes.CLEAR_ERRORS,
//           });
//           dispatch({
//             type: ActionTypes.SET_AUTHENTICATED,
//           });
//           history.push("/home");
//           // dispatch(FetchTweetsAction());
//         }
//       })
//       .catch((err) => {
//         dispatch({
//           type: ActionTypes.SET_ERRORS,
//           payload: err,
//         });
//       });
//   };
// };

export const GetAuthUserData = () => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_UI });
  console.log("get");
  let token = localStorage.getItem("user-token");
  const http = new HttpService();
  const headers = {
    Authorization: `${token}`,
    "Content-type": "application/json",
  };
  axios
    .get(http.url + "/authUser", { headers: headers })
    .then((res) => {
      console.log(res.data);
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

export const SignOutAction = (history) => {
  return (dispatch) => {
    // return (dispatch) => {
    let token = localStorage.getItem("user-token");
    const http = new HttpService();
    const headers = {
      Authorization: `${token}`,
      "Content-type": "application/json",
    };
    axios
      .post(http.url + "/signout", {
        headers: headers,
      })
      .then(() => {
        localStorage.removeItem("user-token");
        delete axios.defaults.headers.common["Authorization"];
        dispatch({ type: ActionTypes.SET_UNAUTHENTICATED });
        navigate("/");
        dispatch({
          type: ActionTypes.CLEAR_ERRORS,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.SET_ERRORS,
          payload: err,
        });
      });
  };
};

const setAuthToken = (token) => {
  const authToken = `Bearer ${token}`;
  localStorage.setItem("user-token", authToken);
  axios.defaults.headers.common["Authorization"] = authToken;
};
