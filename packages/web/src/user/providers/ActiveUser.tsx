import React, {
  ComponentType,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "../types";
import { useApi } from "../../app";
import { getMe } from "../requests";
import { Spinner } from "react-bootstrap";

type ActiveUserContextType = [
  User | null,
  (user: User | null) => void,
  () => Promise<void>
];
export const ActiveUserContext = React.createContext<ActiveUserContextType>([
  null,
  () => {},
  async () => {},
]);

const ActiveUserProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const { fetch, response } = useApi(getMe);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    if (!user) {
      fetch();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (response) {
      setUser(response.data);
    }
  }, [response]);

  const activeUserContext = useMemo(
    () => [user, setUser, fetch],
    [user, setUser, fetch]
  ) as ActiveUserContextType;

  return (
    <ActiveUserContext.Provider value={activeUserContext}>
      {!response ? <Spinner animation="border" /> : children}
    </ActiveUserContext.Provider>
  );
};

export default ActiveUserProvider;
