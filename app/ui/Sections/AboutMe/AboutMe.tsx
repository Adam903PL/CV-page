"use client";

import React, { useState } from "react";
import { FaPhone, FaCode, FaGithub, FaMailBulk } from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Tooltip } from "react-tooltip";
import useSWR from "swr";
import Link from "next/link";

import { FaDownload,  FaServer, FaLaptopCode } from "react-icons/fa";
import { useEffect, useRef,  } from "react";
import Typed from "typed.js";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { RiTerminalBoxFill } from "react-icons/ri";
import { FaShieldAlt } from "react-icons/fa";

// Fetcher dla SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotate: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5, type: "spring", bounce: 0.4 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: {
    scale: 1.05,
    boxShadow: "0px 0px 12px rgba(0, 189, 149, 0.8)",
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95 },
};

const jsonVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  hover: {
    boxShadow: "0px 0px 15px rgba(0, 189, 149, 0.5)",
    transition: { duration: 0.3 },
  },
};

const counterVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, type: "spring", bounce: 0.3 },
  },
};

const statVariants = {
  hidden: { opacity: 0, rotateX: 90 },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const waveVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 0.15,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  hover: { scale: 1.1, transition: { duration: 0.2 } },
};

const githubCardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, type: "spring", bounce: 0.4 },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 0px 20px rgba(0, 189, 149, 0.7)",
    transition: { duration: 0.3 },
  },
};

const repoButtonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: {
    scale: 1.05,
    backgroundColor: "#00bd95",
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95 },
};

const AboutMe: React.FC = () => {
  const title = "Adam Pukaluk - FullStack Developer";
  const skills = [
    "React",
    "React Native",
    "Python",
    "Next.js",
    "Express.js",
    "JavaScript",
    "Node.js",
    "TypeScript",
    "Zustand",
    "Redux",
    "Tailwind",
    "NextAuth",
    "C++",
    "MS SQL",
    "PostgreSQL",
    "HTML/CSS",
    "PHP",
    "Git",
  ];

  // Fetch danych z GitHuba przy użyciu SWR dla wszystkich repozytoriów
  const { data: reposData, error: reposError } = useSWR(
    "https://api.github.com/users/Adam903PL/repos?per_page=100",
    fetcher
  );
  const [copyText, setCopyText] = useState("Copy E-Mail");
  const email = "pukaluk.adam505@gmail.com";

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  const handleCopyEmail = (e) => {
    e.preventDefault(); // Zapobiega otwieraniu klienta poczty
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopyText("Copied!");
        setTimeout(() => setCopyText("Copy E-Mail"), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <section
      id="aboutme"
      className="relative overflow-hidden bg-[#171c22] min-h-screen"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00bd95]/15 to-[#00FFC9]/15 rounded-full blur-3xl"
        variants={waveVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      />

      <motion.div
        className="relative py-16 px-6 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-center items-start gap-12">
          {/* Left section */}
          <motion.div
            className="flex flex-col gap-8 w-full lg:w-1/2"
            variants={itemVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
              variants={textVariants}
            >
              {title.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Hi! I'm Adam, a 15-year-old programmer with a passion for backend
              and frontend development. Over the past 2 years, I've been coding
              in JavaScript and Python, building applications with Express.js
              and Next.js. My dream? Landing an internship to soar higher in the
              IT world!
            </p>
            <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
              <motion.a
                href="tel:695031104"
                className="flex items-center justify-center gap-2 bg-[#20272F] text-white px-6 py-3 rounded-full shadow-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaPhone className="text-[#00bd95] w-5 h-5" />
                <span className="font-semibold text-lg">695-031-104</span>
              </motion.a>
              <motion.a
                href={`mailto:${email}`}
                className="flex items-center justify-center gap-2 bg-[#20272F] text-white px-6 py-3 rounded-full shadow-lg cursor-pointer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleCopyEmail}
                data-tooltip-id="skill-tooltip"
                data-tooltip-content={email}
              >
                <FaMailBulk className="text-[#00bd95] w-5 h-5" />
                <span className="font-semibold text-lg">{copyText}</span>
              </motion.a>

              <Link href={`https://bento.me/adam-pukaluk`}>
                <motion.button
                  className="bg-gradient-to-b from-[#00bd95] to-[#00FFC9] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  My Links
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              className="bg-[#161B22] p-5 rounded-xl border border-[#30363D] shadow-xl"
              variants={jsonVariants}
              whileHover="hover"
            >
              <div className="flex items-center gap-2 mb-3">
                <FaCode className="text-[#00bd95] w-6 h-6" />
                <span className="text-white font-semibold text-lg">
                  aboutMe.json
                </span>
              </div>
              <pre className="text-gray-300 text-sm font-mono">
                <span className="text-blue-400">"aboutMe"</span>: {"{"}
                {Object.entries({
                  name: "Adam Pukaluk",
                  role: "FullStack Developer",
                  age: 15,
                  experience: "2 years",
                  goal: "Internship & Growth",
                }).map(([key, value]) => (
                  <div key={key} className="ml-4">
                    <span className="text-purple-400">"{key}"</span>:{" "}
                    {typeof value === "number" ? (
                      <span className="text-green-400">{value}</span>
                    ) : (
                      <span className="text-yellow-300">"{value}"</span>
                    )}
                    ,
                  </div>
                ))}
                <span>{"}"}</span>
              </pre>
            </motion.div>

            {/* Experience - przeniesiony pod aboutMe.json */}
            <motion.div
              className="bg-[#161B22] p-5 rounded-xl border border-[#30363D] shadow-xl text-center"
              variants={counterVariants}
            >
              <h3 className="text-white font-semibold text-lg mb-3 flex items-center justify-center gap-2">
                <FaCode className="text-[#00bd95] w-6 h-6" />
                Experience
              </h3>
              <motion.div
                className="text-[#00bd95] text-4xl font-bold"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <CountUp end={2} duration={2.5} decimals={0} /> years
              </motion.div>
              <p className="text-gray-300 text-sm mt-2">
                Coding since 2023 and still leveling up!
              </p>
            </motion.div>
          </motion.div>

          {/* Right section */}
          <motion.div
            className="flex flex-col gap-8 w-full lg:w-1/2"
            variants={itemVariants}
          >
            {/* GitHub Stats - na górze prawej kolumny, z mniejszą wysokością */}
            <motion.div
              className="bg-[#161B22] p-4 rounded-xl border border-[#30363D] shadow-xl"
              variants={githubCardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-3 flex items-center justify-center gap-2">
                <FaGithub className="text-[#00bd95] w-6 h-6" />
                GitHub Stats
              </h3>
              {reposError && (
                <p className="text-red-400">Failed to load GitHub data</p>
              )}
              {!reposData && !reposError && (
                <p className="text-gray-300">Loading...</p>
              )}
              {reposData && (
                <div className="flex flex-col gap-3 max-h-48 overflow-y-auto">
                  <p className="text-gray-300 text-sm">
                    Total Public Repos:{" "}
                    <span className="text-[#00bd95] font-bold">
                      {reposData.length}
                    </span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {reposData && reposData.length > 0 ? (
                      reposData.map((repo) => (
                        <motion.div
                          key={repo.id}
                          className="flex items-center justify-between bg-[#20272F] p-2 rounded-lg"
                          variants={itemVariants}
                        >
                          <span className="text-white text-sm truncate">
                            {repo.name}
                          </span>
                          <motion.a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#00bd95] text-white px-3 py-1 rounded-full text-sm font-medium"
                            variants={repoButtonVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Visit
                          </motion.a>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-gray-300 text-center col-span-2">
                        
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              className="bg-[#161B22] p-5 rounded-xl border border-[#30363D] shadow-xl"
              variants={jsonVariants}
              whileHover="hover"
            >
              <div className="flex items-center gap-2 mb-3">
                <FaCode className="text-[#00bd95] w-6 h-6" />
                <span className="text-white font-semibold text-lg">
                  skills.json
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className="text-yellow-300 bg-[#20272F] px-3 py-1 rounded-full text-sm font-medium cursor-pointer"
                    variants={skillVariants}
                    whileHover="hover"
                    data-tooltip-id="skill-tooltip"
                    data-tooltip-content={`Proficient in ${skill}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
              <Tooltip
                id="skill-tooltip"
                place="top"
                className="bg-[#00bd95] text-white rounded-md"
              />
            </motion.div>

            {/* Quick Stats - pod GitHub Stats */}
            <motion.div
              className="bg-[#161B22] p-5 rounded-xl border border-[#30363D] shadow-xl text-center"
              variants={itemVariants}
            >
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center justify-center gap-2">
                <FaCode className="text-[#00bd95] w-6 h-6" />
                Quick Stats
              </h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: 10, label: "Projects", suffix: "+" },
                  { value: 18, label: "Technologies" },
                  { value: 700, label: "Coding Hours", suffix: "+" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={statVariants}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
                  >
                    <div className="text-[#00bd95] text-2xl font-bold">
                      <CountUp end={stat.value} duration={2.5} />
                      {stat.suffix}
                    </div>
                    <p className="text-gray-300 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>  
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
