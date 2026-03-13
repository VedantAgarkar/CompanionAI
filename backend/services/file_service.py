import fitz  # PyMuPDF
import pdfplumber
import os

async def extract_text_from_pdf(file_path: str):
    text = ""
    # Try PyMuPDF first
    try:
        doc = fitz.open(file_path)
        for page in doc:
            text += page.get_text()
        doc.close()
    except Exception as e:
        print(f"PyMuPDF error: {e}")
        
    # If text is still empty, try pdfplumber (better for tables/structured data)
    if not text.strip():
        try:
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        except Exception as e:
            print(f"pdfplumber error: {e}")
            
    return text

async def analyze_document_content(text: str, query: str = None):
    # This will be integrated with the AI logic later
    # For now, it just returns a summary of the text length
    return {
        "summary": "Document analyzed successfully.",
        "text_length": len(text),
        "preview": text[:500] if text else "No text found"
    }
