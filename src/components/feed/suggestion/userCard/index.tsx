import React from "react";
import { Link } from "react-router-dom";
import { feedData } from "../../../../utils/types";

import "./userCard.css";

type Props = {
  feed: feedData;
};

const UserCard = (props: Props) => {
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
    <div className="fsu195Container flex195">
      <div className="fsu195ImageContainer">
        <Link to={`/user/${user.username}`}>
          <img
            alt="User Profile Image"
            src={user.profile_image.medium}
            className="fsu195Image"
          />
        </Link>
      </div>
      <div className="fsu195UserDetailsContainer flex195">
        <Link to={`/user/${user.username}`}>
          <p>{trimmedName(user.username)}</p>
          <p className="fsu195Secondary">
            {trimmedName(`${user.first_name} ${user.last_name}`)}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
