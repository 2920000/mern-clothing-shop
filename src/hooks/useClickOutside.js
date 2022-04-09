import { useEffect } from "react";

const useClickOutside = async(ref, cb) => {
  useEffect(() => {
    const event = window.addEventListener("mousedown", (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      cb();
    });
    return () => {
      window.removeEventListener("mousedown", event);
    };
  },[ref,cb]);
};
export default useClickOutside;
