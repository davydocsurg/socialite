import HttpService from "./HttpService";

export const LoadTweets = () => {
  const http = new HttpService();
  let tweetsUrl = "all/tweets";
  const tokenId = "user-token";
  return http
    .getData(tweetsUrl, tokenId)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
