import { RequestHandler } from "express";
import { verifyToken } from "./services";
import { UnAuthorizedError } from "./errors";

export const identify: RequestHandler = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    res.locals.token = verifyToken(token as string);
  }
  next();
};

export const isIdentified: RequestHandler = (req, res, next) => {
  if (!res.locals.token) {
    throw new UnAuthorizedError();
  }
  next();
};
