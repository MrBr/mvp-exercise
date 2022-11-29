import { ReactNode, useContext, useEffect, useState, useCallback } from "react";
import { ActiveUserContext } from "./providers/ActiveUser";
import DepositModal from "./components/DepositModal";
import { useApi } from "../app";
import { login as loginRequest, logoutAll } from "./requests";

export const useActiveUser = () => {
  return useContext(ActiveUserContext);
};

export const useUserAuth = () => {
  const [, setUser, load] = useContext(ActiveUserContext);
  const loginApi = useApi(loginRequest);
  const logoutAllApi = useApi(logoutAll);

  const loading = loginApi.loading || logoutAllApi.loading;
  const error = loginApi.error || logoutAllApi.error;

  useEffect(() => {
    if (loginApi.response) {
      sessionStorage.setItem("token", loginApi.response.data.token);
      // eslint-disable-next-line
      if (confirm("There are other active user session! Log out all?")) {
        logoutAllApi.fetch();
      } else {
        load();
      }
      loginApi.reset();
    }
  }, [logoutAllApi, loginApi, load]);

  const loginFetch = loginApi.fetch;
  const login = useCallback(
    (creds: Parameters<typeof loginRequest>[0]) => {
      loginFetch(creds);
    },
    [loginFetch]
  );

  const logout = useCallback(() => {
    sessionStorage.clear();
    setUser(null);
  }, [setUser]);

  useEffect(() => {
    if (logoutAllApi.response) {
      logout();
      logoutAllApi.reset();
    }
  }, [logoutAllApi, logout]);

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
