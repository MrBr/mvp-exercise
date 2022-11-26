import { compare, hash } from "bcrypt";
import User from "./user.model";

export const validateUserPassword = (user: User, passwordHash: string) => {
  return compare(user.password, passwordHash);
};

export const hashPassword = async (password: string) => {
  return hash(password, parseInt(process.env.SALT_ROUNDS as string));
};
