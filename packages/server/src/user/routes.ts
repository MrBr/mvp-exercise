import app, { sendData, sendStatusOk } from "../app";
import { isIdentified } from "../auth";
import {
  authoriseUser,
  canEditUser,
  createUser,
  deleteUser,
  deposit,
  getUser,
  updateUser,
} from "./middleware";

app.get("/user/:id", isIdentified, canEditUser, getUser, sendData);

app.post("/user", createUser, sendData);

app.put("/user/:id", isIdentified, canEditUser, updateUser, sendStatusOk);

app.delete("/user/:id", isIdentified, canEditUser, deleteUser, sendStatusOk);

app.post("/authorise", authoriseUser, sendData);

app.post("/deposit", isIdentified, deposit, sendStatusOk);
