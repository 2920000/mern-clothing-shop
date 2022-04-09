import { useEffect, useState } from "react";

const useHover = (ref, ref2) => {
  const [hovered, setHovered] = useState(false);
  let timeoutOut;
  const handleMouseOver = () => {
    clearTimeout(timeoutOut);
    setHovered(true);
    setTimeout(() => {
      ref2.current && (ref2.current.style.opacity = "1");
    }, 0);
  };
  const handleMouseOut = () => {
    timeoutOut = setTimeout(() => {
      setHovered(false);
    }, 150);
    ref2.current && (ref2.current.style.opacity = "0");
  };
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
    } else {
      node.removeEventListener("mouseover", handleMouseOver);
      node.removeEventListener("mouseout", handleMouseOut);
    }
  },[ref.current]);
  return hovered;
};
export default useHover;
