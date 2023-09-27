import { useEffect, useState } from "react";

export default function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("xl");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onResize = () => {
      const width = window.innerWidth;
      if (width > 1440) setBreakpoint("2xl");
      else if (width > 1280) setBreakpoint("xl");
      else if (width > 1024) setBreakpoint("lg");
      else if (width > 768) setBreakpoint("md");
      else if (width > 640) setBreakpoint("sm");
      else setBreakpoint("xs");
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return breakpoint;
}
