import { useEffect, useRef } from "react";
import { useMotionValue, MotionValue } from "framer-motion";

type ScrollValues = {
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  viewportHeight: number;
  scrollDirection: "up" | "down" | null;
};

/**
 * Custom hook for Apple-style scroll effects
 * Provides scroll position, progress, and direction values
 */
export const useAppleScroll = (): ScrollValues => {
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  const viewportHeightRef = useRef(0);
  const scrollDirectionRef = useRef<"up" | "down" | null>(null);

  const prevScrollY = useRef(0);
  const documentHeight = useRef(0);

  useEffect(() => {
    const updateScrollValues = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const maxScroll = documentHeight.current - viewportHeight;
      const progress = maxScroll <= 0 ? 0 : currentScrollY / maxScroll;

      const direction = currentScrollY > prevScrollY.current ? "down" : "up";

      // Update motion values
      scrollY.set(currentScrollY);
      scrollYProgress.set(progress);
      viewportHeightRef.current = viewportHeight;
      scrollDirectionRef.current =
        prevScrollY.current !== currentScrollY ? direction : null;

      prevScrollY.current = currentScrollY;
    };

    const updateDocumentHeight = () => {
      documentHeight.current = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      );
      updateScrollValues();
    };

    // Initial values
    updateDocumentHeight();

    // Event listeners
    window.addEventListener("scroll", updateScrollValues, { passive: true });
    window.addEventListener("resize", updateDocumentHeight);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", updateScrollValues);
      window.removeEventListener("resize", updateDocumentHeight);
    };
  }, [scrollY, scrollYProgress]);

  return {
    scrollY,
    scrollYProgress,
    viewportHeight: viewportHeightRef.current,
    scrollDirection: scrollDirectionRef.current,
  };
};

/**
 * Calculate transform values based on scroll position
 */
export const calculateParallax = (
  scrollY: number,
  startOffset = 0,
  speed = 0.5,
  clamp = false,
  min = -Infinity,
  max = Infinity,
) => {
  const value = (scrollY - startOffset) * speed;
  if (!clamp) return value;
  return Math.min(Math.max(value, min), max);
};

export default useAppleScroll;
