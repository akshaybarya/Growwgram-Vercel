import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { appState, deviceState } from "../../../utils/types";

import "./scrollToTop.css";

type Props = {
  device: deviceState;
};

const ScrollToTop = (props: Props) => {
  const [active, setActive] = useState(false);

  const toggleVisible = () => {
    if (window.scrollY > 300) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const scroll = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  if (active && props.device !== "sm")
    return (
      <div className="scroll195Container" onClick={scroll}>
        <i className="fa-solid fa-angle-up"></i>
      </div>
    );

  return null;
};

const mapStateToProps = (state: appState) => ({
  device: state.device,
});

export default connect(mapStateToProps)(ScrollToTop);
