import requests
import IPython.display as ipd


def fastspeech(text: str, api_key: str):
    API_URL = "https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech"
    headers = {"Authorization": "Bearer " + api_key}
    input = {'inputs': text}

    # Request a translation
    response = requests.post(API_URL, headers=headers, json=input)

    return response.content
