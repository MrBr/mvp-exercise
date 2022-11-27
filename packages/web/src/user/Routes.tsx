import React from "react";
import { Route, Routes } from "react-router-dom";

import { Register } from "./pages/Register";

const UserRoutes = () => (
  <Routes>
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default UserRoutes;
