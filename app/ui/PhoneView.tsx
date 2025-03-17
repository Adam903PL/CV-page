import React from "react";
import { FaCode, FaDesktop, FaDatabase, FaTools } from "react-icons/fa";
import { motion } from "framer-motion";

const PhoneView = ({ isLoaded, isInView }) => {
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

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="flex flex-col items-center w-full h-full p-4"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl text-gray-400 text-center mb-6"
        >
          Explore my skills
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 gap-4 w-full max-w-md"
          variants={containerVariants}
        >
          {/* Programming Languages */}
          <motion.div
            key="programming"
            variants={itemVariants}
            className="group relative bg-[rgba(0,189,149,0.4)] rounded-[2rem] w-full h-24 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-[8px] hover:border-[#00BD95] cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2 text-[#00BD95]">
                <FaCode />
              </div>
              <span className="text-[#00BD95] text-lg font-semibold">
                Programming Languages
              </span>
            </div>
          </motion.div>

          {/* Frontend */}
          <motion.div
            key="frontend"
            variants={itemVariants}
            className="group relative bg-[rgba(217,217,217,0.4)] rounded-[2rem] w-full h-24 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-[8px] hover:border-[#707070] cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2 text-[#888888]">
                <FaDesktop />
              </div>
              <span className="text-[#898989] text-lg font-semibold">
                Frontend
              </span>
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div
            key="backend"
            variants={itemVariants}
            className="group relative bg-[rgba(217,217,217,0.4)] rounded-[2rem] w-full h-24 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-[8px] hover:border-[#707070] cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2 text-[#888888]">
                <FaDatabase />
              </div>
              <span className="text-[#898989] text-lg font-semibold">
                Backend
              </span>
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            key="tools"
            variants={itemVariants}
            className="group relative bg-[rgba(0,189,149,0.4)] rounded-[2rem] w-full h-24 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-[8px] hover:border-[#00BD95] cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2 text-[#00BD95]">
                <FaTools />
              </div>
              <span className="text-[#00BD95] text-lg font-semibold">
                Tools
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PhoneView;