import { useEffect } from "react";
const useResizeObserver = (ref, callback) => {
  let resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      callback(entry);
    }
  });
  useEffect(() => {
    resizeObserver.observe(ref.current);
  }, [ref, callback]);
  return { resizeObserver };
};
export default useResizeObserver;
