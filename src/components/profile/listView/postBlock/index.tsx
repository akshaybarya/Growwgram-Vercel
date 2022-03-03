import React, { useRef, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { appState, deviceState, feedData } from "../../../../utils/types";
import useSingleAndDoubleClick from "../../../../utils/helpers/useDoubleClick";

type Props = {
  device: deviceState;
  feed?: feedData;
  imageUri: string;
  id: string;
  user: {
    username: string;
    name: string;
    profile_image: string;
    likes: number;
    description: string;
  };
};

const PostBlock = (props: Props) => {
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
    <div className="fp195Container flex195" id={props.id}>
      <div className="fp195Header">
        <div className="fp195TitleContainer flex195">
          <span className="fp195ImageContainer cursorPointer195">
            <Link to={`/user/${props.user.username}`}>
              <LazyLoadImage
                className="fp195Image"
                src={props.user.profile_image}
                alt="user"
                effect="blur"
              />
            </Link>
          </span>

          <span className="cursorPointer195">
            <Link to={`/user/${props.user.username}`}>
              <p className="fp195Title">{props.user.username}</p>
            </Link>
          </span>
        </div>
      </div>

      <div className="fp195Main" onClick={handleClick}>
        <i className="fa fa-heart fp195likeInVisible" ref={ref}></i>
        <LazyLoadImage alt="user image" src={props.imageUri} effect="blur" />
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

        <div className="fp195dataContainer">
          <h6>{liked ? props.user.likes + 1 : props.user.likes} likes</h6>
        </div>

        {props.user.description && (
          <div className="fp195dataContainer">
            <p className="p195Desc">
              <strong>{props.user.username}</strong>
              {trimmedName(props.user.description)}
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

export default connect(mapStateToProps)(PostBlock);
