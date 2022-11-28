import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes as UserRoutes, Provider as UserProvider } from "./user";

function Provider() {
  return (
    <UserProvider>
      <Router>
        <UserRoutes />
      </Router>
    </UserProvider>
  );
}

export default Provider;
