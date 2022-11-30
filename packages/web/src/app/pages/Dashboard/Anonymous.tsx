import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductCard, useProducts } from "../../../product";
import Topbar from "../../components/Topbar";

const AnonymousDashboard = () => {
  const { load, products } = useProducts();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Container>
      <Topbar>
        <Col>
          Please{" "}
          <Link to="/login" className="inline">
            log in{" "}
          </Link>
          or <Link to="/register">register</Link>.
        </Col>
      </Topbar>
      <h1>Products</h1>
      <Row>
        {products?.map((product) => (
          <Col xs={4} key={`${product.productName} ${product.seller.id}`}>
            <ProductCard product={product} />
          </Col>
        ))}
        {!products?.length && <p>No products</p>}
      </Row>
    </Container>
  );
};

export default AnonymousDashboard;
