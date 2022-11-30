import { createRequest } from "./services";
import { Product } from "../product/types";
import { DataResponse } from "./types";

export interface BuyProductResponseData {
  total: number;
  change: number[];
  products: Product[];
}

export const buyProduct = createRequest<
  { amount: number; productId: number },
  DataResponse<BuyProductResponseData>
>("/buy", "POST");
