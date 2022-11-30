import { RequestHandler } from "express";
import * as userServices from "./services";
import { generateToken } from "../auth";
import {
  hasValidToken,
  checkUserPassword,
  validatePasswordFormat,
} from "./services";
import User from "./user.model";
import { InvalidCredentialsError, InvalidPasswordFormatError } from "./errors";
import { USER_TOKEN_DURATION } from "./constants";

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

export const getMe: RequestHandler = async (req, res, next) => {
  try {
    res.locals.data = await userServices.getUser({ id: res.locals.user.id });
    next();
  } catch (e) {
    next(e);
    return;
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  if (!validatePasswordFormat(req.body.password)) {
    next(new InvalidPasswordFormatError());
    return;
  }

  const password = await userServices.hashPassword(req.body.password);

  try {
    res.locals.data = await userServices.createUser({
      username: req.body.username,
      role: req.body.role,
      password,
    });
    next();
  } catch (e) {
    // Child error is to vague
    // @ts-ignore
    next(e?.parent || e);
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

export const logoutAll: RequestHandler = async (req, res, next) => {
  try {
    await userServices.logoutUsers(res.locals.user.id);
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
    "withSensitiveData"
  )) as User;

  const validCredentials = user
    ? await checkUserPassword(user, req.body.password)
    : false;

  if (!validCredentials) {
    next(new InvalidCredentialsError());
    return;
  }

  const token = generateToken(
    {
      userId: user.id,
    },
    { expiresIn: USER_TOKEN_DURATION }
  );
  const hasActiveUsers = hasValidToken(user);

  await User.update(
    {
      lastTokenExpiry: Date.now() + USER_TOKEN_DURATION * 1000,
    },
    {
      where: {
        id: user.id,
      },
    }
  );

  res.locals.data = {
    token,
    hasActiveUsers,
  };

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

export const resetDeposit: RequestHandler = async (req, res, next) => {
  try {
    userServices.assertDepositor(res.locals.user);
    await userServices.resetDeposit(res.locals.user.id);
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
