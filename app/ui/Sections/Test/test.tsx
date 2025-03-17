"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import  Parallax  from "react-parallax-tilt";
import Image from "next/image";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transformacje dla różnych efektów scrolla
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -100, -200]);

  const timelineEvents = [
    {
      year: "2020",
      title: "First Code Line",
      description: "Wrote my first line of JavaScript at age 10, sparking my coding passion.",
      image: "/img/coding-start.jpg", // Zastąp ścieżką do obrazu
    },
    {
      year: "2021",
      title: "Python Discovery",
      description: "Learned Python and built my first simple game project.",
      image: "/img/python-project.jpg",
    },
    {
      year: "2022",
      title: "Web Development",
      description: "Started exploring React and Next.js, creating personal websites.",
      image: "/img/web-dev.jpg",
    },
    {
      year: "2023",
      title: "Backend Journey",
      description: "Dived into Express.js and Node.js, mastering backend APIs.",
      image: "/img/backend-api.jpg",
    },
    {
      year: "2024",
      title: "Portfolio Launch",
      description: "Launched this portfolio to showcase my skills and projects.",
      image: "/img/portfolio.jpg",
    },
    {
      year: "2025",
      title: "Future Goals",
      description: "Aiming for an internship and continuous growth in IT.",
      image: "/img/future-goals.jpg",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen py-20 bg-[#171c22] relative overflow-hidden"
      id="journey"
    >
      {/* Tło z subtelnym efektem gradientu */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00bd95]/10 to-[#00FFC9]/10 rounded-full blur-3xl" />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16 tracking-tight">
          My Coding Journey
        </h1>

        <div className="flex flex-col gap-24">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className="relative flex items-center gap-12"
              variants={itemVariants}
              style={{
                scale: index % 2 === 0 ? scale : 1, // Alternujący efekt skalowania
                opacity,
                y,
              }}
            >
              {/* Linia czasu */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#00bd95]/50" />

              {/* Karta z lewej lub prawej strony (alternacja) */}
              <Parallax
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                className={`w-full max-w-md p-6 bg-[#161B22] rounded-xl border border-[#30363D] shadow-xl ${
                  index % 2 === 0 ? "ml-auto" : "mr-auto"
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-2xl font-bold text-white">{event.year}</h2>
                  <h3 className="text-xl font-semibold text-[#00bd95]">
                    {event.title}
                  </h3>
                  <p className="text-gray-300 text-center">{event.description}</p>
                  <div className="relative w-32 h-32">
                    <Image
                      src={event.image}
                      alt={`${event.title} image`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </Parallax>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}