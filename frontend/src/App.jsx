import { useState, useEffect } from "react";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import ResultsSection from "./components/ResultsSection";
import { checkHealth, analyzeMood } from "./api/client";

function App() {
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const performHealthCheck = async () => {
      try {
        const health = await checkHealth();

        setIsOnline(health.ollama_connected);

        if (!health.ollama_connected) {
          setError("⚠️ Ollama is not running. Start it with: ollama serve");
        }
      } catch (err) {
        setIsOnline(false);
        setError(
          "⚠️ Backend is not running. Start it with: uvicorn main:app --reload"
        );
      }
    };

    performHealthCheck();
  }, []);
  const handleSubmit = async (userInput) => {
    setError(null); 
    setResult(null); 
    setLoading(true); 

    try {
      const response = await analyzeMood(userInput);
      setResult(response);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      <div className="container mx-auto py-8">
        <Header isOnline={isOnline} />
        <InputSection onSubmit={handleSubmit} loading={loading} />
        {error && (
          <div className="max-w-3xl mx-auto px-4 mb-6">
            <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-start gap-3 backdrop-blur-sm">
              <svg
                className="w-6 h-6 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <p className="font-medium">Error</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}
        <ResultsSection result={result} />
        {loading && !result && (
          <div className="text-center py-12">
            <div className="inline-block">
              <svg
                className="animate-spin h-12 w-12 text-primary drop-shadow-lg"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <p className="mt-4 text-gray-300">
                Analyzing your mood and finding perfect songs...
              </p>
              <p className="text-sm text-gray-400 mt-2">
                This may take 5-10 seconds
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;