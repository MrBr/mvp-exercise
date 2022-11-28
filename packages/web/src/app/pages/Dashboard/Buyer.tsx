import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ProductCard, useProducts } from "../../../product";
import { useActiveUser, useDepositModal, useUserAuth } from "../../../user";
import { Link } from "react-router-dom";
import BuyProductModal from "../../components/BuyProductModal";
import { User } from "../../../user/types";

const BuyerDashboard = () => {
  const { load, products } = useProducts();
  const [user] = useActiveUser() as [User, unknown, unknown];
  const [selectedProductId, setSelectedProductId] = useState<null | number>(
    null
  );
  const [depositModal, showDepositModal] = useDepositModal();
  const { logout } = useUserAuth();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Container>
      {depositModal}
      {selectedProductId && (
        <BuyProductModal
          productId={selectedProductId}
          close={() => setSelectedProductId(null)}
        />
      )}
      <Row>
        <Col>
          Welcome <Link to="/profile">{user.username}</Link>, you have{" "}
          <b>{user.deposit}</b> coins
        </Col>
        <Col className="col-auto">
          <Button onClick={showDepositModal}>Edit deposit</Button>
        </Col>
        <Col className="col-auto">
          <Button onClick={logout} variant="danger">
            Log out
          </Button>
        </Col>
      </Row>
      <h1>Products</h1>
      <Row>
        {products?.map((product) => (
          <Col xs={4} key={`${product.productName} ${product.seller.id}`}>
            <ProductCard
              product={product}
              action={
                <Button onClick={() => setSelectedProductId(product.id)}>
                  Buy
                </Button>
              }
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyerDashboard;
