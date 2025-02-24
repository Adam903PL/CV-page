import React, { useState, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TailwindIcon from "@/public/img/icons/tailwind-css-icon.svg";
import ReduxIcon from "@/public/img/icons/redux.svg";
import ZustandIcon from "@/public/img/icons/zustand.svg";
import NextIcon from "@/public/img/icons/nextjs-icon.svg";
import ReactNativeIcon from "@/public/img/icons/react-native-app-icon.svg";
import ReactIcon from "@/public/img/icons/react-js-icon.svg";
import NextJsIcon from "@/public/img/icons/nextjs-icon.svg";

const skillsArr = [
  {
    name: "NextJs",
    icon: NextJsIcon,
    percentage: 90,
    details: "Tworzenie serwerów, REST API, WebSockets.",
  },
  {
    name: "Tailwind",
    icon: TailwindIcon,
    percentage: 95,
    details: "Zaawansowane style, utility-first approach, animacje.",
  },
  {
    name: "Redux",
    icon: ReduxIcon,
    percentage: 85,
    details: "Stan aplikacji, Redux Toolkit, middleware.",
  },
  {
    name: "Zustand",
    icon: ZustandIcon,
    percentage: 90,
    details: "Prosty i wydajny state management, reactivity.",
  },
  {
    name: "Next.Js",
    icon: NextIcon,
    percentage: 88,
    details: "Routing, Server Components, SSR, ISR, API Routes.",
  },
  {
    name: "React Native",
    icon: ReactNativeIcon,
    percentage: 80,
    details: "Komponenty natywne, stylowanie, animacje.",
  },
  {
    name: "React",
    icon: ReactIcon,
    percentage: 92,
    details: "Hooks, Context API, efektywność renderowania.",
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

const Frontend = forwardRef((props, ref) => {
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
      className="w-full h-full flex flex-col relative overflow-y-auto p-4" // Dodano padding
    >
      {!selectedSkill ? (
        <>
          <h2 className="text-2xl text-gray-400 mb-4 text-center">
            Frontend Skills
          </h2>
          <div className="flex-1 overflow-y-auto">
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
                  <div className="w-10 h-10 rounded-full bg-[#00BD95]/20 flex items-center justify-center">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      className="w-5 h-5"
                      width={20}
                      height={20}
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-600 text-center">
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

Frontend.displayName = "Frontend";
export default Frontend;