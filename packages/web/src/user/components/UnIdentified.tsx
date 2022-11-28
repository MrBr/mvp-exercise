import React, { FunctionComponent, PropsWithChildren, useContext } from "react";
import { ActiveUserContext } from "../providers/ActiveUser";
import { Navigate } from "react-router-dom";

export const UnIdentified: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [activeUser] = useContext(ActiveUserContext);
  if (activeUser) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default UnIdentified;
