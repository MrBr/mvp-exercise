import React, { FunctionComponent, PropsWithChildren, useContext } from "react";
import { ActiveUserContext } from "../providers/ActiveUser";
import { useNavigate } from "react-router-dom";

export const UnIdentified: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [activeUser] = useContext(ActiveUserContext);
  if (activeUser) {
    navigate("/");
    return null;
  }
  return <>{children}</>;
};

export default UnIdentified;
