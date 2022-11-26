import { RequestHandler } from "express";
import { verifyToken } from "./services";
import { UnAuthorizedError } from "./errors";

export const identify: RequestHandler = (req, res, next) => {
  if (req.headers.authorization) {
    res.locals.token = verifyToken(req.headers.authorization as string);
  }
  next();
};

export const isIdentified: RequestHandler = (req, res, next) => {
  if (!res.locals.token) {
    throw new UnAuthorizedError();
  }
  next();
};
