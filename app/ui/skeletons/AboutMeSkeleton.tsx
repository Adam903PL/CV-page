import React from "react";
import { motion } from "framer-motion";

const AboutMeSkeleton = () => {
  return (
    <section id="aboutme" className="relative overflow-hidden">
      {/* Tło z subtelną animacją fali */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00bd95]/10 to-[#00FFC9]/10 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="relative bg-[#171C22] py-12 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-row flex-wrap justify-center items-start gap-12">
          {/* Lewa część */}
          <div className="flex flex-col gap-8 max-w-md">
            {/* Nagłówek */}
            <div className="h-12 bg-[#20272F] rounded-full w-full mb-4 animate-pulse" />

            {/* Opis */}
            <div className="space-y-2">
              <div className="h-4 bg-[#20272F] rounded-full w-full animate-pulse" />
              <div className="h-4 bg-[#20272F] rounded-full w-3/4 animate-pulse" />
              <div className="h-4 bg-[#20272F] rounded-full w-5/6 animate-pulse" />
              <div className="h-4 bg-[#20272F] rounded-full w-2/3 animate-pulse" />
            </div>

            {/* Przyciski */}
            <div className="flex flex-row gap-4">
              <div className="h-12 bg-[#20272F] rounded-full w-32 animate-pulse" />
              <div className="h-12 bg-[#20272F] rounded-full w-32 animate-pulse" />
            </div>

            {/* JSON */}
            <div className="bg-[#161B22] p-4 rounded-lg border border-[#30363D] shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-5 bg-[#20272F] rounded-full animate-pulse" />
                <div className="h-4 bg-[#20272F] rounded-full w-24 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-[#20272F] rounded-full w-full animate-pulse" />
                <div className="h-4 bg-[#20272F] rounded-full w-3/4 animate-pulse" />
                <div className="h-4 bg-[#20272F] rounded-full w-5/6 animate-pulse" />
                <div className="h-4 bg-[#20272F] rounded-full w-2/3 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Prawa część */}
          <div className="flex flex-col gap-8 max-w-2xl">
            {/* JSON */}
            <div className="bg-[#161B22] p-4 rounded-lg border border-[#30363D] shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-5 bg-[#20272F] rounded-full animate-pulse" />
                <div className="h-4 bg-[#20272F] rounded-full w-24 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-[#20272F] rounded-full w-full animate-pulse" />
                <div className="h-4 bg-[#20272F] rounded-full w-3/4 animate-pulse" />
                <div className="h-4 bg-[#20272F] rounded-full w-5/6 animate-pulse" />
                <div className="h-4 bg-[#20272F] rounded-full w-2/3 animate-pulse" />
              </div>
            </div>

            {/* Doświadczenie */}
            <div className="bg-[#161B22] p-4 rounded-lg border border-[#30363D] shadow-lg text-center">
              <div className="h-6 bg-[#20272F] rounded-full w-24 mx-auto mb-2 animate-pulse" />
              <div className="h-8 bg-[#20272F] rounded-full w-16 mx-auto animate-pulse" />
              <div className="h-4 bg-[#20272F] rounded-full w-48 mx-auto mt-2 animate-pulse" />
            </div>

            {/* Szybkie statystyki */}
            <div className="bg-[#161B22] p-4 rounded-lg border border-[#30363D] shadow-lg text-center">
              <div className="h-6 bg-[#20272F] rounded-full w-32 mx-auto mb-4 animate-pulse" />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="h-8 bg-[#20272F] rounded-full w-16 mx-auto animate-pulse" />
                  <div className="h-4 bg-[#20272F] rounded-full w-24 mx-auto mt-2 animate-pulse" />
                </div>
                <div>
                  <div className="h-8 bg-[#20272F] rounded-full w-16 mx-auto animate-pulse" />
                  <div className="h-4 bg-[#20272F] rounded-full w-24 mx-auto mt-2 animate-pulse" />
                </div>
                <div>
                  <div className="h-8 bg-[#20272F] rounded-full w-16 mx-auto animate-pulse" />
                  <div className="h-4 bg-[#20272F] rounded-full w-24 mx-auto mt-2 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSkeleton;