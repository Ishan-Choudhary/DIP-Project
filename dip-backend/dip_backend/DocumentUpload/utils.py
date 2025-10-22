import fitz
from docx import Document as DocxDocument

def extract_text(path, filetype):
    if filetype == "pdf":
        text = ""
        with fitz.open(path) as pdf:
            for page in pdf:
                text += page.get_text()

        return text

    
    if filetype == "docx":
        doc = DocxDocument(path)
        return "\n".join(p.text for p in doc.paragraphs)


    if filetype == "txt":
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()

    return ""
