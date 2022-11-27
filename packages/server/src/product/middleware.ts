import { RequestHandler } from "express";
import * as productServices from "./services";
import Product from "./product.model";
import {
  ForbiddenProductOperationError,
  InvalidRoleOperationError,
} from "./errors";

export const getProduct: RequestHandler = async (req, res, next) => {
  try {
    res.locals.data = await productServices.getProduct(parseInt(req.params.id));
    next();
  } catch (e) {
    next(e);
    return;
  }
};

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    res.locals.data = await productServices.createProduct({
      productName: req.body.productName,
      cost: req.body.cost,
      amountAvailable: req.body.amountAvailable,
      sellerId: res.locals.user.id,
    });
    next();
  } catch (e) {
    next(e);
    return;
  }
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    productServices.validateUpdates(req.body);
    await productServices.updateProduct(parseInt(req.params.id), req.body);
    next();
  } catch (e) {
    next(e);
    return;
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    await Product.destroy({
      where: { id: req.params.id },
    });
    next();
  } catch (e) {
    next(e);
    return;
  }
};

export const canEditProduct: RequestHandler = async (req, res, next) => {
  const product = await productServices.getProduct(parseInt(req.params.id));
  if (product?.sellerId === res.locals.user.id) {
    next();
    return;
  }
  next(new ForbiddenProductOperationError());
};

export const canCreateProduct: RequestHandler = async (req, res, next) => {
  if (res.locals.user?.role === "seller") {
    next();
    return;
  }
  next(new InvalidRoleOperationError());
};
