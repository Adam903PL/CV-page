import React, { useState, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import GitIcon from "@/public/img/icons/git-icon.svg";
import DockerIcon from "@/public/img/icons/icons8-docker.svg";
import VSCodeIcon from "@/public/img/icons/icons8-visual-studio-code-2019.svg";
import PostmanIcon from "@/public/img/icons/postman-icon.svg";
import JetBrains from "@/public/img/icons/icons8-jetbrains.svg";
import { FaInfoCircle, FaStar, FaRegStar, FaStarHalfAlt, FaCode, FaProjectDiagram, FaHeart, FaClock, FaBrain } from "react-icons/fa";

// Define levels of experience
const ExperienceLevel = {
  BEGINNER: "Beginner",
  BASIC: "Basic",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert"
};

// Define usage frequency
const UsageFrequency = {
  RARELY: "Rarely used",
  OCCASIONALLY: "Occasionally used",
  FREQUENTLY: "Frequently used",
  DAILY: "Daily driver"
};

// Define expertise levels
const ExpertiseLevel = {
  NOVICE: "Still learning",
  COMFORTABLE: "Comfortable with",
  PROFICIENT: "Proficient user",
  EXPERT: "Power user"
};

const skillsArr = [
  {
    name: "Git",
    icon: GitIcon,
    level: ExperienceLevel.ADVANCED,
    usage: UsageFrequency.DAILY,
    expertise: ExpertiseLevel.EXPERT,
    details:
      "Version control virtuoso - can resolve merge conflicts in my sleep and branch strategies are second nature. Comfortable with interactive rebasing, cherry-picking, and stash management.",
  },
  {
    name: "VS Code",
    icon: VSCodeIcon,
    level: ExperienceLevel.EXPERT,
    usage: UsageFrequency.DAILY,
    expertise: ExpertiseLevel.EXPERT,
    details:
      "My digital canvas - customized to pixel-perfect precision. Extension collection curated over years for the ultimate developer experience. Terminal integration and debugging flows that feel like magic.",
  },
  {
    name: "Postman",
    icon: PostmanIcon,
    level: ExperienceLevel.INTERMEDIATE,
    usage: UsageFrequency.FREQUENTLY,
    expertise: ExpertiseLevel.PROFICIENT,
    details:
      "API whisperer - crafting request collections that tell stories. Environment variables set up for seamless context switching between development environments. Automation scripts that make testing a breeze.",
  },
  {
    name: "JetBrains",
    icon: JetBrains,
    level: ExperienceLevel.ADVANCED,
    usage: UsageFrequency.FREQUENTLY,
    expertise: ExpertiseLevel.PROFICIENT,
    details:
      "IDE powerhouse - leveraging intelligent code completion and refactoring tools that read my mind. Database tools integration that makes SQL feel like poetry. Memory-optimized for performance.",
  },

];

// Component for rendering skill level as stars
const SkillLevelStars = ({ level }) => {
  let stars = 0;
  
  switch(level) {
    case ExperienceLevel.EXPERT:
      stars = 5;
      break;
    case ExperienceLevel.ADVANCED:
      stars = 4;
      break;
    case ExperienceLevel.INTERMEDIATE:
      stars = 3;
      break;
    case ExperienceLevel.BASIC:
      stars = 2;
      break;
    case ExperienceLevel.BEGINNER:
    default:
      stars = 1;
  }
  
  return (
    <div className="flex items-center justify-center">
      {[...Array(stars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-400 w-4 h-4" />
      ))}
      {[...Array(5 - stars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-400 w-4 h-4" />
      ))}
    </div>
  );
};

const Tools = forwardRef((props, ref) => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const skill = skillsArr.find((s) => s.name === selectedSkill);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useImperativeHandle(ref, () => ({
    handleBack: () => {
      if (selectedSkill) {
        setSelectedSkill(null);
        return true;
      }
      return false;
    },
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col relative overflow-y-auto p-4"
    >
      {!selectedSkill ? (
        <>
          <h2 className="text-2xl text-gray-400 mb-4 text-center">
            Development Toolkit
          </h2>
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {skillsArr.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  className="flex flex-col items-center space-y-2 p-3 bg-white rounded-lg shadow-sm cursor-pointer"
                  onClick={() => setSelectedSkill(skill.name)}
                >
                  {/* Info icon container */}
                  <div className="w-full flex justify-end pr-1">
                    <div
                      className="cursor-help relative"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaInfoCircle className="w-3 h-3 text-gray-400 hover:text-gray-500" />

                      {hoveredSkill === skill.name && (
                        <div className="absolute top-full right-0 mt-1 overflow-hidden">
                          <motion.div
                            initial={{
                              opacity: 0,
                              scaleX: 0,
                              transformOrigin: "right center",
                            }}
                            animate={{
                              opacity: 1,
                              scaleX: 1,
                            }}
                            exit={{
                              opacity: 0,
                              scaleX: 0,
                            }}
                            transition={{
                              type: "tween",
                              duration: 0.3,
                            }}
                            className="bg-gray-800 text-white text-xs px-3 py-[3px] rounded-full shadow-lg z-10 whitespace-nowrap"
                          >
                            Data can be redrawn: AI generated
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tool icon */}
                  <div className="w-12 h-12 rounded-full bg-[#00BD95]/20 flex items-center justify-center">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      className="w-6 h-6"
                      width={24}
                      height={24}
                    />
                  </div>
                  
                  {/* Tool name */}
                  <h3 className="text-base font-semibold text-gray-600 text-center">
                    {skill.name}
                  </h3>
                  
                  {/* Experience level as stars */}
                  <SkillLevelStars level={skill.level} />
                  
                  {/* Usage frequency */}
                  <div className="flex items-center space-x-1 text-gray-500">
                    <FaClock className="w-3 h-3" />
                    <span className="text-xs">{skill.usage}</span>
                  </div>
                  
                  {/* Expertise level */}
                  <div className="flex items-center space-x-1 text-gray-500">
                    <FaBrain className="w-3 h-3" />
                    <span className="text-xs">{skill.expertise}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-[#00BD95]/20 flex items-center justify-center">
            <Image
              src={skill?.icon || ""}
              alt={skill?.name || ""}
              width={48}
              height={48}
            />
          </div>
          <h2 className="text-2xl font-semibold mt-3 text-gray-700">
            {skill?.name}
          </h2>
          
          <div className="mt-4 flex flex-col items-center">
            <div className="flex items-center space-x-2 text-gray-600">
              <FaStar className="text-yellow-400" />
              <span className="font-medium">{skill?.level}</span>
            </div>
            
            <div className="flex items-center space-x-2 mt-2 text-gray-600">
              <FaClock className="text-blue-400" />
              <span>{skill?.usage}</span>
            </div>
            
            <div className="flex items-center space-x-2 mt-2 text-gray-600">
              <FaBrain className="text-purple-400" />
              <span>{skill?.expertise}</span>
            </div>
          </div>
          
          <p className="mt-5 text-base text-gray-500 text-center max-w-md px-4">
            {skill?.details}
          </p>
          
          <button
            className="mt-6 px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors"
            onClick={() => setSelectedSkill(null)}
          >
            Back to all tools
          </button>
        </motion.div>
      )}
    </motion.div>
  );
});

Tools.displayName = "Tools";
export default Tools;