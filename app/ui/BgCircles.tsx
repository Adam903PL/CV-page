import { motion, useInView } from "framer-motion";
export const BackgroundCircles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="absolute pointer-events-none"
          style={{
            width: "400px",
            height: "400px",
            left: "-10%",
            top: "5%",
            opacity: 1,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="#00BD95"
            stroke="#FFFFFF30"
            strokeWidth="4"
          />
        </motion.svg>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="absolute pointer-events-none"
          style={{
            width: "350px",
            height: "350px",
            left: "70%",
            top: "15%",
            opacity: 1,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="#00BD95"
            stroke="#FFFFFF30"
            strokeWidth="4"
          />
        </motion.svg>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="absolute pointer-events-none"
          style={{
            width: "600px",
            height: "600px",
            left: "80%",
            top: "5%",
            opacity: 1,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="#00BD95"
            stroke="#FFFFFF30"
            strokeWidth="4"
          />
        </motion.svg>
      </div>
    );
  };