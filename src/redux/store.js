import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
// import RootReducer from "./reducers/RootReducer";
// import UIReducer from "./reducers/UIReducer";
// import DataReducer from "./reducers/DataReducer";
import AuthReducer from "./reducers/AuthReducer";
import UIReducer from "./reducers/UIReducer";

const initialState = {};
const middleware = [thunk];
const reducers = combineReducers({
  userAuth: AuthReducer,
  // data: DataReducer,
  UI: UIReducer,
});

export const store = createStore(
  // RootReducer,
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
