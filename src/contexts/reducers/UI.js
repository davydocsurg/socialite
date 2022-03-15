import * as ActionTypes from "../../types/ActionTypes";

const UIReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        loginErrorMsg: action.payload,
      };
    case ActionTypes.DISPLAY_ERROR_MSG:
      return {
        ...state,
        showErrMsg: true,
      };
    default:
      return state;
  }
};

export default UIReducer;
