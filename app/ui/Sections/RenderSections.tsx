"use client";
import React from "react";
import { useSection } from "@/app/lib/zustand/useSection";

const RenderSections = () => {
  const { sections } = useSection();
  return (
    <div>
      {sections.map((section) => (
        <div key={section.id}>
            <section.component></section.component>
        </div>
      ))}
    </div>
  );
};

export default RenderSections;
