"use client";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import Link from "next/link";
import { useLinks } from "../lib/zustand/useLinks";

export default function Hero() {
  const typedElement = useRef(null);
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

    const typed = new Typed(typedElement.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    // Na dużych ekranach minimalna wysokość zmniejszona do 60vh
    <section className="min-h-[80vh] lg:min-h-[60vh] relative pt-10" id="home">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center">
        {/* Lewa kolumna */}
        <div className="md:w-1/2 flex justify-center">
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
        </div>

        {/* Prawa kolumna */}
        <div className="md:w-1/2 mt-8 md:mt-0">
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
            <Link
              onClick={() =>
                setActiveSection(
                  `#${"contact".replace(/\s+/g, "").toLowerCase()}`
                )
              }
              href="#contact"
              className="bg-gradient-to-r from-[#00FFC9] to-[#00BD95] px-6 py-3 rounded-full font-bold"
            >
              Contact With Me
            </Link>
            <button className="bg-gradient-to-r from-[#00FFC9] to-[#00BD95] px-6 py-3 rounded-full font-bold flex items-center">
              <FaDownload />
              CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}