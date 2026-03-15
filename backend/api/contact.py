from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from db.session import get_db
from db.models import ContactRequest

router = APIRouter(prefix="/contact", tags=["contact"])

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@router.post("/")
def submit_contact(form: ContactForm, db: Session = Depends(get_db)):
    entry = ContactRequest(
        name=form.name,
        email=form.email,
        message=form.message
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return {"status": "ok", "message": "Your message has been sent successfully!"}
