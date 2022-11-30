import React from "react";
import { BuyProductResponseData } from "../requests";
import { COINS } from "../constants";

interface PurchaseFeedbackProps {
  purchase: BuyProductResponseData;
}

const PurchaseFeedback = ({ purchase }: PurchaseFeedbackProps) => {
  return (
    <>
      <p>Total: ${purchase.total}</p>
      <p>
        Change:{" "}
        {purchase.change
          .map((coinsCount, index) =>
            coinsCount > 0 ? `${coinsCount} of ${COINS[index]}` : null
          )
          .filter(Boolean)
          .join(", ")}
      </p>
      <p>Products: {purchase.products.join(", ")}</p>
    </>
  );
};

export default PurchaseFeedback;
