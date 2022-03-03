import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { feedData } from "../../../../utils/types";

type Props = {
  feed: feedData;
};

const StoryBlock = (props: Props) => {
  if (!props.feed) {
    return null;
  }

  const { user } = props.feed;

  const trimmedName = (name: string) => {
    if (name.length < 9) return name;

    let temp = name.substring(0, 7) + "..";

    return temp;
  };

  return (
    <div className="sb195Container flex195">
      <div className="sb195ImageOuterContainer">
        <Link to={`/user/${user.username}`}>
          <div className="sb195ImageInnerContainer">
            <LazyLoadImage
              src={user.profile_image.medium}
              alt="User Profile"
              className="sb195image"
              effect="blur"
            />
          </div>
        </Link>
      </div>

      <p className="sb195Username">
        <Link to={`/user/${user.username}`}>{trimmedName(user.username)}</Link>
      </p>
    </div>
  );
};

export default StoryBlock;
