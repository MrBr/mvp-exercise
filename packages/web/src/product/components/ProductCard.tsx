import React, { FunctionComponent } from "react";
import { Button, Card } from "react-bootstrap";
import { Product } from "../types";

const ProductCard: FunctionComponent<{
  product: Product;
  onSelect: () => void;
}> = ({ product, onSelect }) => {
  return (
    <Card>
      <Card.Header>{product.productName}</Card.Header>
      <Card.Body>
        <div>Cost: {product.cost}</div>
        <div>Amount available: {product.amountAvailable}</div>
      </Card.Body>
      <Card.Footer>
        <Button onClick={onSelect}>Select</Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
