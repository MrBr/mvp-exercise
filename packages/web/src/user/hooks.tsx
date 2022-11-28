import { ReactNode, useContext, useState } from "react";
import { ActiveUserContext } from "./providers/ActiveUser";
import DepositModal from "./components/DepositModal";

export const useActiveUser = () => {
  return useContext(ActiveUserContext);
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
