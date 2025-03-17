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
import { FaInfoCircle } from "react-icons/fa";

const skillsArr = [
  {
    name: "NextJs",
    icon: NextJsIcon,
    percentage: 90,
    details:
      "Advanced SSR/ISR implementations, API routes architecture, middleware configuration, and hybrid rendering patterns. Strong foundation in App Router and React Server Components.",
  },
  {
    name: "Node.js",
    icon: NodeIcon,
    percentage: 90,
    details:
      "Daily driver for building production-grade REST APIs, WebSocket servers, and microservices. Expert in event loop optimization, NPM ecosystem, and WebSocket integration.",
  },
  {
    name: "Express.js",
    icon: ExpressIcon,
    percentage: 85,
    details:
      "Advanced middleware patterns, RESTful routing architecture, and database-agnostic service implementations. Frequent use of authentication middleware and error handling layers.",
  },
  {
    name: "Python",
    icon: PythonIcon,
    percentage: 80,
    details:
      "Web scraping automation, data analysis pipelines, and scripting solutions. Practical experience with Pandas/NumPy for data processing tasks.",
  },
  {
    name: "PostgreSQL",
    icon: PostgresIcon,
    percentage: 75,
    details:
      "Advanced query optimization, index management, and ORM integrations. Proficient in complex joins and window functions.",
  },
  {
    name: "MS SQL",
    icon: MsSqlIcon,
    percentage: 90,
    details:
      "Expert-level T-SQL development, complex stored procedures, and query optimization. Extensive 2023 focus on SSIS packages and data warehousing solutions.",
  },
  {
    name: "FastAPI",
    icon: FastAPIicon,
    percentage: 85,
    details:
      "2023 primary tool for building high-performance asynchronous endpoints with auto-generated Swagger docs. Strong experience with Pydantic models and dependency injection.",
  },
  {
    name: "Flask",
    icon: FlaskIcon,
    percentage: 80,
    details:
      "2022-2023 projects focused on lightweight RESTful services and prototype development. Custom middleware implementations and Jinja2 templating.",
  },
];
const ProgressBar = ({ percentage }: { percentage: number }) => (
  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${percentage}%` }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="h-full bg-[#00BD95] rounded-full"
    />
  </div>
);

const Backend = forwardRef((props, ref) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const skill = skillsArr.find((s) => s.name === selectedSkill);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
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
      className="w-full h-full flex flex-col relative overflow-y-auto"
    >
      {!selectedSkill ? (
        <>
          <h2 className="text-2xl text-gray-400 mb-4 text-center">
            Backend Skills
          </h2>
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {skillsArr.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center space-y-2 p-3 bg-white rounded-lg shadow-sm cursor-pointer"
                  onClick={() => setSelectedSkill(skill.name)}
                >
                  {/* Kontener dla ikony info */}
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
                  <div className="w-12 h-12 rounded-full bg-[#00BD95]/20 flex items-center justify-center">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      className="w-6 h-6"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="text-base font-semibold text-gray-600 text-center">
                    {skill.name}
                  </h3>
                  <div className="w-full space-y-1">
                    <ProgressBar percentage={skill.percentage} />
                    <span className="text-xs text-gray-500 block text-center">
                      {skill.percentage}%
                    </span>
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
          className="w-full h-full p-4 flex flex-col items-center justify-center"
        >
          <Image
            src={skill?.icon || ""}
            alt={skill?.name || ""}
            width={48}
            height={48}
          />
          <h2 className="text-2xl font-semibold mt-3 text-gray-700">
            {skill?.name}
          </h2>
          <p className="mt-3 text-base text-gray-500 text-center max-w-[300px]">
            {skill?.details}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
});

Backend.displayName = "Backend";
export default Backend;
