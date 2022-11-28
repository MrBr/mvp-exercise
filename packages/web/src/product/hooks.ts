import { useApi } from "../app";
import { getAll } from "./requests";
import { useCallback, useContext, useEffect } from "react";
import { ProductsContext } from "./providers/Prodcuts";

const useProducts = () => {
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

export default useProducts;
