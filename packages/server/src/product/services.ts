import Product from "./product.model";
import { UPDATEABLE_FIELDS } from "./constants";
import { Transaction } from "sequelize";
import db from "../db";
import { InvalidUnloadAmountError, UnexistingProductError } from "./errors";

export const getProduct = async (id: number) => {
  return Product.findOne({ where: { id } });
};

export const createProduct = async (
  product: Pick<
    Product,
    "productName" | "amountAvailable" | "cost" | "sellerId"
  >
) => {
  return Product.create(product);
};

export const updateProduct = async (
  productId: number,
  update: Pick<Product, "productName" | "amountAvailable" | "cost">
) => {
  return Product.update(update, {
    where: {
      id: productId,
    },
  });
};

export const unloadProducts = async (
  productId: number,
  amount: number,
  transaction: Transaction
) => {
  if (amount <= 0) {
    throw new InvalidUnloadAmountError();
  }

  const updates = await Product.update(
    {
      amountAvailable: db.literal(`"amountAvailable" - ${db.escape(amount)}`),
    },
    {
      where: {
        id: productId,
      },
      returning: true,
      transaction,
    }
  );

  // Not possible to execute query and have zero affected products
  if (updates[0] === 0) {
    throw new UnexistingProductError();
  }

  const newProductState = updates[1][0];
  const total = amount * newProductState.cost;
  const amountAvailable = newProductState.amountAvailable;

  return {
    total,
    amountAvailable,
  };
};

export const validateUpdates = (update: Partial<Product>) => {
  const forbiddenFields = Object.keys(update).filter(
    (field) => !UPDATEABLE_FIELDS.includes(field)
  );
  if (forbiddenFields.length > 0) {
    throw new Error(`Updating forbidden fields: ${forbiddenFields}`);
  }
};
