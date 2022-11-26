import { verify, sign } from "jsonwebtoken";
import type { Token } from "./types";

export const generateToken = (payload: Token, options?: {}) => {
  return sign(payload, process.env.TOKEN_SECRET as string, options);
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.TOKEN_SECRET as string) as Token;
};
