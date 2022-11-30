import React, {
  ComponentType,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";
import { User } from "../types";

type ActiveUserContextType = [User | null, (user: User | null) => void];
export const ActiveUserContext = React.createContext<ActiveUserContextType>([
  null,
  () => {},
]);

const ActiveUserProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const activeUserContext = useMemo(
    () => [user, setUser],
    [user, setUser]
  ) as ActiveUserContextType;

  return (
    <ActiveUserContext.Provider value={activeUserContext}>
      {children}
    </ActiveUserContext.Provider>
  );
};

export default ActiveUserProvider;
