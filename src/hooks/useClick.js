import React, { useRef, useEffect } from "react";

const useClick = (onClick) => {
  if (!typeof onClick === "function") {
    return "";
  }
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("click", onClick);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("click", onClick);
      }
    };
  }, []);

  return ref;
};

export default useClick;
