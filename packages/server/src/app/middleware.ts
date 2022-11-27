import { RequestHandler } from "express";
import { unloadProducts } from "../product/services";
import { chargeUser } from "../user/services";
import db from "../db";
import { InvalidBuyerError } from "./errors";

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
    const { total, amountAvailable } = await unloadProducts(
      productId,
      amount,
      transaction
    );
    const { deposit } = await chargeUser(
      res.locals.user.id,
      total,
      transaction
    );
    await transaction.commit();

    res.locals.data = {
      deposit,
      amountAvailable,
    };

    next();
  } catch (e) {
    await transaction.rollback();
    next(e);
  }
};
