import {
  createContext,
  useReducer,
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";
// reducers
import UserReducer from "./reducers/UserReducer";
import UIReducer from "./reducers/UI";
import * as ActionTypes from "../types/ActionTypes";
import HttpService from "../services/HttpServices";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { GetAuthUserData } from "./actions/AuthActions";
// import { initState } from "./IndexContext";

export const authState = {
  credentials: {},
  authUserTweetsCount: null,
  authUserTweets: {},
  // authUser: [],
  authenticated: false,
  loading: false,
};

const AuthContext = createContext(authState);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [astate, dispatch] = useReducer(UserReducer, authState);

  const navigate = useNavigate();

  // const [authUser, setauthUser] = useState({
  //   authUser: {},
  // });

  useEffect(() => {
    checkAuthState();
    //
  }, []);

  const GetAuthUserData = () => {
    dispatch({ type: ActionTypes.LOADING_UI });

    let token = localStorage.getItem("user-token");
    const http = new HttpService();
    const headers = {
      Authorization: `${token}`,
      "Content-type": "application/json",
    };
    axios
      .get(http.url + "/authUser", { headers: headers })
      .then((res) => {
        // console.log(res.data.credentials.profile_picture);

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

  const SignOut = () => {
    localStorage.removeItem("user-token");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: ActionTypes.SET_UNAUTHENTICATED });
    navigate("/signin");

    // let token = localStorage.getItem("user-token");
    // const http = new HttpService();
    // const headers = {
    //   Authorization: `${token}`,
    //   "Content-type": "application/json",
    // };
    // axios
    //   .post(http.url + "/signout", headers, headers)
    //   .then((res) => {
    //     if (res.data.hasOwnProperty("success") && res.data.success === false) {
    //       dispatch({
    //         type: ActionTypes.SET_ERRORS,
    //         payload: res.data.message,
    //       });
    //     } else if (
    //       res.data.hasOwnProperty("success") &&
    //       res.data.success === true
    //     ) {
    // localStorage.removeItem("user-token");
    // delete axios.defaults.headers.common["Authorization"];
    // dispatch({ type: ActionTypes.SET_UNAUTHENTICATED });
    // navigate("/signin");
    //       dispatch({
    //         type: ActionTypes.CLEAR_ERRORS,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     dispatch({
    //       type: ActionTypes.SET_ERRORS,
    //       payload: err,
    //     });
    //   });
  };

  const checkAuthState = () => {
    let token = localStorage.getItem("user-token");
    if (token) {
      dispatch({
        type: ActionTypes.SET_AUTHENTICATED,
      });
      navigate("/home");
      GetAuthUserData();
    } else {
      dispatch({
        type: ActionTypes.SET_UNAUTHENTICATED,
      });
      navigate("/signin");
    }
  };

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
    navigate("/home");
    GetAuthUserData();
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
  const authDetails = useMemo(() => [astate.credentials], [astate.credentials]);
  const authTweepTweets = useMemo(
    () => [astate.authUserTweets],
    [astate.authUserTweets]
  );

  return (
    <AuthContext.Provider
      value={{
        credentials: authDetails[0],
        authenticated: astate.authenticated,
        authUserTweetsCount: astate.authUserTweetsCount,
        authUserTweets: authTweepTweets[0],
        GetAuthUserData,
        SignUpAction,
        SignInAction,
        SignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
