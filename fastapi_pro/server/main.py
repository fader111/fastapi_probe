from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pathlib import Path
import shutil
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="3D Model Server")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create models directory if it doesn't exist
MODELS_DIR = Path("models")
MODELS_DIR.mkdir(exist_ok=True)

# Mount the models directory
app.mount("/models", StaticFiles(directory="models"), name="models")

@app.get("/")
async def read_root():
    logger.info("Root endpoint accessed")
    return JSONResponse(
        content={"message": "3D Model Server", "status": "running"},
        status_code=200
    )

@app.get("/api/models")
async def list_models():
    """List all available 3D models"""
    try:
        models = [f.name for f in MODELS_DIR.glob("*.ply")]
        logger.info(f"Found models: {models}")
        return JSONResponse(
            content={"models": models, "count": len(models)},
            status_code=200
        )
    except Exception as e:
        logger.error(f"Error listing models: {str(e)}")
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        )

@app.post("/api/upload")
async def upload_model(file: UploadFile = File(...)):
    try:
        if not file.filename.endswith('.ply'):
            return JSONResponse(
                content={"error": "Only PLY files are allowed"},
                status_code=400
            )
        
        file_path = MODELS_DIR / file.filename
        with file_path.open('wb') as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        logger.info(f"File uploaded: {file.filename}")
        return JSONResponse(
            content={"message": "File uploaded successfully", "filename": file.filename},
            status_code=200
        )
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        )