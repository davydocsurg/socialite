import * as ActionTypes from "../ActionTypes";

const initState = {
  tweetText: "",
  tweetPhoto: "",
  allTweets: [],
  tweetBoxVisibity: false,
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
        allTweets: [...action.payload],
      };

    case ActionTypes.CLEAR_FIELDS:
      return {
        allTweets: [],
      };

    case ActionTypes.CLOSE_TWEET_BOX:
      return {
        // tweetBoxVisibity: action.payload,
        ...action.payload,
      };

    case ActionTypes.OPEN_TWEET_BOX:
      return {
        // tweetBoxVisibity: true,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default TweetReducer;
