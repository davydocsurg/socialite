import * as ActionTypes from "../ActionTypes";
// import { createReducer } from "@reduxjs/toolkit";

const initState = {
  credentials: {},
  authenticated: false,
  loading: false,
  likes: [],
  notifications: [],
};

// const AuthReducer = createReducer(initState, (builder) => {
//   builder
//   .addCase(ActionTypes.SET_AUTHENTICATED, (state) => {
//     return (state.authenticated = true);
//   })
//   .addCase(ActionTypes.SET_UNAUTHENTICATED, (state) => {
//     return initState;
//   })
//   .addCase(ActionTypes.SET_USER, (state, action) => {
//     return (state.authenticated = true), action.payload;
//   });
// });

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };

    case ActionTypes.SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
      };

    case ActionTypes.SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };

    case ActionTypes.LIKE_TWEET:
      return {
        ...state,
        likes: [
          // ...state.likes,
          {
            tweepHandle: state.credentials.handle,
            slug: action.payload.slug,
          },
        ],
      };

    case ActionTypes.UNLIKE_TWEET:
      return {
        ...state,
        likes: state.likes.filter((like) => like.slug === action.payload.slug),
      };

    // case ActionTypes.LOADING:
    //   return {
    //     ...state,
    //     authResponse: "loading...",
    //   };
    // case ActionTypes.SIGNUP_SUCCESS:
    //   return {
    //     ...state,
    //     authResponse: action.res,
    //   };
    // case ActionTypes.SIGNUP_ERROR:
    //   return {
    //     ...state,
    //     authResponse: action.res,
    //   };
    // case ActionTypes.SIGNIN_SUCCESS:
    //   return {
    //     ...state,
    //     authResponse: "redirecting to home...",
    //   };
    // case ActionTypes.SIGNIN_ERROR:
    //   return {
    //     ...state,
    //     authResponse: action.error,
    //   };
    // case ActionTypes.SIGNOUT_SUCCESS:
    //   return {
    //     ...state,
    //     authResponse: action.res,
    //   };
    // case ActionTypes.SIGNOUT_ERROR:
    //   return {
    //     ...state,
    //     authResponse: action.res,
    //   };
    // case ActionTypes.CODE_ERROR:
    //   return {
    //     ...state,
    //     authResponse:
    //       "There seems to be a problem, please refresh your browser",
    //   };
    default:
      return state;
  }
};
export default UserReducer;
