import * as ActionTypes from "../../types/ActionTypes";
import { initState } from "../IndexContext";

const TweetReducer = (state = initState, action) => {
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

    case ActionTypes.SET_TWEET_TEXT:
      return {
        ...state,
        tweet: { tweetText: action.payload },
      };

    case ActionTypes.SET_TWEET_PHOTO:
      return {
        ...state,
        tweet: { tweetPhoto: action.payload },
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

export default TweetReducer;
