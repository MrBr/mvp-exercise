import { User } from "../user/types";

export interface Product {
  id: number;
  productName: string;
  cost: number;
  amountAvailable: number;
  seller: User;
}
