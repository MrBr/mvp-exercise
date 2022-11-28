import { User } from "../user/types";

export interface Product {
  productName: string;
  cost: number;
  amountAvailable: number;
  seller: User;
}
