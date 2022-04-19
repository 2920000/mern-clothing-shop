import { useEffect } from "react";
import { qs } from "../helper/DomUtilies/handleDOM";

const useClickOutside = async(ref, cb) => {
  useEffect(() => {
  const html=qs('html')
    const event = window.addEventListener("mousedown", (event) => {
      if (!ref.current ||event.target===html||ref.current.contains(event.target)) return;
      cb();
    });
    return () => {
      window.removeEventListener("mousedown", event);
    };
  },[ref,cb]);
};
export default useClickOutside;
