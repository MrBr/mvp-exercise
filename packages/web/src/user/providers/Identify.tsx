import React, { PropsWithChildren, useEffect } from "react";
import { useUserAuth } from "../hooks";

const Identify = ({ children }: PropsWithChildren) => {
  const { fetchMe } = useUserAuth();

  // Check if user is logged in on mount
  useEffect(() => {
    fetchMe();
    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
};

export default Identify;
