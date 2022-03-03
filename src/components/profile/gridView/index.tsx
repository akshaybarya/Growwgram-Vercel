import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import HashLoader from "react-spinners/HashLoader";

import { appState, userData } from "../../../utils/types";
import { addUserData } from "../../../store/actions";

import GridPostBlock from "./gridPostBlock";

import "./gridView.css";

type Props = {
  addUserData: Function;
  userData: userData[];
  loading: boolean;
  totalPosts: number;
  scroll: number;
  setScroll: Function;
  setScrollTo: Function;
};

const GridView = (props: Props) => {
  const user = props.userData[0];

  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);

  const fetchMoreData = () => {
    props.addUserData(page + 1, user.details.username);
    setPage(page + 1);
  };

  const renderPosts = () => {
    return (
      <InfiniteScroll
        className="pgv195OuterContainer"
        dataLength={user.images?.length || 0}
        next={fetchMoreData}
        hasMore={hasNext}
        loader={
          <span className="gp195Loader">
            <HashLoader color="#a5a4a4" loading={hasNext} size={40} />
          </span>
        }
      >
        {user.images?.map((image, index) => {
          return (
            <GridPostBlock
              imageUri={image.urls.small}
              key={index}
              likes={image.likes}
              id={image.id}
              setScrollTo={props.setScrollTo}
            />
          );
        })}
        {hasNext && <div className="loader"></div>}
      </InfiniteScroll>
    );
  };

  useEffect(() => {
    if (page * 10 >= props.totalPosts) setHasNext(false);
  }, [page]);

  useEffect(() => {
    if (props.scroll === 0) return;

    window.scrollTo(0, props.scroll);

    return () => props.setScroll(0);
  }, [props.scroll]);

  if (props.loading) {
    return null;
  }

  return <>{renderPosts()}</>;
};

const mapStateToProps = (state: appState) => ({
  userData: state.user.userData,
  loading: state.user.loading,
});

export default connect(mapStateToProps, { addUserData })(React.memo(GridView));
