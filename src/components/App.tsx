import React from "react";
import { HashRouter as Router } from "react-router-dom";

import Routes from "../router";
import Header from "./common/header";
import ScrollToTop from "./common/scrollToTop";

import "./app.css";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes />
      </div>
      <ScrollToTop />
    </Router>
  );
};

export default App;
