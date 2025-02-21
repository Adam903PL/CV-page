// Skeleton.jsx
import React from "react";

const SkillsSkeleton = () => {
  return (
    <div className="w-full h-full bg-gray-300 animate-pulse flex flex-col items-center justify-center p-6">
      <div className="w-3/4 h-12 bg-gray-400 rounded-lg mb-6"></div>
      <div className="w-1/2 h-6 bg-gray-400 rounded-lg"></div>
    </div>
  );
};

export default SkillsSkeleton;