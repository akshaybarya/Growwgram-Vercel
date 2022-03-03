import { CACHE_TIME } from "../constants";
import { appData } from "../types";

export const storeTheme = (theme: string) => {
  localStorage.setItem("THEME", theme);
};

export const getTheme = () => {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  let theme;
  if (darkThemeMq.matches) {
    theme = "dark";
  } else {
    theme = "light";
  }

  return localStorage.getItem("THEME") ? localStorage.getItem("THEME") : theme;
};

export const setFeedData = (data: any) => {
  const appData: object = JSON.parse(localStorage.getItem("APP DATA") || "{}");

  const FEED_TIME_KEY = Date.now();

  const set = new Set(data);

  localStorage.setItem(
    "APP DATA",
    JSON.stringify({ ...appData, FEED_DATA: Array.from(set), FEED_TIME_KEY })
  );
};

export const getFeedData = () => {
  const appData: appData = JSON.parse(localStorage.getItem("APP DATA") || "{}");

  if (!appData) return null;

  const currTime = Date.now();

  if (currTime - appData.FEED_TIME_KEY <= CACHE_TIME) {
    return appData.FEED_DATA;
  }

  return null;
};

export const removeFeedData = () => {
  localStorage.removeItem("APP DATA");
};

export const setUserData = (data: any) => {
  const appData: appData = JSON.parse(localStorage.getItem("APP DATA") || "{}");

  // Logic To Add DATA

  appData.USER_DATA = localStorage.setItem(
    "APP DATA",
    JSON.stringify({ ...appData, USER_DATA: data })
  );
};

export const getUserData = () => {
  const appData: appData = JSON.parse(localStorage.getItem("APP DATA") || "{}");

  return appData.USER_DATA ? appData.USER_DATA : [];
};
