import { useCallback, useState, useLayoutEffect } from "react";

const useRect = (el: HTMLElement | null) => {
  const [rect, setRect] = useState<DOMRect>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const handleResize = useCallback(() => {
    if (el) {
      const rect = el?.getBoundingClientRect();
      setRect(rect);
    }
  }, [el]);

  useLayoutEffect(() => {
    if (el) {
      handleResize();
    }
    if (typeof window !== "undefined" && el) {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [el, handleResize]);

  return { rect };
};

export default useRect;
