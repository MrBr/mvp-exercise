import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider as UserProvider, renderUserRoutes } from "./user";
import { Provider as ProductProvider } from "./product";
import { renderAppRoutes } from "./app";

function Provider() {
  return (
    <UserProvider>
      <ProductProvider>
        <Router>
          <Routes>
            {renderUserRoutes()}
            {renderAppRoutes()}
          </Routes>
        </Router>
      </ProductProvider>
    </UserProvider>
  );
}

export default Provider;
