from pydantic import BaseModel, Field
from typing import List, Optional

class AnalyzeRequest(BaseModel):
    user_input: str = Field(...,
                            min_length=3,
                            max_length=500,
                            description="User's mood/preference description",
                            examples=["I'm feeling sad, want 90s tamil songs by AR Rahman"],
                            )

class Song(BaseModel):
    title: str = Field(..., description="Song title")
    artist: str = Field(..., description="Artist/Singer name")
    movie: Optional[str] = Field(None, description="Movie name (if applicable)")
    year: str = Field(..., description="Release year")
    language: str = Field(..., description="Song language (Tamil, Hindi, English, etc)")
    youtube_url: str = Field(..., description="YouTube search URL")
    spotify_url: str = Field(..., description="Spotify search URL")

class OllamaSongResponse(BaseModel):
    title: str
    artist: str
    movie: Optional[str] = None
    year: str
    language: str

class OllamaResponse(BaseModel):
    sentiment: str = Field(
        ...,
        description="Detected emotion (happy, sad, energetic, calm, etc)"
    )
    songs: List[OllamaSongResponse] = Field(
        ...,
        description="List of recommended songs",
        min_length=5,
    )
    motivational_quote: str = Field(
        ...,
        description="Uplifting quote matching user's mood"
    )

class AnalyzeResponse(BaseModel):
    sentiment: str
    songs: List[Song]
    motivational_quote: str
    processing_time: float = Field(
        ...,
        description="Time taken to process request (seconds)"
    )

class HealthResponse(BaseModel):

    status: str = Field(default="healthy")
    ollama_connected: bool = Field(
        ...,
        description="Whether Ollama service is reachable"
    )