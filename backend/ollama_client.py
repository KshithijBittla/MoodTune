import httpx
import json
import urllib.parse
from typing import Dict, List
from models import OllamaResponse, Song

OLLAMA_API_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "llama3.2"
SYSTEM_PROMPT = """You are a music recommendation AI that understands emotions and cultures.

Your task:
1. Analyze the user's emotional state from their input
2. Extract preferences: language, artist, actor, time period, genre
3. Recommend 5-6 songs that perfectly match their mood and preferences
4. Provide a motivational quote that resonates with their emotion

CRITICAL: Respond ONLY with valid JSON in this EXACT format (no other text):
{
  "sentiment": "happy|sad|melancholic|energetic|calm|nostalgic|romantic|angry|peaceful",
  "songs": [
    {
      "title": "Exact Song Title",
      "artist": "Artist/Singer Name",
      "movie": "Movie Name (or null if not from a movie)",
      "year": "YYYY",
      "language": "Language Name"
    }
  ],
  "motivational_quote": "An uplifting, relevant quote"
}

Rules:
- Provide REAL, popular songs (not made-up songs)
- Match the language preference if specified (Tamil, Hindi, English, etc)
- Match artist/singer if specified
- Match actor's movies if actor name is given
- Match time period if specified (90s, 2000s, recent, etc)
- Include 5-6 songs minimum
- If user is sad/melancholic, provide comforting songs and quotes
- If user is happy/energetic, provide upbeat songs and celebratory quotes
- Quotes should be 1-2 sentences maximum
"""

def build_user_prompt(user_input: str) -> str:
    return f"""{SYSTEM_PROMPT}
User Input: "{user_input}"

Now analyze this and provide song recommendations with a motivational quote.
Remember: Respond ONLY with valid JSON, no markdown, no explanation, just JSON.
"""

async def call_ollama(user_input: str) -> OllamaResponse:
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": build_user_prompt(user_input),
        "stream": False,
        "format": "json",
        "options": {
            "temperature": 0.7,
            "top_p": 0.9,
            "num_predict": 1000
        }
    }

    try:
        async with httpx.AsyncClient(timeout=300.0) as client:
            response = await client.post(OLLAMA_API_URL, json=payload)
            response.raise_for_status()
            ollama_data = response.json()
            ai_response_text = ollama_data.get("response", "")
            ai_response_text = ai_response_text.strip()
            if ai_response_text.startswith("```json"):
                ai_response_text = ai_response_text.replace("```json", "").replace("```", "")

            parsed_response = json.loads(ai_response_text)
            return OllamaResponse(**parsed_response)

    except httpx.ConnectError:
        raise Exception(
            "Cannot connect to Ollama. Make sure Ollama is running: 'ollama serve'"
        )
    except httpx.TimeoutException:
        raise Exception("Ollama request timed out. Try again.")
    except json.JSONDecodeError as e:
        raise Exception(f"Ollama returned invalid JSON: {str(e)}")
    except Exception as e:
        raise Exception(f"Ollama error: {str(e)}")

def generate_song_urls(song_data: Dict) -> Song:
    query_parts = [song_data['title'], song_data['artist']]
    if song_data.get('movie'):
        query_parts.append(song_data['movie'])

    search_query = ' '.join(query_parts)
    encoded_query = urllib.parse.quote(search_query)
    youtube_url = f"https://www.youtube.com/results?search_query={encoded_query}"
    spotify_url = f"https://open.spotify.com/search/{encoded_query}"
    return Song(
        title=song_data['title'],
        artist=song_data['artist'],
        movie=song_data.get('movie'),
        year=song_data['year'],
        language=song_data['language'],
        youtube_url=youtube_url,
        spotify_url=spotify_url
    )

async def check_ollama_health() -> bool:
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get("http://localhost:11434")
            return response.status_code == 200
    except:
        return False