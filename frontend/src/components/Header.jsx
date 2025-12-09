
const Header = ({ isOnline }) => {

  return (
    <header className="text-center py-8 px-4">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-3 drop-shadow-2xl">
        MoodTune
      </h1>
      <p className="text-gray-300 text-lg mb-4">
        AI-powered music recommendations based on your mood
      </p>
      <div className="flex items-center justify-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isOnline ? "bg-green-400" : "bg-red-400"
          } animate-pulse shadow-lg ${
            isOnline ? "shadow-green-400/50" : "shadow-red-400/50"
          }`}
        >
        </div>

        <span
          className={`text-sm ${isOnline ? "text-green-300" : "text-red-300"}`}
        >
          {isOnline ? "System Ready" : "System Offline"}
        </span>
      </div>
    </header>
  );
};

export default Header;

