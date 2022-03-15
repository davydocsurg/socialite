import axiosInstance from "../../../helpers/axiosInstance";
import {
  CLEAR_ERRORS,
  LOADING_UI,
  SET_LOGIN_ERRORS,
} from "../../../types/ActionTypes";
import { useNavigate } from "react-router-dom";

export const SignIn =
  ({ fields }) =>
  (dispatch) => {
    const navigate = useNavigate();
    dispatch({
      type: LOADING_UI,
    });

    axiosInstance()
      .post("/signin", fields)
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
          dispatch({
            type: SET_LOGIN_ERRORS,
            payload: res.data.message,
          });
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          dispatch({
            type: CLEAR_ERRORS,
          });
          navigate("/signin");
        }
      })
      .catch((err) => {
        dispatch({
          type: SET_LOGIN_ERRORS,
          payload: err,
        });
      });
  };
