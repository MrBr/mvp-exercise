import app, { sendData } from "../app";
import { isIdentified } from "../auth";
import { createUser } from "./middleware";

app.get("/user/:id", isIdentified, async (req, res) => {});

app.post("/user", createUser, sendData);

app.put("/user/:id", isIdentified, async (req, res) => {});

app.delete("/user/:id", isIdentified, async (req, res) => {});
