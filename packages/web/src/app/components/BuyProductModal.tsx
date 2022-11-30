import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useActiveUser } from "../../user";
import { User } from "../../user/types";
import { useApi } from "../hooks";
import { buyProduct, BuyProductResponseData } from "../requests";
import { useProduct } from "../../product";
import PurchaseFeedback from "./PurchaseFeedback";

const BuyProductModal: FunctionComponent<{
  productId: number;
  close: () => void;
}> = ({ close, productId }) => {
  const [amount, setAmount] = useState(0);
  const [purchase, setPurchase] = useState<BuyProductResponseData | null>(null);
  const buyProductApi = useApi(buyProduct);
  const [product, setProduct] = useProduct(productId);
  const [user, setUser] = useActiveUser() as [User, (user: User) => void];

  const userMaxAmount = Math.round(user?.deposit / product.cost) === 0;
  const productMaxStock = amount === product.amountAvailable;

  const disableAdd = productMaxStock || userMaxAmount || buyProductApi.loading;
  const disableRemove = amount === 0 || buyProductApi.loading;
  const disableBuy = amount === 0 || buyProductApi.loading;

  useEffect(() => {
    if (buyProductApi.response) {
      setUser({ ...user, deposit: 0 });
      setProduct({
        ...product,
        amountAvailable:
          product.amountAvailable - buyProductApi.response.data.products.length,
      });
      setPurchase(buyProductApi.response.data);
      buyProductApi.reset();
    }
  }, [product, setProduct, setUser, user, buyProductApi, setPurchase]);

  if (purchase) {
    return (
      <Modal show>
        <Modal.Header>Purchase completed</Modal.Header>
        <Modal.Body>
          <PurchaseFeedback purchase={purchase} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show>
      <Modal.Header>
        {product.productName} by {product.seller.username}
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <div>Cost: {product.cost}</div>
            <div>Amount available: {product.amountAvailable}</div>
          </Col>
          <Col className="col-auto">
            <Button onClick={() => setAmount(amount + 1)} disabled={disableAdd}>
              +
            </Button>
            <span className="p-2">{amount}</span>
            <Button
              onClick={() => setAmount(amount - 1)}
              variant="danger"
              disabled={disableRemove}
            >
              -
            </Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Col className="me-auto">
          {userMaxAmount && <span>Please deposit more to add product</span>}
          {productMaxStock && <span>No more on stock</span>}
          {buyProductApi.error && <span>{buyProductApi.error}</span>}
        </Col>
        <Button onClick={close} variant="outline-info">
          Close
        </Button>
        <Button
          onClick={() => buyProductApi.fetch({ productId, amount })}
          disabled={disableBuy}
        >
          Buy
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuyProductModal;
