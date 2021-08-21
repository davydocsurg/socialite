import * as ActionTypes from "../ActionTypes";
// import { createReducer } from "@reduxjs/toolkit";

const initState = {
  tweepProfile: "",
};
const ProfileReducer = (state = initState, action) => {
// const ProfileReducer = createReducer(initState, (builder) => {
  // builder
  //   .addCase(ActionTypes.LOADING, (state) => {
  //     return (state.tweepProfile = "loading");
  //   })

  //   .addCase(ActionTypes.LOAD_PROFILE_SUCCESS, (state, action) => {
  //     return (state.tweepProfile = action.res);
  //   })

  //   .addCase(ActionTypes.LOAD_PROFILE_ERROR, (state, action) => {
  //     return (state.tweepProfile = action.res);
  //   })

  //   .addCase(ActionTypes.CODE_ERROR, (state) => {
  //     return (state.tweepProfile =
  //       "There seems to be a problem, please refresh your browser");
  //   });

  switch (action.type) {
    case ActionTypes.LOADING:
      return {
        ...state,
        tweepProfile: "loading...",
      };
    case ActionTypes.LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        tweepProfile: action.res,
      };
    case ActionTypes.LOAD_PROFILE_ERROR:
      return {
        ...state,
        tweepProfile: action.res,
      };
    case ActionTypes.CODE_ERROR:
      return {
        ...state,
        tweepProfile:
          "There seems to be a problem, please refresh your browser",
      };
    default:
      return state;
  }
  }
;
export default ProfileReducer;
