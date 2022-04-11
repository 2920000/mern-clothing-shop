import { useLayoutEffect } from "react";

const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    console.log('1')
    return () => (document.body.style.overflow = originalStyle);
  }, []);
};

export default useLockBodyScroll