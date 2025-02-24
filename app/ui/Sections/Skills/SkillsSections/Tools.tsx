import React, { useState, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import GitIcon from "@/public/img/icons/git-icon.svg";
import DockerIcon from "@/public/img/icons/icons8-docker.svg";
import VSCodeIcon from "@/public/img/icons/icons8-visual-studio-code-2019.svg";
import PostmanIcon from "@/public/img/icons/postman-icon.svg";
import JetBrains from "@/public/img/icons/icons8-jetbrains.svg"

const skillsArr = [
  {
    name: "Git",
    icon: GitIcon,
    percentage: 90,
    details: "Branching, merging, rebasing, workflows.",
  },
  {
    name: "Docker",
    icon: DockerIcon,
    percentage: 80,
    details: "Konteneryzacja, Docker Compose, orchestracja.",
  },
  {
    name: "VS Code",
    icon: VSCodeIcon,
    percentage: 95,
    details: "Debugowanie, integracja z Git, rozszerzenia.",
  },
  {
    name: "Postman",
    icon: PostmanIcon,
    percentage: 85,
    details: "Testowanie API, automatyzacja, kolekcje.",
  },
  {
    name: "JetBrains",
    icon: JetBrains,
    percentage: 85,
    details: "cosssssss",
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

const Tools = forwardRef((props, ref) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const skill = skillsArr.find((s) => s.name === selectedSkill);

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
            Tools
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

Tools.displayName = "Tools";
export default Tools;