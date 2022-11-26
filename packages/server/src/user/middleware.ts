import { hashPassword } from "./services";
import db from "../db";
import { RequestHandler } from "express";

export const createUser: RequestHandler = async (req, res, next) => {
  const password = await hashPassword(req.body.password);

  try {
    res.locals.data = await db.models.User.create({
      username: req.body.username,
      role: req.body.role,
      password,
    });
    next();
  } catch (e) {
    next(e);
    return;
  }
};
