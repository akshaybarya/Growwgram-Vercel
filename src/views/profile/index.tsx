import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { appState, deviceState, userData } from "../../utils/types";
import { getUserData } from "../../store/actions";

import ListView from "../../components/profile/listView";
import GridView from "../../components/profile/gridView";
import Spinner from "../../components/common/spinner";
import Error from "../../components/common/error";

import "./profile.css";

type Props = {
  device: deviceState;
  getUserData: Function;
  user: userData;
  loading: boolean;
  error: boolean;
};

const Profile = (props: Props) => {
  const params = useParams();

  const [postButton, setPostButton] = useState("p195PostButtonContainerSticky");
  const [gridView, setGridView] = useState(true);
  const [gridScroll, setGridScroll] = useState(0);
  const [listScroll, setListScroll] = useState(0);
  const [scrollTo, setScrollTo] = useState("");

  const ref1 = useRef<HTMLSpanElement>(null);
  const ref = useRef<HTMLSpanElement>(null);

  const togglePosition = () => {
    if (props.device !== "xl") return;
    var height =
      document!.getElementById("mypID195")!.offsetHeight +
        document!.getElementById("myhID195")!.offsetHeight +
        2 || 220;

    if (window.scrollY > height) {
      setPostButton("p195PostButtonContainerFixed");
      ref.current!.classList.remove("selected");
    } else {
      setPostButton("p195PostButtonContainerSticky");
      if (gridView) {
        ref.current!.classList.add("selected");
      } else {
        ref1.current!.classList.add("selected");
      }
    }
  };

  const alterView = (type: string) => {
    const view = type === "grid" ? true : false;

    if (view) {
      setListScroll(window.scrollY);
    } else {
      setGridScroll(window.scrollY);
    }

    setGridView(view);
  };

  const alterScrollTo = (text: string) => {
    setScrollTo(text);
    alterView("list");
  };

  const displayView = () => {
    return gridView ? (
      <div className="p195GridView">
        <GridView
          totalPosts={props.user.details.total_photos}
          scroll={gridScroll}
          setScroll={setGridScroll}
          setScrollTo={alterScrollTo}
        />
      </div>
    ) : (
      <div className="p195ListView">
        <ListView
          totalPosts={props.user.details.total_photos}
          scroll={listScroll}
          setScroll={setListScroll}
          scrollTo={scrollTo}
        />
      </div>
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", togglePosition);

    return () => {
      window.removeEventListener("scroll", togglePosition);
    };
  }, []);

  useEffect(() => {
    props.getUserData(params.id || "");
  }, []);

  if (props.loading) {
    return <Spinner loading={props.loading} />;
  }

  if (props.error) {
    return <Error typ="user" />;
  }

  return (
    <div className="p195Container flex195">
      <div id="mypID195" className="p195UserContainer flex195">
        <span className="p195UserImageConatiner">
          <img
            className="p195UserImage cursorPointer195"
            alt="User Image"
            src={props.user.details.profile_image.medium}
          />
        </span>

        <span className="p195UserDetails flex195">
          <p className="p195UserTitle">{props.user.details.username}</p>

          <div className="p195UserDataContainer flex195">
            <span>{props.user.details.total_photos} Posts</span>
            <span>{props.user.details.followers_count} Followers</span>
            <span>{props.user.details.following_count} Following</span>
          </div>

          <p className="p195UserName">{props.user.details.name}</p>
        </span>
      </div>
      <div id="myid195Btn" className="p195PostOuterContainer flex195">
        <div className={`p195PostButtonContainer flex195 ${postButton}`}>
          <div
            className={`flex195 p195PostButtonInnerContainer ${postButton}Inner`}
          >
            <span
              className={
                gridView ? "p195PostButtonOut selected" : "p195PostButtonOut"
              }
              ref={ref}
              onClick={() => alterView("grid")}
            >
              <span
                className={
                  gridView
                    ? "p195PostButton cursorPointer195 flex195 p195PostButtonSelected"
                    : "p195PostButton cursorPointer195 flex195"
                }
              >
                <p className="p195PostButtonTitle">Grid</p>
                <i className="fas fa-th"></i>
              </span>
            </span>

            <span
              className={
                gridView ? "p195PostButtonOut" : "p195PostButtonOut  selected"
              }
              ref={ref1}
              onClick={() => alterView("list")}
            >
              <span
                className={
                  gridView
                    ? "p195PostButton cursorPointer195 flex195"
                    : "p195PostButton cursorPointer195 flex195 p195PostButtonSelected"
                }
              >
                <p className="p195PostButtonTitle">List</p>
                <i className="fa-solid fa-list"></i>
              </span>
            </span>
          </div>
        </div>

        <div className="p195PostContainer flex195">{displayView()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: appState) => ({
  device: state.device,
  loading: state.user.loading,
  user: state.user.userData[0],
  error: state.user.error,
});

export default connect(mapStateToProps, { getUserData })(Profile);
