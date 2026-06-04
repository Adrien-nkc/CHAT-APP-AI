from openai import OpenAI
from dotenv import load_dotenv
import os

conversation_history = []

def call_OpenAI(message):

    

    load_dotenv()

    api_key = os.getenv("OPENAI_API_KEY")

    client = OpenAI(api_key = api_key)

    conversation_history.append({"role": "user", "content": message})

    response = client.chat.completions.create(
        model="gpt-4o",
        messages= conversation_history
    )

    ai_response = response.choices[0].message.content

    conversation_history.append({"role": "assistant", "content": ai_response})

    return(ai_response)



