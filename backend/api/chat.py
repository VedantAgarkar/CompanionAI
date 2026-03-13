from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from core.ai import get_ai_response
from core.prompts import get_system_prompt

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    domain: Optional[str] = "general"

@router.post("/")
async def chat(request: ChatRequest):
    try:
        system_prompt = get_system_prompt(request.domain)
        
        # Prepare messages with system prompt
        formatted_messages = [{"role": "system", "content": system_prompt}]
        for msg in request.messages:
            formatted_messages.append({"role": msg.role, "content": msg.content})
            
        response = await get_ai_response(formatted_messages, request.domain)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
