import React from "react";
import Hero from "./ui/HeroSection";
import RenderSections from "./ui/Sections/RenderSections";
import { siteConfig as siteMetadata } from './metadata'

export const metadata = siteMetadata;

const Home: React.FC = () => {


  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white">

      <Hero />
      <RenderSections/>



    </div>
  );
};

export default Home;