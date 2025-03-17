"use client";

import React, { useRef } from "react";
import { FaSchool, FaGraduationCap, FaBook, FaRobot, FaLaptopCode, FaPython } from "react-icons/fa";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import CountUp from "react-countup";
import { BackgroundCircles } from "../../BgCircles";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Education = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const lineWidth = useTransform(scrollYProgress, [0, 1], [2, 8]);
  const lineColorOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.5]);
  
  const educationData = [
    {
      school: "Started Programming at 9",
      years: "2015-2018",
      description: "Began coding with LEGO Mindstorms EVO, learning basic robotics and logic for 3 years.",
      icon: <FaRobot />, 
      color: "#00bd95",
    },
    {
      school: "Transition to Scratch",
      years: "2021",
      description: "Moved to Scratch, improving logical thinking and game design skills for 1 year.",
      icon: <FaBook />,
      color: "#00FFC9",
    },
    {
      school: "Python & Unreal Engine",
      years: "2022",
      description: "Started coding in Python and experimenting with Unreal Engine for game development.",
      icon: <FaPython />,
      color: "#00bd95",
    },
    {
      school: "Primary School No. 32",
      years: "2015 - 2018",
      description: "Attended Primary School No. 32 in Lublin for 3 years.",
      icon: <FaSchool />,
      color: "#00FFC9",
    },
    {
      school: "Primary School No. 15",
      years: "2018 - 2023",
      description: "Continued education at Primary School No. 15 in Lublin for 5 years.",
      icon: <FaSchool />,
      color: "#00bd95",
    },
    {
      school: "Technischools",
      years: "2023 - Present",
      description: "Currently studying at Technischools, advancing in programming and technology.",
      icon: <FaGraduationCap />,
      color: "#00FFC9",
    },
  ];

  return (
    <section ref={containerRef} id="education" className="relative overflow-hidden bg-[#171c22] min-h-screen py-12 px-6 lg:px-12">
      <BackgroundCircles />
      <motion.div className="relative max-w-6xl mx-auto" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <motion.h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">My Education Journey</motion.h1>
        <div className="relative">
          <motion.div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#00bd95]" style={{ width: lineWidth, opacity: lineColorOpacity }} />
          <VerticalTimeline>
            {educationData.map((edu, index) => (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--education"
                contentStyle={{ background: "#161B22", color: "#fff", border: "1px solid #30363D", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
                contentArrowStyle={{ borderRight: `7px solid #161B22` }}
                date={edu.years}
                iconStyle={{ background: edu.color, color: "#fff" }}
                icon={edu.icon}
              >
                <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                  <h3 className="text-xl font-semibold text-white">{edu.school}</h3>
                  <p className="text-gray-300 mt-2">{edu.description}</p>
                </motion.div>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
