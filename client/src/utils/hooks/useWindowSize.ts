import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = (): { windowWidth: number; windowHeight: number } => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Optionally call handleResize to ensure we have the correct dimensions
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    windowWidth: windowSize.width,
    windowHeight: windowSize.height,
  };
};
