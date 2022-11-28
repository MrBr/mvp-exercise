import React from "react";
import ProductsProvider from "./Prodcuts";
import { FunctionComponent, PropsWithChildren } from "react";

const ProductModuleProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => <ProductsProvider>{children}</ProductsProvider>;

export default ProductModuleProvider;
