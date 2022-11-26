import app, { sendData, sendStatusOk } from "../app";
import {
  canCreateProduct,
  canEditProduct,
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "./middleware";
import { isIdentified } from "../auth";

app.get("/product/:id", getProduct, sendData);

app.post("/product", isIdentified, canCreateProduct, createProduct, sendData);

app.put(
  "/product/:id",
  isIdentified,
  canEditProduct,
  updateProduct,
  sendStatusOk
);

app.delete(
  "/product/:id",
  isIdentified,
  canEditProduct,
  deleteProduct,
  sendStatusOk
);
