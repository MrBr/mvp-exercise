import Product from "./product.model";
import { seller } from "../user/fixtures";

export const bottle_5_5 = {
  id: 1,
  productName: "bottle 5 5",
  cost: 5,
  amountAvailable: 5,
  sellerId: seller.id,
} as Product;

export const bottle_0_5 = {
  id: 2,
  productName: "bottle 0 5",
  cost: 5,
  amountAvailable: 0,
  sellerId: seller.id,
} as Product;
