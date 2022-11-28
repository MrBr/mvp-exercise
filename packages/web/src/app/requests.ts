import { createRequest } from "./services";
import { Product } from "../product/types";

export const buyProduct = createRequest<
  { amount: number; productId: number },
  { total: number; change: number[]; products: Product[] }
>("/buy", "POST");
