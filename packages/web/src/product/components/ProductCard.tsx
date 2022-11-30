import React, { FunctionComponent, ReactNode } from "react";
import { Card } from "react-bootstrap";
import { Product } from "../types";

const ProductCard: FunctionComponent<{
  product: Product;
  action?: ReactNode;
}> = ({ action, product }) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        {product.productName} by {product.seller.username}
      </Card.Header>
      <Card.Body>
        <div>Cost: {product.cost}</div>
        <div>Amount available: {product.amountAvailable}</div>
      </Card.Body>
      {action && <Card.Footer>{action}</Card.Footer>}
    </Card>
  );
};

export default ProductCard;
