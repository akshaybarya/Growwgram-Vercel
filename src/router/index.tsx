import React from "react";
import { Route, Routes as Switch } from "react-router-dom";

import routes from "./routes";

const Routes = () => {
  const renderRoutes = () => {
    return routes.map((route, index) => (
      <Route path={route.path} key={index} element={route.element} />
    ));
  };

  return <Switch>{renderRoutes()}</Switch>;
};

export default Routes;
