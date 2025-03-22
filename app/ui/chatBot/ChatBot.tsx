"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMessage, FaPaperPlane } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { env } from "@/app/config/env";
import { callLanguageModelAPI } from "@/app/lib/action";
import LoadingDots from "../LoadingDots";
import ReactMarkdown from "react-markdown";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hey there! How can I help you today?", sender: "bot", isLoading: false },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;
 
    // Add user message
    const userMessage = inputMessage;
    setMessages([...messages, { text: userMessage, sender: "user", isLoading: false }]);
    setInputMessage("");
 
    // Add loading message
    setMessages(prevMessages => [
      ...prevMessages,
      { text: "", sender: "bot", isLoading: true }
    ]);
 
    try {
      const botResponse = await callLanguageModelAPI(userMessage);
     
      // Replace loading message with actual response
      setMessages(prevMessages =>
        prevMessages
          .filter(msg => !msg.isLoading) // Remove loading message
          .concat({ text: botResponse, sender: "bot", isLoading: false }) // Add actual response
      );
    } catch (error) {
      console.error("Error getting response:", error);
     
      // Replace loading message with error message
      setMessages(prevMessages =>
        prevMessages
          .filter(msg => !msg.isLoading)
          .concat({
            text: "Sorry, I couldn't process your request at the moment.",
            sender: "bot",
            isLoading: false
          })
      );
    }
  };

  // Animation variants
  const chatButtonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 12px rgba(0, 189, 149, 0.7)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const chatWindowVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    }),
  };

  // Function to render message content (text or loading indicator)
  const renderMessageContent = (message) => {
    if (message.isLoading) {
      return <LoadingDots color="#00BD95" size={10} spacing={4} />;
    }
    
    // If bot message, render as Markdown, otherwise show as plain text
    return message.sender === "bot" ? (
      <ReactMarkdown 
        
        components={{
          // Style code blocks with a darker background
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline ? (
              <pre className="bg-[#111318] p-2 rounded overflow-x-auto my-2">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-[#111318] px-1 rounded" {...props}>
                {children}
              </code>
            );
          },
          // Add margins to paragraphs
          p: ({ node, children }) => <p className="mb-2">{children}</p>,
          // Style headings
          h1: ({ node, children }) => <h1 className="text-lg font-bold mb-2 mt-2">{children}</h1>,
          h2: ({ node, children }) => <h2 className="text-base font-bold mb-2 mt-2">{children}</h2>,
          h3: ({ node, children }) => <h3 className="text-sm font-bold mb-1 mt-2">{children}</h3>,
          // Style links
          a: ({ node, children, ...props }) => (
            <a className="text-[#00FFC9] underline" {...props}>{children}</a>
          ),
          // Style lists
          ul: ({ node, children }) => <ul className="list-disc pl-5 mb-2">{children}</ul>,
          ol: ({ node, children }) => <ol className="list-decimal pl-5 mb-2">{children}</ol>,
          li: ({ node, children }) => <li className="mb-1">{children}</li>,
        }}
      >
        {message.text}
      </ReactMarkdown>
    ) : (
      message.text
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <motion.button
        className="bg-gradient-to-b from-[#00bd95] to-[#00FFC9] text-white rounded-full p-4 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        variants={chatButtonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <FaTimes size={24} /> : <FaMessage size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 w-80 md:w-96 bg-[#171c22] rounded-xl shadow-xl border border-[#30363D] overflow-hidden"
            variants={chatWindowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#00bd95] to-[#00FFC9] p-4">
              <h3 className="text-white font-bold text-lg">Chat Support</h3>
              <p className="text-white/80 text-sm">We usually reply within minutes</p>
            </div>

            {/* Messages Container */}
            <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  custom={index}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl shadow ${
                      message.sender === "user"
                        ? "bg-[#00bd95] text-white rounded-tr-none"
                        : "bg-[#20272F] text-gray-200 rounded-tl-none"
                    }`}
                  >
                    {renderMessageContent(message)}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-[#30363D] bg-[#161B22] flex gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#20272F] text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00bd95] placeholder-gray-400"
              />
              <motion.button
                type="submit"
                className="bg-[#00bd95] text-white p-2 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={inputMessage.trim() === ""}
              >
                <FaPaperPlane />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;