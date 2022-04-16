import axios from "axios";
import { SignOutAction } from "../redux/actions/AuthActions";
import { store } from "../redux/store";

const baseURL = "http://localhost:8000/api";

const API = axios.create({
  baseURL,
});

API.interceptors.request.use((request) => {
  const token = localStorage.getItem("user-token");
  // const { auth } = store.getState();
  if (token) {
    request.headers.common.Authorization = `${token}`;
  }

  return request;
});

API.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log("user cancelled the network request");
      return Promise.reject(error);
    } else {
      const { status, data } = error;
      if (status === 401) {
        // store.dispatch(SignOutAction());
        console.log("called................");
        // localStorage.removeItem("user-token");
        // location.href = "/signin";

        return Promise.reject("Session expired. Please login.");
      } else if (status === 503) {
        return Promise.reject("Service unavailable. Please try again later");
      } else {
        //console.log(error.response);
        return Promise.reject(error);
      }
    }
  }
);

export default API;

export const Endpoints = {
  // auth
  signUp: "signup",
  signIn: "signin",
  signOut: "signout",
  authUser: "authUser",
  // auth tweets
  authUserTweets: "authUserTweets",
  // profile
  updateProfile: "update-profile",
  updateProfilePics: "update-profile-picture",
  updateCoverPics: "update-cover-picture",
  updatePassword: "update-password",
  // tweets
  tweets: "tweets",
  tweetLikes: "tweets/likes",
  createTweet: "tweet/create",
  showTweet: "tweet/show/",
  destroyTweet: "tweet/destroy/",
  // tweet replies
  tweetReplies: "replies",
  replyTweet: "reply/",
  showATweetReply: "reply/show/",
  destroyATweetReply: "reply/destroy/",
  // like tweet
  likeTweet: "like/",
  unlikeTweet: "unlike/",
};
