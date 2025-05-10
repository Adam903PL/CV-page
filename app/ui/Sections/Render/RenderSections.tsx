"use client";
import React, { useEffect, useState } from "react";
import { useSection } from "@/app/lib/hooks/useSection";
import { useAnimation } from "framer-motion";
import { motion } from "framer-motion";

const RenderSections = () => {
  const { sections } = useSection();


  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Sections container with relative positioning and z-index */}
      <div className="relative z-10 w-full">

        {sections.map((section) => (
          <div key={section.id} className="w-full">
            <section.component />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderSections;
