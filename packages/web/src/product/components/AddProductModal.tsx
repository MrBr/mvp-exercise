import React, { FunctionComponent, useEffect } from "react";
import { Button, Col, Modal } from "react-bootstrap";
import { useApi } from "../../app";
import { useProductForm, useProducts } from "../hooks";
import ProductForm from "./ProductForm";
import { createProduct } from "../requests";

const AddProductModal: FunctionComponent<{
  close: () => void;
}> = ({ close }) => {
  const createProductApi = useApi(createProduct);
  const { addProduct } = useProducts();
  const productForm = useProductForm();

  const loading = createProductApi.loading;

  useEffect(() => {
    if (createProductApi.response) {
      addProduct(createProductApi.response.data);
      createProductApi.reset();
    }
  }, [addProduct, createProductApi, productForm]);

  const onCreate = async () => {
    await productForm.validateForm();

    if (!productForm.isValid) {
      return;
    }
    createProductApi.fetch(productForm.values);
  };

  return (
    <Modal show>
      <Modal.Header>Create a new product</Modal.Header>
      <Modal.Body>
        <ProductForm form={productForm} />
      </Modal.Body>
      <Modal.Footer>
        <Col className="me-auto">
          <Button onClick={close} variant="outline-info">
            Close
          </Button>
        </Col>
        <Button onClick={onCreate} disabled={loading || !productForm.isValid}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
