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
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  imageUrl?: string;
}

const HeroSection = ({
  title = "Full-Stack Solutions Architect",
  subtitle = "Building Enterprise-Grade Applications",
  description = "Specializing in scalable cloud infrastructure and modern web development",
  ctaText = "Let's Build Together",
  onCtaClick = () => console.log("CTA clicked"),
  imageUrl = "/home/pfp.png",
}: HeroSectionProps) => {
  const { scrollY } = useAppleScroll();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Get scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Update scroll transformations for Apple-style transitions
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const descriptionY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const buttonScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.8]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Apple-style image transitions
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageBlur = useTransform(scrollYProgress, [0, 0.5], [0, 20]);
  const imageTranslateY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const frameScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const frameBlur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

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
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-emerald-950 to-emerald-900"
    >
      {/* Sticky container for Apple-style scroll effect */}
      <div className="sticky top-0 min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
        {/* Background overlay with scroll-based opacity */}
        <motion.div
          className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10"
          style={{ opacity: backgroundOpacity }}
        />

        {/* Content container */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-between px-6 md:px-8 max-w-7xl w-full mx-auto">
          <div className="md:w-1/2 text-left mb-12 md:mb-0 space-y-8">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ y: titleY }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                {title}
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full" />
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-emerald-100/90 font-medium tracking-tight max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ y: subtitleY }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10">
                <Code2Icon className="h-5 w-5 text-amber-300" />
                <div className="flex flex-col">
                  <span className="text-white/90 font-medium">Tech Stack</span>
                  <span className="text-sm text-emerald-100/70">React • Node.js • AWS • TypeScript</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10">
                <ShieldIcon className="h-5 w-5 text-amber-300" />
                <div className="flex flex-col">
                  <span className="text-white/90 font-medium">Expertise</span>
                  <span className="text-sm text-emerald-100/70">Cloud Architecture • Security • Scalability</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                scale: buttonScale,
                opacity: buttonOpacity,
              }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button
                onClick={onCtaClick}
                className="bg-white hover:bg-white/90 text-emerald-950 px-8 py-6 text-lg rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {ctaText}
                <ArrowDownIcon className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="md:w-1/2 flex justify-center items-center w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              scale: frameScale,
              opacity: frameOpacity,
            }}
          >
            <div className="relative w-full max-w-[500px] aspect-[4/5]">
              {/* Main profile image container */}
              <motion.div 
                className="relative w-full h-full"
                style={{
                  y: imageTranslateY,
                  scale: imageScale,
                  opacity: imageOpacity,
                }}
              >
                {/* Background frame with modern gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-emerald-800/20 to-emerald-900/30 rounded-[3rem] backdrop-blur-sm border border-white/10 shadow-2xl" />
                
                {/* Image container with padding and proper aspect ratio */}
                <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
                  <div className="relative w-full h-full">
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-[3rem]"
                      style={{
                        filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.1))",
                      }}
                      onError={(e) => {
                        console.error('Image failed to load:', imageUrl);
                        const target = e.target as HTMLImageElement;
                        target.style.border = '2px solid red';
                      }}
                    />
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-28 h-28 bg-gradient-to-br from-amber-400/10 to-amber-600/10 rounded-[2rem] backdrop-blur-sm border border-white/5" />
                <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 rounded-[2rem] backdrop-blur-sm border border-white/5" />
                
                {/* Subtle highlight overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[3rem] pointer-events-none" />
              </motion.div>

              {/* Floating accent elements */}
              <motion.div
                className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-2xl backdrop-blur-sm"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl backdrop-blur-sm"
                animate={{
                  y: [0, 5, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ opacity: arrowOpacity }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/60 text-sm font-medium">Explore My Work</span>
            <ArrowDownIcon
              className="h-6 w-6 text-white/60 animate-bounce cursor-pointer"
              onClick={() => {
                const aboutSection = document.getElementById("about");
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            />
          </div>
        </motion.div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/20 to-emerald-950/40 pointer-events-none" />

        {/* Diamond accent elements with scroll parallax */}
        {[...Array(3)].map((_, i) => {
          const diamondStyle = getDiamondStyle(i);
          return (
            <motion.div
              key={i}
              className="absolute h-32 w-32 rotate-45 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-lg"
              style={{
                top: diamondStyle.top,
                left: diamondStyle.left,
                scale: diamondStyle.scale,
                y: diamondStyle.translateY,
              }}
              initial={{ opacity: 0, rotate: 0 }}
              animate={{
                opacity: [0.1, 0.2, 0.1],
                rotate: 45,
                x: Math.random() * 20 - 10,
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
