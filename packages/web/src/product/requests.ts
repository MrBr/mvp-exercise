import { DataResponse, createRequest } from "../app";
import { Product } from "./types";

export const getAll = createRequest<void, DataResponse<Product[]>>(
  "/product/all",
  "GET"
);
