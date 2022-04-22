import React, { useEffect } from "react";
import ProductsSlider from "../../../components/ProductsSlider/ProductsSlider";
import { useGetProductsByTagsQuery } from "../../../services/productsListApi";

function ProductDetailRelated({ productId }) {
  const { data, refetch, isLoading } = useGetProductsByTagsQuery(productId);
  useEffect(() => {
    refetch();
  }, [productId]);
  if (!data || isLoading) {
    return <></>;
  }
  return (
    <div className="mt-20">
      <p className="font-semibold text-3xl my-5 lg:my-10">
        Có thể bạn thích
      </p>
      <ProductsSlider products={data} />
    </div>
  );
}

export default ProductDetailRelated;
