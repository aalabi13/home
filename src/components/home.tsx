import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

import HeroSection from "./HeroSection";
import ScrollSection from "./ScrollSection";
import useScrollToSection from "../hooks/useScrollToSection";
import useAppleScroll from "../hooks/useAppleScroll";

/**
 * Home component with Apple-style scrolling effects:
 * - Uses sticky sections with parallax effects
 * - Implements scroll-triggered animations
 * - Uses smooth transitions between sections
 * - Implements pinned elements that transform as you scroll
 */
export default function Home() {
  const location = useLocation();
  const scrollToSection = useScrollToSection();
  const { scrollY, scrollYProgress } = useAppleScroll();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress: containerScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundOpacity = useTransform(
    containerScrollProgress,
    [0, 0.2, 0.8, 1],
    [1, 0.8, 0.8, 0.6],
  );

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            window.scrollBy({ top: -80, behavior: "smooth" });
          }, 100);
        }
      }, 100);
    }
  }, [location.hash]);

  const navBackground = useTransform(
    scrollY,
    [0, 200],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"],
  );

  const navShadow = useTransform(
    scrollY,
    [0, 200],
    ["none", "0 4px 20px rgba(0, 0, 0, 0.05)"],
  );

  const navScale = useTransform(scrollY, [0, 200], [1, 0.9]);

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      emailjs.init(publicKey || '');

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: data.name,
          from_email: data.email,
          company: data.company || 'Not provided',
          message: data.message,
          to_name: 'Akmal',
          reply_to: data.email,
        }
      );

      toast.success('Message sent successfully! I will get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
      style={{ scrollBehavior: "smooth", scrollSnapType: "y mandatory" }}
    >
      {/* Simple gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-50 to-white pointer-events-none" />

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 backdrop-blur-xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: navBackground, boxShadow: navShadow }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          <motion.div
            className="text-xl md:text-2xl font-semibold text-gray-900"
            style={{ scale: navScale }}
          >
            <span className="text-emerald-600">OLAKUNLE AKMAL ALABI</span>
          </motion.div>
          <div className="flex items-center space-x-6 md:space-x-8">
            <a
              href="https://github.com/aalabi13"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/akmal-alabi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="mailto:aalabi@gwmail.gwu.edu"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </motion.nav>

      <div className="relative w-full">
        <div id="hero">
          <HeroSection
            title="Transforming Ideas Into Scalable Digital Solutions"
            subtitle="Full Stack Development & Cloud Architecture"
            description="I help businesses and startups build robust, scalable applications that drive growth. From AI-powered solutions to enterprise-grade platforms, I deliver cutting-edge technology with a focus on user experience."
            onCtaClick={() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>

        {/* Value Proposition Section */}
        <ScrollSection
          id="about"
          pinned={true}
          fadeIn={true}
          scaleIn={true}
          height="auto"
          zIndex={2}
          className="py-16 md:py-24 flex items-start justify-center min-h-screen bg-gradient-to-b from-white to-gray-50"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Why Work With Me</h2>
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-6 h-6 text-emerald-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Rapid Development
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Leveraging modern frameworks and cloud technologies to deliver production-ready solutions. My streamlined development process ensures your project stays on track and within budget.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-6 h-6 text-emerald-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Enterprise-Grade Security
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Implementing industry best practices for security and scalability. From secure authentication to data encryption, your application is built with enterprise-grade security from the ground up.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-6 h-6 text-emerald-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                      </svg>
                      Cloud Architecture
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Building applications that grow with your business. Using cloud-native technologies and microservices architecture to ensure your platform can handle increasing demand.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Expertise</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Full Stack Development</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["React", "Node.js", "TypeScript", "Python", "MongoDB", "PostgreSQL"].map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Building modern, responsive web applications with a focus on clean code and maintainable architecture. From frontend interfaces to backend services, I deliver end-to-end solutions that drive business value.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Cloud & DevOps</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["AWS", "Docker", "CI/CD", "Kubernetes", "Terraform", "Git"].map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Implementing robust cloud infrastructure and automated deployment pipelines. Ensuring your applications are secure, scalable, and always available.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">AI & Machine Learning</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["OpenAI", "TensorFlow", "NLP", "Computer Vision", "FastAPI", "PyTorch"].map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Integrating AI capabilities to enhance your applications. From natural language processing to computer vision, I help businesses leverage cutting-edge AI technologies.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollSection>

        {/* Projects Section - Updated to focus on business impact */}
        <ScrollSection
          id="projects"
          fadeIn={true}
          scaleIn={true}
          height="auto"
          zIndex={4}
          className="py-16 md:py-24 flex items-start justify-center min-h-screen bg-white"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              Featured Solutions
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item, index) => (
                <motion.a
                  key={item}
                  href={item === 1 ? "https://www.canva.com/design/DAGf8GDAoF8/view" : item === 2 ? "https://github.com/aalabi13/property-pulse" : "https://github.com/aalabi13/todo-list-app"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  {item === 1 ? (
                    <div className="h-40 md:h-48 relative">
                      <iframe
                        src="/Wiki Dungeon.pdf#view=FitH&toolbar=0&navpanes=0&pagemode=none"
                        className="w-full h-full border-0 pointer-events-none"
                        title="Wiki Dungeon PDF Preview"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
                    </div>
                  ) : item === 2 ? (
                    <div className="h-40 md:h-48 relative">
                      <img
                        src="/propertypulse.png"
                        alt="PropertyPulse Project"
                        className="w-full h-full object-cover pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="h-40 md:h-48 relative">
                      <img
                        src="/todo.png"
                        alt="Todo List App"
                        className="w-full h-full object-cover pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {item === 1 ? "Wiki Dungeon" : item === 2 ? "PropertyPulse" : "TaskFlow"}
                      </h3>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full font-medium">
                        {item === 1 ? "AI Solution" : item === 2 ? "Enterprise Platform" : "Mobile App"}
                      </span>
                    </div>
                    <p className="text-sm text-emerald-600 font-medium mb-3">
                      {item === 1 
                        ? "AI-Powered Learning Platform"
                        : item === 2
                        ? "Real Estate Management System"
                        : "Cross-Platform Task Management"
                      }
                    </p>
                    <p className="text-gray-600 mb-4">
                      {item === 1 
                        ? "Developed an AI-driven learning platform that gamifies education, resulting in a 40% increase in user engagement and winning first place at a major hackathon."
                        : item === 2
                        ? "Built a comprehensive property management platform that streamlines rental operations, featuring real-time analytics and automated tenant communications."
                        : "Created a mobile application that helps teams manage tasks efficiently, with real-time synchronization and intuitive UX."
                      }
                    </p>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {item === 1 ? (
                          <>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">FastAPI</span>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">React</span>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">OpenAI</span>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">BeautifulSoup</span>
                          </>
                        ) : item === 2 ? (
                          <>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">Next.js 14</span>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">React</span>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">MongoDB</span>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">Tailwind CSS</span>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">Mapbox</span>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">Cloudinary</span>
                          </>
                        ) : (
                          <>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">React Native</span>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">Expo</span>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">iOS</span>
                            <span className="px-2 py-0.5 md:py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">Android</span>
                          </>
                        )}
                      </div>
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-emerald-600">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <span className="text-sm font-medium">
                              {item === 1 
                                ? "40% Increase in User Engagement"
                                : item === 2
                                ? "60% Faster Property Management"
                                : "50% More Efficient Task Management"
                              }
                            </span>
                          </div>
                          {item === 1 ? (
                            <div className="flex space-x-3">
                              <a
                                href="https://www.canva.com/design/DAGf8GDAoF8/view"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                View Demo
                              </a>
                              <a
                                href="https://github.com/toon-leader-bacon/AstroHackathon"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                                onClick={(e) => e.stopPropagation()}
                    >
                                View Code
                              </a>
                            </div>
                          ) : (
                            <a
                              href={item === 2 ? "https://github.com/aalabi13/property-pulse" : "https://github.com/aalabi13/todo-list-app"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* Contact Section - Updated to be more business-focused */}
        <ScrollSection
          id="contact"
          fadeIn={true}
          height="auto"
          zIndex={5}
          className="py-16 md:py-24 flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
            <div className="text-center mb-12">
            <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
                Let's Build Something Amazing
            </motion.h2>
              <motion.p
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                Whether you're looking to build a new application, enhance an existing platform, or explore AI integration, I'm here to help bring your vision to life.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What I Offer</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">Custom software development tailored to your business needs</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">Cloud architecture and infrastructure optimization</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">AI and machine learning integration</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">Technical consulting and architecture planning</span>
                    </li>
                  </ul>
                    </div>

                <div className="flex items-center justify-center space-x-6">
                  <a
                    href="https://github.com/aalabi13"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/akmal-alabi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a
                    href="mailto:aalabi@gwmail.gwu.edu"
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Start a Conversation</h3>
                <div className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    id="name"
                      placeholder="Your name"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message as string}</p>
                  )}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    id="email"
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message as string}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      {...register('company')}
                      type="text"
                      id="company"
                      placeholder="Your company name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Details
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    id="message"
                    rows={4}
                      placeholder="Tell me about your project..."
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 ${
                        errors.message ? 'border-red-500' : 'border-gray-200'
                      }`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message as string}</p>
                  )}
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-4 bg-emerald-600 text-white font-medium rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-emerald-700'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
                </div>
              </motion.form>
            </div>
          </div>
        </ScrollSection>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-100 max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} Olakunle Akmal Alabi. All rights reserved.
            </div>
            <div className="flex space-x-8">
              <a
                href="https://github.com/aalabi13"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/akmal-alabi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href="mailto:aalabi@gwmail.gwu.edu"
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
              >
                Email
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
