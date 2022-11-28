import { Col, Form, FormGroup, Row } from "react-bootstrap";
import React, { FunctionComponent } from "react";
import { FormikProps } from "formik";
import { Product } from "../types";

interface ProductFormProps {
  product?: Product;
  form: FormikProps<Pick<Product, "amountAvailable" | "productName" | "cost">>;
}

const ProductForm: FunctionComponent<ProductFormProps> = ({
  product,
  form,
}) => {
  return (
    <Form noValidate>
      <Row>
        <Col>
          <FormGroup>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="productName"
              defaultValue={product?.productName}
              isInvalid={!!form.errors.productName}
              onChange={form.handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {form.errors.productName}
            </Form.Control.Feedback>
          </FormGroup>
          <FormGroup>
            <Form.Label>Cost</Form.Label>
            <Form.Control
              name="cost"
              type="number"
              defaultValue={product?.cost}
              isInvalid={!!form.errors.cost}
              onChange={form.handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {form.errors.cost}
            </Form.Control.Feedback>
          </FormGroup>
          <FormGroup>
            <Form.Label>Amount available</Form.Label>
            <Form.Control
              name="amountAvailable"
              type="number"
              defaultValue={product?.amountAvailable}
              isInvalid={!!form.errors.amountAvailable}
              onChange={form.handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {form.errors.amountAvailable}
            </Form.Control.Feedback>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductForm;
