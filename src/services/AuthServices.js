import API, { Endpoints } from "../api/axios";
import HttpService from "./HttpServices";

export const SignUpService = async (credentials) => {
  return await API.post(Endpoints.signUp, credentials);
};

export const SignInService = async (credentials) => {
  return await API.post(Endpoints.signIn, credentials);
};

export const SignOutService = async () => {
  return await API.post(Endpoints.signOut);
};

export const SignUpUserService = (credentials) => {
  const http = new HttpService();
  return http
    .postData(credentials, Endpoints.signUp)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const SignInUserService = (credentials) => {
  const http = new HttpService();
  return http
    .postData(credentials, Endpoints.signIn)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const SignOutUserService = () => {
  const http = new HttpService();
  const tokenId = "user-token";
  return http
    .postData(tokenId, Endpoints.signOut)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const IsSignedIn = () => {
  let isAuth = false;
  const tokenId = localStorage.getItem("user-token");
  if (tokenId !== null && tokenId !== "") {
    return (isAuth = true);
  } else {
  }
};
