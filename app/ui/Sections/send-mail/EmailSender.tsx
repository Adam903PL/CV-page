"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, Variants } from "framer-motion";
import { FaEnvelope, FaCheck, FaTimes, FaPaperPlane } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInView } from "react-intersection-observer";

// Define form input types
interface FormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Define submission status type
type SubmitStatus = "success" | "error" | null;

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Replace this with your actual email sending function
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Message sent successfully!");
      setSubmitStatus("success");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const formFieldVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5, type: "spring", bounce: 0.4 } 
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5 } 
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 12px rgba(0, 189, 149, 0.8)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const waveVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 0.15,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#171c22] min-h-screen">
      {/* Background animations */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-[#00bd95]/15 to-[#00FFC9]/15 rounded-full blur-3xl"
        variants={waveVariants}
        initial="hidden"
        animate="visible"
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="relative max-w-6xl mx-auto py-16 px-6 lg:px-12">
        <motion.div
          ref={ref}
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <motion.h2 
              className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
              variants={itemVariants}
            >
              Get In Touch
            </motion.h2>
            <motion.p 
              className="text-gray-300 text-lg max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Have a project in mind or want to collaborate? Send me a message and I'll get back to you as soon as possible.
            </motion.p>
          </motion.div>

          <motion.div 
            className="bg-[#161B22] p-8 rounded-xl border border-[#30363D] shadow-xl max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div variants={formFieldVariants}>
                <label htmlFor="name" className="block text-white font-medium mb-2">Name</label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    className={`w-full bg-[#20272F] text-white px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-[#30363D]'} focus:outline-none focus:border-[#00bd95] transition-colors`}
                    placeholder="Your name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    className={`w-full bg-[#20272F] text-white px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-[#30363D]'} focus:outline-none focus:border-[#00bd95] transition-colors`}
                    placeholder="Your email address"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <label htmlFor="subject" className="block text-white font-medium mb-2">Subject</label>
                <div className="relative">
                  <input
                    id="subject"
                    type="text"
                    className={`w-full bg-[#20272F] text-white px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-[#30363D]'} focus:outline-none focus:border-[#00bd95] transition-colors`}
                    placeholder="Message subject"
                    {...register("subject", { required: "Subject is required" })}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
                <div className="relative">
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full bg-[#20272F] text-white px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-[#30363D]'} focus:outline-none focus:border-[#00bd95] transition-colors`}
                    placeholder="Your message"
                    {...register("message", { 
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message should be at least 10 characters"
                      }
                    })}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
              </motion.div>

              <motion.div className="flex justify-center" variants={buttonVariants}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center gap-2 bg-gradient-to-r from-[#00bd95] to-[#00FFC9] text-white font-semibold px-8 py-3 rounded-full shadow-lg w-full md:w-auto min-w-[180px] ${isSubmitting ? 'opacity-70' : 'hover:opacity-90'}`}
                  variants={buttonVariants}
                  whileHover={!isSubmitting ? "hover" : undefined}
                  whileTap={!isSubmitting ? "tap" : undefined}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <FaCheck className="w-5 h-5" />
                      <span>Sent!</span>
                    </>
                  ) : submitStatus === "error" ? (
                    <>
                      <FaTimes className="w-5 h-5" />
                      <span>Failed</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div 
            className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6 text-center"
            variants={itemVariants}
          >
            <motion.div 
              className="bg-[#161B22] p-5 rounded-xl border border-[#30363D] shadow-xl w-full md:w-auto"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(0, 189, 149, 0.5)" }}
              transition={{ duration: 0.3 }}
            >
              <FaEnvelope className="text-[#00bd95] w-6 h-6 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Email Me Directly</h3>
              <p className="text-gray-300">pukaluk.adam505@gmail.com</p>
            </motion.div>
            
            <motion.div 
              className="bg-[#161B22] p-5 rounded-xl border border-[#30363D] shadow-xl w-full md:w-auto"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(0, 189, 149, 0.5)" }}
              transition={{ duration: 0.3 }}
            >
              <FaPaperPlane className="text-[#00bd95] w-6 h-6 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Response Time</h3>
              <p className="text-gray-300">Usually within 24 hours</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;