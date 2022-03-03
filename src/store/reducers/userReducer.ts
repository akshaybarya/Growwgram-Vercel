import { userState } from "../../utils/types";
import {
  ADD_USER_DATA,
  FETCH_USER_DATA,
  USER_ERROR,
  USER_LOADING,
} from "../actions/types";

import { getUserData } from "../../utils/helpers/localStorage";

const userReducer = (
  state: userState = {
    userData: getUserData(),
    loading: true,
    error: false,
  },
  action: {
    type: string;
    payload: [];
  }
) => {
  switch (action.type) {
    case FETCH_USER_DATA:
      return { userData: action.payload, loading: false };

    case ADD_USER_DATA: {
      const d = state.userData;
      d[0].images = d[0].images?.concat(action.payload);

      return { userData: [...d], loading: false };
    }

    case USER_ERROR: {
      return { ...state, error: true, loading: false };
    }

    case USER_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
};

export default userReducer;
