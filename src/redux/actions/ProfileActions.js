import axios from "axios";
import { LoadProfile } from "../../services/ProfileServices";
import * as ActionTypes from "../ActionTypes";
import HttpService from "../../services/HttpServices";
import { getUserData } from "./AuthActions";

export const LoadProfileAction = () => {
    return (dispatch) => {
        console.log("profile...");
        dispatch({ type: ActionTypes.LOADING_UI });
        LoadProfile().then(
            (res) => {
                if (res.hasOwnProperty("success") && res.success === true) {
                    dispatch({ type: ActionTypes.LOAD_PROFILE_SUCCESS, res });
                } else if (
                    res.hasOwnProperty("success") &&
                    res.success === false
                ) {
                    dispatch({ type: ActionTypes.LOAD_PROFILE_ERROR, res });
                }
            },
            (error) => {
                dispatch({ type: ActionTypes.CODE_ERROR, error });
            }
        );
    };
};

export const UpdateProfileInfo = (profileDetails) => {
    return (dispatch) => {
        let token = localStorage.getItem("user-token");
        const http = new HttpService();
        const headers = {
            Authorization: ` ${token}`,
            "Content-type": "application/json",
        };
        dispatch({ type: ActionTypes.LOADING_UI });

        axios
            .post(http.url + "/update-profile", profileDetails, {
                headers: headers,
            })
            .then((res) => {
                if (
                    res.data.hasOwnProperty("success") &&
                    res.data.success === false
                ) {
                    console.log("pp");
                    console.log(res);
                    dispatch({
                        type: ActionTypes.SET_ERRORS,
                        payload: res.data,
                    });
                } else if (
                    res.data.hasOwnProperty("success") &&
                    res.data.success === true
                ) {
                    dispatch({
                        type: ActionTypes.CLEAR_ERRORS,
                    });
                    dispatch(getUserData());
                }
                console.log(res);
            })
            .catch((err) => {
                console.error("errors" + err);
                dispatch({
                    type: ActionTypes.SET_ERRORS,
                    payload: err,
                });
            });
    };
};

export const UpdateProfileImg = (profilePhoto) => {
    return (dispatch) => {
        let token = localStorage.getItem("user-token");
        const http = new HttpService();
        const headers = {
            Authorization: ` ${token}`,
            "Content-type": "application/json",
        };
        dispatch({ type: ActionTypes.LOADING_UI });

        axios
            .post(
                "http://localhost:8000/api/update-profile-picture",
                { profile_picture: profPics },
                {
                    headers: headers,
                }
            )
            .then((res) => {
                if (
                    res.data.hasOwnProperty("success") &&
                    res.data.success === false
                ) {
                    alert(res);
                } else if (
                    res.data.hasOwnProperty("success") &&
                    res.data.success === true
                ) {
                    closeProfPicsModal();
                }
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
    };
};

const getAuthorization = () => {
    let token = localStorage.getItem("user-token");
    const http = new HttpService();
    const headers = {
        Authorization: ` ${token}`,
        "Content-type": "application/json",
    };
};

export const fetchAuthUser = async () => {
    try {
        const res = await GetAuthUserService();
        if (res.data.status == 400 && res.data.success === false) {
            console.log(res.data);
        } else if (res.data.status == 200 && res.data.success === true) {
            console.log(res.data);
            dispatch({
                type: ActionTypes.SET_USER,
                payload: res.data,
            });
        }
    } catch (err) {
        console.error(err);
    }
};
