import React from "react";
import { PopupFormMain } from "../../reuseModalStructure";
import OrderInfor from "./OrderInfor";
import ProductReviews from "./ProductReviews/ProductReviews";

function RatingModalMain({ orderInfor }) {
  return (
    <PopupFormMain>
      <OrderInfor orderInfor={orderInfor} />
      <ProductReviews orderInfor={orderInfor} />
    </PopupFormMain>
  );
}

export default RatingModalMain;
