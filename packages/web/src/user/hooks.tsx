import { ReactNode, useContext, useEffect, useState, useCallback } from "react";
import { ActiveUserContext } from "./providers/ActiveUser";
import DepositModal from "./components/DepositModal";
import { useApi } from "../app";
import { login as loginRequest } from "./requests";

export const useActiveUser = () => {
  return useContext(ActiveUserContext);
};

export const useUserAuth = () => {
  const [, setUser, load] = useContext(ActiveUserContext);
  const { fetch, loading, response, error } = useApi(loginRequest);

  useEffect(() => {
    if (response) {
      sessionStorage.setItem("token", response.data);
      load();
    }
  });

  const login = useCallback(
    (creds: Parameters<typeof loginRequest>[0]) => {
      fetch(creds);
    },
    [fetch]
  );

  const logout = useCallback(() => {
    sessionStorage.clear();
    setUser(null);
  }, [setUser]);

  return { login, logout, loading, error };
};

export const useDepositModal = (): [ReactNode, () => void] => {
  const [show, setShow] = useState(false);
  const modal = show ? <DepositModal close={() => setShow(false)} /> : null;

  return [
    modal,
    () => {
      setShow(true);
    },
  ];
};
