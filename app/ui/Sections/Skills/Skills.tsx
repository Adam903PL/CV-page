import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaCode,
  FaDesktop,
  FaDatabase,
  FaTools,
  FaCircle,
  FaArrowLeft,
} from "react-icons/fa";
import LaptopScreen from "./LaptopScreen";
import Frontend from "./SkillsSections/Frontend";
import Backend from "./SkillsSections/Backend";
import ProgrammingLanguages from "./SkillsSections/ProgrammingLanguages";
import Tools from "./SkillsSections/Tools";
import { BackgroundCircles } from "../../BgCircles";

const componentsMap = {
  programmingLanguages: ProgrammingLanguages,
  frontend: Frontend,
  backend: Backend,
  tools: Tools,
};

const Skills = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeScreen, setActiveScreen] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const activeComponentRef = useRef<any>(null);
  const ActiveComponent = activeScreen ? componentsMap[activeScreen] : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, when: "beforeChildren" },
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleGlobalBack = () => {
    if (activeScreen === "frontend" && activeComponentRef.current) {
      const handled = activeComponentRef.current.handleBack();
      if (handled) return;
    }
    setActiveScreen(null);
  };

  const skills = [
    "React",
    "React Native",
    "Python",
    "Next.Js",
    "express.js",
    "JavaScript",
    "Node.js",
    "TypeScript",
    "zustand",
    "Redux",
    "Tailwind",
    "NextAuth",
    "C++",
    "Ms Sql",
    "PostgreSQL",
    "HTML/CSS",
    "PHP",
    "git",
  ];

  const skillsReverse = [
    "git",
    "PHP",
    "HTML/CSS",
    "PostgreSQL",
    "Ms Sql",
    "C++",
    "NextAuth",
    "Tailwind",
    "Redux",
    "zustand",
    "TypeScript",
    "Node.js",
    "JavaScript",
    "express.js",
    "Next.Js",
    "Python",
    "React Native",
    "React",
  ];

  const carouselVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        },
      },
    },
  };
  const carouselVariantsRight = {
    animate: {
      x: ["0%", "100%"],
      transition: {
        x: {
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section
      id="skills"
      className="relative w-full flex flex-col items-center justify-center bg-[#171c22] py-4"
    >
      <BackgroundCircles />

      <div className="relative w-full overflow-hidden py-6">
        <div className="absolute inset-y-0 left-0 w-24 " />
        <div className="absolute inset-y-0 right-0 w-24 " />
        
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -2000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <div key={index} className="inline-flex items-center group mx-3">
              <motion.h1 
                className="text-gray-400 text-5xl font-bold transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  color: "#FFFFFF",
                  textShadow: "0 0 8px rgba(255,255,255,0.4)"
                }}
              >
                {skill}
              </motion.h1>
              <span className="mx-4 text-blue-500 opacity-50">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom carousel - going the opposite direction with different styling */}
      <div className="relative w-full overflow-hidden py-6">
        <div className="absolute inset-y-0 left-0 w-24 " />
        <div className="absolute inset-y-0 right-0 w-24 " />
        
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [-2000, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...skillsReverse, ...skillsReverse, ...skillsReverse].map((skill, index) => (
            <div key={index} className="inline-flex items-center group mx-3">
              <motion.h1 
                className="text-gray-400 text-5xl font-bold transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  color: "#FFFFFF",
                  textShadow: "0 0 8px rgba(255,255,255,0.4)"
                }}
              >
                {skill}
              </motion.h1>
              <span className="mx-4 text-blue-500 opacity-50">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative w-full max-w-[90vw] flex items-center justify-center mt-8">
        {/* Laptop - widoczny na większych ekranach (breakpoint zmieniony na lg) */}
        <div className="hidden lg:flex flex-col items-center w-[900px]">
          <LaptopScreen />
        </div>

        {/* Telefon - widoczny na mniejszych ekranach (do breakpointu lg) */}
        <div className="flex lg:hidden flex-col items-center w-full max-w-[350px]">
          <div className="w-full h-[650px] bg-gray-800 border-8 border-gray-700 my-4 rounded-[2rem] shadow-lg flex flex-col items-center justify-center">
            <div
              ref={ref}
              className="w-full h-full bg-[#F0F0F0] p-4 flex flex-col items-center text-white overflow-hidden rounded-t-[1rem]"
            >
              {!activeScreen ? (
                <motion.div
                  initial="hidden"
                  animate={isInView && isLoaded ? "visible" : "hidden"}
                  variants={containerVariants}
                  className="flex flex-col items-center w-full h-full"
                >
                  <motion.h1
                    variants={itemVariants}
                    className="text-3xl text-gray-400 text-center mb-6"
                  >
                    Explore my skills
                  </motion.h1>
                  <motion.div
                    className="grid grid-cols-1 gap-4 w-full"
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
                        color: "#888888",
                      },
                      {
                        id: "backend",
                        icon: FaDatabase,
                        label: "Backend",
                        color: "#888888",
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
                        className={`relative bg-[rgba(${
                          item.color === "#00BD95" ? "0,189,149" : "136,136,136"
                        },0.4)] rounded-[1rem] w-full h-24 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-[6px] hover:border-[${
                          item.color
                        }] cursor-pointer`}
                        onClick={() => setActiveScreen(item.id)}
                      >
                        <div className="flex flex-col items-center">
                          <item.icon
                            className="text-3xl mb-2"
                            style={{ color: item.color }}
                          />
                          <span
                            className="text-base font-semibold"
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
                  className="w-full h-full flex flex-col items-center p-4 relative"
                >
                  <button
                    onClick={handleGlobalBack}
                    className="absolute top-2 right-2 text-black hover:text-gray-700"
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
              {!isLoaded && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-gray-200/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-[#00BD95]/30"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              )}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      transition: { delay: 0.8, type: "spring" },
                    }
                  : {}
              }
              className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center my-4"
            >
              <FaCircle className="text-gray-500 text-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;