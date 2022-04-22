import React from "react";

function ProductsFlex({ children }) {
  return (
    <div className="flex flex-wrap gap-x-3  w-full">{children}</div>
  );
}

export default ProductsFlex;
