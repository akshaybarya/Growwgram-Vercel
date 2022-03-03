import { combineReducers } from "redux";

import deviceReducer from "./deviceReducer";
import feedReducer from "./feedReducer";
import themeReducer from "./themeReducer";
import userReducer from "./userReducer";

export default combineReducers({
  theme: themeReducer,
  device: deviceReducer,
  feed: feedReducer,
  user: userReducer,
});
