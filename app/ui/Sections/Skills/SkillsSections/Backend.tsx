import React, { useState, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import NodeIcon from "@/public/img/icons/node-js-icon.svg";
import ExpressIcon from "@/public/img/icons/express-js-icon.svg";
import PythonIcon from "@/public/img/icons/python-programming-language-icon.svg";
import PostgresIcon from "@/public/img/icons/PostgreSQL.svg";
import MsSqlIcon from "@/public/img/icons/mssql.svg";
import NextJsIcon from "@/public/img/icons/nextjs-icon.svg";
import FastAPIicon from "@/public/img/icons/FastAPI.svg";
import FlaskIcon from "@/public/img/icons/icons8-flask.svg";
import { FaInfoCircle, FaStar, FaRegStar, FaStarHalfAlt, FaCode, FaProjectDiagram } from "react-icons/fa";

// Define levels of experience
const ExperienceLevel = {
  BEGINNER: "Beginner",
  BASIC: "Basic",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert"
};

// Define project counts
const ProjectCount = {
  FEW: "Few projects",
  SEVERAL: "Several projects",
  MANY: "Many projects"
};

const skillsArr = [
  {
    name: "NextJs",
    icon: NextJsIcon,
    level: ExperienceLevel.BASIC,
    projects: 3,
    details:
      "App Router, SSR/ISR, API routes, middleware, and server actions.",
  },
  {
    name: "Node.js",
    icon: NodeIcon,
    level: ExperienceLevel.ADVANCED,
    projects: "Many",
    details:
      "Daily driver for building production-grade REST APIs, WebSocket servers, and microservices. Expert in event loop optimization, NPM ecosystem, and WebSocket integration.",
  },
  {
    name: "Express.js",
    icon: ExpressIcon,
    level: ExperienceLevel.ADVANCED,
    projects: "Many",
    details:
      "Advanced middleware patterns, RESTful routing architecture, and database-agnostic service implementations. Frequent use of authentication middleware and error handling layers.",
  },
  {
    name: "Python",
    icon: PythonIcon,
    level: ExperienceLevel.ADVANCED,
    projects: "Many",
    details:
      "Web scraping automation, data analysis pipelines, and scripting solutions. Practical experience with Pandas/NumPy for data processing tasks.",
  },
  {
    name: "PostgreSQL",
    icon: PostgresIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: "Many",
    details:
      "Advanced query optimization, index management, and ORM integrations. Proficient in complex joins and window functions.",
  },
  {
    name: "MS SQL",
    icon: MsSqlIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: "Many",
    details:
      "Expert-level T-SQL development, complex stored procedures, and query optimization. Extensive 2023 focus on SSIS packages and data warehousing solutions.",
  },
  {
    name: "FastAPI",
    icon: FastAPIicon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 4,
    details:
      "2023 primary tool for building high-performance asynchronous endpoints with auto-generated Swagger docs. Strong experience with Pydantic models and dependency injection.",
  },
  {
    name: "Flask",
    icon: FlaskIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 4,
    details:
      "2022-2023 projects focused on lightweight RESTful services and prototype development. Custom middleware implementations and Jinja2 templating.",
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
        <FaStar key={`full-${i}`} className="text-yellow-400 w-3 h-3 sm:w-4 sm:h-4" />
      ))}
      {[...Array(5 - stars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-400 w-3 h-3 sm:w-4 sm:h-4" />
      ))}
    </div>
  );
};



const Backend = forwardRef((props, ref) => {
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
      className="w-full h-full flex flex-col relative overflow-y-auto p-2 sm:p-4"
    >
      {!selectedSkill ? (
        <>
          <h2 className="text-xl sm:text-2xl text-gray-200 mb-3 sm:mb-4 text-center">
            Backend Skills
          </h2>
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4 max-w-2xl mx-auto">
              {skillsArr.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(255,255,255,0.1)" }}
                  className="flex flex-col items-center space-y-1 sm:space-y-2 p-2 sm:p-3 bg-gray-800 rounded-lg shadow-sm cursor-pointer"
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
                      <FaInfoCircle className="w-3 h-3 text-gray-400 hover:text-gray-300" />

                      {hoveredSkill === skill.name && (
                        <div className="absolute top-full right-0 mt-1 overflow-hidden z-10">
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
                            className="bg-gray-700 text-white text-xs px-3 py-[3px] rounded-full shadow-lg whitespace-nowrap"
                          >
                            Data can be redrawn: AI generated
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00BD95]/20 flex items-center justify-center">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      width={20}
                      height={20}
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-200 text-center">
                    {skill.name}
                  </h3>
                  <div className="w-full space-y-1">
                    <SkillLevelStars level={skill.level} />
                    <div className="flex flex-wrap justify-between items-center mt-1 sm:mt-2 text-[10px] sm:text-xs text-gray-500">
                      <div className="flex items-center min-w-0 max-w-full">
                        <FaCode className="mr-1 text-[#00BD95] flex-shrink-0" />
                        <span className="truncate">{skill.level}</span>
                      </div>
                      <div className="flex items-center min-w-0 max-w-full ml-1">
                        <FaProjectDiagram className="mr-1 text-[#00BD95] flex-shrink-0" />
                        <span className="truncate">{typeof skill.projects === 'number' ? `${skill.projects} projects` : skill.projects}</span>
                      </div>
                    </div>
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
          className="w-full h-full p-2 sm:p-4 flex flex-col items-center justify-center"
        >
          <div className="bg-gray-800 p-3 sm:p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00BD95]/20 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                <Image
                  src={skill?.icon || ""}
                  alt={skill?.name || ""}
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-200">
                  {skill?.name}
                </h2>
                <div className="flex items-center">
                  <span className="text-xs sm:text-sm text-[#00BD95] font-medium mr-2">
                    {skill?.level}
                  </span>
                  <SkillLevelStars level={skill?.level} />
                </div>
              </div>
            </div>
            
            <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gray-700 rounded-lg">
              <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Experience</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                {skill?.details}
              </p>
            </div>
            
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
              <div className="flex items-center">
                <FaProjectDiagram className="mr-1 sm:mr-2 text-[#00BD95]" />
                <span>{typeof skill?.projects === 'number' ? `${skill?.projects} projects` : skill?.projects}</span>
              </div>
              <div className="flex items-center">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500 mr-1 sm:mr-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <span>Actively using</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
});

Backend.displayName = "Backend";
export default Backend;