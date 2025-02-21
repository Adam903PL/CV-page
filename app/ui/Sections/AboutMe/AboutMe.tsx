import React from "react";
import { FaPhone, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";

// Animation variants
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
    boxShadow: "0px 0px 8px rgba(0, 189, 149, 0.8)",
    transition: { yoyo: Infinity, duration: 0.8 },
  },
  tap: { scale: 0.95 },
};

const jsonVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  hover: {
    boxShadow: "0px 0px 12px rgba(0, 189, 149, 0.5)",
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
    opacity: 0.1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};
const carouselVariants = {
  animate: {
    x: ["0%", "-100%"], // Starts from full visibility
    transition: {
      x: {
        repeat: Infinity,
        duration: 20, // Shortened animation time
        ease: "linear",
      },
    },
  },
};
const carouselVariantsRight = {
  animate: {
    x: ["0%", "100%"], // Moving to the right
    transition: {
      x: {
        repeat: Infinity,
        duration: 20, // Adjust the time
        ease: "linear",
      },
    },
  },
};

const AboutMe = () => {
  const title = "Adam Pukaluk - Backend Developer";
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
  return (
    <section id="aboutme" className="relative overflow-hidden">
      {/* Background with subtle wave animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00bd95]/10 to-[#00FFC9]/10 rounded-full blur-3xl"
        variants={waveVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      />

      <motion.div
        className="relative bg-[#171C22] py-12 px-6 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-6xl mx-auto flex flex-row flex-wrap justify-center items-start gap-12">
          {/* Left section */}
          <motion.div
            className="flex flex-col gap-8 max-w-md"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {title.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              className="text-gray-300 text-base md:text-lg leading-relaxed"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              Hi! I’m Adam, a 15-year-old programmer passionate about backend development. 
              For 2 years, I’ve been coding in JavaScript and Python, creating applications 
              using Express.js and Next.js. My goal is to land an internship that will help 
              me spread my wings in the IT world.
            </motion.p>
            <motion.div
              className="flex flex-row gap-4"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.a
                href="tel:695031104"
                className="flex items-center justify-center gap-2 bg-[#20272F] text-white px-6 py-3 rounded-full shadow-md"
                variants={buttonVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover="hover"
                whileTap="tap"
              >
                <FaPhone className="text-[#00bd95] w-5 h-5" />
                <span className="font-semibold text-lg">695-031-104</span>
              </motion.a>
              <motion.button
                className="bg-gradient-to-b from-[#00bd95] to-[#00FFC9] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:opacity-90 transition-opacity"
                variants={buttonVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover="hover"
                whileTap="tap"
              >
                My Links
              </motion.button>
            </motion.div>
            <motion.div
              className="bg-[#161B22] p-4 rounded-lg border border-[#30363D] shadow-lg"
              variants={jsonVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover="hover"
            >
              <div className="flex items-center gap-2 mb-2">
                <FaCode className="text-[#00bd95] w-5 h-5" />
                <span className="text-white font-semibold">aboutMe.json</span>
              </div>
              <pre className="text-gray-300 text-sm overflow-x-auto font-mono">
                <span className="text-blue-400">"aboutMe"</span>: {"{"}
                {Object.entries({
                  name: "Adam Pukaluk",
                  role: "Backend Developer",
                  age: 15,
                  experience: "2 years",
                  goal: "Internship & Growth",
                }).map(([key, value]) => (
                  <div key={key} className="ml-4">
                    <span className="text-purple-400">"{key}"</span>
                    <span className="text-white">: </span>
                    {typeof value === "number" ? (
                      <span className="text-green-400">{value}</span>
                    ) : (
                      <span className="text-yellow-300">"{value}"</span>
                    )}
                    <span className="text-white">,</span>
                  </div>
                ))}
                <span>{"}"}</span>
              </pre>
            </motion.div>
          </motion.div>

          {/* Right section */}
          <motion.div
            className="flex flex-col gap-8 max-w-2xl"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="bg-[#161B22] p-4 rounded-lg border border-[#30363D] shadow-lg"
              variants={jsonVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover="hover"
            >
              <div className="flex items-center gap-2 mb-2">
                <FaCode className="text-[#00bd95] w-5 h-5" />
                <span className="text-white font-semibold">skills.json</span>
              </div>
              <pre className="text-gray-300 text-sm overflow-x-auto font-mono">
                <span className="text-blue-400">"skills"</span>: [
                <div className="ml-4 grid grid-cols-2 gap-x-4">
                  {skills.map((skill, index) => (
                    <span key={index} className="text-yellow-300">
                      "{skill}"{index < skills.length - 1 && ","}
                    </span>
                  ))}
                </div>
                ]
              </pre>
            </motion.div>

            <motion.div
              className="bg-[#161B22] p-4 rounded-lg border border-[#30363D] shadow-lg text-center"
              variants={counterVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-white font-semibold mb-2 flex items-center justify-center gap-2">
                <FaCode className="text-[#00bd95] w-5 h-5" />
                Experience
              </h3>
              <motion.div
                className="text-[#00bd95] text-3xl font-bold"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <CountUp end={2} duration={2.5} decimals={0} /> years
              </motion.div>
              <p className="text-gray-300 text-sm mt-2">
                I’ve been coding since 2023 and I’m still learning!
              </p>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              className="bg-[#161B22] p-4 rounded-lg border border-[#30363D] shadow-lg text-center"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-white font-semibold mb-4 flex items-center justify-center gap-2">
                <FaCode className="text-[#00bd95] w-5 h-5" />
                Quick Stats
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-[#00bd95] text-2xl font-bold">
                    <CountUp end={10} duration={2.5} />+
                  </div>
                  <p className="text-gray-300 text-sm">Projects</p>
                </motion.div>
                <motion.div
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-[#00bd95] text-2xl font-bold">
                    <CountUp end={18} duration={2.5} />
                  </div>
                  <p className="text-gray-300 text-sm">Technologies</p>
                </motion.div>
                <motion.div
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-[#00bd95] text-2xl font-bold">
                    <CountUp end={700} duration={2.5} />+
                  </div>
                  <p className="text-gray-300 text-sm">Coding Hours</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="bg-[#171C22] w-full flex-col overflow-hidden py-3">
          <div className="flex flex-row">
            <motion.div
              className="flex flex-row whitespace-nowrap min-w-full" // Ensures elements stay in one line
              variants={carouselVariants}
              initial={{ x: "0%" }}
              animate="animate"
            >
              {skills.map((skill, index) => (
                <div key={index} className="flex flex-row items-center">
                  <h1 className="text-white text-5xl font-bold ">{skill}</h1>
                  <div className="w-20 h-[2px] bg-white mx-4"></div>
                </div>
              ))}
              {/* Duplication of the list to create a continuity effect */}
              {skills.map((skill, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex flex-row items-center"
                >
                  <h1 className="text-white text-5xl font-bold">{skill}</h1>
                  <div className="w-20 h-[2px] bg-white"></div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      
        <div className="bg-[#171C22] w-full flex-col overflow-hidden py-3">
          <div className="flex flex-row">
            <motion.div
              className="flex flex-row-reverse whitespace-nowrap min-w-full" // Ensures elements stay in one line
              variants={carouselVariantsRight}
              initial={{ x: "0%" }}
              animate="animate"
            >
              {skillsReverse.map((skill, index) => (
                <div key={index} className="flex flex-row items-center">
                  <h1 className="text-white text-5xl font-bold ">{skill}</h1>
                  <div className="w-20 h-[2px] bg-white mx-4"></div>
                </div>
              ))}
              {/* Duplication of the list to create a continuity effect */}
              {skillsReverse.map((skill, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex flex-row items-center"
                >
                  <h1 className="text-white text-5xl font-bold">{skill}</h1>
                  <div className="w-20 h-[2px] bg-white"></div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

    </section>
  );
};

export default AboutMe;