import { ReactNode, useContext, useState } from "react";
import { ActiveUserContext } from "./providers/ActiveUser";
import DepositModal from "./components/DepositModal";

export const useActiveUser = () => {
  return useContext(ActiveUserContext);
};
