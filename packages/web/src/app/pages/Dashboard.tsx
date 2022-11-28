import React, { useEffect } from "react";
import useProducts from "../../product/hooks";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../../product";
import { useActiveUser } from "../../user";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { load, products } = useProducts();
  const user = useActiveUser();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Container>
      <Row>
        {!user && (
          <Col>
            Please{" "}
            <Link to="/login" className="inline">
              log in{" "}
            </Link>
            or <Link to="/login">register</Link>.
          </Col>
        )}
        {user && (
          <>
            <Col>
              Welcome <Link to="/profile">{user.username}</Link>, your deposit
              is: {user.deposit}
            </Col>
            <Col className="col-auto">
              <Button onClick={() => sessionStorage.clear()}>
                Edit deposit
              </Button>
            </Col>
            <Col className="col-auto">
              <Button onClick={() => sessionStorage.clear()} variant="danger">
                Log out
              </Button>
            </Col>
          </>
        )}
      </Row>
      <h1>Products</h1>
      <Row>
        {products?.map((product) => (
          <Col xs={4} key={`${product.productName} ${product.seller.id}`}>
            <ProductCard
              product={product}
              onSelect={() => {}}
              buyable={!!user}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
