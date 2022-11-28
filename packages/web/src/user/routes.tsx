import React from "react";
import { Route } from "react-router-dom";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import UnIdentified from "./components/UnIdentified";
import Identified from "./components/Identified";
import { Profile } from "./pages/Profile";

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
    <Route
      path="/profile"
      element={
        <Identified>
          <Profile />
        </Identified>
      }
    />
  </>
);

export default renderUserRoutes;
