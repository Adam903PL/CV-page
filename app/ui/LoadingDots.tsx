import React from 'react';
import { motion } from 'framer-motion';

interface LoadingDotsProps {
  size?: number;
  color?: string;
  spacing?: number;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({
  size = 12,
  color = "#00BD95",
  spacing = 6,
}) => {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const dotVariants = {
    initial: { y: 0, opacity: 0.4 },
    animate: {
      y: [0, -10, 0],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={{ gap: spacing }}
    >
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          variants={dotVariants}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
          }}
        />
      ))}
    </motion.div>
  );
};

export default LoadingDots;