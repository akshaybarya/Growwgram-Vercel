import { Dispatch } from "redux";

import axios from "../../utils/api/axios";
import { identifyDevice } from "../../utils/helpers";

import {
  getUserData as getLocalstorageUserData,
  getFeedData as getLocalstorageFeedData,
  setUserData,
  setFeedData,
  removeFeedData,
} from "../../utils/helpers/localStorage";

import lru from "../../utils/helpers/lru";

import {
  ADD_FEED_DATA,
  ADD_USER_DATA,
  ALTER_THEME,
  CHANGE_DEVICE,
  FEED_ERROR,
  FEED_LOADING,
  FEED_LOADING_FALSE,
  FETCH_FEED_DATA,
  FETCH_USER_DATA,
  REMOVE_FEED_DATA,
  SET_CURR_THEME,
  USER_ERROR,
  USER_LOADING,
} from "./types";

/**
 * SET THEME
 */
export const alterTheme =
  (currTheme?: string) => async (dispatch: Dispatch) => {
    if (currTheme)
      dispatch({
        type: SET_CURR_THEME,
        payload: currTheme,
      });
    else
      dispatch({
        type: ALTER_THEME,
      });
  };

/**
 * ALTER DEVICE TYPE
 * XL MD SM
 */
export const alterDevice = () => async (dispatch: Dispatch) => {
  const device = identifyDevice();

  dispatch({
    type: CHANGE_DEVICE,
    payload: device,
  });
};

/**
 * GET FEED DATA
 */
export const getFeedData =
  () => async (dispatch: Function, getState: Function) => {
    dispatch({
      type: FEED_LOADING,
      payload: [],
    });
    const feedData = getLocalstorageFeedData();
    if (feedData) {
      if (getState().feed.feedData.length >= 9) {
        dispatch({
          type: FEED_LOADING_FALSE,
          payload: [],
        });
        return;
      }

      dispatch({
        type: FETCH_FEED_DATA,
        payload: feedData,
      });
      return;
    }

    try {
      const res = await axios.get("/photos/random", {
        params: {
          count: 10,
        },
      });

      setFeedData(res.data);

      dispatch({
        type: FETCH_FEED_DATA,
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: FEED_ERROR,
        payload: [],
      });
    }
  };

/**
 * ADD MORE POSTS TO FEED
 */
export const addFeedData = (page: number) => async (dispatch: Function) => {
  try {
    const fData = getLocalstorageFeedData();
    if (!fData) {
      await dispatch(refreshFeedData());
    }

    const res = await axios.get("/photos/random", {
      params: {
        count: 10,
      },
    });

    let data = res.data;
    setFeedData([...fData, ...res.data]);

    dispatch({
      type: ADD_FEED_DATA,
      payload: data,
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: FEED_ERROR,
      payload: [],
    });
  }
};

/**
 * REFRESH FEED DATA
 */
export const refreshFeedData = () => async (dispatch: Function) => {
  dispatch({
    type: FEED_LOADING,
    payload: [],
  });
  removeFeedData();
  dispatch({
    type: REMOVE_FEED_DATA,
    payload: [{}],
  });
  await dispatch(getFeedData());
};

/**
 * GET USER DATA THROUGH ID
 */
export const getUserData = (username: string) => async (dispatch: Function) => {
  try {
    dispatch({
      type: USER_LOADING,
    });

    const data = lru(username);

    if (data) {
      dispatch({
        type: FETCH_USER_DATA,
        payload: data,
      });
      return;
    }

    const res1 = await axios.get(`/users/${username}`);

    const res2 = await axios.get(`/users/${username}/photos`, {
      params: {
        page: 1,
        per_page: 10,
      },
    });

    const d = lru(undefined, { details: res1.data, images: res2.data });

    dispatch({
      type: FETCH_USER_DATA,
      payload: d,
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: USER_ERROR,
      payload: [],
    });
  }
};

/**
 * GET USER DATA THROUGH ID
 */
export const addUserData =
  (page: number, username: string) => async (dispatch: Function) => {
    try {
      const userData = getLocalstorageUserData();
      if (!userData) {
        await dispatch(getUserData(username));
      }

      const res = await axios.get(`/users/${username}/photos`, {
        params: {
          page,
          per_page: 10,
        },
      });

      let data = res.data;

      // Add Data To LOCALSTORAGE

      userData[0].images = userData[0].images?.concat(data);

      setUserData(userData);

      dispatch({
        type: ADD_USER_DATA,
        payload: data,
      });
    } catch (e) {
      console.error(e);

      dispatch({
        type: USER_ERROR,
        payload: [],
      });
    }
  };
