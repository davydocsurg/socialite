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
            if (
                res.data.hasOwnProperty("success") &&
                res.data.success === false
            ) {
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
                dispatch({
                    type: ActionTypes.SET_TWEET_DATA,
                    payload: res.data,
                });

                dispatch({
                    type: ActionTypes.STOP_LOADING_UI,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    };
};

export const RefreshTweetsAction = () => {
    return (dispatch) => {
        const http = new HttpService();

        axios
            .get(http.url + "/tweets")
            .then((res) => {
                dispatch({
                    type: ActionTypes.SET_TWEET_DATA,
                    payload: res.data,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    };
};

export const RefreshAuthUser = () => (dispatch) => {
    let token = localStorage.getItem("user-token");
    const http = new HttpService();
    const headers = {
        Authorization: `${token}`,
        "Content-type": "application/json",
    };
    axios
        .get(http.url + "/authUser", { headers: headers })
        .then((res) => {
            dispatch({
                type: ActionTypes.SET_USER,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

export const FetchTweetsLikeAction = () => {
    return (dispatch) => {
        const http = new HttpService();
        dispatch({ type: ActionTypes.LOADING_UI });

        axios
            .get(http.url + "/tweets/likes")
            .then((res) => {
                dispatch({
                    type: ActionTypes.FETCH_TWEET_LIKES,
                    payload: res.data,
                });

                dispatch({
                    type: ActionTypes.STOP_LOADING_UI,
                });
            })
            .catch((err) => {
                //
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

export const FetchTweet = (tweet) => (dispatch) => {
    const http = new HttpService();
    dispatch({ type: ActionTypes.LOADING_UI });

    const token = localStorage.getItem("user-token");

    const headers = {
        Authorization: `${token}`,
        "Content-type": "application/json",
    };
    axios
        .get(http.url + `/tweet/${tweet}`, {
            headers,
        })
        .then((res) => {
            dispatch({
                type: ActionTypes.FETCH_TWEET,
                payload: res.data,
            });
            console.log(res.data);
            dispatch({ type: ActionTypes.STOP_LOADING_UI });

            // .then((res) => {
            //   if (res.data.hasOwnProperty("success") && res.data.success === false) {
            //     dispatch({
            //       type: ActionTypes.SET_ERRORS,
            //       payload: res.data.message,
            //     });
            //   } else if (
            //     res.data.hasOwnProperty("success") &&
            //     res.data.success === true
            //   ) {
            //     dispatch({
            //       type: ActionTypes.FETCH_TWEET,
            //       payload: res.data,
            //     });
            //     console.log(res.data);
            //     dispatch({ type: ActionTypes.STOP_LOADING_UI });
            //   }
            // return res;
        })
        .catch((err) => {
            console.error("====================================");
            console.error(err);
            console.error("====================================");
        });
};

export const LikeTweet = (tweet) => (dispatch) => {
    const token = localStorage.getItem("user-token");

    const headers = {
        Authorization: `${token}`,
        "Content-type": "application/json",
    };
    const http = new HttpService();
    axios
        .get(http.url + `/tweets/${tweet}/like`, {
            headers,
        })
        .then((res) => {
            dispatch({
                type: ActionTypes.LIKE_TWEET,
                payload: res.data,
            });
            dispatch(RefreshTweetsAction());
        })
        .catch((err) => {
            console.error("====================================");
            console.error(err);
            console.error("====================================");
        });
};

export const UnlikeTweet = (tweet) => (dispatch) => {
    const token = localStorage.getItem("user-token");

    const headers = {
        Authorization: `${token}`,
        "Content-type": "application/json",
    };
    const http = new HttpService();
    axios
        .get(http.url + `/tweets/${tweet}/unlike`, {
            headers,
        })
        .then((res) => {
            dispatch({
                type: ActionTypes.UNLIKE_TWEET,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
        });
};
