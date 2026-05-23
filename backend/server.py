from fastapi import FastAPI, APIRouter
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import zipfile
import io
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from starlette.responses import StreamingResponse


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "Coramore Theme API"}


@api_router.get("/download-theme")
async def download_theme():
    """Generate and serve the Coramore Shopify theme as a .zip file"""
    theme_dir = Path("/app/theme")

    if not theme_dir.exists():
        return {"error": "Theme directory not found"}

    # Create zip in memory — files at root level (no theme/ prefix)
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zf:
        for file_path in sorted(theme_dir.rglob('*')):
            if file_path.is_file():
                arcname = str(file_path.relative_to(theme_dir))
                zf.write(file_path, arcname)

    zip_buffer.seek(0)

    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers={
            "Content-Disposition": "attachment; filename=coramore-theme.zip"
        }
    )


@api_router.get("/theme-info")
async def theme_info():
    """Return theme metadata"""
    theme_dir = Path("/app/theme")
    file_count = sum(1 for _ in theme_dir.rglob('*') if _.is_file()) if theme_dir.exists() else 0

    sections = []
    sections_dir = theme_dir / "sections"
    if sections_dir.exists():
        sections = [f.stem for f in sorted(sections_dir.glob('*.liquid'))]

    templates = []
    templates_dir = theme_dir / "templates"
    if templates_dir.exists():
        templates = [f.stem for f in sorted(templates_dir.glob('*.json'))]

    return {
        "name": "Coramore",
        "version": "1.0.0",
        "description": "Tema Shopify premium ad alta conversione per Borsa 2-in-1",
        "compatibility": "Online Store 2.0",
        "language": "Italiano",
        "file_count": file_count,
        "sections": sections,
        "templates": templates,
        "features": [
            "Sezioni JSON personalizzabili",
            "Widget Trustpilot-style",
            "Sezione Problema/Soluzione",
            "Recensioni video scrollabili",
            "Countdown timer sessione",
            "Galleria prodotto con zoom",
            "Carrello ottimizzato",
            "Animazioni scroll-reveal",
            "Mobile-first responsive",
            "FAQ accordion",
            "Trust bar multi-punto"
        ]
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
