"use client";

import React from "react";
import { motion } from "framer-motion";
import TicTacToe from "../ui/Sections/Games/TicTacToe";
import MemoryGame from "../ui/Sections/Games/MemoryGame";
import SnakeGame from "../ui/Sections/Games/SnakeGame";
import Tetris from "../ui/Sections/Games/Tetris";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const gameCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, type: "spring", bounce: 0.4 }
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 0px 20px rgba(0, 189, 149, 0.5)",
    transition: { duration: 0.3 }
  }
};

const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 20, rotate: -5 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5, type: "spring", bounce: 0.4 }
  }
};

const waveVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 0.15,
    scale: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const GamesPage = () => {
  const title = "Game Collection";
  
  return (
    <section className="relative min-h-screen bg-[#171c22] overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00bd95]/15 to-[#00FFC9]/15 rounded-full blur-3xl"
        variants={waveVariants}
        initial="hidden"
        animate="visible"
      />
      
      <div className="relative py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Animated title */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-white mb-16 text-center tracking-tight"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {title.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        
        {/* Games grid with increased spacing */}
        <motion.div
          className="grid grid-cols-1 xl:grid-cols-2 gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tetris - Full width on all screen sizes */}
          <motion.div
            className="bg-[#161B22] rounded-xl border border-[#30363D] shadow-xl overflow-hidden xl:col-span-1 min-h-[500px]"
            variants={gameCardVariants}
            whileHover="hover"
          >
            <div className="p-5 bg-[#20272F] border-b border-[#30363D]">
              <h2 className="text-2xl font-bold text-[#00bd95]">Tetris</h2>
              <p className="text-gray-300 text-sm">Classic block-stacking action</p>
            </div>
            <div className="p-8 h-full">
              <Tetris />
            </div>
          </motion.div>
          
          {/* Snake Game - Also full width with more space */}
          <motion.div
            className="bg-[#161B22] rounded-xl border border-[#30363D] shadow-xl overflow-hidden min-h-[500px]"
            variants={gameCardVariants}
            whileHover="hover"
          >
            <div className="p-5 bg-[#20272F] border-b border-[#30363D]">
              <h2 className="text-2xl font-bold text-[#00bd95]">Snake</h2>
              <p className="text-gray-300 text-sm">Eat, grow, and survive</p>
            </div>
            <div className="p-8 h-full">
              <SnakeGame />
            </div>
          </motion.div>
          
          {/* Tic Tac Toe with more spacing */}
          <motion.div
            className="bg-[#161B22] rounded-xl border border-[#30363D] shadow-xl overflow-hidden min-h-[500px]"
            variants={gameCardVariants}
            whileHover="hover"
          >
            <div className="p-5 bg-[#20272F] border-b border-[#30363D]">
              <h2 className="text-2xl font-bold text-[#00bd95]">Tic Tac Toe</h2>
              <p className="text-gray-300 text-sm">Classic X & O strategy</p>
            </div>
            <div className="p-8 flex justify-center items-center h-full">
              <TicTacToe />
            </div>
          </motion.div>
          
          {/* Memory Game with more space */}
          <motion.div
            className="bg-[#161B22] rounded-xl border border-[#30363D] shadow-xl overflow-hidden min-h-[500px]"
            variants={gameCardVariants}
            whileHover="hover"
          >
            <div className="p-5 bg-[#20272F] border-b border-[#30363D]">
              <h2 className="text-2xl font-bold text-[#00bd95]">Memory Game</h2>
              <p className="text-gray-300 text-sm">Test your memory skills</p>
            </div>
            <div className="p-8 flex justify-center items-center h-full">
              <MemoryGame />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Footer note */}
        <motion.p 
          className="text-gray-400 text-center mt-16 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Use keyboard controls or click/tap to play the games
        </motion.p>
      </div>
    </section>
  );
};

export default GamesPage;