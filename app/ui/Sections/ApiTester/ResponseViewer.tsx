"use client"
import { useEffect } from "react";

interface ResponseViewerProps {
  response: any;
  error: string | null;
}

const ResponseViewer = ({ response, error }: ResponseViewerProps) => {
  return (
    <div className="mt-6">
      {response && (
        <pre className="p-4 bg-gray-900 text-white rounded-lg overflow-auto max-h-64">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
      {error && (
        <p className="p-4 bg-red-900 text-white rounded-lg">{error}</p>
      )}
      {!response && !error && (
        <p className="text-gray-400">Send a request to see the response...</p>
      )}
    </div>
  );
};

export default ResponseViewer;