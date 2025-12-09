import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, 
  headers: {
    "Content-Type": "application/json",
  },
});

export const checkHealth = async () => {
  try {
    const response = await apiClient.get("/api/health");
    return response.data;
  } catch (error) {
    console.error("Health check failed:", error);
    return {
      status: "offline",
      ollama_connected: false,
    };
  }
};

export const analyzeMood = async (userInput) => {
  try {
    const response = await apiClient.post("/api/analyze", {
      user_input: userInput,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Backend error:", error.response.data);
      throw new Error(
        error.response.data.detail?.message ||
          "Failed to analyze mood. Please try again."
      );
    } else if (error.request) {

      console.error("No response from backend:", error.request);
      throw new Error(
        "Cannot reach backend. Make sure FastAPI server is running on port 8000."
      );
    } else {
      console.error("Request error:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const formatProcessingTime = (seconds) => {
  if (seconds < 1) {
    return `${Math.round(seconds * 1000)}ms`;
  }
  return `${seconds.toFixed(1)}s`;
};

export const ERROR_MESSAGES = {
  BACKEND_OFFLINE:
    "Backend server is not running. Start it with: uvicorn main:app --reload",
  OLLAMA_OFFLINE: "Ollama is not running. Start it with: ollama serve",
  TIMEOUT: "Request took too long. Ollama might be processing a heavy request.",
  INVALID_INPUT:
    "Please enter a valid description of your mood or music preference.",
  GENERIC: "Something went wrong. Please try again.",
};
