import React from "react";

function ProductCartWrapper({ children, className }) {
  return <div className={`${className} relative`}>{ProductCartWrapper}</div>;
}

export { ProductCartWrapper };
function ProductImage({ children }) {
  return (
    <div className="relative pt-[125%] ">
      <div className="absolute top-0 w-full h-full"></div>
    </div>
  );
}
