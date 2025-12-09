import SongCard from "./SongCard";
import { formatProcessingTime } from "../api/client";

const ResultsSection = ({ result }) => {
  if (!result) return null;
  const { sentiment, songs, motivational_quote, processing_time } = result;

  const getSentimentEmoji = (sentiment) => {
    const mood = sentiment.toLowerCase();

    const emojiMap = {
      happy: "😊",
      sad: "😢",
      melancholic: "😔",
      energetic: "⚡",
      calm: "😌",
      nostalgic: "🎭",
      romantic: "❤️",
      angry: "😤",
      peaceful: "☮️",
      excited: "🤩",
      chill: "😎",
    };

    return emojiMap[mood] || "🎵";
  };

  const getSentimentColor = (sentiment) => {
    const mood = sentiment.toLowerCase();

    const colorMap = {
      happy: "bg-yellow-500/20 text-yellow-300 border-yellow-500/50",
      sad: "bg-blue-500/20 text-blue-300 border-blue-500/50",
      melancholic: "bg-purple-500/20 text-purple-300 border-purple-500/50",
      energetic: "bg-orange-500/20 text-orange-300 border-orange-500/50",
      calm: "bg-green-500/20 text-green-300 border-green-500/50",
      nostalgic: "bg-pink-500/20 text-pink-300 border-pink-500/50",
      romantic: "bg-red-500/20 text-red-300 border-red-500/50",
    };
    return (
      colorMap[mood] || "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 animate-fade-in">
      <div className="text-center mb-6">
        <div
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 ${getSentimentColor(
            sentiment
          )} font-semibold text-lg shadow-lg backdrop-blur-sm`}
        >
          <span className="text-2xl">{getSentimentEmoji(sentiment)}</span>
          <span className="capitalize">{sentiment}</span>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Analyzed in {formatProcessingTime(processing_time)}
        </p>
      </div>
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl p-6 mb-8 border border-slate-700/50 shadow-lg backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <svg
            className="w-8 h-8 text-primary/80 flex-shrink-0 mt-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <div>
            <p className="text-gray-200 text-lg italic leading-relaxed">
              "{motivational_quote}"
            </p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-100">
            Your Personalized Playlist
          </h2>
          <span className="text-sm text-gray-400">
            {songs.length} {songs.length === 1 ? "song" : "songs"}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {songs.map((song, index) => (
            <SongCard key={index} song={song} index={index} />
          ))}
        </div>
      </div>
      <div className="text-center mt-8 text-sm text-gray-400">
        <p>💡 Tip: Click YouTube or Spotify buttons to listen to these songs</p>
      </div>
    </div>
  );
};

export default ResultsSection;
