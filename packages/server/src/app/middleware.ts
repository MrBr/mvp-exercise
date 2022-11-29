import { RequestHandler } from "express";
import { unloadProducts } from "../product/services";
import { chargeUser, resetDeposit } from "../user/services";
import db from "../db";
import { InvalidBuyerError } from "./errors";
import { getChange } from "./services";

export const canBuyProduct: RequestHandler = async (req, res, next) => {
  if (res.locals.user?.role === "buyer") {
    next();
    return;
  }
  next(new InvalidBuyerError());
};

export const buyProduct: RequestHandler = async (req, res, next) => {
  const transaction = await db.transaction();
  try {
    const { productId, amount } = req.body;
    const { total, products } = await unloadProducts(
      productId,
      amount,
      transaction
    );
    const { deposit } = await chargeUser(
      res.locals.user.id,
      total,
      transaction
    );
    await resetDeposit(res.locals.user.id, transaction);
    await transaction.commit();

    const change = getChange(deposit);
    res.locals.data = {
      change,
      total,
      products,
    };

    next();
  } catch (e) {
    await transaction.rollback();
    next(e);
  }
};
