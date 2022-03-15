import axiosInstance from "../../../helpers/axiosInstance";
import {
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SIGNUP_ERRORS,
} from "../../../types/ActionTypes";
import { useNavigate } from "react-router-dom";

export const SignUp =
  ({
    fields,
    // firstName: first_name,
    // lastName: last_name,
    // handle,
    // email,
    // password,
    // password_confirmation,
  }) =>
  (dispatch) => {
    const navigate = useNavigate();
    dispatch({
      type: LOADING_UI,
    });

    axiosInstance()
      .post("/signup", fields)
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
          dispatch({
            type: SET_SIGNUP_ERRORS,
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
          type: SET_SIGNUP_ERRORS,
          payload: err,
        });
      });
  };
