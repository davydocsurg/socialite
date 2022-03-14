import * as ActionTypes from "../../types/ActionTypes";
import { initState } from "../IndexContext";

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };

    case ActionTypes.SET_UNAUTHENTICATED:
      return {
        initState,
      };

    case ActionTypes.SET_USER:
      console.log(
        "http://localhost:8000/profile/photos/" + action.payload.profile_picture
      );
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
