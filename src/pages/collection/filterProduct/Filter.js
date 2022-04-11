import React from "react";
import { useSelector } from "react-redux";
import { collectionSelector, isLoadSelector } from "../../../features/collectionSlice";
import Filter from "./filter/Filter";
import RefineBy from "./refineBy/RefineBy";

function ProductsFilter() {
  const products = useSelector(collectionSelector);
  const size = ["L", "M", "S", "XL", "XXL", "XXXL"];
  const price = ["Dưới 600.000", "Từ 600.000 - 1.200.000", "Trên 1.200.000"];

  const productFilter = [
    {
      title: "Thương hiệu",
      selection: products.brandData,
      name: "brand",
    },
    {
      title: "Kích thước",
      selection: size,
      name: "size",
    },
    {
      title: "Màu sắc",
      selection: products.colourData,
      name: "color",
    },
    {
      title: "Giá",
      selection: price,
      name: "pricess",
    },
  ];
  return (
    <div className="w-[30%] hidden mder:block mr-10">
      <RefineBy/>
      {productFilter.map((filter, index) => (
        <Filter
          key={index}
          title={filter.title}
          selection={filter.selection}
          name={filter.name}
        />
      ))}
    </div>
  );
}

export default ProductsFilter;
