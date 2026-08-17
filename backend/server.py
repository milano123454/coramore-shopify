from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import Any, Dict

from content_seed import DEFAULT_CONTENT

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class ContentUpdate(BaseModel):
    content: Dict[str, Any]


@api_router.get("/")
async def root():
    return {"message": "SqueezeCase API is live"}


@api_router.get("/content")
async def get_content():
    doc = await db.site_content.find_one({"key": "main"}, {"_id": 0})
    if not doc:
        seed = {"key": "main", **DEFAULT_CONTENT}
        await db.site_content.insert_one(dict(seed))
        return seed
    return doc


@api_router.put("/content")
async def update_content(update: ContentUpdate):
    payload = dict(update.content)
    payload["key"] = "main"
    await db.site_content.replace_one({"key": "main"}, payload, upsert=True)
    return payload


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
