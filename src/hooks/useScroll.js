import React, { useState, useEffect } from "react";

const useScroll = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleScroll = () => {
    setPos({ x: window.scrollX, y: window.scrollY });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return pos;
};

export default useScroll;
