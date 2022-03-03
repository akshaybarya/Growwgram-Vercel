import React from "react";

import SuggestionCard from "./suggestionCard";

import "./suggestion.css";
import UserCard from "./userCard";
import { connect } from "react-redux";
import { appState, feedData } from "../../../utils/types";

type Props = {
  feedData: feedData[];
};

const Suggestion = (props: Props) => {
  const renderCards = () => {
    const temp = props.feedData.reverse();
    return temp.map((feed, index) => {
      if (index <= 5 && index !== 0)
        return <SuggestionCard key={index} feed={feed} />;
      return null;
    });
  };

  return (
    <div className="flex195 fs195Container">
      <UserCard feed={props.feedData[props.feedData.length > 9 ? 9 : 0]} />

      <div className="flex195 fs195userProfile">
        <h5 className="headingColor fs195left">Suggestions For You</h5>
        <h6 className="fs195right">See All</h6>
      </div>

      {renderCards()}
    </div>
  );
};

const mapStateToProps = (state: appState) => ({
  feedData: state.feed.feedData,
});

export default connect(mapStateToProps)(Suggestion);
