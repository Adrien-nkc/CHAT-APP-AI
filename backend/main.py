from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agent import call_OpenAI, conversation_history
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    message: str

@app.get("/")
def get_root():
    return {"Hello": "World"}

@app.get("/history")
def get_history():
    return conversation_history

@app.post("/chat")
def get_response(message: MessageRequest):
    return call_OpenAI(message.message)