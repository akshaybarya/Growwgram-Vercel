import { getTheme } from "../../utils/helpers/localStorage";
import { action, themeState } from "../../utils/types";
import { ALTER_THEME, SET_CURR_THEME } from "../actions/types";

const currTheme = getTheme();

const themeReducer = (
  state: themeState = currTheme ? currTheme : "",
  action: action
) => {
  switch (action.type) {
    case ALTER_THEME:
      return state === "dark" ? "light" : "dark";

    case SET_CURR_THEME:
      return action.payload;

    default:
      return state;
  }
};

export default themeReducer;
