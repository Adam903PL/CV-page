"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import MethodTab from "./Method-Tab";
import ResponseViewer from "./ResponseViewer";
import { env } from "@/app/config/env";
import { apiDocs } from "@/app/lib/apiDocs";
const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
export type HttpMethod = (typeof methods)[number];

// Dostępne kategorie API
const apiCategories = [
  "events",
  "orders",
  "passes",
  "product",
  "todos",
] as const;
export type ApiCategory = (typeof apiCategories)[number];

const ApiTester = () => {
  const [activeMethod, setActiveMethod] = useState<HttpMethod>("GET");
  const [apiCategory, setApiCategory] = useState<ApiCategory>("events"); // Domyślna kategoria
  const [baseUrl, setBaseUrl] = useState(`${env.API_URL}/${apiCategory}`); // Bazowy URL z kategorią
  const [params, setParams] = useState<Record<string, string>>({});
  const [body, setBody] = useState<string>("");
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"params" | "body">("params");
  const [apiDescription, setApiDescription] = useState<string>("");

  // Dynamicznie generowany URL z parametrami
  const fullUrl = `${baseUrl}${
    Object.keys(params).length > 0
      ? "?" + new URLSearchParams(params).toString()
      : ""
  }`;

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

  const sendRequest = async () => {
    setError(null);
    setResponse(null);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  // Dodawanie/usuwanie parametrów
  const handleParamChange = (key: string, value: string) => {
    if (value === "") {
      const newParams = { ...params };
      delete newParams[key];
      setParams(newParams);
    } else {
      setParams({ ...params, [key]: value });
    }
  };

  // Zmiana kategorii API
  const handleCategoryChange = (category: ApiCategory) => {
    setApiCategory(category);
    setBaseUrl(`${env.API_URL}/${category}`); // Aktualizacja bazowego URL
    setParams({}); // Reset parametrów przy zmianie kategorii
    setBody(""); // Reset body przy zmianie kategorii
  };

  return (
    <section
      id="api-tester"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#171c22] py-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold text-white mb-4">
          API <span className="text-[#00BD95]">Tester</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Test local API endpoints with ease - GET, POST, PUT, PATCH, DELETE.
        </p>
      </motion.div>

      {/* Main Container */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-2xl p-6 ring-1 ring-gray-700">
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-[#00BD95] transition-colors flex items-center gap-2 my-4"
        >
          <FaGithub size={20} />
          <span>View API docs</span>
        </a>
        {/* API Category Selector */}
        <div className="flex gap-2 mb-6">
          {apiCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-lg capitalize ${
                apiCategory === category
                  ? "bg-[#00BD95] text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Method Tabs */}
        <div className="flex gap-2 mb-6">
          {methods.map((method) => (
            <MethodTab
              key={method}
              method={method}
              isActive={activeMethod === method}
              onClick={() => setActiveMethod(method)}
            />
          ))}
        </div>

        {/* URL Display */}
        <div className="mb-4">
          <p className="text-white font-semibold">{activeMethod} Request</p>
          <input
            type="text"
            value={fullUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="w-full p-3 mt-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BD95]"
          />
        </div>

        {/* Tabs for Params/Body */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab("params")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "params"
                ? "bg-[#00BD95] text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Params
          </button>
          <button
            onClick={() => setActiveTab("body")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "body"
                ? "bg-[#00BD95] text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Body
          </button>
        </div>

        {/* Params Input */}
        {activeTab === "params" && (
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(params).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <input
                    type="text"
                    value={key}
                    placeholder="Key"
                    onChange={(e) =>
                      handleParamChange(e.target.value, params[key])
                    }
                    className="w-full p-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BD95]"
                  />
                  <input
                    type="text"
                    value={value}
                    placeholder="Value"
                    onChange={(e) => handleParamChange(key, e.target.value)}
                    className="w-full p-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BD95]"
                  />
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Key"
                  onChange={(e) =>
                    e.target.value &&
                    handleParamChange(
                      e.target.value,
                      params[e.target.value] || ""
                    )
                  }
                  className="w-full p-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BD95]"
                />
                <input
                  type="text"
                  placeholder="Value"
                  onChange={(e) => {
                    const lastKey = Object.keys(params).pop() || "key";
                    handleParamChange(lastKey, e.target.value);
                  }}
                  className="w-full p-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BD95]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Body Input */}
        {activeTab === "body" && (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='e.g. {"title": "foo", "body": "bar", "userId": 1}'
            className="w-full h-32 p-3 mb-6 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BD95]"
          />
        )}

        {/* Send Button */}
        <button
          onClick={sendRequest}
          className="w-full py-3 bg-[#00BD95] text-white rounded-lg hover:bg-[#00FFC9] transition-colors"
        >
          Send
        </button>

        {/* Response/Error Viewer */}
        <ResponseViewer response={response} error={error} />
      </div>
    </section>
  );
};

export default ApiTester;
