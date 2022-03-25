import * as ActionTypes from "../../types/ActionTypes";
import { authState } from "../AuthContext";
// import { initState } from "../IndexContext";

const UserReducer = (state = authState, action) => {
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
        ...state,
        credentials: action.payload,
        // authenticated: true,
        loading: false,
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
    default:
      return state;
  }
};

export default UserReducer;
