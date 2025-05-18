import React from "react";
import { motion } from "framer-motion";

interface AboutSectionProps {
  title?: string;
  description?: string;
  skills?: string[];
}

const AboutSection = ({
  title = "About Me",
  description = "I'm a passionate developer with expertise in React, React Native, and Next.js. I love building beautiful, responsive, and accessible web applications that provide great user experiences.",
  skills = [
    "React",
    "React Native",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Responsive Design",
    "API Integration",
  ],
}: AboutSectionProps) => {
  return (
    <section id="about" className="py-16 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-emerald-800 mb-6">
              {title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {description}
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  With a strong foundation in computer science and
                  cybersecurity, I bridge the gap between technical excellence
                  and business value. My expertise spans from designing secure
                  network architectures to developing scalable SaaS platforms
                  that generate recurring revenue streams. I'm passionate about
                  leveraging technology to create sustainable online businesses.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-4">
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#f0b429",
                        color: "#065f46",
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
