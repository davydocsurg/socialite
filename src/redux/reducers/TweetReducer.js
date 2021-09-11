import * as ActionTypes from "../ActionTypes";

const initState = {
  tweetText: "",
  tweetPhoto: "",
  tweets: [],
};

const TweetReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SET_TWEET_TEXT:
      return {
        ...state,
        tweetText: action.payload,
      };

    case ActionTypes.SET_TWEET_PHOTO:
      return {
        ...state,
        tweetPhoto: action.payload,
      };

    case ActionTypes.SET_TWEET_DATA:
      return {
        tweets: action.payload,
      };

    case ActionTypes.CLEAR_FIELDS:
      return {
        tweets: [],
      };

    default:
      return state;
  }
};

export default TweetReducer;
