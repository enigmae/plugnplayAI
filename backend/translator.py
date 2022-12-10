import requests


def translate(text: str, api_key: str):
    API_URL = "https://api-inference.huggingface.co/models/t5-large"
    headers = {"Authorization": "Bearer " + api_key}
    input = {'inputs': text}

    # Request a translation
    response = requests.post(API_URL, headers=headers, json=input)

    return response.json()[0]['translation_text']
