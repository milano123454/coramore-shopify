from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class NewsletterSubscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class NewsletterCreate(BaseModel):
    email: str


@api_router.get("/")
async def root():
    return {"message": "SqueezeCase API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/newsletter", response_model=NewsletterSubscriber)
async def subscribe(input: NewsletterCreate):
    email = input.email.strip().lower()
    if "@" not in email or "." not in email.split("@")[-1]:
        raise HTTPException(status_code=422, detail="Inserisci un indirizzo email valido")
    existing = await db.newsletter.find_one({"email": email}, {"_id": 0})
    if existing:
        return NewsletterSubscriber(**existing)
    sub = NewsletterSubscriber(email=email)
    doc = sub.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.newsletter.insert_one(doc)
    return sub


@api_router.get("/newsletter", response_model=List[NewsletterSubscriber])
async def list_subscribers():
    subs = await db.newsletter.find({}, {"_id": 0}).to_list(1000)
    for s in subs:
        if isinstance(s.get('created_at'), str):
            s['created_at'] = datetime.fromisoformat(s['created_at'])
    return subs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
