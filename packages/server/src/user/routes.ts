import router, { sendData, sendStatusOk } from "../router";
import { isIdentified } from "../auth";
import {
  authoriseUser,
  canEditUser,
  createUser,
  deleteUser,
  deposit,
  getMe,
  getUser,
  reset,
  updateUser,
} from "./middleware";

router.get("/user/:id", isIdentified, canEditUser, getUser, sendData);

router.get("/me", isIdentified, getMe, sendData);

router.post("/user", createUser, sendData);

router.put("/user/:id", isIdentified, canEditUser, updateUser, sendStatusOk);

router.delete("/user/:id", isIdentified, canEditUser, deleteUser, sendStatusOk);

router.post("/authorise", authoriseUser, sendData);

router.put("/deposit", isIdentified, deposit, sendData);

router.put("/reset", isIdentified, reset, sendStatusOk);
