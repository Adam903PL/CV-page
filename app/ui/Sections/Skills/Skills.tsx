import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SkillsSkeleton from "../../skeletons/SkillsSkeleton";
import { FaCode, FaDesktop, FaDatabase, FaTools } from "react-icons/fa";

const Bubbles = () => {
  // Generuj losowe bąbelki
  const bubbles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 100 + 50; // 50-150px
    const opacity = Math.random() * 0.3 + 0.2; // 20-50%
    const left = Math.random() * 100; // 0-100%
    const delay = Math.random() * 2; // 0-2s

    return (
      <motion.svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="absolute pointer-events-none"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${Math.random() * 100}%`,
          opacity: opacity
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: delay,
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="#00BD95"
          stroke="#FFFFFF30"
          strokeWidth="2"
        />
      </motion.svg>
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden z-0 blur-[2px]">
      {bubbles}
    </div>
  );
};


const Skills = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 20 
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden w-full  flex flex-col items-center justify-center bg-[#171c22]"
    >
      <Bubbles /> 
      <div className="relative w-[90vw] h-[70vh] flex items-center justify-center">
        <div className="relative w-[900px] flex flex-col items-center">
          {/* Ekran laptopa */}
          <div className="w-full h-[500px] bg-gray-800 border-8 border-gray-700 rounded-t-lg shadow-lg flex flex-col items-center justify-center">
            <div
              ref={ref}
              className="w-full h-full bg-[#F0F0F0] p-6 flex flex-col items-center text-white overflow-hidden"
            >
              {!isLoaded ? (
                <SkillsSkeleton />
              ) : (
                <motion.div
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
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
                    {/* Programming Languages */}
                    <motion.div
                      key="programming"
                      variants={itemVariants}
                      className="group relative bg-[rgba(0,189,149,0.4)] rounded-[2rem] w-64 h-32 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-[8px] hover:border-[#00BD95] cursor-pointer"
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-4xl mb-2 text-[#00BD95]"><FaCode /></div>
                        <span className="text-[#00BD95] text-lg font-semibold">
                          Programming Languages
                        </span>
                      </div>
                    </motion.div>

                    {/* Frontend */}
                    <motion.div
                      key="frontend"
                      variants={itemVariants}
                        className="group relative bg-[rgba(217,217,217,0.4)] rounded-[2rem] w-64 h-32 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-[8px] hover:border-[#707070] cursor-pointer"
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-4xl mb-2 text-[#888888]"><FaDesktop /></div>
                        <span className="text-[#898989] text-lg font-semibold">
                          Frontend
                        </span>
                      </div>
                    </motion.div>

                    {/* Backend */}
                    <motion.div
                      key="backend"
                      variants={itemVariants}
                      className="group relative bg-[rgba(217,217,217,0.4)] rounded-[2rem] w-64 h-32 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-[8px] hover:border-[#707070] cursor-pointer"
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-4xl mb-2 text-[#888888]"><FaDatabase /></div>
                        <span className="text-[#898989] text-lg font-semibold">
                          Backend
                        </span>
                      </div>
                    </motion.div>

                    {/* Tools */}
                    <motion.div
                      key="tools"
                      variants={itemVariants}
                      className="group relative bg-[rgba(0,189,149,0.4)] rounded-[2rem] w-64 h-32 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-[8px] hover:border-[#00BD95] cursor-pointer"
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-4xl mb-2 text-[#00BD95]"><FaTools /></div>
                        <span className="text-[#00BD95] text-lg font-semibold">
                          Tools
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Klawiatura */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: 0.8, 
                type: "spring", 
                stiffness: 100, 
                damping: 20 
              } 
            } : {}}
            className="w-[80%] h-[100px] bg-gray-700 rounded-b-lg shadow-lg flex items-center justify-center gap-4"
          >
            <div className="w-3/4 h-12 bg-gray-600 rounded-md flex items-center justify-center">
              <motion.div 
                className="grid grid-cols-10 gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-4 h-4 bg-gray-500 rounded-sm"
                  />
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
      </div>
    </section>
  );
};

export default Skills;