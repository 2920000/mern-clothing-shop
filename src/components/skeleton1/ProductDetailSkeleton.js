import React from "react";
import Skeleton from "./Skeleton";

function ProductDetailSkeleton() {
  return (
    <div className="max-w-[1350px] px-10 m-auto pt-[20px]">
      <div className="flex mt-10">
        <div className="w-[65%] h-[500px] mr-20">
          <Skeleton
            type="image"
            number={4}
            tailwindCss="grid gap-3 grid-cols-2"
            style={{minHeight: "500px" }}
          />
        </div>
        <div className="w-[35%]">
          <div>
            <Skeleton type="text" style={{ maxWidth: "200px" }} />
            <Skeleton type="title" style={{ maxWidth: "400px" }} />
            <Skeleton
              type="price"
              style={{ maxWidth: "100px", maxHeight: "25px" }}
            />
            <Skeleton
              type="size"
              number={4}
              tailwindCss="flex"
              style={{ maxWidth: "45px", minHeight: "45px" }}
            />
            <Skeleton type="button" style={{ maxWidth: "300px" }} />
            <Skeleton type="text" style={{ maxWidth: "170px" }} />
            <Skeleton type="text" number={4} style={{ maxWidth: "250px" }} />

            {/* <Skeleton type="text" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailSkeleton;
