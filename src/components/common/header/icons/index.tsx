import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { alterTheme, refreshFeedData } from "../../../../store/actions";
import { dummyFeedData } from "../../../../utils/constants/feedData";
import { appState, feedData, themeState } from "../../../../utils/types";

type Props = {
  alterTheme: Function;
  refreshFeedData: Function;
  theme: themeState;
  feed: feedData;
  loading: boolean;
};

const HeaderIcons = (props: Props) => {
  const navigate = useNavigate();

  const getButton = () => {
    if (props.theme === "dark") {
      return (
        <span className="header195Icons" onClick={() => props.alterTheme()}>
          <i className="fa-solid fa-sun"></i>
        </span>
      );
    } else {
      return (
        <span className="header195Icons" onClick={() => props.alterTheme()}>
          <i className="fa-regular fa-moon"></i>
        </span>
      );
    }
  };

  return (
    <>
      <span className="header195Icons">
        <Link to="/">
          <i className="fa-solid fa-house"></i>
        </Link>
      </span>

      <span className="header195Icons">
        <i className="fa-regular fa-square-plus"></i>
      </span>
      <span className="header195Icons">
        <Link to="/users">
          <i className="fa-regular fa-heart"></i>
        </Link>
      </span>
      <span className="header195Icons" onClick={() => props.refreshFeedData()}>
        <i className="fa-solid fa-arrow-rotate-right"></i>
      </span>
      {getButton()}

      <span
        className="mHeader195Blocks header195ProfileIcon headerProfileIcon"
        onClick={() =>
          props.loading ? null : navigate(`/user/${props.feed.user.username}`)
        }
      >
        <img
          src={
            props.feed.user.profile_image.small !== ""
              ? props.feed.user.profile_image.small
              : require("../../../../assets/userImage.jpeg")
          }
          height="25px"
          width="25px"
        />
      </span>
    </>
  );
};

const mapStateToProps = (state: appState) => ({
  theme: state.theme,
  feed:
    state.feed.feedData && state.feed.feedData.length > 9
      ? state.feed.feedData[9]
      : dummyFeedData,
  loading: state.feed.loading,
});

export default connect(mapStateToProps, { alterTheme, refreshFeedData })(
  HeaderIcons
);
