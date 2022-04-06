import { useEffect, useState } from "react";

const useModel = (param) => {
  const [model, setModel] = useState(false);
  useEffect(() => {
    const event = window.addEventListener("mousedown", (event) => {
        const element = param.current || param;
      if (element && element.contains(event.target)) {
           setModel(false)
      }
    });
    return () => window.removeEventListener("mousedown", event);
  });
  return [model, setModel];
};

export default useModel;
