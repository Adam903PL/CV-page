"use client";

import React from "react";
import { motion } from "framer-motion";
import { BackgroundCircles } from '../../BgCircles';
import Link from "next/link";

const Games = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, delay: 0.7 } 
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const iconVariants = {
    hidden: { opacity: 0, rotate: -20 },
    visible: { 
      opacity: 1, 
      rotate: 0,
      transition: { duration: 0.6, delay: 0.3 } 
    },
    hover: {
      rotate: [0, 5, -5, 5, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 1 }
    }
  };

  return (
    <section id="games" className="relative min-h-screen bg-[#171c22] flex items-center justify-center overflow-hidden">
      {/* Background */}
      {/* <BackgroundCircles /> */}
      
      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto text-center px-6 py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="mb-6"
          variants={iconVariants}
          whileHover="hover"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="80" 
            height="80" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#00bd95" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mx-auto"
          >
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <path d="M7 12h.01" />
            <path d="M11 12h2" />
            <path d="M17 12h.01" />
            <path d="M12 7v5" />
          </svg>
        </motion.div>
        
        <motion.h2 
          className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
          variants={textVariants}
        >
          Game Collection
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          variants={textVariants}
        >
          Challenge yourself with a variety of classic games including Tetris, Snake, 
          Tic Tac Toe, and Memory Match. Test your skills and have fun!
        </motion.p>
        
        <motion.p 
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
          variants={textVariants}
        >
          Each game features unique gameplay mechanics and increasing difficulty levels to keep you entertained.
        </motion.p>
        
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link href="/games">
            <button className="px-10 py-5 bg-gradient-to-br from-[#00bd95] to-[#00FFC9] text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transform transition duration-300">
              Play Games
            </button>
          </Link>
        </motion.div>
        
        <motion.div 
          className="mt-12 flex flex-wrap justify-center gap-3"
          variants={containerVariants}
        >
          {['Tetris', 'Snake', 'Tic Tac Toe', 'Memory Match'].map((game, index) => (
            <motion.div 
              key={index}
              className="text-sm font-medium text-gray-400 bg-[#20272F] px-4 py-2 rounded-full mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + (index * 0.1) }}
            >
              {game}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Games;