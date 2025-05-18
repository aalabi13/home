import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import DiamondBackground from "./DiamondBackground";
import HeroSection from "./HeroSection";
import ProfileSection from "./ProfileSection";
import AboutSection from "./AboutSection";
import NavigationMenu from "./NavigationMenu";
import ScrollSection from "./ScrollSection";
import useScrollToSection from "../hooks/useScrollToSection";
import useAppleScroll from "../hooks/useAppleScroll";

/**
 * Home component with Apple-style scrolling effects:
 * - Uses sticky sections with parallax effects
 * - Implements scroll-triggered animations
 * - Uses smooth transitions between sections
 * - Implements pinned elements that transform as you scroll
 * - Demonstrates React hooks for scroll effects
 */
export default function Home() {
  const location = useLocation();
  const scrollToSection = useScrollToSection();
  const { scrollY, scrollYProgress } = useAppleScroll();

  // Reference for the main container
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Scroll-based transformations
  const { scrollYProgress: containerScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundOpacity = useTransform(
    containerScrollProgress,
    [0, 0.2, 0.8, 1],
    [1, 0.8, 0.8, 0.6],
  );

  // Handle initial hash navigation (deep linking)
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      // Small timeout to ensure the DOM is fully loaded
      setTimeout(() => {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            window.scrollBy({
              top: -80,
              behavior: "smooth",
            });
          }, 100);
        }
      }, 100);
    }
  }, [location.hash]);

  // Navigation items with correct section IDs
  const navigationItems = [
    { name: "Home", sectionId: "hero" },
    { name: "About", sectionId: "about" },
    { name: "Profile", sectionId: "profile" },
    { name: "Projects", sectionId: "projects" },
    { name: "Contact", sectionId: "contact" },
  ];

  // Create derived motion values for the navigation background and shadow
  const navBackground = useTransform(
    scrollY,
    [0, 200],
    ["rgba(236, 253, 245, 0)", "rgba(236, 253, 245, 0.8)"],
  );

  const navShadow = useTransform(
    scrollY,
    [0, 200],
    ["none", "0 4px 20px rgba(0, 0, 0, 0.1)"],
  );

  const navScale = useTransform(scrollY, [0, 200], [1, 0.9]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        scrollBehavior: "smooth",
        scrollSnapType: "y mandatory",
      }}
    >
      {/* Diamond Background Pattern with scroll-based opacity */}
      <motion.div style={{ opacity: backgroundOpacity }}>
        <DiamondBackground />
      </motion.div>

      {/* Navigation - Apple style with blur effect */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 py-6 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: navBackground,
          boxShadow: navShadow,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold text-emerald-800"
            style={{
              scale: navScale,
            }}
          >
            <span className="text-amber-600">Diamond</span>Portfolio
          </motion.div>
          <NavigationMenu items={navigationItems} />
        </div>
      </motion.nav>

      {/* Main Content with Apple-style scroll sections */}
      <div className="relative w-full">
        {/* Hero Section with Apple-style scroll effects */}
        <div id="hero">
          <HeroSection
            onCtaClick={() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>

        {/* About Section with scroll effects */}
        <ScrollSection
          id="about"
          pinned={true}
          fadeIn={true}
          scaleIn={true}
          height="100vh"
          zIndex={2}
          backgroundColor="rgba(236, 253, 245, 0.5)"
        >
          <AboutSection />
        </ScrollSection>

        {/* Profile Section with parallax effect */}
        <ScrollSection
          id="profile"
          parallaxFactor={0.2}
          height="100vh"
          zIndex={3}
          backgroundColor="rgba(236, 253, 245, 0.7)"
        >
          <ProfileSection />
        </ScrollSection>

        {/* Projects Section with fade-in effect */}
        <ScrollSection
          id="projects"
          fadeIn={true}
          scaleIn={true}
          height="100vh"
          zIndex={4}
          className="py-16 flex items-center justify-center"
          backgroundColor="rgba(236, 253, 245, 0.9)"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg max-w-7xl mx-auto w-full">
            <motion.h2
              className="text-3xl font-bold text-emerald-800 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item, index) => (
                <motion.div
                  key={item}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-48 bg-gradient-to-br from-emerald-500 to-amber-500"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                      Project {item}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      A brief description of this amazing project and the
                      technologies used to build it.
                    </p>
                    <a
                      href="#"
                      className="text-amber-600 hover:text-amber-700 font-medium"
                    >
                      View Details →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* Contact Section with fade-in effect */}
        <ScrollSection
          id="contact"
          fadeIn={true}
          height="100vh"
          zIndex={5}
          className="py-16 flex items-center justify-center"
          backgroundColor="rgba(236, 253, 245, 1)"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg max-w-7xl mx-auto w-full">
            <motion.h2
              className="text-3xl font-bold text-emerald-800 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Get In Touch
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-600 mb-6">
                  I'm always open to discussing new projects, creative ideas or
                  opportunities to be part of your vision.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">+1 (123) 456-7890</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <span className="text-gray-700">hello@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <span className="text-gray-700">San Francisco, CA</span>
                  </div>
                </div>
              </motion.div>
              <motion.form
                className="space-y-4"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium rounded-md hover:from-emerald-700 hover:to-emerald-800 transition-colors duration-300 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            </div>
          </div>
        </ScrollSection>

        {/* Footer */}
        <footer className="py-8 border-t border-emerald-200 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-emerald-800 mb-4 md:mb-0">
              © {new Date().getFullYear()} TechVentures. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {["Twitter", "LinkedIn", "GitHub", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-emerald-600 hover:text-amber-600 transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
