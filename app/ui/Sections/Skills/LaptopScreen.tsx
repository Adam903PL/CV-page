import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaDesktop,
  FaDatabase,
  FaTools,
  FaArrowLeft,
} from "react-icons/fa";
import Backend from "./SkillsSections/Backend";
import Frontend from "./SkillsSections/Frontend";
import ProgrammingLanguages from "./SkillsSections/ProgrammingLanguages";
import Tools from "./SkillsSections/Tools";

const componentsMap = {
  programmingLanguages: ProgrammingLanguages,
  frontend: Frontend,
  backend: Backend,
  tools: Tools,
};

const LaptopScreen = () => {
  const [activeScreen, setActiveScreen] = useState<string | null>(null);
  const activeComponentRef = useRef<any>(null);
  const ActiveComponent = activeScreen ? componentsMap[activeScreen] : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
  };

  const handleGlobalBack = () => {
    if (activeScreen === "frontend" && activeComponentRef.current) {
      const handled = activeComponentRef.current.handleBack();
      if (handled) return;
    }
    setActiveScreen(null);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[900px] mx-auto px-4 sm:px-0">
      <div className="w-full h-[500px] sm:h-[500px] bg-gray-900 border-8 border-gray-800 rounded-t-lg shadow-lg flex flex-col items-center justify-center">
        <div className="w-full h-full bg-[#1a2029] p-4 sm:p-6 flex flex-col items-center text-white overflow-hidden">
          {!ActiveComponent ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col items-center w-full h-full"
            >
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl text-gray-300 text-center mb-6 sm:mb-10"
              >
                Explore my skills
              </motion.h1>
              <motion.div
                className="grid grid-cols-2 gap-4 sm:gap-6 max-w-2xl"
                variants={containerVariants}
              >
                {[
                  {
                    id: "programmingLanguages",
                    icon: FaCode,
                    label: "Programming Languages",
                    color: "#00BD95",
                    bgColor: "bg-[rgba(0,189,149,0.3)]",
                  },
                  {
                    id: "frontend",
                    icon: FaDesktop,
                    label: "Frontend",
                    color: "#00BD95",
                    bgColor: "bg-[rgba(0,189,149,0.3)]",
                  },
                  {
                    id: "backend",
                    icon: FaDatabase,
                    label: "Backend",
                    color: "#00BD95",
                    bgColor: "bg-[rgba(0,189,149,0.3)]",
                  },
                  {
                    id: "tools",
                    icon: FaTools,
                    label: "Tools",
                    color: "#00BD95",
                    bgColor: "bg-[rgba(0,189,149,0.3)]",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className={`group relative ${item.bgColor} rounded-[2rem] w-full sm:w-64 h-24 sm:h-32 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-[8px] hover:border-[${item.color}] cursor-pointer`}
                    onClick={() => setActiveScreen(item.id)}
                  >
                    <div className="flex flex-col items-center">
                      <item.icon
                        className={`text-2xl sm:text-4xl mb-1 sm:mb-2`}
                        style={{ color: item.color }}
                      />
                      <span
                        className={`text-sm sm:text-lg font-semibold`}
                        style={{ color: item.color }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="w-full h-full flex flex-col items-center p-4 sm:p-6 relative"
            >
              <button
                onClick={handleGlobalBack}
                className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer"
              >
                <FaArrowLeft className="text-xl sm:text-2xl" />
              </button>

              {activeScreen === "frontend" ? (
                <ActiveComponent ref={activeComponentRef} />
              ) : (
                <ActiveComponent />
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom bar (simulating laptop/mobile screen) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 20,
          },
        }}
        className="w-full sm:w-[80%] h-[60px] sm:h-[100px] bg-gray-900 rounded-b-lg shadow-lg flex items-center justify-center gap-2 sm:gap-4 mb-4"
      >
        <div className="w-3/4 h-8 sm:h-12 bg-gray-800 rounded-md flex items-center justify-center">
          <motion.div
            className="grid grid-cols-10 gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-2 h-2 sm:w-4 sm:h-4 bg-gray-700 rounded-sm" />
            ))}
          </motion.div>
        </div>
        <motion.div
          className="w-16 h-10 sm:w-24 sm:h-16 bg-gray-800 rounded-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4, type: "spring" }}
        />
      </motion.div>
    </div>
  );
};

export default LaptopScreen;