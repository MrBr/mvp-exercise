import React, { PropsWithChildren, useEffect } from "react";
import { useUserAuth } from "../hooks";

const { fetch: originalFetch } = window;

const Identify = ({ children }: PropsWithChildren) => {
  const { fetchMe, logout } = useUserAuth();

  useEffect(() => {
    window.fetch = async (...args) => {
      let [resource, config] = args;

      let response = await originalFetch(resource, config);

      if (response.status === 401) {
        logout();
      }

      return response;
    };
    return () => {
      window.fetch = originalFetch;
    };
  });

  // Check if user is logged in on mount
  useEffect(() => {
    fetchMe();
    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
};

export default Identify;
