import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  EditProductModal,
  ProductCard,
  useAddProductModal,
  useProducts,
} from "../../../product";
import { useActiveUser, useUserAuth } from "../../../user";
import { Link } from "react-router-dom";
import { User } from "../../../user/types";
import Topbar from "../../components/Topbar";

const SellerDashboard = () => {
  const { load, products } = useProducts();
  const [user] = useActiveUser() as [User, unknown];
  const [selectedProductId, setSelectedProductId] = useState<null | number>(
    null
  );
  const { logout } = useUserAuth();
  const [addProductModal, showAddProductModal] = useAddProductModal();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Container>
      {addProductModal}
      {selectedProductId && (
        <EditProductModal
          productId={selectedProductId}
          close={() => setSelectedProductId(null)}
        />
      )}
      <Topbar>
        <Col>
          Welcome <Link to="/profile">{user.username}</Link>.
        </Col>
        <Col className="col-auto">
          <Button onClick={showAddProductModal}>Add product</Button>
        </Col>
        <Col className="col-auto">
          <Button onClick={logout} variant="danger">
            Log out
          </Button>
        </Col>
      </Topbar>
      <h1>Products</h1>
      <Row>
        {products &&
          products.map((product) => (
            <Col xs={4} key={`${product.productName} ${product.seller.id}`}>
              <ProductCard
                product={product}
                action={
                  product.seller.id === user.id && (
                    <Button onClick={() => setSelectedProductId(product.id)}>
                      Edit
                    </Button>
                  )
                }
              />
            </Col>
          ))}
        {!products?.length && (
          <Col>
            There are no products, but you can add one{" "}
            <Button variant="link" onClick={showAddProductModal}>
              Add product
            </Button>
            .
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default SellerDashboard;
