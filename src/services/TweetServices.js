import API, { Endpoints } from "../api/axios";

export const SendTweetService = async (payload) => {
  // console.log(tweet_text, tweetFile);
  return await API.post(Endpoints.createTweet, payload);
};
