import { RequestHandler } from "express";
import { isTokenStillValid, verifyToken } from "./services";
import { UnAuthorizedError } from "./errors";
import { getUser } from "../user/services";

export const identify: RequestHandler = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const tokenPayload = verifyToken(token as string);
      const user = await getUser({ id: tokenPayload.userId }, "withTokenData");
      if (user && isTokenStillValid(tokenPayload, user.tokenValidFrom)) {
        res.locals.user = user;
        res.locals.token = tokenPayload;
      }
    } catch (e) {
      next(e);
      return;
    }
  }
  next();
};

export const isIdentified: RequestHandler = (req, res, next) => {
  if (!res.locals.user) {
    throw new UnAuthorizedError();
  }
  next();
};
