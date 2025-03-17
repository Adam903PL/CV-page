import React, { useState, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import JavaScriptIcon from "@/public/img/icons/javascript-programming-language-icon.svg";
import TypeScriptIcon from "@/public/img/icons/typescript-programming-language-icon.svg";
import PythonIcon from "@/public/img/icons/python-programming-language-icon.svg";
import CppIcon from "@/public/img/icons/c-plus-plus-programming-language-icon.svg";
import PhpIcon from "@/public/img/icons/php.svg";
import { FaInfoCircle } from "react-icons/fa";

const skillsArr = [
  {
    name: "JavaScript",
    icon: JavaScriptIcon,
    percentage: 95,
    details:
      "Core language mastery (2+ years). Expert in ES6+ features, async/await patterns, closure utilization, and Promise chaining. Daily driver for production projects.",
  },
  {
    name: "TypeScript",
    icon: TypeScriptIcon,
    percentage: 90,
    details:
      "Primary language for 1+ year. Advanced type system implementations, interface design, and generic programming. Full-stack integration with modern frameworks.",
  },
  {
    name: "Python",
    icon: PythonIcon,
    percentage: 85,
    details:
      "2022-2023 main focus. Currently maintaining legacy projects while transitioning to JS/TS stack.",
  },
  {
    name: "C++",
    icon: CppIcon,
    percentage: 75,
    details:
      "Hobbyist-level exploration of memory management, STL containers, and pointer arithmetic. Experimenting with low-level system concepts.",
  },
  {
    name: "PHP",
    icon: PhpIcon,
    percentage: 65,
    details:
      "Vocational exam preparation (2024). Building basic CMS systems and REST APIs with Laravel. Learning modern practices and OOP patterns.",
  },
];
const ProgressBar = ({ percentage }: { percentage: number }) => (
  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${percentage}%` }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="h-full bg-[#00BD95] rounded-full"
    />
  </div>
);

const ProgrammingLanguages = forwardRef((props, ref) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const skill = skillsArr.find((s) => s.name === selectedSkill);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  useImperativeHandle(ref, () => ({
    handleBack: () => {
      if (selectedSkill) {
        setSelectedSkill(null);
        return true;
      }
      return false;
    },
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col relative overflow-y-auto"
    >
      {!selectedSkill ? (
        <>
          <h2 className="text-2xl text-gray-400 mb-4 text-center">
            Programming Languages
          </h2>
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {skillsArr.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center space-y-2 p-3 bg-white rounded-lg shadow-sm cursor-pointer"
                  onClick={() => setSelectedSkill(skill.name)}
                >
                  {/* Kontener dla ikony info */}
                  <div className="w-full flex justify-end pr-1">
                    <div
                      className="cursor-help relative"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaInfoCircle className="w-3 h-3 text-gray-400 hover:text-gray-500" />

                      {hoveredSkill === skill.name && (
                        <div className="absolute top-full right-0 mt-1 overflow-hidden">
                          <motion.div
                            initial={{
                              opacity: 0,
                              scaleX: 0,
                              transformOrigin: "right center",
                            }}
                            animate={{
                              opacity: 1,
                              scaleX: 1,
                            }}
                            exit={{
                              opacity: 0,
                              scaleX: 0,
                            }}
                            transition={{
                              type: "tween",
                              duration: 0.3,
                            }}
                            className="bg-gray-800 text-white text-xs px-3 py-[3px] rounded-full shadow-lg z-10 whitespace-nowrap"
                          >
                            Data can be redrawn: AI generated
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#00BD95]/20 flex items-center justify-center">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      className="w-6 h-6"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="text-base font-semibold text-gray-600 text-center">
                    {skill.name}
                  </h3>
                  <div className="w-full space-y-1">
                    <ProgressBar percentage={skill.percentage} />
                    <span className="text-xs text-gray-500 block text-center">
                      {skill.percentage}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full h-full p-4 flex flex-col items-center justify-center"
        >
          <Image
            src={skill?.icon || ""}
            alt={skill?.name || ""}
            width={48}
            height={48}
          />
          <h2 className="text-2xl font-semibold mt-3 text-gray-700">
            {skill?.name}
          </h2>
          <p className="mt-3 text-base text-gray-500 text-center max-w-[300px]">
            {skill?.details}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
});

ProgrammingLanguages.displayName = "ProgrammingLanguages";
export default ProgrammingLanguages;
