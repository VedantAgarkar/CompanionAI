from db.session import engine
from db.models import Base
import os

def reset_database():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Database reset successfully with 'full_name' column.")

if __name__ == "__main__":
    # Also try to remove the file just in case
    db_path = "companion_ai.db"
    reset_database()
