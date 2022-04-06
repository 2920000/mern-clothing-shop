import { useEffect, useRef } from "react";

const useClickOutside = async(ref, cb) => {
  // console.log(ref)
  useEffect(() => {
    const event = window.addEventListener("mousedown", (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      cb();
    });
    return () => {
      window.removeEventListener("mousedown", event);
    };
  },[]);
};
export default useClickOutside;
