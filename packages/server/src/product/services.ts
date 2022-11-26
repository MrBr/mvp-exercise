import Product from "./product.model";
import { UPDATEABLE_FIELDS } from "./constants";

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

export const validateUpdates = (update: Partial<Product>) => {
  const forbiddenFields = Object.keys(update).filter(
    (field) => !UPDATEABLE_FIELDS.includes(field)
  );
  if (forbiddenFields.length > 0) {
    throw new Error(`Updating forbidden fields: ${forbiddenFields}`);
  }
};
