import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./gridPostBlock.css";

type Props = {
  imageUri: string;
  likes: number;
  id: string;
  setScrollTo: Function;
};

const GridPostBlock = (props: Props) => {
  const setScroll = () => {
    props.setScrollTo(props.id);
  };

  return (
    <div
      className="pgv195PostBlocks cursorPointer195"
      id={props.id}
      onClick={setScroll}
    >
      <div className="pgv195LikesCount">
        <i className="fas fa-heart pgv195text"></i>
        <p
          className="pgv195text"
          style={{ display: "inline", marginLeft: "5px" }}
        >
          {props.likes}
        </p>
      </div>
      <LazyLoadImage
        className="pgv195PostBlocksImage"
        src={props.imageUri}
        alt={props.imageUri}
        effect="blur"
      />
    </div>
  );
};

export default GridPostBlock;
