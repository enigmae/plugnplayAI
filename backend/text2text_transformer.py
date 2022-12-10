from utils import request_response


def Flan_T5_Transformer(text: str, api_key: str):
    API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large"
    headers = {"Authorization": "Bearer " + api_key}
    input = {'inputs': text}

    # Request a translation/summarization
    response = request_response(API_URL, headers=headers, json=input)

    return response.json()[0]['generated_text']
