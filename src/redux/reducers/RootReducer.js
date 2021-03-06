import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import HomeReducer from "./HomeReducer";
import ProfileReducer from "./ProfileReducer";

const RootReducer = combineReducers({
  userAuth: AuthReducer,
  tweets: HomeReducer,
  tweepDetails: ProfileReducer,
});
export default RootReducer;
