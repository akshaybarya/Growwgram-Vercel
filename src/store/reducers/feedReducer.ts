import { getFeedData } from "../../utils/helpers/localStorage";

import { feedAction, feedState } from "../../utils/types";
import {
  ADD_FEED_DATA,
  FEED_LOADING,
  FEED_LOADING_FALSE,
  FETCH_FEED_DATA,
  REMOVE_FEED_DATA,
  FEED_ERROR,
} from "../actions/types";

const d = getFeedData();

const feedReducer = (
  state: feedState = { feedData: d ? d : [], loading: true, error: false },
  action: feedAction
) => {
  switch (action.type) {
    case FETCH_FEED_DATA: {
      const set = new Set([...action.payload]);
      return { feedData: Array.from(set), loading: false };
    }

    case ADD_FEED_DATA: {
      return {
        feedData: [...state.feedData, ...action.payload],
        loading: false,
      };
    }

    case FEED_ERROR: {
      return { ...state, error: true, loading: false };
    }

    case REMOVE_FEED_DATA: {
      return { feedData: [], loading: false };
    }

    case FEED_LOADING: {
      return { ...state, loading: true };
    }

    case FEED_LOADING_FALSE: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
};

export default feedReducer;
