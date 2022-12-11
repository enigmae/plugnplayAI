import utils


def save_mp3(mp3) -> str:
    path = "samples/tmp.mp3"
    with open(path, 'wb') as f:
        f.write(mp3)
    return path


def transcribe(audio_mp3, api_key: str, lang_code: str = 'en') -> str:  # TODO refactor this as an interface
    # Save MP3 file
    path_audio = save_mp3(audio_mp3)

    # Create header with authorization along with content-type
    header = {
        'authorization': api_key,
        'content-type': 'application/json'
    }

    # Upload the audio file to AssemblyAI
    upload_url = utils.upload_file(path_audio, header)

    # Request a transcription
    transcript_response = utils.request_transcript(upload_url, lang_code, header)

    # Create a polling endpoint that will let us check when the transcription is complete
    polling_endpoint = utils.make_polling_endpoint(transcript_response)

    # Wait until the transcription is complete
    utils.wait_for_completion(polling_endpoint, header)

    # Request the paragraphs of the transcript
    paragraphs = utils.get_paragraphs(polling_endpoint, header)

    return paragraphs[0]["text"]  # TODO get more than the first sentence
