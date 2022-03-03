import React from "react";
import { Link } from "react-router-dom";

import { feedData } from "../../../../utils/types";

import "./card.css";

type Props = {
  feed: feedData;
};

const SuggestionCard = (props: Props) => {
  const trimmedName = (name: string) => {
    if (name.length <= 15) return name;

    let temp = name.substring(0, 13) + "..";

    return temp;
  };

  if (!props.feed) {
    return null;
  }

  const { user } = props.feed;

  return (
    <div className="fsc195Container flex195">
      <div className="fsc195Left flex195">
        <span className="mHeader195Blocks header195ProfileIcon imageIcon195 fcs195Pointer">
          <Link to={`/user/${user.username}`}>
            <img
              src={user.profile_image.small}
              height="25px"
              width="25px"
              alt="User Profile"
            />
          </Link>
        </span>
        <span className="flex195 fsc195Text fcs195Pointer">
          <Link to={`/user/${user.username}`}>
            <p>{trimmedName(user.username)}</p>
            <p className="fsc195Scondary">Suggested for you</p>
          </Link>
        </span>
      </div>
      <div className="fsc195Right fcs195Pointer">
        <Link to={`/user/${user.username}`}>
          <p className="fsc195Blue">Follow</p>
        </Link>
      </div>
    </div>
  );
};

export default SuggestionCard;
