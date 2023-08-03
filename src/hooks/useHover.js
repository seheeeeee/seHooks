import React, { useRef, useEffect } from "react";

const useHover = (onHover) => {
  if (!typeof onHover === "function") {
    return "";
  }
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseenter", onHover);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mouseenter", onHover);
      }
    };
  }, []);

  return ref;
};

export default useHover;
