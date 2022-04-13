import { useEffect, useRef, useState } from "react";

const useHover = ({ animation, mouseover, mouseout }) => {
  const [hovered, setHovered] = useState(false);
  let timeoutOut;
  const ref = useRef(null);

  const handleMouseOver = () => {
    animation && clearTimeout(timeoutOut);
    setHovered(true);
    mouseover && mouseover();
  };
  const handleMouseOut = () => {
    if (animation) {
      timeoutOut = setTimeout(() => {
        setHovered(false);
        mouseout && mouseout();
      }, 150);
      return;
    }
    setHovered(false);
    mouseout && mouseout();
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
  }, [ref.current]);
  return [ref, hovered];
};
export default useHover;
