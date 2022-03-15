import axios from "axios";

export default (history = null) => {
  // const baseURL = process.env.REACT_APP_BACKEND_URL;
  const baseURL = "http://localhost:8000/api";

  let headers = {};
  let token = localStorage.getItem("user-token");

  if (token) {
    headers.Authorization = `${token}`;
  }

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 403) {
        localStorage.removeItem("user-token");

        if (history) {
          history.push("/signin");
        } else {
          window.location = "/signin";
        }
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return axiosInstance;
};
