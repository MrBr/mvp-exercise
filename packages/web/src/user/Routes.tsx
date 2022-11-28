import React from "react";
import { Route, Routes } from "react-router-dom";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import UnIdentified from "./components/UnIdentified";

const UserRoutes = () => (
  <Routes>
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
  </Routes>
);

export default UserRoutes;
