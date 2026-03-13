from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

async def get_ai_response(messages, domain="general"):
    response = client.chat.completions.create(
        model="google/gemini-2.0-flash-001", # High performance & low cost
        messages=messages,
    )
    return response.choices[0].message.content
