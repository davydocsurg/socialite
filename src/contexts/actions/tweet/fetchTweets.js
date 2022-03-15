import {
  LOADING_UI,
  SET_TWEET_DATA,
  STOP_LOADING_UI,
} from "../../../types/ActionTypes";
import axiosInstance from "../../../helpers/axiosInstance";

export const FetchTweets = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_UI });

    axiosInstance()
      .get("/tweets")
      .then((res) => {
        dispatch({
          type: SET_TWEET_DATA,
          payload: res.data,
        });

        dispatch({
          type: STOP_LOADING_UI,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// export const HandleTweetText = (value) => {
//   return (dispatch) => {
//     dispatch({ type: ActionTypes.SET_TWEET_TEXT, payload: value });
//   };
// };

// export const HandleTweetPhoto = (value) => {
//   return (dispatch) => {
//     dispatch({ type: ActionTypes.SET_TWEET_PHOTO, payload: value });
//   };
// };

// const setAuthToken = (token) => {
//   const authToken = `Bearer ${token}`;
//   localStorage.setItem("user-token", authToken);
//   axios.defaults.headers.common["Authorization"] = authToken;
// };
