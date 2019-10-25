import React from "react";
import { Switch, Route } from "react-router-dom";
import GetPhotos from "./Components/getPhotos";

export default (
  <Switch>
    <Route to="/" component={GetPhotos} />
  </Switch>
);
