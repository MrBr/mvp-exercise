import { compare, hash } from "bcrypt";
import User from "./user.model";
import db from "../db";
import { RequestHandler } from "express";
import { UPDATEABLE_FIELDS } from "./constants";

export const getUser = async (userId: string) => {
  return db.models.User.findByPk(userId);
};

export const createUser = async (
  user: Pick<User, "username" | "password" | "role">
) => {
  return db.models.User.create({
    user,
  });
};

export const updateUser = async (
  userId: string,
  update: Pick<User, "username">
) => {
  return db.models.User.update(update, {
    where: {
      id: userId,
    },
  });
};

export const deleteUser = async (userId: string) => {
  return db.models.User.destroy({
    where: { id: userId },
  });
};

export const validateUpdates = (update: Partial<User>) => {
  const forbiddenFields = Object.keys(update).filter(
    (field) => !UPDATEABLE_FIELDS.includes(field)
  );
  if (forbiddenFields.length > 0) {
    throw new Error(`Updating forbidden fields: ${forbiddenFields}`);
  }
};

export const validateUserPassword = (user: User, passwordHash: string) => {
  return compare(user.password, passwordHash);
};

export const hashPassword = async (password: string) => {
  return hash(password, parseInt(process.env.SALT_ROUNDS as string));
};