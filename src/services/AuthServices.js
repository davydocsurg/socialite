import HttpService from "./HttpServices";

export const SignUpUserService = (credentials) => {
  const http = new HttpService();
  let signUpUrl = "signup";
  return http
    .postData(credentials, signUpUrl)
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
  let signInUrl = "signin";
  return http
    .postData(credentials, signInUrl)
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
  let signOutUrl = "signout";
  const tokenId = "user-token";
  return http
    .postData(tokenId, signOutUrl)
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
