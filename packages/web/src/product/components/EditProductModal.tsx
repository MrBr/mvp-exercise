import React, { FunctionComponent, useEffect } from "react";
import { Button, Col, Modal } from "react-bootstrap";
import { useApi } from "../../app";
import { useProduct, useProductForm } from "../hooks";
import ProductForm from "./ProductForm";
import { deleteProduct, updateProduct } from "../requests";

const BuyProductModal: FunctionComponent<{
  productId: number;
  close: () => void;
}> = ({ close, productId }) => {
  const updateProductApi = useApi(updateProduct);
  const deleteProductApi = useApi(deleteProduct);
  const [product, setProduct, removeProduct] = useProduct(productId);
  const productForm = useProductForm(product);

  const loading = updateProductApi.loading || deleteProductApi.loading;

  useEffect(() => {
    if (updateProductApi.response) {
      setProduct({ ...product, ...productForm.values });
      updateProductApi.reset();
    }
  }, [setProduct, updateProductApi, product, productForm]);

  useEffect(() => {
    if (deleteProductApi.response) {
      removeProduct(product);
      close();
    }
  }, [deleteProductApi.response, product, close, removeProduct]);

  const onSave = async () => {
    await productForm.validateForm();

    if (!productForm.isValid) {
      return;
    }
    updateProductApi.fetch(productId, productForm.values);
  };

  const onDelete = async () => {
    // eslint-disable-next-line
    if (!confirm(`Are you sure you want to delete ${product.productName}?`)) {
      return;
    }
    deleteProductApi.fetch(productId);
  };

  return (
    <Modal show>
      <Modal.Header>
        {product.productName} by {product.seller.username}
      </Modal.Header>
      <Modal.Body>
        <ProductForm product={product} form={productForm} />
      </Modal.Body>
      <Modal.Footer>
        <Col className="me-auto">
          <Button onClick={close} variant="outline-info">
            Close
          </Button>
        </Col>
        <Button onClick={onDelete} variant="danger" disabled={loading}>
          Delete
        </Button>
        <Button onClick={onSave} disabled={loading || !productForm.isValid}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuyProductModal;
