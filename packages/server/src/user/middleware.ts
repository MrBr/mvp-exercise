import db from "../db";
import { RequestHandler } from "express";
import * as userServices from "./services";
import { generateToken } from "../auth";
import { validateUserPassword } from "./services";
import User from "./user.model";
import { InvalidCredentialsError } from "./errors";

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    res.locals.data = await userServices.getUser({
      id: req.params.id,
    });
    next();
  } catch (e) {
    next(e);
    return;
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  const password = await userServices.hashPassword(req.body.password);

  try {
    res.locals.data = await userServices.createUser({
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

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    userServices.validateUpdates(req.body);
    await userServices.updateUser(req.body, req.body);
    next();
  } catch (e) {
    next(e);
    return;
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    await db.models.User.destroy({
      where: { id: req.params.id },
    });
    next();
  } catch (e) {
    next(e);
    return;
  }
};

export const authoriseUser: RequestHandler = async (req, res, next) => {
  const user = (await userServices.getUser(
    {
      username: req.body.username,
    },
    "withPassword"
  )) as User;

  const isValidPassword = await validateUserPassword(user, req.body.password);
  if (!isValidPassword) {
    next(new InvalidCredentialsError());
    return;
  }

  res.locals.data = generateToken({ userId: user.id });
  next();
};

export const canEditUser: RequestHandler = (req, res, next) => {
  if (req.params.id === res.locals.token.userId) {
    next();
  }
  throw new Error("Operation not allowed");
};
