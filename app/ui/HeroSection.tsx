"use client";

import { FaDownload, FaCode, FaServer, FaLaptopCode } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import Link from "next/link";
import { useLinks } from "../lib/zustand/useLinks";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { RiTerminalBoxFill } from "react-icons/ri";
import { FaShieldAlt } from "react-icons/fa";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      staggerChildren: 0.2
    } 
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7,
      type: "spring",
      stiffness: 100
    } 
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { 
      duration: 1,
      type: "spring",
      damping: 15
    } 
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      type: "spring",
      stiffness: 200
    } 
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 0px 12px rgba(0, 255, 201, 0.6)",
    transition: { duration: 0.3 }
  },
  tap: {
    scale: 0.95
  }
};

const floatingAnimation = {
  y: ["-10px", "10px"],
  transition: {
    y: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

const skillBadgeVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  visible: i => ({ 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: { 
      delay: i * 0.1 + 0.3,
      duration: 0.5,
      type: "spring"
    } 
  }),
  hover: {
    scale: 1.1,
    rotate: 5,
    y: -5,
    transition: { duration: 0.2 }
  }
};

const backgroundGlowVariants = {
  initial: {
    background: "radial-gradient(circle at 50% 50%, rgba(0, 189, 149, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
  },
  animate: {
    background: "radial-gradient(circle at 50% 50%, rgba(0, 189, 149, 0.2) 0%, rgba(0, 0, 0, 0) 70%)",
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

export default function Hero() {
  const typedElementRef = useRef(null);
  const { activeSection, setActiveSection } = useLinks();
  const [isHovering, setIsHovering] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  // Alternative Typed.js implementation
  const [typedText, setTypedText] = useState("Backend Developer");
  
  useEffect(() => {
    // Instead of using Typed.js directly, we'll manually create a similar effect
    let typed = null;
    
    if (typedElementRef.current) {
      // Create a new Typed instance
      typed = new Typed(typedElementRef.current, {
        strings: ["Backend Developer", "Frontend Developer"],
        typeSpeed: 40,
        backSpeed: 40,
        backDelay: 1000,
        loop: true,
        cursorChar: '|',
        smartBackspace: true,
        showCursor: true,
        autoInsertCss: true,
      });
    }
    
    // Cleanup function to destroy the Typed instance
    return () => {
      if (typed) {
        typed.destroy();
      }
    };
  }, [inView]); // Re-initialize when component comes into view

  const skills = [
    { name: "Backend", icon: <FaServer /> },
    { name: "Frontend", icon: <FaCode /> },
    { name: "Security", icon: <FaShieldAlt /> },
    { name: "Terminal", icon: <RiTerminalBoxFill /> },
    { name: "Full Stack", icon: <FaLaptopCode /> },
  ];

  return (
    <section
      className="min-h-[80vh] lg:min-h-[80vh] relative pt-10 flex justify-center"
      id="home"
      ref={ref}
    >
      <motion.div 
        className="absolute inset-0 z-0"
        initial="initial"
        animate="animate"
        variants={backgroundGlowVariants}
      />

      {/* SVG Blob backgrounds */}
      <div className="absolute top-0 right-0 opacity-20 text-primary h-64 w-64 -mt-10 -mr-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-15.3,89.1,1.6C88.3,18.4,84,36.8,74.1,51.2C64.1,65.6,48.4,76,31.6,83.5C14.7,91,-3.4,95.5,-21.7,93.7C-40,91.8,-58.5,83.6,-71.2,70C-83.9,56.4,-90.8,37.3,-93.9,17.6C-97,-2.1,-96.4,-22.4,-88.8,-39.2C-81.1,-56,-66.5,-69.4,-50.1,-75.6C-33.7,-81.9,-16.9,-81,-0.5,-80.1C15.8,-79.2,30.7,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 opacity-20 text-primary h-64 w-64 -mb-10 -ml-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M39.2,-65.2C52.9,-59.5,67.5,-53.6,76.2,-42.5C84.9,-31.4,87.7,-15.7,86.6,-0.6C85.6,14.5,80.6,28.9,72.4,41.3C64.1,53.8,52.5,64.2,39.2,70.5C25.9,76.8,12.9,79.1,0.2,78.7C-12.6,78.4,-25.1,75.4,-38.3,69.8C-51.5,64.2,-65.2,56,-74,43.9C-82.8,31.8,-86.6,15.9,-87.6,-0.6C-88.5,-17,-86.5,-34,-77.5,-45.5C-68.6,-57,-52.6,-63,-38,-65.8C-23.4,-68.7,-11.7,-68.3,0.6,-69.5C13,-70.6,25.9,-70.9,39.2,-65.2Z" transform="translate(100 100)" />
        </svg>
      </div>

      <AnimatePresence>
        {inView && (
          <motion.div
            className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left column - Image */}
            <motion.div
              className="md:w-1/2 flex justify-center"
              variants={imageVariants}
              animate={isHovering ? { scale: 1.03 } : {}}
            >
              <motion.div 
                className="relative w-[340px] h-[340px] rounded-full bg-gradient-to-br from-[#00ffc9] to-[#00bd95] flex justify-center items-center border-8 border-[rgba(0,150,120,0.8)] overflow-hidden shadow-2xl"
                animate={floatingAnimation}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
                <div className="relative w-full h-full">
                  <Image
                    src="/img/me2.jpg"
                    alt="Adam Pukaluk"
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    style={{ opacity: 0.9 }}
                    priority
                  />
                </div>
                
              </motion.div>
            </motion.div>

            {/* Right column - Text content */}
            <motion.div 
              className="md:w-1/2 mt-10 md:mt-0" 
              variants={textVariants}
            >
              <motion.div variants={textVariants}>
                <span className="text-xl mb-2 flex font-bold items-center">
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    Hello,
                  </motion.p>
                  <motion.p 
                    className="text-primary ml-2" 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    I'm
                  </motion.p>
                </span>
                <motion.h1 
                  className="text-5xl font-bold mt-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC9] to-[#00BD95]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                >
                  ADAM PUKALUK
                </motion.h1>
                <motion.div 
                  className="text-3xl mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.7 }}
                >
                  <span className="text-white text-3xl mb-6" ref={typedElementRef}></span>
                </motion.div>
              </motion.div>

              <motion.p 
                className="text-gray-300 mb-8 max-w-md leading-relaxed"
                variants={textVariants}
              >
                Passionate about backend development and cybersecurity, 
                I enjoy building secure and efficient applications while
                constantly expanding my skills in modern web technologies.
              </motion.p>

              <motion.div 
                className="flex flex-wrap "
                variants={textVariants}
              >
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gradient-to-r from-[#00FFC9] to-[#00BD95] px-6 py-3 rounded-full font-bold flex items-center shadow-lg mb-3"
                >
                  <Link
                    onClick={() =>
                      setActiveSection(
                        `#${"contact".replace(/\s+/g, "").toLowerCase()}`
                      )
                    }
                    href="https://bento.me/adam-pukaluk"
                    className="flex items-center"
                  >
                    Contact With Me
                  </Link>
                </motion.button>

                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-gradient-to-r from-[#00FFC9] to-[#00BD95] px-6 py-3 rounded-full font-bold flex items-center shadow-lg mb-3"
                >
                  <a
                    href="/img/Adam-Pukaluk-CV.pdf"
                    download="Adam-Pukaluk-CV.pdf"
                    className="flex items-center"
                  >
                    <FaDownload className="mr-2" />
                    Download CV
                  </a>
                </motion.button>
              </motion.div>

              {/* Skill counter section */}
              <motion.div 
                className="mt-8 grid grid-cols-2 gap-4"
                variants={textVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
              >
                <div className="bg-gray-800 bg-opacity-40 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-primary font-bold text-2xl">2+</h3>
                  <p className="text-gray-300">Years Experience</p>
                </div>
                <div className="bg-gray-800 bg-opacity-40 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-primary font-bold text-2xl">10+</h3>
                  <p className="text-gray-300">Projects Completed</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}