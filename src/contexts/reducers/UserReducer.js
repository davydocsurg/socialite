import * as ActionTypes from "../../types/ActionTypes";

const UserReducer = (state, action) => {
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
    default:
      return state;
  }
};

export default UserReducer;
