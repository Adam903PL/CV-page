import React, { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import * as THREE from "three";
import CountUp from "react-countup";

// Animation variants
const githubCardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, type: "spring", bounce: 0.4 },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 0px 20px rgba(0, 189, 149, 0.7)",
    transition: { duration: 0.3 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: {
    scale: 1.05,
    backgroundColor: "#00bd95",
    boxShadow: "0px 0px 15px rgba(0, 189, 149, 0.8)",
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95 },
};

const GithubSection = ({ reposData, reposError }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 10;
      posArray[i + 1] = (Math.random() - 0.5) * 10;
      posArray[i + 2] = (Math.random() - 0.5) * 10;
      
      // Color - green hues
      colorArray[i] = 0; // R
      colorArray[i + 1] = 0.6 + Math.random() * 0.4; // G (0.6-1.0)
      colorArray[i + 2] = 0.5 + Math.random() * 0.5; // B (0.5-1.0)
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Octahedron (representing GitHub's logo)
    const octahedronGeometry = new THREE.OctahedronGeometry(1, 0);
    const octahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x00bd95,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    scene.add(octahedron);

    // Animation
    const animate = () => {
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.001;
      
      octahedron.rotation.y += 0.01;
      octahedron.rotation.x += 0.005;
      
      // Mouse movement effect (to be added with event listeners)
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Add mouse movement effect
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      const y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
      
      // Move particles subtly based on mouse position
      particlesMesh.rotation.x = y * 0.2;
      particlesMesh.rotation.y = x * 0.2;
      
      // Move octahedron based on mouse position
      octahedron.rotation.x = y * 0.5;
      octahedron.rotation.y = x * 0.5;
    };

    // Add touch event handler for mobile
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
        const y = -((touch.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
        
        particlesMesh.rotation.x = y * 0.2;
        particlesMesh.rotation.y = x * 0.2;
        
        octahedron.rotation.x = y * 0.5;
        octahedron.rotation.y = x * 0.5;
      }
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      octahedronGeometry.dispose();
      octahedronMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      className="bg-[#161B22] p-4 rounded-xl border border-[#30363D] shadow-xl relative overflow-hidden"
      variants={githubCardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
    >
      <h3 className="text-white font-semibold text-lg mb-3 flex items-center justify-center gap-2 z-10 relative">
        <FaGithub className="text-[#00bd95] w-6 h-6" />
        GitHub Profile
      </h3>
      
      {/* Three.js canvas */}
      <div className="relative h-48 w-full mb-4">
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
        />
        
        {/* Overlay content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <div className="bg-[#20272F]/70 p-4 rounded-xl backdrop-blur-sm">
            {reposError && (
              <p className="text-red-400">Failed to load GitHub data</p>
            )}
            {!reposData && !reposError && (
              <p className="text-gray-300">Loading...</p>
            )}
            {reposData && (
              <p className="text-gray-300 text-center mb-2">
                Total Public Repos:{" "}
                <span className="text-[#00bd95] font-bold">
                  <CountUp end={reposData.length} duration={2.5} />
                </span>
              </p>
            )}
            <motion.a
              href="https://github.com/Adam903PL/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#00bd95] to-[#00FFC9] text-white px-6 py-3 rounded-full shadow-lg font-semibold"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <FaGithub className="w-5 h-5" />
              Visit My GitHub
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GithubSection;