import { ReactNode, useContext, useEffect, useState, useCallback } from "react";
import { ActiveUserContext } from "./providers/ActiveUser";
import DepositModal from "./components/DepositModal";
import { useApi } from "../app";
import { login as loginRequest } from "./requests";
import { FormikProps, useFormik } from "formik";
import { Product } from "../product/types";
import * as yup from "yup";

export const useActiveUser = () => {
  return useContext(ActiveUserContext);
};

export const useUserAuth = () => {
  const [, setUser, load] = useContext(ActiveUserContext);
  const { fetch, loading, response, error } = useApi(loginRequest);

  useEffect(() => {
    if (response) {
      sessionStorage.setItem("token", response.data);
      load();
    }
  });

  const login = useCallback(
    (creds: Parameters<typeof loginRequest>[0]) => {
      fetch(creds);
    },
    [fetch]
  );

  const logout = useCallback(() => {
    sessionStorage.clear();
    setUser(null);
  }, [setUser]);

  return { login, logout, loading, error };
};

export const useDepositModal = (): [ReactNode, () => void] => {
  const [show, setShow] = useState(false);
  const modal = show ? <DepositModal close={() => setShow(false)} /> : null;

  return [
    modal,
    () => {
      setShow(true);
    },
  ];
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
