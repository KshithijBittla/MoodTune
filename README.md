#  MoodTune - AI-Powered Music Recommender

AI-powered music recommendation application that analyzes your mood and provides personalized song suggestions.

##  Features

- **Mood Analysis**: AI understands your emotional state and preferences
- **Multi-Language Support**: Get recommendations in any language (Telugu, Hindi, English, etc.)
- **Smart Filtering**: Filter by artist, time period, genre, or movie
- **Direct Links**: One-click access to YouTube and Spotify
- **Real-time Processing**: Powered by local Ollama AI or LLM API's 

##  Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Ollama** - Local LLM (llama3.2)
- **Pydantic** - Data validation
- **Python 3.11+**

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

##  Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- Ollama installed on your machine

##  Installation

### 1. Install Ollama
```bash
# macOS
brew install ollama

# Start Ollama service
ollama serve

# Pull the AI model (in new terminal)
ollama pull llama3.2
```

### 2. Backend Setup
```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Run backend server
uvicorn main:app --reload
```

Backend will run at: http://localhost:8000

### 3. Frontend Setup
```bash
# Navigate to frontend folder (in new terminal)
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run at: http://localhost:5173

## Usage

1. Make sure Ollama, Backend, and Frontend are all running
2. Open http://localhost:5173 in your browser
3. Type your mood and preferences:
   - "happy mood, bollywood party songs"
   - "chill vibes, English indie from 2010s"
4. Click "Find My Music"
5. Get personalized recommendations with direct YouTube/Spotify links!

##  Project Structure
```
mood-music-recommender/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── models.py            # Pydantic models
│   ├── ollama_client.py     # Ollama integration
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── api/            # API client
│   │   ├── App.jsx         # Main app component
│   │   └── index.css       # Tailwind styles
│   └── package.json        # Node dependencies
└── README.md
```

##  API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `POST /api/analyze` - Analyze mood and get recommendations

### Example API Request
```bash
curl -X POST http://localhost:8000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"user_input": "happy mood, bollywood party songs"}'
```

##  Features in Detail

### Mood Detection
- Happy, Sad, Melancholic, Energetic, Calm, Nostalgic, Romantic, and more
- AI-powered sentiment analysis

### Smart Recommendations
- Considers language preference
- Respects artist/actor requests
- Matches time period (90s, 2000s, recent, etc.)
- Understands genre preferences


##  Troubleshooting

### Backend Issues

**"Cannot connect to Ollama"**
```bash
# Make sure Ollama is running
ollama serve
```

**"Port 8000 already in use"**
```bash
# Use different port
uvicorn main:app --reload --port 8001
```

### Frontend Issues

**CORS errors**
- Check that backend CORS settings include your frontend URL
- Default: `http://localhost:5173`

**"System Offline"**
- Ensure backend is running on port 8000
- Check browser console for specific errors

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is open source and available under the MIT License.

##  Acknowledgments

- Powered by [Ollama](https://ollama.ai/)
- Built with [FastAPI](https://fastapi.tiangolo.com/)
- UI with [React](https://react.dev/) and [Tailwind CSS](https://tailwindcss.com/)

