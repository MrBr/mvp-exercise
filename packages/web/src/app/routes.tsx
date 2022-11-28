import React from "react";
import { Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

const renderAppRoutes = () => (
  <>
    <Route path="/" element={<Dashboard />} />
  </>
);

export default renderAppRoutes;
