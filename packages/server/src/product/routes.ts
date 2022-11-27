import router, { sendData, sendStatusOk } from "../router";
import {
  canCreateProduct,
  canEditProduct,
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "./middleware";
import { isIdentified } from "../auth";

router.get("/product/:id", getProduct, sendData);

router.post(
  "/product",
  isIdentified,
  canCreateProduct,
  createProduct,
  sendData
);

router.put(
  "/product/:id",
  isIdentified,
  canEditProduct,
  updateProduct,
  sendStatusOk
);

router.delete(
  "/product/:id",
  isIdentified,
  canEditProduct,
  deleteProduct,
  sendStatusOk
);
