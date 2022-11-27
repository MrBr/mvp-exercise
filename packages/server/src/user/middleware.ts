import { RequestHandler } from "express";
import * as userServices from "./services";
import { generateToken } from "../auth";
import { assertDepositor, validateUserPassword } from "./services";
import User from "./user.model";
import { InvalidCredentialsError } from "./errors";

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    res.locals.data = await userServices.getUser({
      id: parseInt(req.params.id),
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
    userServices.assertUpdates(req.body);
    await userServices.updateUser(parseInt(req.params.id), req.body);
    next();
  } catch (e) {
    next(e);
    return;
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    await User.destroy({
      where: { id: req.params.id },
    });
    next();
  } catch (e) {
    next(e);
    return;
  }
};

export const authoriseUser: RequestHandler = async (req, res, next) => {
  const user = await userServices.getUser(
    {
      username: req.body.username,
    },
    "withPassword"
  );

  const validCredentials = user
    ? await validateUserPassword(user, req.body.password)
    : false;

  if (!validCredentials) {
    next(new InvalidCredentialsError());
    return;
  }

  res.locals.data = generateToken({ userId: (user as User).id });
  next();
};

export const deposit: RequestHandler = async (req, res, next) => {
  try {
    userServices.assertDeposit(req.body.coins);
    userServices.assertDepositor(res.locals.user);
    const updatedUser = await userServices.deposit(
      res.locals.user.id,
      req.body.coins
    );
    res.locals.data = updatedUser.deposit;
    next();
  } catch (e) {
    next(e);
    return;
  }
};

export const reset: RequestHandler = async (req, res, next) => {
  try {
    userServices.assertDepositor(res.locals.user);
    await userServices.reset(res.locals.user.id);
    next();
  } catch (e) {
    next(e);
    return;
  }
};

export const canEditUser: RequestHandler = (req, res, next) => {
  if (parseInt(req.params.id) === res.locals.user.id) {
    next();
    return;
  }
  throw new Error("Operation not allowed");
};
