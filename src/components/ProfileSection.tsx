import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

import {
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  ShieldIcon,
  Code2Icon,
  GlobeIcon,
} from "../components/icons";

const ExpertiseCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md border border-emerald-100">
    <div className="flex items-center gap-3 mb-2">
      <Icon className="text-emerald-500 w-6 h-6" />
      <h3 className="font-semibold text-emerald-800">{title}</h3>
    </div>
    <p className="text-sm text-gray-700">{description}</p>
  </div>
);

const ProfileSection: React.FC = () => {
  return (
    <section className="p-6 bg-emerald-50 min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src="/avatar.png" alt="Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold text-emerald-700">John Doe</h1>
          <p className="text-gray-600">Software Engineer & AI Enthusiast</p>
          <div className="flex justify-center gap-4 mt-4 text-emerald-600">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <ExpertiseCard
            icon={GraduationCapIcon}
            title="Education"
            description="Bachelor's in Computer Science"
          />
          <ExpertiseCard
            icon={BriefcaseIcon}
            title="Experience"
            description="2+ years in full-stack development"
          />
          <ExpertiseCard
            icon={ShieldIcon}
            title="Cybersecurity"
            description="Hands-on in network defense & risk assessment"
          />
          <ExpertiseCard
            icon={Code2Icon}
            title="Coding"
            description="Proficient in JS, Python, C++, RISC-V, and more"
          />
          <ExpertiseCard
            icon={GlobeIcon}
            title="Vision"
            description="Global tech impact via AI & entrepreneurship"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ProfileSection;
