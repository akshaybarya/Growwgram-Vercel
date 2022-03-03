import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import HashLoader from "react-spinners/HashLoader";

import { appState, userData } from "../../../utils/types";
import PostBlock from "./postBlock";
import { addUserData } from "../../../store/actions";

type Props = {
  addUserData: Function;
  userData: userData[];
  loading: boolean;
  totalPosts: number;
  scroll: number;
  setScroll: Function;
  scrollTo: string;
};

const ListView = (props: Props) => {
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
        className="f195postContainer flex195"
        dataLength={user.images?.length || 0}
        next={fetchMoreData}
        hasMore={hasNext}
        loader={<HashLoader color="#a5a4a4" loading={hasNext} size={40} />}
      >
        {user.images?.map((image, index) => {
          return (
            <PostBlock
              key={index}
              imageUri={image.urls.small}
              user={{
                username: user.details.username,
                name: user.details.name,
                profile_image: user.details.profile_image.medium,
                description: image.description,
                likes: image.likes,
              }}
              id={image.id}
            />
          );
        })}
      </InfiniteScroll>
    );
  };

  useEffect(() => {
    if (page * 10 >= props.totalPosts) setHasNext(false);
  }, [page]);

  useEffect(() => {
    if (props.scroll === 0 || props.scrollTo) return;

    window.scrollTo(0, props.scroll);

    return () => props.setScroll(0);
  }, [props.scroll]);

  useEffect(() => {
    if (!props.scrollTo) return;
    document.getElementById(props.scrollTo)!.scrollIntoView();

    return () => props.setScroll(window.screenY);
  }, [props.scrollTo]);

  if (props.loading) {
    return null;
  }

  return <>{renderPosts()}</>;
};

const mapStateToProps = (state: appState) => ({
  userData: state.user.userData,
  loading: state.user.loading,
});

export default connect(mapStateToProps, { addUserData })(React.memo(ListView));
