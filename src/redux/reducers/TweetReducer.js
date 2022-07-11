import * as ActionTypes from "../ActionTypes";

const initState = {
    tweetText: "",
    tweetPhoto: "",
    allTweets: null,
    tweetDetails: [],
    tweetLikes: [],
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
                ...state,
                allTweets: action.payload,
            };

        case ActionTypes.FETCH_TWEET:
            return {
                ...state,
                tweetDetails: action.payload,
            };

        case ActionTypes.FETCH_TWEET_LIKES:
            return {
                tweetLikes: [...action.payload],
            };

        case ActionTypes.LIKE_TWEET:
        case ActionTypes.UNLIKE_TWEET:
            let i = state.allTweets.findIndex((tweet) => {
                tweet.slug === action.payload.slug;
            });
            state.allTweets[i] = action.payload;
            return {
                ...state,
            };

        case ActionTypes.CLEAR_FIELDS:
            return {
                // allTweets: [],
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
