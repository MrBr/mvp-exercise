import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductCard, useProducts } from "../../../product";

const AnonymousDashboard = () => {
  const { load, products } = useProducts();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Container>
      <Row>
        <Col>
          Please{" "}
          <Link to="/login" className="inline">
            log in{" "}
          </Link>
          or <Link to="/register">register</Link>.
        </Col>
      </Row>
      <h1>Products</h1>
      <Row>
        {products?.map((product) => (
          <Col xs={4} key={`${product.productName} ${product.seller.id}`}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AnonymousDashboard;
