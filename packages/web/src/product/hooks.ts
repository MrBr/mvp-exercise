import { useApi } from "../app";
import { getAll } from "./requests";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { ProductsContext } from "./providers/Prodcuts";
import { Product } from "./types";

export const useProducts = () => {
  const { fetch, response, loading } = useApi(getAll);
  const [products, setProducts] = useContext(ProductsContext);

  useEffect(() => {
    if (response?.data) {
      setProducts(response.data);
    }
  }, [response, setProducts]);

  const load = useCallback(() => {
    // Cache products
    if (products || loading || response) {
      return;
    }
    fetch();
  }, [products, loading, fetch, response]);

  return { load, products, loading };
};

export const useProduct = (
  productId: number
): [Product, (product: Product) => void] => {
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

  return [product, setProduct];
};
