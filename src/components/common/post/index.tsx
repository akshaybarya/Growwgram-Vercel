import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { appState, deviceState, feedData } from "../../../utils/types";
import useSingleAndDoubleClick from "../../../utils/helpers/useDoubleClick";

import "./post.css";

type Props = {
  device: deviceState;
  feed: feedData;
};

const Post = (props: Props) => {
  const { urls, user, description, height, width } = props.feed;

  const [liked, setLiked] = useState(false);

  const ref = useRef<HTMLIFrameElement>(null);

  const alterLiked = (l: boolean) => {
    setLiked(l);
  };

  const click = useSingleAndDoubleClick(
    () => {},
    () => alterLiked(true)
  );

  const likeAnimation = () => {
    ref.current?.classList.remove("fp195likeInVisible");

    setTimeout(() => ref.current?.classList.add("fp195likeInVisible"), 1000);
  };

  const handleClick = (e: any) => {
    if (props.device !== "xl") {
      likeAnimation();
      click();
    }

    switch (e.detail) {
      case 2: {
        likeAnimation();
        alterLiked(true);
        break;
      }

      default:
        return;
    }
  };

  const trimmedName = (name: string) => {
    if (name.length <= 35) return name;

    let temp = name.substring(0, 32) + "...";

    return temp;
  };

  return (
    <div className="fp195Container flex195">
      <div className="fp195Header">
        <div className="fp195TitleContainer flex195">
          <span className="fp195ImageContainer cursorPointer195">
            <Link to={`/user/${user.username}`}>
              <LazyLoadImage
                className="fp195Image"
                src={user.profile_image.small}
                alt="user"
                effect="blur"
              />
            </Link>
          </span>

          <span className="cursorPointer195">
            <Link to={`/user/${user.username}`}>
              <p className="fp195Title">{user?.username}</p>
            </Link>
          </span>
        </div>
      </div>

      <div className="fp195Main" onClick={handleClick}>
        <i className="fa fa-heart fp195likeInVisible" ref={ref}></i>
        <LazyLoadImage alt="user image" src={urls?.full} effect="blur" />
      </div>

      <div className="fp195Footer flex195">
        <div className="fp195FootIconContainer flex195">
          <div className="fp195FooterLeft flex195">
            <span
              className="header195Icons likeButton"
              onClick={() => alterLiked(!liked)}
            >
              {liked ? (
                <i className="fa-solid fa-heart redHeart"></i>
              ) : (
                <i className="fa-regular fa-heart"></i>
              )}
            </span>

            <span className="header195Icons">
              <i className="fa-regular fa-comment"></i>
            </span>

            <span className="header195Icons">
              <i className="fa-solid fa-share"></i>
            </span>
          </div>

          <div className="fp195FooterRight">
            <span className="header195Icons bookmark-icon">
              <i className="fa-regular fa-bookmark"></i>
            </span>
          </div>
        </div>

        <div className="fp195dataContainer fp195LikeCount">
          <h6>{liked ? user.total_likes + 1 : user.total_likes} likes</h6>
        </div>

        {description && (
          <div className="fp195dataContainer">
            <p className="p195Desc">
              <strong>
                <Link to={`/user/${user.username}`}>{user.username} </Link>
              </strong>
              {trimmedName(description)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: appState) => ({
  device: state.device,
});

export default connect(mapStateToProps)(Post);
