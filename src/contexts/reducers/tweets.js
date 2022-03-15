import * as ActionTypes from "../../types/ActionTypes";

const tweet = (state, { payload, type }) => {
  switch (type) {
    case ActionTypes.SET_TWEET_DATA:
      return {
        ...state,
        tweets: payload,
      };

    case ActionTypes.SET_TWEET_TEXT:
      return {
        ...state,
        tweet: { tweetText: payload },
      };

    case ActionTypes.SET_TWEET_PHOTO:
      return {
        ...state,
        tweet: { tweetPhoto: payload },
      };

    case ActionTypes.LIKE_TWEET:
      return {
        ...state,
        likes: [
          // ...state.likes,
          {
            tweepHandle: state.credentials.handle,
            slug: payload.slug,
          },
        ],
      };

    case ActionTypes.UNLIKE_TWEET:
      return {
        ...state,
        likes: state.likes.filter((like) => like.slug === payload.slug),
      };
    default:
      return state;
  }
};

export default tweet;
