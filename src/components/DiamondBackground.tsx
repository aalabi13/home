import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useAppleScroll from "@/hooks/useAppleScroll";

interface DiamondBackgroundProps {
  className?: string;
  animate?: boolean;
  density?: "low" | "medium" | "high";
  primaryColor?: string;
  secondaryColor?: string;
}

const DiamondBackground: React.FC<DiamondBackgroundProps> = ({
  className = "",
  animate = true,
  density = "medium",
  primaryColor = "#0f4331", // Deep emerald
  secondaryColor = "#b8860b", // Dark gold
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useAppleScroll();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const getDiamondCount = () => {
    switch (density) {
      case "low":
        return 20;
      case "high":
        return 60;
      case "medium":
      default:
        return 40;
    }
  };

  const diamonds = useMemo(() => {
    const count = getDiamondCount();
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40,
      color: Math.random() > 0.5 ? primaryColor : secondaryColor,
      rotation: Math.random() * 45,
      parallaxFactor: Math.random() * 0.5 + 0.1,
      depth: Math.random() * 5,
    }));
  }, [density, primaryColor, secondaryColor]);

  const [hoveredDiamond, setHoveredDiamond] = useState<number | null>(null);

  const backgroundBlur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 5]);
  const backgroundBrightness = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.95, 0.9],
  );

  return (
    <motion.div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none z-[-1] ${className}`}
      style={{
        filter: `blur(${backgroundBlur}px) brightness(${backgroundBrightness})`,
        backgroundColor: "#f9fafb",
      }}
      aria-hidden="true"
    >
      {diamonds.map((diamond) => {
        const yOffset = useTransform(
          scrollY,
          (value) =>
            value * diamond.parallaxFactor * (diamond.id % 2 === 0 ? -1 : 1),
        );

        const xOffset = useTransform(
          scrollY,
          (value) =>
            value *
            diamond.parallaxFactor *
            0.3 *
            (diamond.id % 3 === 0 ? 1 : -1),
        );

        return (
          <motion.div
            key={diamond.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${diamond.x}%`,
              top: `${diamond.y}%`,
              zIndex: hoveredDiamond === diamond.id ? 1 : 0,
              x: xOffset,
              y: yOffset,
              perspective: 1000,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.7,
              scale: 1,
              rotate:
                hoveredDiamond === diamond.id
                  ? diamond.rotation + 45
                  : diamond.rotation,
              z: diamond.depth * 10,
            }}
            transition={{
              duration: 0.8,
              delay: diamond.id * 0.02,
              rotate: { duration: 0.5, ease: "easeInOut" },
            }}
            whileHover={
              animate
                ? {
                    scale: 1.1,
                    opacity: 0.9,
                    rotate: diamond.rotation + 45,
                    filter: "brightness(1.2)",
                    z: diamond.depth * 20,
                  }
                : {}
            }
            onMouseEnter={() => setHoveredDiamond(diamond.id)}
            onMouseLeave={() => setHoveredDiamond(null)}
          >
            <motion.div
              className="transform rotate-45"
              style={{
                width: `${diamond.size}px`,
                height: `${diamond.size}px`,
                backgroundColor: diamond.color,
                boxShadow:
                  hoveredDiamond === diamond.id
                    ? `0 0 20px 2px ${diamond.color}80`
                    : `0 0 10px 1px ${diamond.color}40`,
                transition: "box-shadow 0.3s ease-in-out",
              }}
              animate={{
                boxShadow: [
                  `0 0 10px 1px ${diamond.color}40`,
                  `0 0 15px 2px ${diamond.color}60`,
                  `0 0 10px 1px ${diamond.color}40`,
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + (diamond.id % 5),
                ease: "easeInOut",
              }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default DiamondBackground;
