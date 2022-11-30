import React from "react";
import ActiveUserProvider from "./ActiveUser";
import { FunctionComponent, PropsWithChildren } from "react";
import Identify from "./Identify";

const UserModuleProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <ActiveUserProvider>
    <Identify>{children}</Identify>
  </ActiveUserProvider>
);

export default UserModuleProvider;
