import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

import { alterTheme, refreshFeedData } from "../../../../store/actions";
import { dummyFeedData } from "../../../../utils/constants/feedData";
import { appState, feedData, themeState } from "../../../../utils/types";

import "./mobileHeader.css";

type Props = {
  alterTheme: Function;
  refreshFeedData: Function;
  theme: themeState;
  feed: feedData;
};

const MobileHeader = (props: Props) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation().pathname;

  const redirect = (to: string) => navigate(to);

  const scroll = (to: string) => {
    if (window.scrollY > 300) {
      window.scrollTo(0, 0);
    }

    if (params.id) {
      return;
    }

    if (location !== to) {
      redirect(to);
    }
  };

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
      <div id="myhID195" className="flex195 header195 mHeader195TopContainer">
        <span
          className="mHeader195Blocks"
          onClick={() => props.refreshFeedData()}
        >
          <i className="fa-solid fa-arrow-rotate-right"></i>
        </span>
        <span className="mHeader195Blocks">
          <Link to="/">
            <h2 className="mHeader195Logo">Growwgram</h2>
          </Link>
        </span>
        {getButton()}
      </div>

      <div className="flex195 header195 mHeader195BottomContainer">
        <span className="mHeader195Blocks" onClick={() => scroll("/")}>
          <i className="fa-solid fa-house"></i>
        </span>

        <span className="mHeader195Blocks">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>

        <span className="mHeader195Blocks" onClick={() => scroll("")}>
          <i className="fa-regular fa-square-plus"></i>
        </span>

        <Link to="/users">
          <span className="mHeader195Blocks">
            <i className="fa-regular fa-heart"></i>
          </span>
        </Link>

        <span
          className="mHeader195Blocks header195ProfileIcon imageIcon195"
          onClick={() => scroll(`/user/${props.feed.user.username}`)}
        >
          <img
            src={
              props.feed.user.profile_image.small !== ""
                ? props.feed.user.profile_image.small
                : require("../../../../assets/userImage.jpeg")
            }
            height="25px"
            width="25px"
            alt="User Profile"
          />
        </span>
      </div>
    </>
  );
};

const mapStateToProps = (state: appState) => ({
  theme: state.theme,
  feed: state.feed.feedData[9] || dummyFeedData,
});

export default connect(mapStateToProps, { alterTheme, refreshFeedData })(
  MobileHeader
);
