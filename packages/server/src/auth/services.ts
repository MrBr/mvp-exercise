import { verify, sign, SignOptions } from "jsonwebtoken";
import type { Token } from "./types";

export const generateToken = (
  payload: Pick<Token, "userId">,
  options?: SignOptions
) => {
  return sign(payload, process.env.TOKEN_SECRET as string, options);
};

export const verifyToken = (token: string) => {
  const tokenPayload = verify(
    token,
    process.env.TOKEN_SECRET as string
  ) as Token;
  // Standardise time
  tokenPayload.iat *= 1000;
  tokenPayload.exp *= 1000;
  return tokenPayload;
};

// If token time is less than valid token time it means token has been invalidated
export const isTokenStillValid = (token: Token, validFrom: number) =>
  token.iat >= validFrom;
