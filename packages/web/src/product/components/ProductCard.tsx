import React, { FunctionComponent } from "react";
import { Button, Card } from "react-bootstrap";
import { Product } from "../types";

const ProductCard: FunctionComponent<{
  product: Product;
  onSelect: (product: Product) => void;
  onEdit?: (product: Product) => void;
  editable?: boolean;
  buyable: boolean;
}> = ({ product, onSelect, buyable, editable, onEdit }) => {
  return (
    <Card>
      <Card.Header>{product.productName}</Card.Header>
      <Card.Body>
        <div>Cost: {product.cost}</div>
        <div>Amount available: {product.amountAvailable}</div>
      </Card.Body>
      <Card.Footer>
        <Button onClick={() => onSelect(product)} disabled={!buyable}>
          Select
        </Button>
        {editable && onEdit && (
          <Button onClick={() => onEdit(product)}>Edit</Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
