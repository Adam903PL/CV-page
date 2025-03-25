"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import MethodTab from "./Method-Tab";
import ResponseViewer from "./ResponseViewer";
import { env } from "@/app/config/env";
import { apiDocs } from "@/app/lib/apiDocs";
import { FaGithub, FaPlay, FaCode, FaLightbulb, FaHistory, FaBookmark } from "react-icons/fa";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import React from "react";
import toast, { Toaster } from 'react-hot-toast';

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
export type HttpMethod = (typeof methods)[number];
const apiCategories = ["events", "training_plan"] as const;
export type ApiCategory = (typeof apiCategories)[number];

const ApiTester = () => {
  const [activeMethod, setActiveMethod] = useState<HttpMethod>("GET");
  const [apiCategory, setApiCategory] = useState<ApiCategory>("events");
  const [baseUrl, setBaseUrl] = useState(`${env.API_URL}/${apiCategory}`);
  const [params, setParams] = useState<{ key: string; value: string }[]>([{ key: "", value: "" }]);
  const [body, setBody] = useState<string>("");
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"params" | "body">("params");
  const [apiDescription, setApiDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [requestHistory, setRequestHistory] = useState<Array<{method: HttpMethod, url: string, body?: string}>>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Array<{name: string, method: HttpMethod, url: string, body?: string}>>([]);
  const [bookmarkName, setBookmarkName] = useState<string>("");
  const [showBookmarkModal, setShowBookmarkModal] = useState<boolean>(false);
  const [showExamples, setShowExamples] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  
  // Examples based on API category
  const examples = {
    events: [
      { method: "GET", url: `${env.API_URL}/events?id=1` },
      { method: "POST", url: `${env.API_URL}/events`, body: `{"title":"New Event","date":"2025-03-18","location":"Virtual"}` }
    ],
    orders: [
      { method: "GET", url: `${env.API_URL}/orders?status=pending` },
      { method: "PUT", url: `${env.API_URL}/orders`, body: `{"id":1,"status":"completed"}` }
    ],
    passes: [
      { method: "GET", url: `${env.API_URL}/passes?userId=5` },
      { method: "POST", url: `${env.API_URL}/passes`, body: `{"userId":5,"type":"premium","expiryDate":"2025-06-18"}` }
    ],
    product: [
      { method: "GET", url: `${env.API_URL}/product?category=electronics` },
      { method: "DELETE", url: `${env.API_URL}/product?id=123` }
    ],
    todos: [
      { method: "GET", url: `${env.API_URL}/todos?completed=false` },
      { method: "PATCH", url: `${env.API_URL}/todos`, body: `{"id":15,"completed":true}` }
    ]
  };
  
  // Generate full URL with params
  const fullUrl = `${baseUrl}${
    params.some((p) => p.key && p.value)
      ? "?" +
        new URLSearchParams(
          params.filter((p) => p.key && p.value).map((p) => [p.key, p.value])
        ).toString()
      : ""
  }`;
  
  // Load API description
  useEffect(() => {
    const loadDescription = async () => {
      try {
        const doc = apiDocs[apiCategory];
        const response = await fetch(`/apiDescriptions/${doc.file}`);
        const text = await response.text();
        setApiDescription(text);
      } catch (err) {
        setApiDescription("Failed to load description.");
      }
    };
    loadDescription();
  }, [apiCategory]);
  
  // Parse URL params on mount or baseUrl change
  useEffect(() => {
    const url = new URL(fullUrl.includes("://") ? fullUrl : `http://${fullUrl}`);
    const urlParams = new URLSearchParams(url.search);
    const newParams = Array.from(urlParams.entries()).map(([key, value]) => ({
      key,
      value,
    }));
    if (newParams.length > 0) {
      setParams([...newParams, { key: "", value: "" }]);
    } else if (params.length === 0) {
      setParams([{ key: "", value: "" }]);
    }
  }, [baseUrl]);
  
  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('apiTesterTheme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);
  
  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('apiTesterBookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Failed to load bookmarks', e);
      }
    }
  }, []);
  
  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('apiTesterBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  // Save theme preference
  useEffect(() => {
    localStorage.setItem('apiTesterTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  
  const sendRequest = async () => {
    setError(null);
    setResponse(null);
    setLoading(true);
    try {
      const options: RequestInit = {
        method: activeMethod,
        headers: { "Content-Type": "application/json" },
      };
      if (["POST", "PUT", "PATCH"].includes(activeMethod) && body) {
        options.body = body;
      }
      const res = await fetch(fullUrl, options);
      const data = await res.json();
      setResponse(data);
     
      // Add to history
      const historyEntry = {
        method: activeMethod,
        url: fullUrl,
        body: ["POST", "PUT", "PATCH"].includes(activeMethod) ? body : undefined
      };
     
      setRequestHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  // Handle param changes
  const handleParamChange = (index: number, field: "key" | "value", value: string) => {
    const newParams = [...params];
    newParams[index][field] = value;
    // Add new empty pair if the last key is being filled
    if (index === newParams.length - 1 && value && field === "key" && !newParams[index].value) {
      newParams.push({ key: "", value: "" });
    }
    // Remove empty pairs (except the last one if others exist)
    const filteredParams = newParams.filter((p, i) => {
      if (i === newParams.length - 1 && !p.key && !p.value) return true; // Keep last empty pair
      return p.key || p.value; // Keep non-empty pairs
    });
    // Ensure at least one empty pair exists if there are no params
    if (filteredParams.length === 0 || filteredParams.every((p) => p.key)) {
      filteredParams.push({ key: "", value: "" });
    }
    setParams(filteredParams);
    // Sync baseUrl if params are removed completely
    if (filteredParams.length === 1 && !filteredParams[0].key && !filteredParams[0].value) {
      setBaseUrl(fullUrl.split("?")[0]);
    }
  };
  
  const handleCategoryChange = (category: ApiCategory) => {
    setApiCategory(category);
    setBaseUrl(`${env.API_URL}/${category}`);
    setParams([{ key: "", value: "" }]);
    setBody("");
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };
  
  const loadHistoryItem = (item: {method: HttpMethod, url: string, body?: string}) => {
    setActiveMethod(item.method as HttpMethod);
    setBaseUrl(item.url.split("?")[0]);
   
    // Extract params
    const url = new URL(item.url.includes("://") ? item.url : `http://${item.url}`);
    const urlParams = Array.from(new URLSearchParams(url.search).entries()).map(([key, value]) => ({
      key,
      value,
    }));
   
    setParams(urlParams.length > 0 ? [...urlParams, { key: "", value: "" }] : [{ key: "", value: "" }]);
   
    if (item.body) {
      setBody(item.body);
      setActiveTab("body");
    } else {
      setBody("");
      setActiveTab("params");
    }
   
    setShowHistory(false);
  };
  
  const loadBookmark = (bookmark: {name: string, method: HttpMethod, url: string, body?: string}) => {
    loadHistoryItem(bookmark);
  };
  
  const saveBookmark = () => {
    if (!bookmarkName.trim()) {
      toast.error('Please enter a bookmark name');
      return;
    }
   
    const newBookmark = {
      name: bookmarkName,
      method: activeMethod,
      url: fullUrl,
      body: ["POST", "PUT", "PATCH"].includes(activeMethod) ? body : undefined
    };
   
    setBookmarks(prev => [...prev, newBookmark]);
    setBookmarkName("");
    setShowBookmarkModal(false);
    toast.success('Bookmark saved!');
  };

  const loadExample = (example: {method: string, url: string, body?: string}) => {
    setActiveMethod(example.method as HttpMethod);
    setBaseUrl(example.url.split("?")[0]);
   
    // Extract params
    const url = new URL(example.url.includes("://") ? example.url : `http://${example.url}`);
    const urlParams = Array.from(new URLSearchParams(url.search).entries()).map(([key, value]) => ({
      key,
      value,
    }));
   
    setParams(urlParams.length > 0 ? [...urlParams, { key: "", value: "" }] : [{ key: "", value: "" }]);
   
    if (example.body) {
      setBody(example.body);
      setActiveTab("body");
    } else {
      setBody("");
      setActiveTab("params");
    }
   
    setShowExamples(false);
  };
  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <section
      id="api-tester"
      className={`relative w-full min-h-screen flex flex-col items-center justify-center bg-[#171c22] py-20 px-4 sm:px-6`}
    >


      
      <Toaster position="top-right" />

      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        // whileTap={{ scale: 0.95 }}
        // onClick={() => setDarkMode(!darkMode)}
      ></motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.h2
          className={`text-4xl sm:text-5xl font-bold ${
            darkMode ? "text-white" : "text-gray-800"
          } mb-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          API <span className="text-[#00BD95]">Tester</span>
        </motion.h2>
        <motion.p
          className={`${
            darkMode ? "text-gray-400" : "text-gray-600"
          } max-w-2xl mx-auto text-lg`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Test local API endpoints with ease - GET, POST, PUT, PATCH, DELETE.
        </motion.p>
      </motion.div>

      {/* Main Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`w-full max-w-4xl ${
          darkMode
            ? "bg-gray-800 ring-1 ring-gray-700"
            : "bg-white ring-1 ring-gray-200"
        } rounded-2xl shadow-2xl p-4 sm:p-6`}
      >
        {/* Top Action Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-between items-center gap-3 mb-4"
        >
          <a
            href={`https://github.com/Adam903PL/CV-page/blob/main/app/lib/API_Docs/${apiCategory}.md`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              darkMode
                ? "text-gray-300 hover:text-[#00BD95]"
                : "text-gray-600 hover:text-[#00BD95]"
            } transition-colors flex items-center gap-2`}
          >
            <FaGithub size={20} />
            <span className="hidden sm:inline">View API docs</span>
          </a>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } flex items-center gap-1`}
            >
              <FaHistory size={16} />
              <span className="hidden sm:inline">History</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBookmarkModal(true)}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } flex items-center gap-1`}
            >
              <FaBookmark size={16} />
              <span className="hidden sm:inline">Save</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowExamples(!showExamples)}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } flex items-center gap-1`}
            >
              <FaLightbulb size={16} />
              <span className="hidden sm:inline">Examples</span>
            </motion.button>
          </div>
        </motion.div>

        {/* History Dropdown */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-4 overflow-hidden ${
                darkMode ? "bg-gray-900" : "bg-gray-100"
              } rounded-lg p-3`}
            >
              <h3
                className={`text-lg font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Request History
              </h3>
              {requestHistory.length > 0 ? (
                <div className="max-h-48 overflow-y-auto">
                  {requestHistory.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className={`p-2 mb-1 rounded cursor-pointer ${
                        darkMode
                          ? "hover:bg-gray-800 border-b border-gray-700"
                          : "hover:bg-gray-200 border-b border-gray-300"
                      }`}
                      onClick={() => loadHistoryItem(item)}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            item.method === "GET"
                              ? "bg-blue-600 text-white"
                              : item.method === "POST"
                              ? "bg-green-600 text-white"
                              : item.method === "PUT"
                              ? "bg-yellow-600 text-white"
                              : item.method === "PATCH"
                              ? "bg-purple-600 text-white"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {item.method}
                        </span>
                        <span
                          className={`truncate ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {item.url}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  No request history yet
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Examples Dropdown */}
        <AnimatePresence>
          {showExamples && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-4 overflow-hidden ${
                darkMode ? "bg-gray-900" : "bg-gray-100"
              } rounded-lg p-3`}
            >
              <h3
                className={`text-lg font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Example Requests for {apiCategory}
              </h3>
              <div className="max-h-48 overflow-y-auto">
                {examples[apiCategory].map((example, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className={`p-2 mb-1 rounded cursor-pointer ${
                      darkMode
                        ? "hover:bg-gray-800 border-b border-gray-700"
                        : "hover:bg-gray-200 border-b border-gray-300"
                    }`}
                    onClick={() => loadExample(example)}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          example.method === "GET"
                            ? "bg-blue-600 text-white"
                            : example.method === "POST"
                            ? "bg-green-600 text-white"
                            : example.method === "PUT"
                            ? "bg-yellow-600 text-white"
                            : example.method === "PATCH"
                            ? "bg-purple-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {example.method}
                      </span>
                      <span
                        className={`truncate ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {example.url}
                      </span>
                    </div>
                    {example.body && (
                      <p
                        className={`text-xs mt-1 truncate ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Body: {example.body}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bookmarks Dropdown */}
        <AnimatePresence>
          {bookmarks.length > 0 && (
            <motion.div
              variants={itemVariants}
              className={`mb-4 ${
                darkMode ? "bg-gray-900" : "bg-gray-100"
              } rounded-lg p-3`}
            >
              <h3
                className={`text-sm font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Bookmarks
              </h3>
              <div className="flex flex-wrap gap-2">
                {bookmarks.map((bookmark, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => loadBookmark(bookmark)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } flex items-center gap-1`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        bookmark.method === "GET"
                          ? "bg-blue-500"
                          : bookmark.method === "POST"
                          ? "bg-green-500"
                          : bookmark.method === "PUT"
                          ? "bg-yellow-500"
                          : bookmark.method === "PATCH"
                          ? "bg-purple-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    {bookmark.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* API Category Selector */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-2 mb-6"
        >
          {apiCategories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-lg capitalize ${
                apiCategory === category
                  ? "bg-[#00BD95] text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Method Tabs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-2 mb-6"
        >
          {methods.map((method) => (
            <MethodTab
              key={method}
              method={method}
              isActive={activeMethod === method}
              onClick={() => setActiveMethod(method)}
            />
          ))}
        </motion.div>

        {/* URL Display */}
        <motion.div variants={itemVariants} className="mb-4 relative">
          <p
            className={`font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {activeMethod} Request
          </p>
          <div className="flex">
            <input
              type="text"
              value={fullUrl}
              onChange={(e) => {
                setBaseUrl(e.target.value.split("?")[0]);
                const url = new URL(
                  e.target.value.includes("://")
                    ? e.target.value
                    : `http://${e.target.value}`
                );
                const urlParams = Array.from(
                  new URLSearchParams(url.search).entries()
                ).map(([key, value]) => ({
                  key,
                  value,
                }));
                setParams(
                  urlParams.length > 0
                    ? [...urlParams, { key: "", value: "" }]
                    : [{ key: "", value: "" }]
                );
              }}
              className={`w-full p-3 mt-2 ${
                darkMode
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-800"
              } rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#00BD95]`}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyToClipboard(fullUrl)}
              className={`mt-2 px-3 ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } rounded-r-lg`}
            >
              <HiOutlineClipboardCopy size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Tabs for Params/Body */}
        <motion.div variants={itemVariants} className="flex gap-4 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab("params")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "params" ? "bg-[#00BD95] text-white" :
            darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
          }`}
        >
          Params
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab("body")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "body" ? "bg-[#00BD95] text-white" :
            darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
          }`}
        >
          Body
        </motion.button>
      </motion.div>

        {/* Params Input */}
        <AnimatePresence mode="wait">
        {activeTab === "params" && (
          <motion.div
            key="params"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {params.map((param, index) => (
                <motion.div
                  key={index}
                  className="flex gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <input
                    type="text"
                    value={param.key}
                    placeholder="Key"
                    onChange={(e) => handleParamChange(index, "key", e.target.value)}
                    className={`w-full p-2 ${
                      darkMode
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-800'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BD95]`}
                  />
                  <input
                    type="text"
                    value={param.value}
                    placeholder="Value"
                    onChange={(e) => handleParamChange(index, "value", e.target.value)}
                    disabled={!param.key} // Disable if key is empty
                    className={`w-full p-2 ${
                      darkMode
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-800'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BD95] ${
                      !param.key ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {activeTab === "body" && (
          <motion.div
            key="body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='e.g. {"title": "foo", "body": "bar", "userId": 1}'
              className={`w-full h-32 p-3 ${
                darkMode
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-800'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BD95]`}
            />
          </motion.div>
        )}


          {/* Send Button */}
          <motion.button
            variants={itemVariants}
            onClick={sendRequest}
            disabled={loading}
            className={`w-full py-3 bg-[#00BD95] text-white rounded-lg hover:bg-[#00FFC9] transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send"}
          </motion.button>

          {/* Response/Error Viewer */}
          <ResponseViewer response={response} error={error} />
          <Toaster position="bottom-right" />
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ApiTester;
