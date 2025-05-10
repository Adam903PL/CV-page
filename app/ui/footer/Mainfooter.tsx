import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Example icons, adjust as needed

const MainFooter = () => {
  return (
    <footer className="relative w-full bg-[#171c22] py-12 text-gray-400">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        {/* Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Branding or Name */}
          <h3 className="text-2xl font-bold text-white mb-4">
            Adam <span className="text-[#00BD95]">Pukaluk</span>
          </h3>

          {/* Tagline or Description */}
          <p className="text-lg mb-6">
            Crafting innovative solutions, one line of code at a time.
          </p>

          {/* Social Links */}
          <div className="flex gap-6 mb-8 justify-center">
            <motion.a
              href="https://github.com/Adam903PL"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#00BD95' }}
              className="text-gray-400 hover:text-[#00BD95] transition-colors"
            >
              <FaGithub className="text-2xl" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/adam-pukaluk" // Replace with your actual LinkedIn
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#00BD95' }}
              className="text-gray-400 hover:text-[#00BD95] transition-colors"
            >
              <FaLinkedin className="text-2xl" />
            </motion.a>
          </div>

          {/* Copyright */}
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Adam Pukaluk. All rights reserved.
          </p>
        </motion.div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00BD95] to-transparent" />
      </div>
    </footer>
  );
};

export default MainFooter;