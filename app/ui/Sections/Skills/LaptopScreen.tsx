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
    // Jeśli aktywnym ekranem jest "frontend", spróbujmy obsłużyć cofanie wewnętrzne
    if (activeScreen === "frontend" && activeComponentRef.current) {
      const handled = activeComponentRef.current.handleBack();
      if (handled) return;
    }
    // W przeciwnym razie wracamy do głównego widoku wyboru
    setActiveScreen(null);
  };

  return (
    <div className="flex flex-col items-center w-[900px]">
      <div className="w-full h-[500px] bg-gray-800 border-8 border-gray-700 rounded-t-lg shadow-lg flex flex-col items-center justify-center">
        <div className="w-full h-full bg-[#F0F0F0] p-6 flex flex-col items-center text-white overflow-hidden">
          {!ActiveComponent ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col items-center w-full h-full"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl text-gray-400 text-center mb-10"
              >
                Explore my skills
              </motion.h1>
              <motion.div
                className="grid grid-cols-2 gap-6 max-w-2xl"
                variants={containerVariants}
              >
                {[
                  {
                    id: "programmingLanguages",
                    icon: FaCode,
                    label: "Programming Languages",
                    color: "#00BD95",
                  },
                  {
                    id: "frontend",
                    icon: FaDesktop,
                    label: "Frontend",
                    color: "#707070",
                  },
                  {
                    id: "backend",
                    icon: FaDatabase,
                    label: "Backend",
                    color: "#707070",
                  },
                  {
                    id: "tools",
                    icon: FaTools,
                    label: "Tools",
                    color: "#00BD95",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className={`group relative bg-[rgba(${
                      item.color === "#00BD95" ? "0,189,149" : "217,217,217"
                    },0.4)] rounded-[2rem] w-64 h-32 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-[8px] hover:border-[${
                      item.color
                    }] cursor-pointer`}
                    onClick={() => setActiveScreen(item.id)}
                  >
                    <div className="flex flex-col items-center">
                      <item.icon
                        className={`text-4xl mb-2`}
                        style={{ color: item.color }}
                      />
                      <span
                        className={`text-lg font-semibold`}
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
              className="w-full h-full flex flex-col items-center p-6 relative"
            >
              


              <button
                onClick={handleGlobalBack}
                className="absolute top-4 right-4 text-black hover:text-gray-700 cursor-pointer"
              >
                <FaArrowLeft className="text-2xl" />
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

      {/* Dolny pasek (np. pasek symulujący ekran laptopa) */}
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
        className="w-[80%] h-[100px] bg-gray-700 rounded-b-lg shadow-lg flex items-center justify-center gap-4 mb-4"
      >
        <div className="w-3/4 h-12 bg-gray-600 rounded-md flex items-center justify-center">
          <motion.div
            className="grid grid-cols-10 gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-500 rounded-sm" />
            ))}
          </motion.div>
        </div>
        <motion.div
          className="w-24 h-16 bg-gray-600 rounded-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4, type: "spring" }}
        />
      </motion.div>
    </div>
  );
};

export default LaptopScreen;
