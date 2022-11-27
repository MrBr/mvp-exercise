import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes as UserRoutes } from "./user";

function Provider() {
  return (
    <Router>
      <UserRoutes />
    </Router>
  );
}

export default Provider;
