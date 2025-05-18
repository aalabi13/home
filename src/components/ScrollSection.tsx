import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollSectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  height?: string;
  pinned?: boolean;
  fadeIn?: boolean;
  fadeOut?: boolean;
  scaleIn?: boolean;
  parallaxFactor?: number;
  zIndex?: number;
  backgroundColor?: string;
}

/**
 * Apple-style scroll section component
 * Provides various scroll-based animations and effects
 */
const ScrollSection: React.FC<ScrollSectionProps> = ({
  id,
  className = "",
  children,
  height = "100vh",
  pinned = false,
  fadeIn = false,
  fadeOut = false,
  scaleIn = false,
  parallaxFactor = 0,
  zIndex = 1,
  backgroundColor = "transparent",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Get scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Transform values based on scroll progress
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [fadeIn ? 0 : 1, 1, 1, fadeOut ? 0 : 1],
  );

  const scale = useTransform(scrollYProgress, [0, 0.2], [scaleIn ? 0.8 : 1, 1]);

  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxFactor * 100]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative ${className}`}
      style={{
        height,
        zIndex,
        backgroundColor,
      }}
    >
      <motion.div
        className={`w-full h-full ${pinned ? "sticky top-0" : ""}`}
        style={{
          opacity,
          scale,
          y: parallaxFactor ? y : undefined,
        }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default ScrollSection;
