import { useState, useEffect } from "react";

type ScreenType = "phone" | "tablet" | "laptop" | "tv";

export function useScreenType() {
  const getScreenType = (width: number): ScreenType => {
    if (width < 640) return "phone";
    if (width < 1024) return "tablet";
    if (width < 1600) return "laptop";
    return "tv";
  };

  const [screenType, setScreenType] = useState(() => getScreenType(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setScreenType(getScreenType(window.innerWidth));
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenType;
}
