import db from "../db";
import Product from "./product.model";

export const seedProducts = async (products: Product[]) => {
  await db.getQueryInterface().bulkInsert("product", products);
};
