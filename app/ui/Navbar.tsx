"use client";

import { useEffect, useState } from "react";
import { useSection } from "../lib/hooks/useSection";
import Link from "next/link";
import { useLinks } from "../lib/hooks/useLinks";
import { FaBars, FaTimes, FaHome } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useMeasure from "react-use-measure";

const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeInOut" } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

const floatButtonVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const linkVariants = {
  hover: { scale: 1.05, color: "#00bd95", transition: { duration: 0.2 } },
};

export default function NavBar() {
  const { sections } = useSection();
  const { activeSection, setActiveSection } = useLinks();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [ref, { height }] = useMeasure();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 50); // Debounce 50ms
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveSection(window.location.hash);

      const handleHashChange = () => {
        setActiveSection(window.location.hash);
      };

      window.addEventListener("hashchange", handleHashChange);
      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }
  }, [setActiveSection]);

  const generateLinkHash = (name: string) =>
    `#${name.replace(/\s+/g, "").toLowerCase()}`;

  // Special case for Games section
  const getHref = (name: string) => {
    if (name === "Games") {
      return "/games";
    } else {
      return `/${generateLinkHash(name)}`;
    }
  };

  return (
    <>
      {/* Desktop Floating Button & Expanded Menu */}
      <AnimatePresence>
        {isScrolled ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ translateZ: 0.01 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-4 z-50 hidden lg:flex items-center"
          >
            <div className="flex items-center bg-[#1A202C] rounded-full shadow-lg overflow-hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="h-12 w-12 p-4 text-white flex items-center justify-center transition-colors"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, maxWidth: 0 }}
                    animate={{ opacity: 1, maxWidth: 500 }}
                    exit={{ opacity: 0, maxWidth: 0 }}
                    className="flex items-center gap-6 pr-6 sm:pr-12 md:pr-20 lg:pr-[43rem] overflow-hidden whitespace-nowrap bg-gradient-to-l from-primary/20 via-primary/20 via-80% to-transparent rounded-full"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Link
                      href="/#home"
                      onClick={() => {
                        setActiveSection("#home");
                        setMenuOpen(false);
                      }}
                      className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-transparent rounded-full"
                    >
                      <FaHome className="text-primary text-xl" />
                      <span className="text-white font-bold text-lg transition-colors group-hover:text-primary">
                        Portfolio
                      </span>
                    </Link>

                    {sections.map((item) => {
                      const linkHash = generateLinkHash(item.name);
                      const isActive = activeSection === linkHash;
                      const href = item.name === "Games" ? "/games" : `/#${item.name.replace(/\s+/g, "").toLowerCase()}`;

                      return (
                        <Link
                          key={item.id}
                          href={href}
                          onClick={() => {
                            setActiveSection(linkHash);
                            setMenuOpen(false);
                          }}
                          className={`relative py-2 font-bold text-white hover:text-primary transition-colors ${
                            isActive ? "text-primary" : ""
                          }`}
                        >
                          {item.name}
                          <span
                            className={`absolute -bottom-1 left-0 right-0 h-1 bg-primary transition-all duration-300 ${
                              isActive ? "w-full" : "w-0"
                            }`}
                          />
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Navigation */}
      <nav
        className={`  fixed top-0 z-50 w-full bg-gradient-to-r from-[#1A202CCC] to-[#000000CC] transition-all duration-300 ${
          isScrolled ? "lg:-translate-y-full" : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <span className="text-xl sm:text-2xl font-bold text-white">
              <Link
                href="/#home"
                className="text-xl sm:text-2xl font-bold text-white hover:text-primary transition-colors flex items-center gap-2"
              >
                <FaHome className="text-primary" />
                <span className=" xs:inline">PORTFOLIO</span>
              </Link>
            </span>

            {/* Mobile Menu Button */}
            <div className="block lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-xl sm:text-2xl text-white focus:outline-none p-2"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:space-x-8">
              {sections.map((item) => {
                const linkHash = generateLinkHash(item.name);
                const isActive = activeSection === linkHash;
                const href = item.name === "Games" ? "/games" : `/#${item.name.replace(/\s+/g, "").toLowerCase()}`;

                return (
                  <div key={item.id} className="relative">
                    <Link
                      href={href}
                      onClick={() => setActiveSection(linkHash)}
                      className={`relative py-2 font-bold text-white ${
                        isActive ? "text-primary" : ""
                      }`}
                    >
                      {item.name}
                      <span
                        className={`absolute -bottom-1 left-0 right-0 h-1 bg-primary transition-all duration-300 ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Content */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="lg:hidden mt-4 overflow-hidden"
              >
                <div ref={ref} className="flex flex-col space-y-4 pb-4">
                  {sections.map((item) => {
                    const linkHash = generateLinkHash(item.name);
                    const isActive = activeSection === linkHash;
                    const href = item.name === "Games" ? "/games" : `/#${item.name.replace(/\s+/g, "").toLowerCase()}`;

                    return (
                      <motion.div key={item.id} whileHover="hover" variants={linkVariants}>
                        <Link
                          href={href}
                          onClick={() => {
                            setActiveSection(linkHash);
                            setMenuOpen(false);
                          }}
                          className={`block px-2 py-1 font-semibold ${
                            isActive ? "text-[#00bd95]" : "text-white"
                          }`}
                        >
                          {item.name}
                          {isActive && (
                            <motion.span
                              layoutId="underline-mobile"
                              className="absolute -bottom-1 left-0 right-0 h-1 bg-[#00bd95] rounded-full"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}