import { DataResponse, createRequest } from "../app";
import { Product } from "./types";

export const getAll = createRequest<void, DataResponse<Product[]>>(
  "/product/all",
  "GET"
);

export const createProduct = createRequest<
  Pick<Product, "amountAvailable" | "productName" | "cost">,
  DataResponse<Product>
>(`/product`, "POST");

export const updateProduct = (id: number, update: Partial<Product>) =>
  createRequest<Partial<Product>, DataResponse<Product[]>>(
    `/product/${id}`,
    "PUT"
  )(update);

export const deleteProduct = (id: number) =>
  createRequest<void, DataResponse<Product[]>>(`/product/${id}`, "DELETE")();
