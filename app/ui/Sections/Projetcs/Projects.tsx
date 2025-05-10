

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoPersonSharp } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
// Import sample images (replace these with your actual imports)
import FlashTalkAi1 from "@/public/img/projectsImg/flashtalkai/flashtalkai1.png";
import FlashTalkAi2 from "@/public/img/projectsImg/flashtalkai/flashtalkai2.png";
import FlashTalkAI4 from "@/public/img/projectsImg/flashtalkai/flashtalkai4.png";
import TechniFees1 from "@/public/img/projectsImg/technifees/TechniFees1.png";
import TechniFees2 from "@/public/img/projectsImg/technifees/TechniFees2.png";
import TechniFees3 from "@/public/img/projectsImg/technifees/TechniFees3.png";
import TechniCloud1 from "@/public/img/projectsImg/TechniCloud/TechniCloud1.png";
import TechniCloud2 from "@/public/img/projectsImg/TechniCloud/TechniCloud2.png";
import TechniCloud3 from "@/public/img/projectsImg/TechniCloud/TechniCloud3.png";
import TechniCloud4 from "@/public/img/projectsImg/TechniCloud/TechniCloud4.png";
import TechniBank1 from "@/public/img/projectsImg/techniBank/techniBank4.png";
import TechniBank2 from "@/public/img/projectsImg/techniBank/techniBank2.png";
import TechniBank3 from "@/public/img/projectsImg/techniBank/techniBank3.png";
import TechniBank4 from "@/public/img/projectsImg/techniBank/techniBank4.png";

import TechniDev1 from "@/public/img/projectsImg/TechniDev/490985909_1734658924074139_4362106034665608999_n.jpg";
import TechniDev2 from "@/public/img/projectsImg/TechniDev/490991417_694956366383522_2853085818927815154_n.jpg";
import TechniDev3 from "@/public/img/projectsImg/TechniDev/490994152_1334489034475467_2926519540342889715_n.jpg";
import TechniDev4 from "@/public/img/projectsImg/TechniDev/491340809_1013435366961696_4223164187108586759_n(1).jpg";
import TechniDev5 from "@/public/img/projectsImg/TechniDev/491340809_1013435366961696_4223164187108586759_n.jpg";

import TaxMaster1 from "@/public/img/projectsImg/TaxMaxster/TaxMaster1.png";
import TaxMaster2 from "@/public/img/projectsImg/TaxMaxster/TaxMaster2.png";
import TaxMaster3 from "@/public/img/projectsImg/TaxMaxster/TaxMaster3.png";
import TaxMaster4 from "@/public/img/projectsImg/TaxMaxster/TaxMaster4.png";
import TaxMaster5 from "@/public/img/projectsImg/TaxMaxster/TaxMaster5.png";
import TaxMaster6 from "@/public/img/projectsImg/TaxMaxster/TaxMaster6.png";
import TaxMaster7 from "@/public/img/projectsImg/TaxMaxster/TaxMaster7.png";


// Your existing project list with the TechniBank images imported
const projects2 = [

  {
    id: 2,
    name: "TaxMaster",
    description: "An AI-powered app to assist users in navigating tax laws and financial aspects, providing personalized insights and recommendations.",
    usedTechnology: ["ReactNative", "Expo"],
    pictures: [TaxMaster1, TaxMaster2, TaxMaster3, TaxMaster4, TaxMaster5,TaxMaster6,TaxMaster7],
    repoLink: "https://github.com/Adam903PL/TechniDev",
    liveLink: "",
    type: "web",
  },
  {
    id: 3,
    name: "FlashTalkAI",
    description: "AI-powered language learning platform",
    usedTechnology: [
      "TypeScript",
      "Tailwind",
      "Express.JS",
      "PostgreSQL",
      "DeepSeekAPI",
    ],
    pictures: [FlashTalkAi1, FlashTalkAi2, FlashTalkAI4],
    repoLink: "https://github.com/Adam903PL/FlashTalkAI",
    liveLink: "",
    type: "web",
  },
  {
    id: 4,
    name: "TechniFees",
    description:
      "TechniFees is my first simple app for managing school fees, built with Python, Tkinter",
    usedTechnology: ["Python", "Tkinter", "smtplib", "PostgreSQL"],
    pictures: [TechniFees1, TechniFees2, TechniFees3],
    repoLink: "https://github.com/Adam903PL/TechniFees",
    liveLink: "",
    type: "web",
  },
  {
    id: 5,
    name: "TechniCloud",
    description: "Basic Mobile APP in React Native",
    usedTechnology: ["React Native"],
    pictures: [TechniCloud1, TechniCloud2, TechniCloud3, TechniCloud4],
    repoLink: "https://github.com/Adam903PL/Native-Cloud",
    liveLink: "",
    type: "mobile",
  },
  {
    id: 6,
    name: "TechniBank",
    description: "Banking system for personal finance management",
    usedTechnology: ["HTML5", "CSS", "JS"],
    pictures: [TechniBank1, TechniBank2, TechniBank3, TechniBank4],
    repoLink: "https://github.com/Karman1818/TechniBank",
    liveLink: "",
    type: "web",
    contributor: "https://github.com/Karman1818",
  },
];
// Updated project list with multiple repositories, contributors, and development time
const projects = [
  {
    id: 1,
    name: "TechniDev",
    description: "An app to connect developers with people looking to hire them.",
    usedTechnology: ["ReactNative", "Expo"],
    pictures: [TechniDev1, TechniDev2, TechniDev3, TechniDev4, TechniDev5],
    repositories: [
      { name: "Main Repo", link: "https://github.com/Adam903PL/TechniDev" },
    ],
    liveLink: "",
    type: "mobile",
    contributors: [
      { name: "Adam903PL", link: "https://github.com/Adam903PL" }
    ],
    developmentTime: "3h"
  },
  {
    id: 2,
    name: "TaxMaster",
    description: "An AI-powered app to assist users in navigating tax laws and financial aspects, providing personalized insights and recommendations.",
    usedTechnology: ["NextJS", "FastAPI","TreeJS","Ollama"],
    pictures: [TaxMaster1, TaxMaster2, TaxMaster3, TaxMaster4, TaxMaster5, TaxMaster6, TaxMaster7],
    repositories: [
      { name: "Frontend", link: "https://github.com/Adam903PL/TaxMaster-Frontend" },
      { name: "AI Backend", link: "https://github.com/Adam903PL/TaxMaster-Backend" }
    ],
    liveLink: "",
    type: "web",
    contributors: [
      { name: "Adam903PL", link: "https://github.com/Adam903PL" },
      { name: "Karman1818", link: "https://github.com/Karman1818" },
      { name:"Nejzk",link:"https://github.com/nejzk"}
    ],
    developmentTime: "24 h"
  },
  {
    id: 3,
    name: "FlashTalkAI",
    description: "AI-powered language learning platform",
    usedTechnology: [
      "React",
      "TailwindCSS",
      "Express.JS",
      "PostgreSQL",
      "ChatGPT API",
    ],
    pictures: [FlashTalkAi1, FlashTalkAi2, FlashTalkAI4],
    repositories: [
      { name: "Main Repo", link: "https://github.com/Adam903PL/FlashTalkAI" },
      { name: "Language Models", link: "https://github.com/Adam903PL/FlashTalkAI-Models" }
    ],
    liveLink: "",
    type: "web",
    contributors: [
      { name: "Adam903PL", link: "https://github.com/Adam903PL" },
      { name: "AIContributor", link: "https://github.com/AIContributor" }
    ],
    developmentTime: "1 months"
  },
  {
    id: 4,
    name: "TechniFees",
    description:
      "TechniFees is my first simple app for managing school fees, built with Python, Tkinter",
    usedTechnology: ["Python", "Tkinter", "smtplib", "PostgreSQL"],
    pictures: [TechniFees1, TechniFees2, TechniFees3],
    repositories: [
      { name: "Source Code", link: "https://github.com/Adam903PL/TechniFees" }
    ],
    liveLink: "",
    type: "web",
    contributors: [
      { name: "Adam903PL", link: "https://github.com/Adam903PL" }
    ]
  },
  {
    id: 5,
    name: "TechniCloud",
    description: "Basic Mobile APP in React Native",
    usedTechnology: ["React Native"],
    pictures: [TechniCloud1, TechniCloud2, TechniCloud3, TechniCloud4],
    repositories: [
      { name: "Main Repo", link: "https://github.com/Adam903PL/Native-Cloud" }
    ],
    liveLink: "",
    type: "mobile",
    contributors: [
      { name: "Adam903PL", link: "https://github.com/Adam903PL" }
    ],
    developmentTime: "2 days"
  },
  {
    id: 6,
    name: "TechniBank",
    description: "Banking system for personal finance management",
    usedTechnology: ["HTML5", "CSS", "JS"],
    pictures: [TechniBank1, TechniBank2, TechniBank3, TechniBank4],
    repositories: [
      { name: "Frontend", link: "https://github.com/Karman1818/TechniBank" },    ],
    liveLink: "",
    type: "web",
    contributors: [
      { name: "Adam903PL", link: "https://github.com/Adam903PL" },
      { name: "Karman1818", link: "https://github.com/Karman1818" }
    ],
    developmentTime: "1 month"
  },
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imageIndices, setImageIndices] = useState(projects.map(() => 0));
  const [isMobile, setIsMobile] = useState(false);
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(false);
  
  // Added state for showing expanded project info
  const [showDetails, setShowDetails] = useState(false);

  // Check if the screen is mobile or very small
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsVerySmallScreen(window.innerWidth <= 480);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Navigate between projects with infinite scrolling
  const navigate = (newDirection) => {
    setDirection(newDirection);
    setShowDetails(false); // Reset details view when navigating

    // Calculate new index with wrapping for infinite scrolling
    const newIndex =
      (activeIndex + newDirection + projects.length) % projects.length;
    setActiveIndex(newIndex);
  };

  // Cycle through images for each project
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndices((prevIndices) => {
        return prevIndices.map((currentIndex, projectIndex) => {
          const projectImages = projects[projectIndex].pictures;
          return (currentIndex + 1) % projectImages.length;
        });
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Helper function to get wrapped index for infinite carousel
  const getWrappedIndex = (index) => {
    // This ensures the index always stays within the valid range
    return ((index % projects.length) + projects.length) % projects.length;
  };

  // Get active project
  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#171c22] py-20 overflow-hidden"
    >
      {/* Section Header */}
      <div className="container mx-auto px-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Recent <span className="text-[#00BD95]">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            "Quality over quantity - each project represents countless hours of
            dedication and learning."
          </p>
        </motion.div>
      </div>

      {/* Projects Carousel */}
      <div className="relative w-full h-[600px] flex flex-col items-center justify-center">
        {/* Projects Container */}
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {projects.map((project, projectIndex) => {
              // Calculate visual position for infinite scrolling effect
              const position =
                (projectIndex - activeIndex + projects.length) %
                projects.length;
              const wrappedPosition =
                position > projects.length / 2
                  ? position - projects.length
                  : position;

              const isActive = position === 0;
              const currentImageIndex = imageIndices[projectIndex];
              const isMobileProject = project.type === "mobile";

              return (
                <motion.div
                  key={project.id}
                  custom={direction}
                  initial={(custom) => {
                    return {
                      scale: 0.8,
                      opacity: 0,
                      x: custom > 0 ? "100%" : "-100%",
                    };
                  }}
                  animate={{
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : isMobile ? 0 : 0.5, // Hide non-active projects on mobile
                    x: isActive
                      ? "0%"
                      : isMobile
                      ? `${wrappedPosition * 100}%`
                      : `${wrappedPosition * 60}%`,
                    zIndex: isActive ? 1 : 0,
                  }}
                  exit={(custom) => {
                    return {
                      scale: 0.8,
                      opacity: 0,
                      x: custom < 0 ? "100%" : "-100%",
                      zIndex: 0,
                    };
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className={`absolute ${
                    isVerySmallScreen ? "w-full px-4" : "w-full max-w-4xl"
                  } h-[500px] ${
                    isActive ? "cursor-default" : "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (!isActive) {
                      const newDirection =
                        position > projects.length / 2 ||
                        (position < projects.length / 2 && position > 0)
                          ? -1
                          : 1;
                      setDirection(newDirection);
                      setActiveIndex(projectIndex);
                      setShowDetails(false); // Reset details when switching projects
                    }
                  }}
                >
                  <div
                    className={`relative h-full bg-gray-800 rounded-2xl overflow-hidden shadow-2xl ${
                      isActive
                        ? "ring-4 ring-[#00BD95]"
                        : "ring-1 ring-gray-700"
                    } ${isVerySmallScreen ? "mx-2" : ""}`}
                  >
                    {/* Image Carousel */}
                    <div
                      className={`relative w-full h-full overflow-hidden ${
                        isMobileProject ? "max-w-[300px] mx-auto" : ""
                      }`}
                    >
                      <AnimatePresence initial={false}>
                        <motion.div
                          key={`${project.id}-${currentImageIndex}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 w-full h-full"
                        >
                          <Image
                            src={project.pictures[currentImageIndex]}
                            alt={`${project.name} - Image ${
                              currentImageIndex + 1
                            }`}
                            layout="fill"
                            objectFit={isMobileProject ? "contain" : "cover"}
                            priority={isActive}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Overlay with information */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-8 flex flex-col justify-end">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-white"
                        >
                          <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                            {project.name}
                          </h3>
                          <p className="text-gray-300 mb-4 text-sm sm:text-base">
                            {project.description}
                          </p>
                          
                          {/* Technology tags */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.usedTechnology.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-[#00BD95]/20 text-[#00BD95] rounded-full text-xs sm:text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          {/* Development time if available */}
                          {project.developmentTime && (
                            <div className="flex items-center gap-1 mb-3 text-gray-300 text-sm">
                              <FaClock className="text-[#00BD95]" />
                              <span>Development time: {project.developmentTime}</span>
                            </div>
                          )}

                          {/* Image indicators */}
                          {project.pictures.length > 1 && (
                            <div className="flex gap-2 mb-3">
                              {project.pictures.map((_, imgIndex) => (
                                <div
                                  key={imgIndex}
                                  className={`w-2 h-2 rounded-full transition-colors ${
                                    imgIndex === currentImageIndex
                                      ? "bg-[#00BD95]"
                                      : "bg-white/60"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                          
                          {/* Toggle show details button */}
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDetails(!showDetails);
                            }}
                            className="bg-[#00BD95]/30 hover:bg-[#00BD95]/50 text-[#00BD95] px-3 py-1 rounded-md text-sm font-medium mb-3 transition-colors"
                          >
                            {showDetails ? "Hide Details" : "Show Details"}
                          </motion.button>

                          {/* Expanded project details */}
                          <AnimatePresence>
                            {showDetails && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                {/* Repository links */}
                                <div className="mb-3">
                                  <h4 className="text-sm font-semibold text-[#00BD95] mb-1">Repositories:</h4>
                                  <div className="flex flex-wrap gap-3">
                                    {project.repositories.map((repo, idx) => (
                                      <motion.a
                                        key={idx}
                                        href={repo.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-1 text-white hover:text-[#00FFC9] transition-colors"
                                      >
                                        <FaGithub className="text-lg" />
                                        <span className="font-semibold text-xs sm:text-sm">
                                          {repo.name}
                                        </span>
                                      </motion.a>
                                    ))}
                                  </div>
                                </div>
                                
                                {/* Contributors */}
                                {project.contributors && project.contributors.length > 0 && (
                                  <div className="mb-3">
                                    <h4 className="text-sm font-semibold text-[#00BD95] mb-1">Contributors:</h4>
                                    <div className="flex flex-wrap gap-3">
                                      {project.contributors.map((contributor, idx) => (
                                        <motion.a
                                          key={idx}
                                          href={contributor.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          whileHover={{ scale: 1.05 }}
                                          className="flex items-center gap-1 text-white hover:text-[#00FFC9] transition-colors"
                                        >
                                          <IoPersonSharp className="text-lg" />
                                          <span className="font-semibold text-xs sm:text-sm">
                                            {contributor.name}
                                          </span>
                                        </motion.a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Live link */}
                          {project.liveLink && (
                            <motion.a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              className="inline-flex items-center gap-1 text-[#00BD95] hover:text-[#00FFC9] transition-colors"
                            >
                              <span className="font-semibold text-xs sm:text-sm">
                                Live Demo
                              </span>
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </motion.a>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Controls - Moved below for mobile */}
        <div className="flex justify-center items-center mt-4 gap-4 sm:gap-8">
          <button
            onClick={() => navigate(-1)}
            className="z-30 p-3 rounded-full bg-[#00BD95] hover:bg-[#00FFC9] transition-colors"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Project Pagination - Now placed between navigation buttons */}
          <div className="flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const newDirection = index > activeIndex ? 1 : -1;
                  setDirection(newDirection);
                  setActiveIndex(index);
                  setShowDetails(false); // Reset details when switching projects
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-[#00BD95]" : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => navigate(1)}
            className="z-30 p-3 rounded-full bg-[#00BD95] hover:bg-[#00FFC9] transition-colors"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;