import { LoadProfile } from "../../services/ProfileServices";
import * as ActionTypes from "../ActionTypes";

export const LoadProfileAction = () => {
  return (dispatch) => {
    console.log("profile...");
    dispatch({ type: ActionTypes.LOADING_UI });
    LoadProfile().then(
      (res) => {
        if (res.hasOwnProperty("success") && res.success === true) {
          dispatch({ type: ActionTypes.LOAD_PROFILE_SUCCESS, res });
        } else if (res.hasOwnProperty("success") && res.success === false) {
          dispatch({ type: ActionTypes.LOAD_PROFILE_ERROR, res });
        }
      },
      (error) => {
        dispatch({ type: ActionTypes.CODE_ERROR, error });
      }
    );
  };
};

export const UpdateProfileInfo = () => {
  return (dispatch) => {
    console.log("updating...");
    dispatch({ type: ActionTypes.LOADING_UI });
  };
};
