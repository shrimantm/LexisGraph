from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from app.auth.clerk import get_current_user
from app.db.mongo import get_user, store_org_document, get_org_documents
from app.models.documents import DocumentUploadResponse
import pdfplumber
import io

router = APIRouter(prefix="/documents")

@router.post("/upload")
async def upload_document(file: UploadFile = File(...), user: dict = Depends(get_current_user)) -> DocumentUploadResponse:
    db_user = get_user(user["id"])
    if not db_user or not db_user.get("org_id"):
        raise HTTPException(status_code=403, detail="User must belong to an organization to upload documents")
    
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    # Process PDF -> JSON
    content = await file.read()
    extracted_text = ""
    try:
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for page in pdf.pages:
                extracted_text += page.extract_text() or ""
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")

    # Mock JSON extraction (in a real app, use LLM or specific parser)
    extracted_json = {
        "text_length": len(extracted_text),
        "preview": extracted_text[:200] if extracted_text else "No text found",
        "metadata": {
            "filename": file.filename,
            "content_type": file.content_type
        }
    }

    doc_id = store_org_document({
        "org_id": db_user["org_id"],
        "user_id": user["id"],
        "file_name": file.filename,
        "extracted_json": extracted_json
    })

    return {"id": doc_id, "message": "Document uploaded and processed"}

@router.get("/")
async def list_documents(user: dict = Depends(get_current_user)):
    db_user = get_user(user["id"])
    if not db_user or not db_user.get("org_id"):
        raise HTTPException(status_code=403, detail="User must belong to an organization to view documents")
    
    documents = get_org_documents(db_user["org_id"])
    for doc in documents:
        doc["_id"] = str(doc["_id"])
    return documents
