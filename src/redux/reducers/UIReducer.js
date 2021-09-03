import * as ActionTypes from "../ActionTypes";

const initState = {
  loading: false,
  errors: null,
};

const UIReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case ActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case ActionTypes.LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default UIReducer;
