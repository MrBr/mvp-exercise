import { useApi } from "../app";
import { getAll } from "./requests";
import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ProductsContext } from "./providers/Prodcuts";
import { Product } from "./types";
import AddProductModal from "./components/AddProductModal";
import * as yup from "yup";
import { FormikProps, useFormik } from "formik";

export const useProducts = () => {
  const { fetch, response, loading, error } = useApi(getAll);
  const [products, setProducts] = useContext(ProductsContext);

  useEffect(() => {
    if (response?.data) {
      setProducts(response.data);
    }
  }, [response, setProducts]);

  const load = useCallback(() => {
    // Cache products
    if (products || loading || response || error) {
      return;
    }
    fetch();
  }, [products, loading, fetch, response, error]);

  const addProduct = useCallback(
    (newProduct: Product) => {
      const updatedProducts = [...(products as Product[]), newProduct];
      setProducts(updatedProducts);
    },
    [setProducts, products]
  );

  return { load, products, loading, addProduct };
};

export const useProduct = (
  productId: number
): [Product, (product: Product) => void, (product: Product) => void] => {
  const [products, setProducts] = useContext(ProductsContext);

  const product = useMemo(
    () => products?.find(({ id }) => productId),
    [products, productId]
  ) as Product;

  const setProduct = useCallback(
    (updatedProduct: Product) => {
      const updatedProducts = (products as Product[]).map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      setProducts(updatedProducts);
    },
    [setProducts, products]
  );

  const deleteProduct = useCallback(
    (updatedProduct: Product) => {
      const updatedProducts = (products as Product[]).filter(
        (product) => product.id !== updatedProduct.id
      );
      setProducts(updatedProducts);
    },
    [setProducts, products]
  );

  return [product, setProduct, deleteProduct];
};

const ProductSchema = yup.object().shape({
  productName: yup
    .string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required(),
  cost: yup
    .number()
    .test(
      "cost-value-check",
      "Value has to be factor of 5.",
      (value) => !!value && value % 5 === 0
    )
    .required(),
  amountAvailable: yup
    .number()
    .min(0, "Can't have negative amount!")
    .required(),
});
export const useProductForm = (
  product?: Product
): FormikProps<Pick<Product, "amountAvailable" | "productName" | "cost">> => {
  return useFormik({
    onSubmit: () => {},
    initialValues: {
      productName: product?.productName || "",
      amountAvailable: product?.amountAvailable || 0,
      cost: product?.cost || 5,
    },
    validationSchema: ProductSchema,
  });
};

export const useAddProductModal = (): [ReactNode, () => void] => {
  const [show, setShow] = useState(false);
  const modal = show ? <AddProductModal close={() => setShow(false)} /> : null;

  return [
    modal,
    () => {
      setShow(true);
    },
  ];
};
