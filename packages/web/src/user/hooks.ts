import { useContext } from "react";
import { ActiveUserContext } from "./providers/ActiveUser";

export const useActiveUser = () => {
  const [user] = useContext(ActiveUserContext);

  return user;
};
