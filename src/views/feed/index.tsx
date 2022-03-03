import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import HashLoader from "react-spinners/HashLoader";

import Post from "../../components/common/post";
import Spinner from "../../components/common/spinner";
import Story from "../../components/feed/story";
import Suggestion from "../../components/feed/suggestion";
import Error from "../../components/common/error";

import { getFeedData, addFeedData } from "../../store/actions";
import { appState, feedData } from "../../utils/types";
import { FEED_PAGE } from "../../utils/constants";

import "./feed.css";

type Props = {
  getFeedData: Function;
  addFeedData: Function;
  feedData: feedData[];
  loading: boolean;
  error: boolean;
};

const Feed = (props: Props) => {
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const fetchMoreData = () => {
    props.addFeedData(page + 1);
    setPage(page + 1);
  };

  useEffect(() => props.getFeedData(), []);

  useEffect(() => {
    if (page >= FEED_PAGE) setHasNext(false);
  }, [page]);

  const renderPosts = () => {
    return (
      <InfiniteScroll
        className="f195postContainer flex195"
        dataLength={props.feedData.length}
        next={fetchMoreData}
        hasMore={hasNext}
        loader={<HashLoader color="#a5a4a4" loading={hasNext} size={40} />}
      >
        {props.feedData.map((feed, index) => {
          return <Post key={index} feed={feed} />;
        })}
      </InfiniteScroll>
    );
  };

  if (props.loading) {
    return <Spinner loading={props.loading} />;
  }

  if (props.error) {
    return <Error typ="feed" />;
  }

  return (
    <div className="feed195Container">
      <div className="fLeft195Container flex195">
        <Story />

        {renderPosts()}
      </div>

      <div className="fRight195Container flex195">
        <Suggestion />
      </div>
    </div>
  );
};

const mapStateToProps = (state: appState) => ({
  feedData: state.feed.feedData,
  loading: state.feed.loading,
  error: state.feed.error,
});

export default connect(mapStateToProps, { getFeedData, addFeedData })(Feed);
