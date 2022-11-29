import { hashPassword } from "./services";
import db from "../db";
import User from "./user.model";

const hashUserPassword = async <T extends { password: string }>(user: T) => {
  const password = await hashPassword(user.password);
  return {
    ...user,
    password,
  };
};

export const seedUsers = async (users: User[]) => {
  const formattedUsers = await Promise.all(users.map(hashUserPassword));
  await db.getQueryInterface().bulkInsert("user", formattedUsers);
};
