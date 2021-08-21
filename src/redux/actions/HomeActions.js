import { LoadTweets } from "../../services/HomeServices";
import * as ActionTypes from "../ActionTypes";

export const LoadTweetsAction = () => {
  return (dispatch) => {
    console.log("loading...");
    dispatch({ type: ActionTypes.LOADING });
    LoadTweets().then(
      (res) => {
        if (res.hasOwnProperty("success") && res.success === true) {
          dispatch({ type: ActionTypes.LOAD_TWEETS_SUCCESS, res });
        } else if (res.hasOwnProperty("success") && res.success === false) {
          dispatch({ type: ActionTypes.LOAD_TWEETS_ERROR, res });
        }
      },
      (error) => {
        dispatch({ type: ActionTypes.CODE_ERROR, error });
      }
    );
  };
};
