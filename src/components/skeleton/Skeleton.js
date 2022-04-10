import React from "react";
import "./skeleton.css";
function Skeleton({ type, number=1,tailwindCss,style={} }) {
  const className = `skeleton ${type}`;
  return (
    <div className={tailwindCss}>
      {Array(number)
        .fill()
        .map((e,index) => (
          <div key={index} style={style} className={className}></div>
        ))}
    </div>
  );
}

export default Skeleton;
