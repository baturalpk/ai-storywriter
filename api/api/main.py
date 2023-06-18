from os import getenv
from typing import Annotated

from fastapi import FastAPI, Form
from fastapi.responses import StreamingResponse

from huggingface_hub import InferenceClient


app = FastAPI()
hf_client = InferenceClient(model="google/flan-t5-xxl", token=getenv("HF_API_TOKEN"))


@app.post("/t2t")
def generate_story(
    prompt: Annotated[str, Form()],
):
    response = hf_client.post(json={"inputs": prompt})

    def generate():
        data = response.json()
        for chunk in data:
            yield chunk["generated_text"]

    return StreamingResponse(generate())
