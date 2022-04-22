import React, { useEffect, useState } from "react";
import collectionApi from "../../../../api/collectionApi";
import ProductsSlider from "../../../../components/ProductsSlider/ProductsSlider";

function SuggestedProducts() {
  const [products, setProducts] = useState(null);
  const fetch = async () => {
    const allProducts = await collectionApi.fetchAll();
    setProducts(allProducts);
  };
  useEffect(() => {
    fetch();
  }, []);

  if (!products) {
    return <></>;
  }
  return (
    <>
      <p className="text-center font-semibold text-3xl my-5 lg:my-10">
        Đề xuất cho bạn
      </p>
      <ProductsSlider products={products} />
    </>
  );
}

export default SuggestedProducts;
