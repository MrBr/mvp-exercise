import { compare, hash } from "bcrypt";
import User from "./user.model";
import { Transaction } from "sequelize";
import { UPDATEABLE_FIELDS } from "./constants";
import { COINS } from "../app/constants";
import db from "../db";
import {
  InvalidDepositError,
  InvalidDepositor,
  InvalidUpdatePayloadError,
} from "./errors";

export const getUser = async (
  filters: { id: number } | { username: string },
  scope: "withPassword" | "defaultScope" = "defaultScope"
) => {
  return User.scope(scope).findOne({ where: filters });
};

export const createUser = async (
  user: Pick<User, "username" | "password" | "role">
) => {
  return User.create(user);
};

export const updateUser = async (
  userId: number,
  update: Pick<User, "username">
) => {
  return User.update(update, {
    where: {
      id: userId,
    },
  });
};

export const deposit = async (userId: number, depositAmount: number) => {
  const updated = await User.update(
    {
      deposit: db.literal(`deposit + ${db.escape(depositAmount)}`),
    },
    {
      where: {
        id: userId,
      },
      returning: true,
    }
  );

  return updated[1][0];
};

export const resetDeposit = async (
  userId: number,
  transaction?: Transaction
) => {
  return User.update(
    {
      deposit: 0,
    },
    {
      where: {
        id: userId,
      },
      transaction,
    }
  );
};

export const chargeUser = async (
  userId: number,
  total: number,
  transaction: Transaction
) => {
  const updates = await User.update(
    {
      deposit: db.literal(`deposit - ${db.escape(total)}`),
    },
    {
      where: {
        id: userId,
      },
      returning: true,
      transaction,
    }
  );
  const user = updates[1][0];
  const deposit = user.deposit;

  return { deposit };
};

export const deleteUser = async (userId: number) => {
  return User.destroy({
    where: { id: userId },
  });
};

export const assertUpdates = (update: Partial<User>) => {
  const forbiddenFields = Object.keys(update).filter(
    (field) => !UPDATEABLE_FIELDS.includes(field)
  );
  if (forbiddenFields.length > 0) {
    throw new InvalidUpdatePayloadError(forbiddenFields);
  }
};

export const assertDeposit = (deposit: number) => {
  if (!COINS.includes(deposit)) {
    throw new InvalidDepositError();
  }
};

export const assertDepositor = (user: User) => {
  if (user.role !== "buyer") {
    throw new InvalidDepositor();
  }
};

export const validateUserPassword = (user: User, password: string) => {
  return compare(password, user.password);
};

export const hashPassword = async (password: string) => {
  return hash(password, parseInt(process.env.SALT_ROUNDS as string));
};
