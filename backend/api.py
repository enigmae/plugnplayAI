from fastapi import FastAPI
from transcriptor import transcribe as _transcribe

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", response_model=str)
async def get_health():
    """
    Check for the API health.
    """
    return "healthy"


@app.get("/transcribe", response_model=str)
async def transcribe():
    """
    Transcribe some audio.
    """
    api_key = 'b2bcc06df08d4245950139b798fd5e36'  # TODO pass this token as a secret
    audio_file = 'samples/audio_7sec.mp3'
    return _transcribe(audio_file, api_key)
