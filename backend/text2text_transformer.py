from utils import request_response, split_text


def Flan_T5_Transformer(text: str, prefix: str, api_key: str = "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"):
    API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large"
    headers = {"Authorization": "Bearer " + api_key}

    if prefix.split(" ")[0].lower() == 'translate':
        sentences = split_text(text)
        generated_text = []
        for sentence in sentences:
            # Request a translation/summarization
            response = request_response(API_URL, headers=headers, json={'inputs': prefix + sentence})
            # Add the generated text to the list
            generated_text.append(response.json()[0]['generated_text'])

        return " ".join(generated_text)
    else:
        response = request_response(API_URL, headers=headers, json={'inputs': prefix + text})
        return response.json()[0]['generated_text']
