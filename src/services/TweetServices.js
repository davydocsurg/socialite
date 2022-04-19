import API, { Endpoints } from "../api/axios";
import HttpService from "./HttpServices";

export const SendTweetService = async (tweetText, tweetFile) => {
  return await API.post(Endpoints.createTweet, tweetText, tweetFile);
};
