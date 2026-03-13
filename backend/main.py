from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.chat import router as chat_router
from api.auth import router as auth_router
from db.session import init_db

app = FastAPI(title="CompanionAI API")

# Initialize database
init_db()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from api.files import router as files_router

app.include_router(chat_router)
app.include_router(auth_router)
app.include_router(files_router)

@app.get("/")
async def root():
    return {"message": "Welcome to CompanionAI API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
