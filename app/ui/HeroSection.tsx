"use client";

import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import Link from "next/link";
import { useLinks } from "../lib/zustand/useLinks";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

const buttonVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } },
};

export default function Hero() {
  const typedElement = useRef<HTMLSpanElement | null>(null);
  const { activeSection, setActiveSection } = useLinks();

  useEffect(() => {
    const options = {
      strings: ["Backend Developer", "Frontend Developer"],
      typeSpeed: 40,
      backSpeed: 40,
      backDelay: 1000,
      startDelay: 0,
      loop: true,
    };

    const typed = typedElement.current
      ? new Typed(typedElement.current, options)
      : null;

    return () => {
      if (typed) {
        typed.destroy();
      }
    };
  }, []);

  return (
    <section
      className="min-h-[80vh] lg:min-h-[80vh] relative pt-10 flex justify-center"
      id="home"
    >
      <motion.div
        className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Lewa kolumna */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          variants={imageVariants}
        >
          <div className="r-hex">
            <div className="r-hex-inner relative w-full h-full">
              <Image
                src="/img/nigger.png"
                alt="Adam Pukaluk"
                width={500}
                height={500}
                objectFit="cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Prawa kolumna */}
        <motion.div className="md:w-1/2 mt-8 md:mt-0" variants={textVariants}>
          <div>
            <span className="text-xl mb-2 flex font-bold">
              <p>Hello,</p>
              <p className="text-primary"> I'm</p>
            </span>
            <h1 className="text-5xl font-bold mt-6 text-primary">
              ADAM PUKALUK
            </h1>
            <h2 className="text-3xl mb-6">
              <span ref={typedElement}></span>
            </h2>
          </div>

          <p className="text-gray-300 mb-8 max-w-md">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem ipsum has been the industry's
          </p>

          <div className="flex space-x-4">
            <motion.button
              variants={buttonVariants}
              className="bg-gradient-to-r from-[#00FFC9] to-[#00BD95] px-6 py-3 rounded-full font-bold flex items-center"
            >
              <Link
                onClick={() =>
                  setActiveSection(
                    `#${"contact".replace(/\s+/g, "").toLowerCase()}`
                  )
                }
                href="https://bento.me/adam-pukaluk"
                className=""
              >
                Contact With Me
              </Link>
            </motion.button>
            <motion.button
              variants={buttonVariants}
              className="bg-gradient-to-r from-[#00FFC9] to-[#00BD95] px-6 py-2 rounded-full font-bold flex items-center"
            >
              <a
                href="/img/adam-pukaluk-cv.png"
                download="adam-pukaluk-cv.png"
                className="flex items-center"
              >
                <FaDownload className="mr-2" />
                CV
              </a>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
