import React from "react";
import { useSelector } from "react-redux";
import {
  existingBrandSelector,
  existingColourSelector,
} from "../../../../features/collectionSlice";
import FilterOption from "./FilterOption";
import RefineBy from "./RefineBy/RefineBy";

function FilterSidebar() {
  const existingBrand = useSelector(existingBrandSelector);
  const existingColour = useSelector(existingColourSelector);
  const size = ["L", "M", "S", "XL", "XXL", "XXXL"];
  const price = ["Dưới 600.000", "Từ 600.000 - 1.200.000", "Trên 1.200.000"];

  const productFilter = [
    {
      title: "Thương hiệu",
      selection: existingBrand,
      name: "brand",
    },
    {
      title: "Kích thước",
      selection: size,
      name: "size",
    },
    {
      title: "Màu sắc",
      selection: existingColour,
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
      <RefineBy />
      {productFilter.map((filter, index) => (
        <FilterOption
          key={index}
          title={filter.title}
          selection={filter.selection}
          name={filter.name}
        />
      ))}
    </div>
  );
}

export default FilterSidebar;
