import HttpService from "./HttpServices";
import * as ActionTypes from "../redux/ActionTypes";
import { Endpoints } from "../api/axios";

export const UpdateProfileDetails = async (payload) => {
  // console.log(tweet_text, tweetFile);
  return await API.post(Endpoints.updateProfile, payload);
};

export const LoadProfile = () => {
  const http = new HttpService();

  const tokenId = localStorage.getItem("user-token");
  return http
    .getData(Endpoints.authUser, tokenId)
    .then((data) => {
      console.log(data);
      // return data;
      // dispatch({
      //   type: ActionTypes.SET_USER,
      //   payload:data
      // })
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
