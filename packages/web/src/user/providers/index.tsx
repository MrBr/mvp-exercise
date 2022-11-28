import ActiveUserProvider from "./ActiveUser";
import { FunctionComponent, PropsWithChildren } from "react";

const UserModuleProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => <ActiveUserProvider>{children}</ActiveUserProvider>;

export default UserModuleProvider;
