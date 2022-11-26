import app, { sendData, sendStatusOk } from "../app";
import { isIdentified } from "../auth";
import {
  canEditUser,
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "./middleware";

app.get("/user/:id", isIdentified, getUser, sendData);

app.post("/user", createUser, sendData);

app.put("/user/:id", isIdentified, canEditUser, updateUser, sendStatusOk);

app.delete("/user/:id", isIdentified, canEditUser, deleteUser, sendStatusOk);
