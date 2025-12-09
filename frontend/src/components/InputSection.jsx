import { useState } from 'react';

const InputSection = ({ onSubmit, loading }) => {
  const [input, setInput] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput.length < 3) {
      alert('Please enter at least 3 characters to describe your mood');
      return;
    }
    onSubmit(trimmedInput);
  };

  const suggestions = [
    "happy mood, bollywood party songs",
    "chill vibes, English indie from 2010s",
    "romantic songs by Arijit Singh",
    "energetic workout music, EDM"
  ];
  
  return (
    <div className="max-w-3xl mx-auto px-4 mb-8">
      <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-slate-700/50">
        <form onSubmit={handleSubmit}>
          <label 
            htmlFor="mood-input" 
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            How are you feeling? What kind of music do you want?
          </label>
          <textarea
            id="mood-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me your mood, preferred language, artist, time period, or genre..."
            rows={4}
            disabled={loading}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-gray-100 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all disabled:bg-slate-900/30 disabled:cursor-not-allowed"
          />
          <div className="mt-3 mb-4">
            <p className="text-xs text-gray-400 mb-2">Examples:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setInput(suggestion)}
                  disabled={loading}
                  className="text-xs px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 rounded-full transition-colors disabled:opacity-50 border border-slate-600/50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading || input.trim().length < 3}
            className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 px-6 rounded-lg hover:shadow-xl hover:shadow-primary/50 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg 
                  className="animate-spin h-5 w-5" 
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
                Analyzing your mood...
              </span>
            ) : (
              '🎵 Find My Music'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputSection;
