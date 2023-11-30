import { useEffect, useState } from "react";
import useRect from "./useRect";

const useResponsive = (
  width: { min: number; max: number },
  container: HTMLElement | null,
) => {
  const { rect } = useRect(container);

  const [count, setCount] = useState(0);
  const [maxCount, setMaxCount] = useState(0);

  useEffect(() => {
    if (container && typeof window !== "undefined") {
      setCount(Math.floor(rect.width / width.min));
      setMaxCount(Math.floor(rect.width / width.max));
    }
  }, [rect, width, container]);

  return { count, maxCount };
};

export default useResponsive;
