import UserReducer from "./UserReducer";
import TweetReducer from "./TweetReducer";

export default function CombineReducers({ credentials, tweets }, action) {
  return {
    credentials: UserReducer(credentials, action),
    tweets: TweetReducer(tweets, action),
  };
}
