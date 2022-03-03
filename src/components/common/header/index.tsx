import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { appState, deviceState, themeState } from "../../../utils/types";
import { storeTheme } from "../../../utils/helpers/localStorage";

import MobileHeader from "./mobileHeader";
import HeaderIcons from "./icons";

import "./header.css";

type Props = {
  theme: themeState;
  device: deviceState;
};

const Header = (props: Props) => {
  const setTheme = () => {
    if (props.theme === "dark") {
      document.body.className = "dark";
      storeTheme("dark");
    } else {
      document.body.className = "";
      storeTheme("light");
    }
  };

  useEffect(() => setTheme(), [props.theme]);

  if (props.device === "sm") {
    return <MobileHeader />;
  }

  return (
    <div id="myhID195" className="header195 header195OuterContainer flex195">
      <div className="header195InnerContainer flex195">
        <div className="header195Left flex195">
          <div className="header195LogoBox flex195">
            <Link to="/">
              <h2 className="header195Logo">Growwgram</h2>
            </Link>
          </div>
          <div className="header195SearchBox">
            <input placeholder="Search" className="header195Search" />
          </div>
        </div>
        <div className="header195Right header195ButtonBox flex195">
          <HeaderIcons />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: appState) => ({
  theme: state.theme,
  device: state.device,
});

export default connect(mapStateToProps)(Header);
