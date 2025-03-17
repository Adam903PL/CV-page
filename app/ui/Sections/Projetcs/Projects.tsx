"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

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

const projects = [
  { 
    id: 1, 
    name: "FlashTalkAI",
    description: "AI-powered language learning platform",
    usedTechnology: ["TypeScript", "Tailwind", "Express.JS", "zustand"], 
    pictures: [FlashTalkAi1, FlashTalkAi2, FlashTalkAI4],
    repoLink: "https://github.com/Adam903PL/FlashTalkAI",
    liveLink: "https://flashtalkai.com",
    type: "web"
  },
  {
    id: 2,
    name: "TechniFees",
    description: "TechniFees is my first simple app for managing school fees, built with Python, Tkinter",
    usedTechnology: ["Python", "Tkinter", "smtplib"], 
    pictures: [TechniFees1, TechniFees2, TechniFees3],
    repoLink: "https://github.com/Adam903PL/TechniFees",
    liveLink: "",
    type: "web"
  },
  {
    id: 3,
    name: "TechniCloud",
    description: "Basic Mobile APP in React Native",
    usedTechnology: ["React Native"], 
    pictures: [TechniCloud1, TechniCloud2, TechniCloud3, TechniCloud4],
    repoLink: "https://github.com/Adam903PL/Native-Cloud",
    liveLink: "",
    type: "mobile"
  },
];

const Projects = () => {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
  const [imageIndices, setImageIndices] = useState(projects.map(() => 0));
  
  // Navigate between projects
  const navigate = (newDirection) => {
    setActiveIndex([(activeIndex + newDirection + projects.length) % projects.length, newDirection]);
  };

  // Cycle through images for each project
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndices(prevIndices => {
        return prevIndices.map((currentIndex, projectIndex) => {
          const projectImages = projects[projectIndex].pictures;
          return (currentIndex + 1) % projectImages.length;
        });
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="projects" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#171c22] py-20 overflow-hidden">
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
            "Quality over quantity - each project represents countless hours of dedication and learning."
          </p>
        </motion.div>
      </div>

      {/* Projects Carousel */}
      <div className="relative w-full h-[600px] flex items-center justify-center">
        {/* Navigation Buttons */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 lg:left-8 z-30 p-3 rounded-full bg-[#00BD95] hover:bg-[#00FFC9] transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => navigate(1)}
          className="absolute right-4 lg:right-8 z-30 p-3 rounded-full bg-[#00BD95] hover:bg-[#00FFC9] transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Projects Container */}
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
          <AnimatePresence initial={false} custom={direction}>
            {projects.map((project, projectIndex) => {
              const position = projectIndex - activeIndex;
              const isActive = position === 0;
              const currentImageIndex = imageIndices[projectIndex];
              const isMobileProject = project.type === "mobile";

              return (
                <motion.div
                  key={project.id}
                  custom={position}
                  initial={{ scale: 0.8, opacity: 0, x: position * 100 + "%" }}
                  animate={{
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0.5,
                    x: isActive ? "0%" : `${position * 60}%`,
                    zIndex: isActive ? 1 : 0
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className={`absolute w-full max-w-4xl h-[500px] ${
                    isActive ? "cursor-default shadow-[0_10px_20px_rgba(0,_189,_149,_0.9)]" : "cursor-pointer"
                  }`}
                  onClick={() => !isActive && setActiveIndex([projectIndex, projectIndex > activeIndex ? 1 : -1])}
                >
                  <div className={`relative h-full bg-gray-800 rounded-2xl overflow-hidden shadow-2xl ${
                    isActive ? "ring-4 ring-[#00BD95]" : "ring-1 ring-gray-700"
                  }`}>
                    {/* Image Carousel */}
                    <div className={`relative w-full h-full overflow-hidden ${
                      isMobileProject ? "max-w-[300px] mx-auto" : ""
                    }`}>
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
                            alt={`${project.name} - Image ${currentImageIndex + 1}`}
                            layout="fill"
                            objectFit={isMobileProject ? "contain" : "cover"}
                            priority={isActive}
                          />
                        </motion.div>
                      </AnimatePresence>
                      
                      {/* Image Indicators */}
                      {isActive && project.pictures.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                          {project.pictures.map((_, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                imgIndex === currentImageIndex ? "bg-[#00BD95]" : "bg-white/60"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Overlay with information */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-8 flex flex-col justify-end">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                        className="text-white"
                      >
                        <h3 className="text-3xl font-bold mb-2">{project.name}</h3>
                        <p className="text-gray-300 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.usedTechnology.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-[#00BD95]/20 text-[#00BD95] rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links to repo and demo */}
                        <div className="flex gap-4 mt-6">
                          <motion.a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="flex items-center gap-2 text-[#00BD95] hover:text-[#00FFC9] transition-colors"
                          >
                            <FaGithub className="text-xl" />
                            <span className="font-semibold">Code</span>
                          </motion.a>
                          
                          {project.liveLink && (
                            <motion.a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              className="flex items-center gap-2 text-[#00BD95] hover:text-[#00FFC9] transition-colors"
                            >
                              <span className="font-semibold">Live Demo</span>
                              <svg 
                                className="w-4 h-4" 
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
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Pagination */}
      <div className="flex gap-2 mt-8">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex([index, index > activeIndex ? 1 : -1])}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeIndex ? "bg-[#00BD95]" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;