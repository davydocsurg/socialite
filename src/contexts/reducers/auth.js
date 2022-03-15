import * as ActionTypes from "../../types/ActionTypes";

const auth = (state, { payload, type }) => {
  switch (type) {
    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };

    case ActionTypes.SET_UNAUTHENTICATED:
      return {
        ...state,
      };

    case ActionTypes.SET_SIGNUP_ERRORS:
      return {
        ...state,
        errors: payload,
      };

    case ActionTypes.SET_LOGIN_ERRORS:
      return {
        ...state,
        errors: payload,
      };

    case ActionTypes.SET_USER:
      return {
        ...state,
        authenticated: true,
        credentials: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default auth;
