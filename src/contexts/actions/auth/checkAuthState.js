import { useNavigate } from "react-router-dom";
import HttpService from "../../../services/HttpServices";
import {
  SET_AUTHENTICATED,
  SET_USER,
  STOP_LOADING_UI,
} from "../../../types/ActionTypes";

export const checkAuthState = () => (dispatch) => {
  const navigate = useNavigate();

  let token = localStorage.getItem("user-token");
  if (token) {
    dispatch({
      type: SET_AUTHENTICATED,
    });
    navigate("/home");
  }
};

export const fetchUserData = () => (dispatch) => {
  let token = localStorage.getItem("user-token");
  const http = new HttpService();
  const headers = {
    Authorization: `${token}`,
    "Content-type": "application/json",
  };
  axios
    .get(http.url + "/authUser", { headers: headers })
    .then((res) => {
      console.log(res.data.credentials.profile_picture);

      dispatch({
        type: SET_USER,
        payload: res.data.credentials,
      });

      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.error(err);
    });
};
