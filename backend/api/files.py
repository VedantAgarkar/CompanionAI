from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import os
import shutil
from db.session import get_db
from db.models import FileMetadata
from services.file_service import extract_text_from_pdf, analyze_document_content

router = APIRouter(prefix="/files", tags=["files"])

UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Extract and analyze
    text = await extract_text_from_pdf(file_path)
    analysis = await analyze_document_content(text)
    
    # Save to DB (Simplified: user_id=1 for now)
    db_file = FileMetadata(
        user_id=1,
        filename=file.filename,
        file_path=file_path,
        file_type="pdf",
        analysis_result=str(analysis)
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    
    return {
        "id": db_file.id,
        "filename": db_file.filename,
        "analysis": analysis
    }
