import React from "react";
import { useActiveUser } from "../../../user";
import BuyerDashboard from "./Buyer";
import SellerDashboard from "./Seller";
import AnonymousDashboard from "./Anonymous";

const Index = () => {
  const [user] = useActiveUser();

  if (!user) {
    return <AnonymousDashboard />;
  }

  if (user.role === "buyer") {
    return <BuyerDashboard />;
  }

  return <SellerDashboard />;
};

export default Index;
