import React from "react";
import { connect } from "react-redux";

import { appState, feedData } from "../../../utils/types";

import StoryBlock from "./storyBlock";

import "./story.css";

type Props = {
  feed: feedData[];
};

const Story = (props: Props) => {
  const renderCards = () => {
    return props.feed.map((feed, index) => {
      if (index < 10) {
        return <StoryBlock key={index} feed={feed} />;
      } else return null;
    });
  };

  return <div className="story195Container flex195">{renderCards()}</div>;
};

const mapStateToProps = (state: appState) => ({
  feed: state.feed.feedData,
});

export default connect(mapStateToProps)(Story);
