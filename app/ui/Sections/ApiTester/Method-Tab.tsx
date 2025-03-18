import { HttpMethod } from "./Api-Tester";

interface MethodTabProps {
  method: HttpMethod;
  isActive: boolean;
  onClick: () => void;
}

const MethodTab = ({ method, isActive, onClick }: MethodTabProps) => {
  const methodColors: Record<HttpMethod, string> = {
    GET: "bg-green-600",
    POST: "bg-yellow-600",
    PUT: "bg-blue-600",
    PATCH: "bg-orange-600",
    DELETE: "bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors ${
        isActive ? methodColors[method] : "bg-gray-700"
      }`}
    >
      {method}
    </button>
  );
};

export default MethodTab;