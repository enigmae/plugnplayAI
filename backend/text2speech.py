from utils import request_response


def fastspeech(text: str, api_key: str):
    API_URL = "https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits"
    headers = {"Authorization": "Bearer " + api_key}
    input = {'inputs': text}

    # Request a speech
    response = request_response(API_URL, headers=headers, json=input)

    return response
