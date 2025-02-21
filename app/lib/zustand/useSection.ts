import { create } from "zustand";
import React,{ComponentType} from "react";
import AboutMe from "@/app/ui/Sections/AboutMe/AboutMe";
import Contact from "@/app/ui/Sections/Contact/Contact";
import Projects from "@/app/ui/Sections/Projetcs/Projects";
import Skills from "@/app/ui/Sections/Skills/Skills";

import {
    FaProjectDiagram,
    FaCode,
    FaEnvelope,
  } from "react-icons/fa";
  import { BsFillPersonFill } from "react-icons/bs";

export type SectionType = {
    id: number;
    name: string;
    component: React.FC; 
    icon:ComponentType;
    clicked:boolean
  };
  

 const defaultSections: SectionType[] = [
    { id: 1, name: 'About Me', component: AboutMe,icon:BsFillPersonFill,clicked:false }, 
    { id: 2, name: 'Skills',component:Skills ,icon:FaCode,clicked:false},
    { id: 3, name: 'Projects',component:Projects,icon:FaProjectDiagram ,clicked:false},
    { id: 4, name: 'Contact',component:Contact ,icon:FaEnvelope,clicked:false}
  ];
  

type UseSectionState = {
	sections: SectionType[];
  changeClicked: (id:SectionType["id"])=>void
};



export const useSection = create<UseSectionState>((set) => ({
  sections: defaultSections,
  changeClicked: (id) => {
    set((prevState) => ({
      sections: prevState.sections.map((section) =>
        section.id === id ? { ...section, clicked: true } : { ...section, clicked: false }
      ),
    }));
  },
}));