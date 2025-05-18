import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import useScrollToSection from "../hooks/useScrollToSection";

interface NavigationMenuProps {
  items: Array<{
    name: string;
    sectionId: string;
  }>;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items = [
    { name: "Home", sectionId: "hero" },
    { name: "About", sectionId: "about" },
    { name: "Projects", sectionId: "projects" },
    { name: "Contact", sectionId: "contact" },
  ],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const scrollToSection = useScrollToSection();

  // Handle intersection observer to highlight active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sections = items.map((item) =>
      document.getElementById(item.sectionId),
    );

    sections.forEach((section, index) => {
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(items[index].sectionId);
          }
        },
        { threshold: 0.5 },
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer, index) => {
        const section = sections[index];
        if (section) observer.unobserve(section);
      });
    };
  }, [items]);

  const handleNavClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Use a more direct approach to scroll to the section
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        {items.map((item) => (
          <motion.a
            key={item.name}
            onClick={() => handleNavClick(item.sectionId)}
            className={`cursor-pointer transition-colors duration-300 ${activeSection === item.sectionId ? "text-amber-600" : "text-emerald-700 hover:text-amber-600"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.name}
            {activeSection === item.sectionId && (
              <motion.div
                className="h-0.5 bg-amber-600 mt-1"
                layoutId="activeSection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.a>
        ))}
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        className="md:hidden text-emerald-800 z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-emerald-900/95 z-40 flex items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {items.map((item, index) => (
                <motion.a
                  key={item.name}
                  onClick={() => handleNavClick(item.sectionId)}
                  className="text-2xl font-medium text-white hover:text-amber-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationMenu;
