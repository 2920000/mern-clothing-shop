import React from "react";
import Skeleton from "./Skeleton";

function SearchSkeleton() {
  return (
    <div className="p-2">
      {Array(3)
        .fill()
        .map((e) => (
          <div className="flex items-center mb-2 animate-skeleton">
            <Skeleton
              type="image"
              style={{ minHeight: "50px", minWidth: "50px" }}
            />
            <div className="w-full ml-2">
              <Skeleton
                type="text"
                style={{ maxHeight: "8px", marginBottom: "8px" }}
              />
              <Skeleton
                type="text"
                style={{ maxHeight: "8px", maxWidth: "60%", marginBottom: 0 }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default SearchSkeleton;
