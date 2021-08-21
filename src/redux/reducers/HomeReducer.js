import * as ActionTypes from "../ActionTypes";

const initState = {
  tweets: "",
};
const TweetsReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.LOADING:
      return {
        ...state,
        tweets: "loading...",
      };
    case ActionTypes.LOAD_TWEETS_SUCCESS:
      return {
        ...state,
        tweets: action.res,
      };
    case ActionTypes.LOAD_TWEETS_ERROR:
      return {
        ...state,
        tweets: action.res,
      };
    case ActionTypes.CODE_ERROR:
      return {
        ...state,
        tweets: "There seems to be a problem, please refresh your browser",
      };
    default:
      return state;
  }
};
export default TweetsReducer;
