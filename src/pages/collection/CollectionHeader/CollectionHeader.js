import React from "react";
import { Link, useParams } from "react-router-dom";
import { convertToVietnamese } from "../../../helper";
import SortOption from "./SortOption";

function CollectionHeader() {
  const { collection } = useParams();
  return (
    <>
      <div className=" text-xs mb-2 ">
        <Link to="/" className="mr-2">
          Trang chủ
        </Link>
        <span className="mr-2">/</span>
        <span>{convertToVietnamese(collection)}</span>
      </div>
      <div className="block w-full text-right mb-2 ">
        <SortOption />
      </div>
    </>
  );
}

export default CollectionHeader;
