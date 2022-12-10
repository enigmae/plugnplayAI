from fastapi import FastAPI, Response, UploadFile
from transcriptor import transcribe as _transcribe
from text2text_transformer import Flan_T5_Transformer
# from chatGPT import ask
from image_generator import generate_image as _generate_image
from text2speech import fastspeech
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
huggingface_api_key = "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"  # TODO pass this token as a secret

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


@app.post("/translate", response_model=str)
async def translate(text_file: str, language: str):
    """
    Translate some text.
    """
    prefix = "translate English to {}: ".format(language)
    return Flan_T5_Transformer(prefix + text_file, huggingface_api_key)


@app.post("/summarize", response_model=str)
async def summarize(text_file):
    """
    Summarize some text.
    """
    prefix = "summarize: "
    return Flan_T5_Transformer(prefix + text_file, huggingface_api_key)


@app.post("/chatbot", response_model=str)
async def question_answering(question: str):
    """
    Answer questions using chatGPT
    """
    return ask(question)


@app.post("/generate_image")
async def generate_image(prompt: str):
    """
    Generate an image from some text.
    """
    api_key = 'sk-3DEERMlkvdTymBFocEI9uGlEV610ro1hL3MgzfYQ7zhCnsKX'  # TODO pass this token as a secret
    image_bytes: bytes = _generate_image(prompt, api_key)
    return Response(content=image_bytes, media_type="image/png")


@app.post("/text2speech", response_model=str)
async def text2speech(text: str):
    """
    Convert text to speech
    """
    return fastspeech(text, huggingface_api_key)
