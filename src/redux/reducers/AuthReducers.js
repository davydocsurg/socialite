import * as ActionTypes from "../ActionTypes";

const initState = {
  authResponse: [],
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.RESTART_AUTH_RESPONSE:
      return {
        ...state,
        authResponse: "",
      };
    case ActionTypes.LOADING:
      return {
        ...state,
        authResponse: "loading...",
      };
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        authResponse: action.res,
      };
    case ActionTypes.SIGNUP_ERROR:
      return {
        ...state,
        authResponse: action.res,
      };
    case ActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        authResponse: "redirecting to home...",
      };
    case ActionTypes.SIGNIN_ERROR:
      return {
        ...state,
        authResponse: action.error,
      };
    case ActionTypes.SIGNOUT_SUCCESS:
      return {
        ...state,
        authResponse: action.res,
      };
    case ActionTypes.SIGNOUT_ERROR:
      return {
        ...state,
        authResponse: action.res,
      };
    case ActionTypes.CODE_ERROR:
      return {
        ...state,
        authResponse:
          "There seems to be a problem, please refresh your browser",
      };
    default:
      return state;
  }
};
export default AuthReducer;
