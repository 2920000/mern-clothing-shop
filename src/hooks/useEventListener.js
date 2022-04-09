import { useEffect, useRef } from "react";

const useEventListener = (eventType, callback, element=window) => {
    const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const handler = (event) => callbackRef.current(event);
    element.addEventListener(eventType, handler);
    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
};
export default useEventListener;
