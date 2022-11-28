import React, { ComponentType, PropsWithChildren, useState } from "react";
import { Product } from "../types";

type ProductContextType = [
  Product[] | null,
  (products: Product[] | null) => void
];
export const ProductsContext = React.createContext<ProductContextType>([
  null,
  () => {},
]);

const ProductsProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const productsContext = useState<Product[] | null>(
    null
  ) as ProductContextType;

  return (
    <ProductsContext.Provider value={productsContext}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
