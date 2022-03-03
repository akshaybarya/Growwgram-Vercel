export type appState = {
  theme: themeState;
  device: deviceState;
  feed: feedState;
  user: userState;
};

export type themeState = string;

export type deviceState = string;

export type feedState = {
  feedData: feedData[];
  loading: boolean;
  error: boolean;
};

export type userState = {
  userData: userData[];
  loading: boolean;
  error: boolean;
};

export type feedData = {
  id: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    profile_image: { large: string; medium: string; small: string };
    total_likes: number;
  };
  description: string;
  width: number;
  height: number;
};

export type userData = {
  details: {
    username: string;
    name: string;
    profile_image: {
      medium: string;
    };
    followers_count: number;
    following_count: number;
    total_photos: number;
  };
  images?: imageData[];
};

export type imageData = {
  id: string;
  urls: { small: string; full: string; regular: string };
  likes: number;
  description: string;
};

export type action = { type: string; payload?: object };
export type feedAction = { type: string; payload: feedData[] };

export type appData = {
  FEED_DATA?: any;
  FEED_TIME_KEY?: any;
  USER_DATA?: any;
};
