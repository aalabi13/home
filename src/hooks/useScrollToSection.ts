import { useCallback } from "react";

/**
 * Custom hook for Apple-style smooth scrolling to page sections
 * Demonstrates React hooks best practices
 */
const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      // Use the built-in scrollIntoView with smooth behavior for better performance
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Add a small offset to account for fixed headers
      // This is more efficient than the previous custom animation
      setTimeout(() => {
        window.scrollBy({
          top: -80, // Offset for header
          behavior: "smooth",
        });
      }, 100);
    }
  }, []);

  return scrollToSection;
};

export default useScrollToSection;
