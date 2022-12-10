from fastapi import FastAPI, UploadFile
from transcriptor import transcribe as _transcribe
from text2text_transformer import T5_Transformer

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


@app.get("/", response_model=str)
async def get_health():
    """
    Check for the API health.
    """
    return "healthy"


@app.post("/transcribe", response_model=str)
async def transcribe(audio_mp3: UploadFile):
    """
    Transcribe an MP3 file.
    """
    api_key = 'b2bcc06df08d4245950139b798fd5e36'  # TODO pass this token as a secret
    return _transcribe(audio_mp3.file.read(), api_key)


@app.post("/translator", response_model=str)
async def translate(text_file: UploadFile):
    """
    Translate some text.
    """
    api_key = "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"  # TODO pass this token as a secret
    prefix = "translate English to German: "
    return T5_Transformer(prefix + text_file.file.read().decode(), api_key)


@app.post("/summarize", response_model=str)
async def summarize(text_file: UploadFile):
    """
    Translate some text.
    """
    api_key = "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"  # TODO pass this token as a secret
    prefix = "summarize: "
    return T5_Transformer(prefix + text_file.file.read().decode(), api_key)
