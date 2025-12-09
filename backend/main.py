from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import time
from models import AnalyzeRequest, AnalyzeResponse, HealthResponse
from ollama_client import call_ollama, generate_song_urls, check_ollama_health

app = FastAPI(
    title="Mood Music Recommender API",
    description="AI-powered music recommendation based on user's mood",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():

    return {
        "message": "Mood Music Recommender API",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    ollama_status = await check_ollama_health()

    return HealthResponse(
        status="healthy",
        ollama_connected=ollama_status
    )

@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze_mood(request: AnalyzeRequest):
    start_time = time.time()

    try:
        print(f"Analyzing input: {request.user_input}")
        ollama_response = await call_ollama(request.user_input)
        print(f"Ollama returned {len(ollama_response.songs)} songs")
        songs_with_urls = [
            generate_song_urls(song.model_dump())
            for song in ollama_response.songs
        ]
        processing_time = round(time.time() - start_time, 2)
        return AnalyzeResponse(
            sentiment=ollama_response.sentiment,
            songs=songs_with_urls,
            motivational_quote=ollama_response.motivational_quote,
            processing_time=processing_time
        )

    except Exception as e:
        print(f"Error in analyze_mood: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Failed to analyze mood",
                "message": str(e),
                "suggestion": "Make sure Ollama is running: 'ollama serve'"
            }
        )

@app.on_event("startup")
async def startup_event():

    print("🚀 Mood Music Recommender API starting...")
    print("📡 Checking Ollama connection...")
    ollama_connected = await check_ollama_health()
    if ollama_connected:
        print("✅ Ollama is running and connected!")
    else:
        print("⚠️  WARNING: Cannot connect to Ollama!")
        print("   Make sure Ollama is running: 'ollama serve'")
        print("   Then restart this FastAPI server")

    print("🎵 API is ready at http://localhost:8000")
    print("📚 API docs available at http://localhost:8000/docs")