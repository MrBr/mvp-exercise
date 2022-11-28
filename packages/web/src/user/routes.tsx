import React from "react";
import { Route } from "react-router-dom";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import UnIdentified from "./components/UnIdentified";

const renderUserRoutes = () => (
  <>
    <Route
      path="/register"
      element={
        <UnIdentified>
          <Register />
        </UnIdentified>
      }
    />
    <Route
      path="/login"
      element={
        <UnIdentified>
          <Login />
        </UnIdentified>
      }
    />
  </>
);

export default renderUserRoutes;
