from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import Optional
from jose import JWTError, jwt
import os, requests
from dotenv import load_dotenv
from datetime import datetime

from db.session import get_db
from db.models import User, ChatHistory, ContactRequest

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "secret")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")

router = APIRouter(prefix="/admin", tags=["admin"])

# ── Auth guard ─────────────────────────────────────────────────────────────

def require_admin(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    token = authorization.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        role = payload.get("role", "user")
        if role != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ── Endpoints ───────────────────────────────────────────────────────────────

@router.get("/users")
def list_users(payload=Depends(require_admin), db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.created_at.desc()).all()
    return [
        {
            "id": u.id,
            "full_name": u.full_name,
            "email": u.email,
            "role": u.role,
            "created_at": u.created_at.isoformat() if u.created_at else None,
            "message_count": db.query(ChatHistory).filter(
                ChatHistory.user_id == u.id,
                ChatHistory.role == "user"
            ).count()
        }
        for u in users
    ]

@router.post("/users/{user_id}/grant-admin")
def grant_admin(user_id: int, payload=Depends(require_admin), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = "admin"
    db.commit()
    return {"message": f"{user.full_name} is now an admin"}

@router.post("/users/{user_id}/revoke-admin")
def revoke_admin(user_id: int, payload=Depends(require_admin), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = "user"
    db.commit()
    return {"message": f"{user.full_name}'s admin privileges revoked"}

@router.delete("/users/{user_id}")
def delete_user(user_id: int, payload=Depends(require_admin), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Delete linked chat history first
    db.query(ChatHistory).filter(ChatHistory.user_id == user_id).delete()
    db.delete(user)
    db.commit()
    return {"message": f"User {user.full_name} deleted successfully"}

@router.get("/stats")
def get_stats(payload=Depends(require_admin), db: Session = Depends(get_db)):
    total_users = db.query(User).count()
    admin_count = db.query(User).filter(User.role == "admin").count()
    total_messages = db.query(ChatHistory).filter(ChatHistory.role == "user").count()
    
    # Messages per domain
    from sqlalchemy import func
    domain_stats = db.query(
        ChatHistory.domain, func.count(ChatHistory.id).label("count")
    ).filter(ChatHistory.role == "user").group_by(ChatHistory.domain).all()
    
    # Recent signups (last 7 users)
    recent_users = db.query(User).order_by(User.created_at.desc()).limit(5).all()

    return {
        "total_users": total_users,
        "admin_count": admin_count,
        "total_messages": total_messages,
        "domain_stats": [{"domain": d, "count": c} for d, c in domain_stats],
        "recent_users": [
            {"id": u.id, "full_name": u.full_name, "email": u.email, "created_at": u.created_at.isoformat() if u.created_at else None}
            for u in recent_users
        ]
    }

@router.get("/status")
def server_status(payload=Depends(require_admin)):
    # Check OpenRouter API
    api_ok = False
    api_latency = None
    try:
        start = datetime.utcnow()
        r = requests.get(
            "https://openrouter.ai/api/v1/models",
            headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}"},
            timeout=5
        )
        api_latency = round((datetime.utcnow() - start).total_seconds() * 1000)
        api_ok = r.status_code == 200
    except Exception:
        api_ok = False

    return {
        "server": "online",
        "api_provider": "OpenRouter",
        "api_model": "google/gemini-2.0-flash-001",
        "api_status": "ready" if api_ok else "degraded",
        "api_latency_ms": api_latency,
        "uptime": "running"
    }

@router.get("/contact-requests")
def list_contact_requests(payload=Depends(require_admin), db: Session = Depends(get_db)):
    requests = db.query(ContactRequest).order_by(ContactRequest.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "name": r.name,
            "email": r.email,
            "message": r.message,
            "status": r.status,
            "created_at": r.created_at.isoformat() if r.created_at else None
        }
        for r in requests
    ]

@router.delete("/contact-requests/{req_id}")
def delete_contact_request(req_id: int, payload=Depends(require_admin), db: Session = Depends(get_db)):
    req = db.query(ContactRequest).filter(ContactRequest.id == req_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")
    db.delete(req)
    db.commit()
    return {"message": "Contact request deleted"}

