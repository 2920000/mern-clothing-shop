import { useEffect, useState } from "react";

const useOnScreen = (elementArray, callback) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry.target);
            observer.unobserve(entry.target)
          }
        });
      },
      {
        threshold: 0.3,
      }
    );
    elementArray.forEach((element) => {
      observer.observe(element);
    });
  }, []);

};

export default useOnScreen;
