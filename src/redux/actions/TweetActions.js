import * as ActionTypes from "../ActionTypes";
import HttpService from "../../services/HttpServices";
import axios from "axios";
// 'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'

export const CreateTweetAction = (tweet_text, tweet_photo) => (dispatch) => {
  const token = localStorage.getItem("user-token");
  const http = new HttpService();
  const headers = {
    Authorization: `${token}`,
    "Content-type": "application/json",
  };
  dispatch({ type: ActionTypes.LOADING_UI });
  let tweetDetails = {
    tweet_text,
    tweet_photo,
  };

  // axios.defaults.headers.common["Authorization"] = token;
  axios
    .post(http.url + "/tweet/create", tweetDetails, {
      headers: headers,
    })

    .then((res) => {
      if (res.data.hasOwnProperty("success") && res.data.success === false) {
        dispatch({
          type: ActionTypes.SET_ERRORS,
          payload: res.data.message,
        });
        // console.log(res.data);
      } else if (
        res.data.hasOwnProperty("success") &&
        res.data.success === true
      ) {
        // console.log(res.data);
        dispatch({
          type: ActionTypes.CLEAR_ERRORS,
          type: ActionTypes.CLEAR_FIELDS,
        });

        // dispatch(FetchTweetsAction());
      }
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const FetchTweetsAction = () => {
  return (dispatch) => {
    const http = new HttpService();
    dispatch({ type: ActionTypes.LOADING_UI });

    axios
      .get(http.url + "/tweets")
      .then((res) => {
        // if (res.data.hasOwnProperty("success") && res.data.success === false) {
        //   dispatch({
        //     type: ActionTypes.SET_ERRORS,
        //     payload: res.data.message,
        //   });
        // } else if (
        //   res.data.hasOwnProperty("success") &&
        //   res.data.success === true
        // ) {
        dispatch({
          type: ActionTypes.CLEAR_ERRORS,
          type: ActionTypes.SET_TWEET_DATA,
          payload: res.data,
        });
        // console.log("=====from store===============================");
        // console.log(res.data);
        // console.log("====================================");
        // }
        // return res;
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const OpenTweetBox = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.OPEN_TWEET_BOX,
      payload: true,
    });

    console.log("====================================");
    console.log(ActionTypes.OPEN_TWEET_BOX.payload);
    console.log("====================================");
  };
};

export const CloseTweetBox = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_TWEET_BOX,
      payload: false,
    });
  };
};
