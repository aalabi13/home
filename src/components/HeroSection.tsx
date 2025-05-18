import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowDownIcon,
  Code2Icon,
  ShieldIcon,
  GlobeIcon,
} from "../components/icons";
import useAppleScroll from "@/hooks/useAppleScroll";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  title = "kOLunle Akmal Alabi",
  subtitle = "I create elegant solutions with a touch of luxury",
  ctaText = "Explore My Work",
  onCtaClick = () => console.log("CTA clicked"),
  imageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
}: HeroSectionProps) => {
  const { scrollY } = useAppleScroll();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Get scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Apple-style transformations based on scroll
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const buttonScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.7]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Calculate diamond positions based on scroll
  const getDiamondStyle = (index: number) => {
    const baseTop = Math.random() * 100;
    const baseLeft = Math.random() * 100;
    const baseScale = 0.5 + Math.random() * 1.5;
    const scrollEffect =
      Math.min(scrollY / 10, 50) * (index % 2 === 0 ? 1 : -1);

    return {
      top: `${baseTop}%`,
      left: `${baseLeft}%`,
      scale: baseScale,
      translateY: scrollEffect,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] w-full overflow-hidden bg-emerald-900"
    >
      {/* Sticky container for Apple-style scroll effect */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background overlay with scroll-based opacity */}
        <motion.div
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: backgroundOpacity }}
        />

        {/* Content container */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-between px-4 max-w-6xl w-full mx-auto">
          <div className="md:w-1/2 text-left mb-10 md:mb-0">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-amber-300 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ y: titleY }}
              transition={{ duration: 0.8 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-emerald-50 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ y: subtitleY }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 bg-emerald-900/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <Code2Icon className="h-5 w-5 text-amber-300" />
                <span className="text-emerald-50">Software Development</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-900/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <ShieldIcon className="h-5 w-5 text-amber-300" />
                <span className="text-emerald-50">Network Security</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-900/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <GlobeIcon className="h-5 w-5 text-amber-300" />
                <span className="text-emerald-50">SaaS Solutions</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                scale: buttonScale,
                opacity: buttonOpacity,
              }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                onClick={onCtaClick}
                className="bg-amber-500 hover:bg-amber-600 text-emerald-950 px-8 py-6 text-lg rounded-md"
              >
                {ctaText}
                <ArrowDownIcon className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Diamond-shaped frame for profile image */}
              <div className="w-64 h-64 md:w-80 md:h-80 relative transform rotate-45 overflow-hidden border-4 border-amber-400 shadow-xl bg-transparent backdrop-blur-sm">
                <div className="absolute inset-0 transform -rotate-45 scale-[1.4]">
                  <img
                    src={imageUrl}
                    alt="Profile"
                    className="w-full h-full object-contain"
                    style={{
                      filter: "drop-shadow(0 0 10px rgba(236, 201, 75, 0.5))",
                    }}
                  />
                </div>
              </div>

              {/* Decorative diamond accents */}
              <motion.div
                className="absolute -top-6 -left-6 w-12 h-12 bg-amber-500/70 rotate-45"
                whileHover={{ scale: 1.2, rotate: 90 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -bottom-6 -right-6 w-12 h-12 bg-emerald-600/70 rotate-45"
                whileHover={{ scale: 1.2, rotate: 90 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ opacity: arrowOpacity }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <ArrowDownIcon
            className="h-10 w-10 text-amber-300 animate-bounce cursor-pointer"
            onClick={() => {
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </motion.div>

        {/* Diamond accent elements with scroll parallax */}
        {[...Array(5)].map((_, i) => {
          const diamondStyle = getDiamondStyle(i);
          return (
            <motion.div
              key={i}
              className="absolute h-24 w-24 rotate-45 bg-amber-500/20 border border-amber-300/30"
              style={{
                top: diamondStyle.top,
                left: diamondStyle.left,
                scale: diamondStyle.scale,
                y: diamondStyle.translateY,
              }}
              initial={{ opacity: 0, rotate: 0 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                rotate: 45,
                x: Math.random() * 20 - 10,
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
